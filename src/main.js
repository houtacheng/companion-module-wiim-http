import http from 'http'
import https from 'https'
import os from 'os'
import { InstanceBase, Regex, InstanceStatus } from '@companion-module/base'
import UpdateActions from './actions.js'
import UpdateFeedbacks from './feedbacks.js'
import UpdateVariableDefinitions from './variables.js'
import UpdatePresets from './presets.js'
import UpgradeScripts from './upgrades.js'
import { inputChoices, getLoopMode, findLoopModeId, loopModeCycle } from './choices.js'

const DEFAULT_HTTP_PORT = 80
const DEFAULT_HTTPS_PORT = 443

// getPlayerStatus reports curpos/offset_pts/totlen in milliseconds, while
// setPlayerCmd:seek takes whole seconds. Keep the two straight by suffixing
// every local that holds one of them.
const MS_PER_SECOND = 1000
const NEAR_END_MS = 3000

// A subnet sweep is 254 hosts across two protocols, so a device that stays
// offline must not be able to start one per failed command.
const DISCOVERY_COOLDOWN_MS = 60000

// Directory listings come from arbitrary servers; cap what we'll buffer.
const MAX_RESPONSE_BYTES = 4 * 1024 * 1024

// How many /24 blocks to derive from one interface. A /22 is four, which is
// common on prosumer gear; anything wider gets truncated rather than swept.
const MAX_SCAN_SUBNETS = 4

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
		this.state = {
			player: {},
			status: {},
			meta: {},
			presets: {},
			mediaFiles: [],
			mediaLibraryStatus: '',
			selectedMediaIndex: 0,
			selectedInputIndex: 0,
			lastRandomMediaFile: '',
			lastRandomMediaUrl: '',
			lastPlaybackUrl: '',
			lastPlaybackStatus: '',
			lastPlaybackNearEnd: false,
			lastAutoReplayAt: 0,
			lastAutoRandomAt: 0,
			connection: 'Disconnected',
			discoveredHost: '',
			discoveryStatus: '',
			activeProtocol: '',
		}
		this.pollTimer = undefined
		this.mediaScanTimer = undefined
		this.mediaScanInProgress = false
		this.pollInProgress = false
		this.pollCount = 0
		this.destroyed = false
		this.discoveryPromise = undefined
		this.lastDiscoveryAt = 0
		this.pendingRequests = new Set()
	}

	async init(config) {
		this.config = config

		this.updateActions()
		this.updateFeedbacks()
		this.updateVariableDefinitions()
		this.updatePresets()
		this.startPolling()
		this.scanMediaLibrary()
		this.startMediaLibraryAutoScan()
	}

	async destroy() {
		this.destroyed = true
		this.stopPolling()
		this.stopMediaLibraryAutoScan()

		// Otherwise a reply to an in-flight request lands on a torn-down instance.
		for (const request of this.pendingRequests) {
			request.destroy()
		}
		this.pendingRequests.clear()
	}

	async configUpdated(config) {
		this.config = config
		this.updatePresets()
		this.startPolling()
		if (this.config?.rescanMediaLibraryNow === true || this.config?.rescanMediaLibraryOnSave !== false) {
			await this.scanMediaLibrary()
		}
		if (this.config?.rescanMediaLibraryNow === true) {
			this.saveConfig({
				...this.config,
				rescanMediaLibraryNow: false,
			})
		}
		this.startMediaLibraryAutoScan()
	}

	getConfigFields() {
		return [
			{
				type: 'bonjour-device',
				id: 'wiimDevice',
				label: 'Discovered WiiM Device',
				width: 12,
			},
			{
				type: 'static-text',
				id: 'wiimDeviceHelp',
				label: 'Discovery Note',
				width: 12,
				value:
					'Select a discovered WiiM/AirPlay/HTTP device when available. If Bonjour discovery is unavailable, enable subnet scan. Newer WiiM firmware is probed by HTTPS first.',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Manual WiiM IP Address / Hostname',
				width: 8,
				regex: Regex.HOSTNAME,
				required: false,
			},
			{
				type: 'checkbox',
				id: 'autoFindWiiM',
				label: 'Auto Find WiiM by Subnet Scan',
				width: 4,
				default: false,
			},
			{
				type: 'textinput',
				id: 'scanSubnetPrefix',
				label: 'Subnet Scan Prefix',
				width: 4,
				default: '',
				tooltip: 'Optional. Leave blank to scan local IPv4 /24 networks, or enter a prefix such as 192.168.1.',
			},
			{
				type: 'textinput',
				id: 'scanTarget',
				label: 'Target Name / MAC / UUID',
				width: 4,
				default: '',
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Port override',
				width: 4,
				default: '',
				regex: Regex.PORT,
			},
			{
				type: 'dropdown',
				id: 'protocol',
				label: 'Protocol',
				width: 4,
				default: 'auto',
				choices: [
					{ id: 'auto', label: 'Auto (HTTPS then HTTP)' },
					{ id: 'https', label: 'HTTPS' },
					{ id: 'http', label: 'HTTP' },
				],
			},
			{
				type: 'number',
				id: 'pollInterval',
				label: 'Polling interval (ms)',
				width: 4,
				default: 2000,
				min: 500,
				max: 60000,
				step: 100,
			},
			{
				type: 'textinput',
				id: 'mediaBaseUrl',
				label: 'Media Library HTTP Base URL',
				width: 8,
				default: '',
			},
			{
				type: 'textinput',
				id: 'mediaFileList',
				label: 'Media Library File List',
				width: 12,
				default: '',
			},
			{
				type: 'textinput',
				id: 'mediaIndexUrl',
				label: 'Media Library Index URL',
				width: 12,
				default: '',
			},
			{
				type: 'textinput',
				id: 'mediaExtensions',
				label: 'Media File Extensions',
				width: 4,
				default: 'mp3,wav,flac,m4a,aac,ogg',
			},
			{
				type: 'number',
				id: 'mediaScanDepth',
				label: 'Media Scan Depth',
				width: 4,
				default: 2,
				min: 0,
				max: 5,
				step: 1,
			},
			{
				type: 'static-text',
				id: 'mediaRescanHelp',
				label: 'Media Library Rescan',
				width: 12,
				value:
					'To rescan immediately, turn on "Rescan Media Library Now" and press Save. The switch resets automatically after scanning.',
			},
			{
				type: 'checkbox',
				id: 'rescanMediaLibraryNow',
				label: 'Rescan Media Library Now',
				width: 4,
				default: false,
			},
			{
				type: 'checkbox',
				id: 'rescanMediaLibraryOnSave',
				label: 'Rescan Media Library On Save',
				width: 4,
				default: true,
			},
			{
				type: 'checkbox',
				id: 'autoRescanMediaLibrary',
				label: 'Auto Rescan Media Library',
				width: 4,
				default: true,
			},
			{
				type: 'number',
				id: 'mediaRescanIntervalMinutes',
				label: 'Media Rescan Interval (minutes)',
				width: 4,
				default: 5,
				min: 1,
				max: 1440,
				step: 1,
			},
			{
				type: 'checkbox',
				id: 'autoRandomNext',
				label: 'Auto Random Next',
				width: 4,
				default: false,
			},
			{
				type: 'textinput',
				id: 'autoRandomFolderFilter',
				label: 'Auto Random Folder Filter',
				width: 8,
				default: '',
			},
			{
				type: 'checkbox',
				id: 'assistRepeatOne',
				label: 'Assist Repeat One for URL playback',
				width: 4,
				default: true,
			},
		]
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	updatePresets() {
		UpdatePresets(this)
	}

	stopPolling() {
		if (this.pollTimer) {
			clearInterval(this.pollTimer)
			this.pollTimer = undefined
		}
	}

	startPolling() {
		this.stopPolling()

		if (!this.getConfiguredHost()) {
			if (this.config?.autoFindWiiM === true && this.getScanSubnetPrefixes().length > 0) {
				this.updateStatus(InstanceStatus.Connecting, 'Scanning subnet for WiiM')
				this.rediscoverWiiMDevice({ force: true }).then((host) => {
					if (!host) {
						this.updateStatus(InstanceStatus.BadConfig, 'No WiiM found on subnet')
						this.setVariableValues({
							connection: 'No WiiM found',
							discovery_status: this.state.discoveryStatus,
						})
						return
					}

					this.startPollTimer()
				})
				return
			}

			this.updateStatus(InstanceStatus.BadConfig, 'Select a WiiM device, enter manual IP, or enable subnet scan')
			this.setVariableValues({ connection: 'Missing configuration' })
			return
		}

		this.startPollTimer()
	}

	startPollTimer() {
		this.pollStatus()
		const interval = Number(this.config.pollInterval || 2000)
		this.pollTimer = setInterval(() => this.pollStatus(), Math.max(500, interval))
	}

	stopMediaLibraryAutoScan() {
		if (this.mediaScanTimer) {
			clearInterval(this.mediaScanTimer)
			this.mediaScanTimer = undefined
		}
	}

	startMediaLibraryAutoScan() {
		this.stopMediaLibraryAutoScan()

		if (this.config?.autoRescanMediaLibrary === false || !this.config?.mediaBaseUrl) return

		const intervalMinutes = Math.max(1, Math.min(1440, Number(this.config.mediaRescanIntervalMinutes || 5)))
		this.mediaScanTimer = setInterval(() => this.scanMediaLibrary(), intervalMinutes * 60 * 1000)
	}

	getConfiguredHost() {
		const discovered = this.getBonjourHost(this.config?.wiimDevice)
		if (discovered) return discovered
		if (this.state.discoveredHost) return this.state.discoveredHost
		return String(this.config?.host || '').trim()
	}

	getScanSubnetPrefix() {
		return this.getScanSubnetPrefixes()[0] || ''
	}

	getScanSubnetPrefixes() {
		const prefixes = []
		const addPrefix = (prefix) => {
			const normalized = String(prefix || '')
				.trim()
				.replace(/\s+/g, '')
			if (!normalized) return
			const withDot = normalized.endsWith('.') ? normalized : `${normalized}.`
			if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.$/.test(withDot) && !prefixes.includes(withDot)) {
				prefixes.push(withDot)
			}
		}

		addPrefix(this.config?.scanSubnetPrefix)

		const manualHost = String(this.config?.host || '').trim()
		const match = manualHost.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.)\d{1,3}$/)
		if (match) addPrefix(match[1])

		const interfaces = os.networkInterfaces()
		for (const addresses of Object.values(interfaces)) {
			for (const address of addresses || []) {
				if (address.family !== 'IPv4' || address.internal) continue
				for (const prefix of this.getInterfaceSubnetPrefixes(address)) addPrefix(prefix)
			}
		}

		return prefixes
	}

	// Deriving a single prefix from the interface address assumes a /24. Wider
	// networks span several /24 blocks and the device can sit in any of them, so
	// walk the netmask instead.
	getInterfaceSubnetPrefixes(address) {
		const ip = this.parseIPv4(address?.address)
		const mask = this.parseIPv4(address?.netmask)
		if (ip === undefined || mask === undefined) return []

		const hostBits = (~mask >>> 0) + 1
		const blocks = Math.max(1, Math.min(MAX_SCAN_SUBNETS, Math.floor(hostBits / 256) || 1))
		const network = (ip & mask) >>> 0
		const prefixes = []

		for (let block = 0; block < blocks; block++) {
			const start = (network + block * 256) >>> 0
			prefixes.push(`${(start >>> 24) & 255}.${(start >>> 16) & 255}.${(start >>> 8) & 255}.`)
		}

		return prefixes
	}

	parseIPv4(value) {
		const parts = String(value ?? '').split('.')
		if (parts.length !== 4) return undefined

		let result = 0
		for (const part of parts) {
			const octet = Number(part)
			if (!/^\d{1,3}$/.test(part) || !Number.isInteger(octet) || octet > 255) return undefined
			result = ((result << 8) | octet) >>> 0
		}

		return result
	}

	getBonjourHost(device) {
		if (!device) return ''
		if (typeof device === 'string') return device.trim()

		const candidates = [
			device.address,
			device.host,
			device.hostname,
			device.fqdn,
			device.name,
			Array.isArray(device.addresses) ? device.addresses.find(Boolean) : '',
		]

		for (const candidate of candidates) {
			const text = String(candidate || '').trim()
			if (text) return text.replace(/\.$/, '')
		}

		return ''
	}

	// Failures arrive from several commands in the same poll. Coalesce them onto a
	// single scan, and rate-limit afterwards so a device that stays offline can't
	// turn every poll into another sweep.
	async rediscoverWiiMDevice({ force = false } = {}) {
		if (this.discoveryPromise) return this.discoveryPromise
		if (this.destroyed) return ''
		if (!force && Date.now() - this.lastDiscoveryAt < DISCOVERY_COOLDOWN_MS) return ''

		this.state.discoveredHost = ''
		this.discoveryPromise = this.discoverWiiMDevice().finally(() => {
			this.lastDiscoveryAt = Date.now()
			this.discoveryPromise = undefined
		})

		return this.discoveryPromise
	}

	async discoverWiiMDevice() {
		const prefixes = this.getScanSubnetPrefixes()
		if (prefixes.length === 0) return ''

		const target = String(this.config?.scanTarget || '')
			.trim()
			.toLowerCase()
		this.state.discoveryStatus = `Scanning ${prefixes.join(', ')}1-254`
		this.setVariableValues({
			discovery_status: this.state.discoveryStatus,
			discovered_host: '',
		})

		const candidates = prefixes.flatMap((prefix) =>
			Array.from({ length: 254 }, (_value, index) => `${prefix}${index + 1}`),
		)
		const concurrency = 24
		let cursor = 0
		let found = ''

		const worker = async () => {
			while (!found && cursor < candidates.length) {
				if (this.destroyed) return
				const host = candidates[cursor++]
				const device = await this.probeWiiMHost(host)
				if (!device) continue
				if (target && !this.matchesDiscoveryTarget(device, target)) continue

				found = host
				this.state.discoveredHost = host
				this.state.discoveryStatus = `Found ${this.getDiscoveryDeviceLabel(device)} at ${host}`
				this.setVariableValues({
					discovery_status: this.state.discoveryStatus,
					discovered_host: host,
					configured_host: host,
				})
			}
		}

		await Promise.all(Array.from({ length: concurrency }, () => worker()))

		if (!found) {
			const prefixText = prefixes.join(', ')
			this.state.discoveryStatus = target
				? `No WiiM matching "${this.config?.scanTarget}" found on ${prefixText}1-254`
				: `No WiiM found on ${prefixText}1-254`
			this.setVariableValues({
				discovery_status: this.state.discoveryStatus,
				discovered_host: '',
			})
		}

		return found
	}

	async probeWiiMHost(host) {
		const urls = [`https://${host}/httpapi.asp?command=getStatusEx`, `http://${host}/httpapi.asp?command=getStatusEx`]

		for (const url of urls) {
			try {
				const text = await this.requestText(url, 900)
				const status = this.parseResponse(text)
				if (!status || typeof status !== 'object') continue

				const haystack = this.getDiscoveryHaystack(status)
				if (!haystack.includes('wiim') && !status.uuid && !status.MAC && !status.firmware) continue

				return status
			} catch (_error) {
				// Try the next protocol. Newer firmware commonly accepts HTTPS only.
			}
		}

		return undefined
	}

	getDiscoveryHaystack(status) {
		return [
			status.DeviceName,
			status.GroupName,
			status.ssid,
			status.project,
			status.project_build_name,
			status.MAC,
			status.uuid,
			status.firmware,
		]
			.filter(Boolean)
			.join(' ')
			.toLowerCase()
	}

	matchesDiscoveryTarget(status, target) {
		return this.getDiscoveryHaystack(status).includes(target)
	}

	getDiscoveryDeviceLabel(status) {
		return status.DeviceName || status.GroupName || status.ssid || status.MAC || 'WiiM'
	}

	getCommandUrls(command) {
		const host = this.getConfiguredHost()
		const port = Number(this.config.port || 0)
		const encodedCommand = encodeURIComponent(command)
		const protocol = this.config.protocol || 'auto'

		if (protocol === 'https') {
			return [`https://${host}:${port || DEFAULT_HTTPS_PORT}/httpapi.asp?command=${encodedCommand}`]
		}

		if (protocol === 'http') {
			return [`http://${host}:${port || DEFAULT_HTTP_PORT}/httpapi.asp?command=${encodedCommand}`]
		}

		const urls = [
			`https://${host}:${DEFAULT_HTTPS_PORT}/httpapi.asp?command=${encodedCommand}`,
			`http://${host}:${DEFAULT_HTTP_PORT}/httpapi.asp?command=${encodedCommand}`,
		]

		if (port && port !== DEFAULT_HTTPS_PORT) {
			urls.unshift(`https://${host}:${port}/httpapi.asp?command=${encodedCommand}`)
		}

		if (port && port !== DEFAULT_HTTP_PORT) {
			urls.push(`http://${host}:${port}/httpapi.asp?command=${encodedCommand}`)
		}

		return [...new Set(urls)]
	}

	async sendCommand(command, options = {}) {
		if (!this.getConfiguredHost()) {
			this.updateStatus(InstanceStatus.BadConfig, 'Missing WiiM IP address')
			return undefined
		}

		let lastError

		for (const url of this.getCommandUrls(command)) {
			try {
				const text = await this.requestText(url, options.timeoutMs || 5000)
				this.state.activeProtocol = new URL(url).protocol.replace(':', '')

				if (!options.silent) {
					setTimeout(() => this.pollStatus(), 200)
				}

				return this.parseResponse(text)
			} catch (error) {
				lastError = error
			}
		}

		const message = lastError?.message || 'Unknown connection error'
		if (this.config?.autoFindWiiM === true && !options.discoveryRetry) {
			const host = await this.rediscoverWiiMDevice()
			if (host) return this.sendCommand(command, { ...options, discoveryRetry: true })
		}

		this.state.connection = 'Error'
		this.updateStatus(InstanceStatus.ConnectionFailure, message)
		this.setVariableValues({ connection: message })
		this.log('warn', `WiiM command failed: ${command}: ${message}`)
		return undefined
	}

	requestText(url, timeoutMs) {
		return new Promise((resolve, reject) => {
			const parsedUrl = new URL(url)
			const client = parsedUrl.protocol === 'https:' ? https : http
			const request = client.get(
				parsedUrl,
				{
					timeout: timeoutMs,
					rejectUnauthorized: false,
				},
				(response) => {
					let body = ''
					let bytes = 0

					response.setEncoding('utf8')
					response.on('data', (chunk) => {
						bytes += Buffer.byteLength(chunk, 'utf8')
						if (bytes > MAX_RESPONSE_BYTES) {
							request.destroy(new Error(`Response exceeded ${MAX_RESPONSE_BYTES} bytes`))
							return
						}

						body += chunk
					})
					response.on('end', () => {
						if (response.statusCode < 200 || response.statusCode >= 300) {
							reject(new Error(`HTTP ${response.statusCode}: ${body}`))
							return
						}

						resolve(body)
					})
				},
			)

			this.pendingRequests.add(request)
			request.on('close', () => this.pendingRequests.delete(request))
			request.on('timeout', () => {
				request.destroy(new Error('Connection timed out'))
			})
			request.on('error', reject)
		})
	}

	parseResponse(text) {
		const trimmed = String(text || '').trim()
		if (!trimmed) return {}

		try {
			return JSON.parse(trimmed)
		} catch (_error) {
			return trimmed
		}
	}

	async pollStatus() {
		// Each poll issues up to four sequential requests, so a slow device can take
		// far longer than the poll interval. Skip rather than stacking them up.
		if (this.pollInProgress || this.destroyed) return
		this.pollInProgress = true

		try {
			await this.runPollCycle()
		} finally {
			this.pollInProgress = false
		}
	}

	async runPollCycle() {
		this.pollCount += 1

		const player = await this.sendCommand('getPlayerStatus', { silent: true, timeoutMs: 4000 })
		const status = await this.sendCommand('getStatusEx', { silent: true, timeoutMs: 4000 })
		const meta = await this.sendCommand('getMetaInfo', { silent: true, timeoutMs: 4000 })
		const presets =
			this.pollCount === 1 || this.pollCount % 30 === 0
				? await this.sendCommand('getPresetInfo', { silent: true, timeoutMs: 4000 })
				: undefined

		if (player !== undefined || status !== undefined || meta !== undefined || presets !== undefined) {
			this.state.player = typeof player === 'object' && player !== null ? player : this.state.player
			this.state.status = typeof status === 'object' && status !== null ? status : this.state.status
			this.state.meta = typeof meta === 'object' && meta !== null ? meta : this.state.meta
			this.state.presets = typeof presets === 'object' && presets !== null ? presets : this.state.presets
			this.state.connection = 'Connected'
			this.updateStatus(InstanceStatus.Ok)
			this.updateVariablesFromState()
			this.checkFeedbacks('connection', 'playback_status', 'mute', 'input', 'loop_mode', 'shuffle', 'volume_level')
			await this.handleAutoRandomNext()
			await this.handleAssistedRepeatOne()
		}
	}

	updateVariablesFromState() {
		const player = this.state.player || {}
		const status = this.state.status || {}
		const meta = this.state.meta?.metaData || this.state.meta || {}
		const presets = this.state.presets || {}
		const title = this.cleanText(meta.title || player.Title || player.title || '')
		const artist = this.cleanText(meta.artist || player.Artist || player.artist || '')
		const album = this.cleanText(meta.album || player.Album || player.album || '')
		const subtitle = this.cleanText(meta.subtitle || '')
		const positionMs = this.getPositionMs()
		const durationMs = this.getDurationMs()
		const positionSeconds = Math.floor(positionMs / MS_PER_SECOND)
		const durationSeconds = Math.floor(durationMs / MS_PER_SECOND)
		const progressPercent = durationMs > 0 ? Math.round((positionMs / durationMs) * 100) : 0
		const loopMode = String(player.loop ?? '')

		this.setVariableValues({
			connection: this.state.connection,
			protocol: this.state.activeProtocol || '',
			configured_host: this.getConfiguredHost(),
			discovered_host: this.state.discoveredHost,
			discovery_status: this.state.discoveryStatus,
			device_name: status.DeviceName || status.device_name || status.ssid || '',
			group_name: status.GroupName || '',
			uuid: status.uuid || status.UUID || '',
			mac: status.MAC || status.mac || '',
			firmware: status.firmware || status.fw_ver || status.Firmware || '',
			project: status.project || status.Project || '',
			mode: player.mode || status.mode || '',
			source: this.getSourceText(),
			selected_source: this.getSelectedInputLabel(),
			status: player.status ?? '',
			status_text: this.getPlaybackText(),
			volume: player.vol ?? status.vol ?? '',
			mute: player.mute ?? status.mute ?? '',
			loop_mode: loopMode,
			loop_mode_text: this.getLoopModeText(loopMode),
			shuffle: this.isShuffleMode() ? 'On' : 'Off',
			position_seconds: positionSeconds,
			duration_seconds: durationSeconds,
			position_time: this.formatSeconds(positionSeconds),
			duration_time: this.formatSeconds(durationSeconds),
			progress_percent: progressPercent,
			artist,
			album,
			title,
			subtitle,
			track_id: meta.trackId || '',
			uri: player.uri || player.URI || '',
			artwork_url: this.cleanText(meta.albumArtURI || ''),
			sample_rate: this.cleanText(meta.sampleRate || ''),
			bit_depth: this.cleanText(meta.bitDepth || ''),
			bit_rate: this.cleanText(meta.bitRate || ''),
			eq_enabled: status.EQStat ?? status.eq_status ?? '',
			eq_preset: status.EQPreset || status.eq_preset || '',
			preset_count: presets.preset_num ?? '',
			preset_summary: this.getPresetSummary(),
			now_playing: this.getNowPlayingSummary(title, artist, player.uri || player.URI || ''),
			media_library_count: this.state.mediaFiles.length,
			media_library_status: this.state.mediaLibraryStatus,
			selected_media_file: this.getSelectedMediaLabel(),
			selected_media_url: this.getSelectedMediaFile()?.url || '',
			random_media_file: this.state.lastRandomMediaFile,
			random_media_url: this.state.lastRandomMediaUrl,
			auto_random_next: this.config?.autoRandomNext === true ? 'On' : 'Off',
			auto_random_folder_filter: this.config?.autoRandomFolderFilter || '',
			assisted_repeat_one: this.config?.assistRepeatOne === false ? 'Off' : 'On',
		})
	}

	async queryDocumentedEndpoint(command, endpoint = {}) {
		this.setVariableValues({
			api_last_command: command,
			api_last_endpoint: endpoint.id || '',
			api_last_tag: endpoint.tag || '',
			api_last_summary: endpoint.summary || '',
			api_last_error: '',
		})

		const result = await this.sendCommand(command, { silent: true, timeoutMs: 8000 })

		if (result === undefined) {
			this.setVariableValues({
				api_last_response: '',
				api_last_error: this.state.connection === 'Error' ? 'Command failed' : '',
			})
			return
		}

		this.setVariableValues({
			api_last_response: typeof result === 'string' ? result : JSON.stringify(result),
			api_last_error: '',
		})
	}

	getPlaybackText() {
		const status = String(this.state.player?.status ?? '').toLowerCase()
		if (status === 'play' || status === 'playing' || status === '1') return 'play'
		if (status === 'pause' || status === 'paused' || status === '2') return 'pause'
		if (status === 'stop' || status === 'stopped' || status === '0') return 'stop'
		return status
	}

	async setVolumeRelative(delta) {
		const current = Number(this.state.player.vol ?? this.state.status.vol ?? 0)
		const nextVolume = Math.max(0, Math.min(100, current + delta))
		await this.sendCommand(`setPlayerCmd:vol:${nextVolume}`)
	}

	async switchInputRelative(delta) {
		const currentInput = this.getActiveInputId()
		const currentIndex = inputChoices.findIndex((input) => input.id === currentInput)
		const baseIndex = currentIndex >= 0 ? currentIndex : this.state.selectedInputIndex || 0
		const nextIndex = this.wrapIndex(baseIndex + Number(delta || 0), inputChoices.length)
		const nextInput = inputChoices[nextIndex]

		this.state.selectedInputIndex = nextIndex
		if (!nextInput) return

		const result = await this.sendCommand(`setPlayerCmd:switchmode:${nextInput.id}`)
		if (result !== undefined) {
			this.state.player = { ...this.state.player, mode: nextInput.id }
			this.updateVariablesFromState()
			this.checkFeedbacks('input')
		}
	}

	getActiveInputId() {
		const source = this.getSourceText().toLowerCase()
		const raw = String(this.state.player?.mode ?? this.state.status?.mode ?? '').toLowerCase()
		const matches = {
			wifi: ['network', 'wifi', '0', '1', '2', '10', '20'],
			bluetooth: ['bluetooth', 'bt', '41'],
			'line-in': ['line in', 'line-in', 'line_in', 'line', 'linein', '40'],
			optical: ['optical', 'spdif', '43'],
			udisk: ['usb', 'udisk', 'usb disk', 'u-disk', '11', '42', '51'],
			'co-axial': ['coaxial', 'co-axial', 'coax'],
			hdmi: ['hdmi'],
			hdmi_arc: ['hdmi arc', 'hdmi_arc', 'arc'],
		}

		for (const [id, aliases] of Object.entries(matches)) {
			if (aliases.includes(source) || aliases.includes(raw)) return id
		}
		return inputChoices[this.state.selectedInputIndex || 0]?.id || 'wifi'
	}

	getSelectedInputLabel() {
		const activeId = this.getActiveInputId()
		const input =
			inputChoices.find((choice) => choice.id === activeId) || inputChoices[this.state.selectedInputIndex || 0]
		return input?.label || this.getSourceText()
	}

	getPositionMs() {
		return this.toNumber(this.state.player?.curpos ?? this.state.player?.offset_pts)
	}

	getDurationMs() {
		return this.toNumber(this.state.player?.totlen)
	}

	getPositionSeconds() {
		return Math.floor(this.getPositionMs() / MS_PER_SECOND)
	}

	getDurationSeconds() {
		return Math.floor(this.getDurationMs() / MS_PER_SECOND)
	}

	isNearEnd() {
		const durationMs = this.getDurationMs()
		return durationMs > 0 && this.getPositionMs() >= Math.max(0, durationMs - NEAR_END_MS)
	}

	toNumber(value) {
		const number = Number(value)
		return Number.isFinite(number) ? number : 0
	}

	formatSeconds(seconds) {
		const safeSeconds = Math.max(0, Math.floor(Number(seconds) || 0))
		const hours = Math.floor(safeSeconds / 3600)
		const minutes = Math.floor((safeSeconds % 3600) / 60)
		const secs = safeSeconds % 60
		if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
		return `${minutes}:${String(secs).padStart(2, '0')}`
	}

	// WiiM hex-encodes Title/Artist/Album, but some sources hand them back as plain
	// text -- and plenty of real words are spelled entirely from a-f ("ABBA",
	// "Facade", "decade"), as are bare years like "2024". Decoding on shape alone
	// turned those into mojibake, so only accept a decode whose bytes round-trip as
	// UTF-8 and whose result actually reads as text.
	decodeHexText(text) {
		if (text.length < 8 || text.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(text)) return undefined

		let decoded
		try {
			decoded = Buffer.from(text, 'hex').toString('utf8')
		} catch (_error) {
			return undefined
		}

		// Invalid UTF-8 decodes to U+FFFD, which never re-encodes to the input.
		if (Buffer.from(decoded, 'utf8').toString('hex') !== text.toLowerCase()) return undefined

		const cleaned = decoded.replace(/\0/g, '')
		if (/[\u0001-\u0008\u000b\u000c\u000e-\u001f]/.test(cleaned)) return undefined
		if (!/\p{L}/u.test(cleaned)) return undefined

		return cleaned.trim()
	}

	cleanText(value) {
		const text = String(value || '').trim()
		if (!text || text === 'unknow' || text === 'un_known') return ''
		return this.decodeHexText(text) ?? text
	}

	getFileName(value) {
		const text = this.cleanText(value)
		if (!text) return ''

		try {
			const url = new URL(text)
			const fileName = url.pathname.split('/').filter(Boolean).pop() || ''
			return decodeURIComponent(fileName)
		} catch (_error) {
			if (!text.includes('/') && !text.includes('\\')) return ''
			const fileName = text.split(/[\\/]/).filter(Boolean).pop() || ''
			try {
				return decodeURIComponent(fileName)
			} catch (_decodeError) {
				return fileName
			}
		}
	}

	getLoopModeText(loopMode = String(this.state.player?.loop ?? '')) {
		return getLoopMode(loopMode)?.label ?? String(loopMode || '')
	}

	getCurrentLoopMode() {
		return getLoopMode(this.state.player?.loop)
	}

	isShuffleMode() {
		return this.getCurrentLoopMode()?.shuffle === true
	}

	// Shuffle and repeat are encoded in one value, so setting either has to carry
	// the other across rather than clobbering it.
	async setRepeatMode(repeat) {
		const next = findLoopModeId(this.getCurrentLoopMode()?.shuffle === true, repeat)
		if (next === undefined) return
		await this.sendCommand(`setPlayerCmd:loopmode:${next}`)
	}

	async setShuffleMode(shuffle) {
		const next = findLoopModeId(shuffle === true, this.getCurrentLoopMode()?.repeat ?? 'off')
		if (next === undefined) return
		await this.sendCommand(`setPlayerCmd:loopmode:${next}`)
	}

	// Unknown or unset modes land on the first entry of the cycle.
	async cycleLoopMode() {
		const index = loopModeCycle.indexOf(String(this.state.player?.loop ?? ''))
		await this.sendCommand(`setPlayerCmd:loopmode:${loopModeCycle[(index + 1) % loopModeCycle.length]}`)
	}

	getSourceText() {
		const raw = String(this.state.player?.mode ?? this.state.status?.mode ?? '').toLowerCase()
		if (!raw || raw === '-1') return 'Unknown'
		const sourceMap = {
			10: 'Network',
			20: 'Network',
			11: 'USB',
			40: 'Line In',
			41: 'Bluetooth',
			42: 'USB',
			43: 'Optical',
			51: 'USB',
			wifi: 'Network',
			network: 'Network',
			bluetooth: 'Bluetooth',
			'line-in': 'Line In',
			optical: 'Optical',
			udisk: 'USB',
			usb: 'USB',
		}
		return sourceMap[raw] || raw
	}

	getPresetSummary() {
		const list = this.state.presets?.preset_list
		if (!Array.isArray(list) || list.length === 0) return ''
		return list
			.map((preset, index) => {
				const name = preset.name || preset.title || preset.preset_name || `Preset ${index + 1}`
				return `${index + 1}. ${name}`
			})
			.join(' | ')
	}

	getNowPlayingSummary(title, artist, uri = '') {
		const fileName = this.getFileName(title) || this.getFileName(uri)
		if (fileName) return fileName
		if (title && artist) return `${title} - ${artist}`
		return title || artist || this.getPlaybackText()
	}

	getCurrentPlaybackUrl() {
		const player = this.state.player || {}
		const candidates = [player.uri, player.URI, player.Title, player.title]
		for (const candidate of candidates) {
			const text = this.cleanText(candidate)
			if (!text) continue
			try {
				const url = new URL(text)
				if (url.protocol === 'http:' || url.protocol === 'https:') return url.toString()
			} catch (_error) {
				// Not a URL.
			}
		}
		return ''
	}

	async handleAssistedRepeatOne() {
		const playbackStatus = this.getPlaybackText()
		const repeatsOne = this.getCurrentLoopMode()?.repeat === 'one'
		const currentUrl = this.getCurrentPlaybackUrl()
		const nearEnd = this.isNearEnd()

		if (currentUrl && playbackStatus === 'play') {
			this.state.lastPlaybackUrl = currentUrl
			this.state.lastPlaybackNearEnd = nearEnd
		}

		const shouldReplay =
			this.config?.assistRepeatOne !== false &&
			repeatsOne &&
			playbackStatus === 'stop' &&
			this.state.lastPlaybackStatus === 'play' &&
			this.state.lastPlaybackNearEnd &&
			this.state.lastPlaybackUrl

		this.state.lastPlaybackStatus = playbackStatus

		if (!shouldReplay) return

		const now = Date.now()
		if (now - this.state.lastAutoReplayAt < 5000) return

		this.state.lastAutoReplayAt = now
		this.state.lastPlaybackNearEnd = false
		this.log('info', `Assisted Repeat One replaying ${this.state.lastPlaybackUrl}`)
		await this.sendCommand(`setPlayerCmd:play:${this.state.lastPlaybackUrl}`)
	}

	async handleAutoRandomNext() {
		if (this.config?.autoRandomNext !== true) return

		// Repeat One is the device's own job; don't fight it by queueing something else.
		if (this.getCurrentLoopMode()?.repeat === 'one') return

		const playbackStatus = this.getPlaybackText()
		const nearEnd = this.isNearEnd()
		const shouldPlayNext =
			playbackStatus === 'stop' &&
			this.state.lastPlaybackStatus === 'play' &&
			(this.state.lastPlaybackNearEnd || nearEnd) &&
			this.state.mediaFiles.length > 0

		if (!shouldPlayNext) return

		const now = Date.now()
		if (now - this.state.lastAutoRandomAt < 5000) return

		this.state.lastAutoRandomAt = now
		this.state.lastPlaybackNearEnd = false
		this.log('info', 'Auto Random Next selecting next media file')
		await this.playRandomMediaFile(this.config?.autoRandomFolderFilter || '', false)
	}

	getMediaFileChoices() {
		if (!this.state.mediaFiles.length) {
			return [{ id: '__none', label: 'No media files found. Configure Media Library and rescan.' }]
		}

		return this.state.mediaFiles.map((file) => ({
			id: file.url,
			label: file.label,
		}))
	}

	wrapIndex(index, length) {
		if (!length) return 0
		return ((index % length) + length) % length
	}

	getSelectedMediaFile() {
		if (!this.state.mediaFiles.length) return undefined
		this.state.selectedMediaIndex = this.wrapIndex(this.state.selectedMediaIndex || 0, this.state.mediaFiles.length)
		return this.state.mediaFiles[this.state.selectedMediaIndex]
	}

	getSelectedMediaLabel() {
		return this.getSelectedMediaFile()?.label || 'No media'
	}

	selectMediaRelative(delta) {
		if (!this.state.mediaFiles.length) {
			this.setVariableValues({
				selected_media_file: 'No media',
				selected_media_url: '',
			})
			return
		}

		this.state.selectedMediaIndex = this.wrapIndex(
			(this.state.selectedMediaIndex || 0) + Number(delta || 0),
			this.state.mediaFiles.length,
		)
		const file = this.getSelectedMediaFile()
		this.setVariableValues({
			selected_media_file: file?.label || '',
			selected_media_url: file?.url || '',
		})
	}

	async playSelectedMediaFile() {
		const file = this.getSelectedMediaFile()
		if (!file) {
			this.log('warn', 'Media Library selected play skipped: no media files found')
			return
		}

		await this.sendCommand(`setPlayerCmd:play:${file.url}`)
	}

	async playRandomMediaFile(folderFilter = '', rescan = false) {
		if (rescan) await this.scanMediaLibrary()

		const filter = String(folderFilter || '')
			.trim()
			.replace(/^\/+/, '')
			.toLowerCase()
		const files = filter
			? this.state.mediaFiles.filter((file) => file.label.toLowerCase().startsWith(filter))
			: this.state.mediaFiles

		if (!files.length) {
			const message = filter ? `No media files found for folder filter "${folderFilter}"` : 'No media files found'
			this.state.mediaLibraryStatus = message
			this.setVariableValues({
				media_library_status: message,
			})
			this.log('warn', `Media Library random play skipped: ${message}`)
			return
		}

		const file = files[Math.floor(Math.random() * files.length)]
		this.state.lastRandomMediaFile = file.label
		this.state.lastRandomMediaUrl = file.url
		this.setVariableValues({
			random_media_file: file.label,
			random_media_url: file.url,
		})
		await this.sendCommand(`setPlayerCmd:play:${file.url}`)
	}

	async scanMediaLibrary() {
		if (this.mediaScanInProgress) return
		this.mediaScanInProgress = true

		const baseUrl = String(this.config?.mediaBaseUrl || '').trim()
		if (!baseUrl) {
			this.state.mediaFiles = []
			this.state.mediaLibraryStatus = 'Not configured'
			this.updateActions()
			this.setVariableValues({
				media_library_count: 0,
				media_library_status: this.state.mediaLibraryStatus,
			})
			this.mediaScanInProgress = false
			return
		}

		try {
			const rootUrl = new URL(baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`).toString()
			const extensions = String(this.config?.mediaExtensions || 'mp3,wav,flac,m4a,aac,ogg')
				.split(',')
				.map((extension) => extension.trim().replace(/^\./, '').toLowerCase())
				.filter(Boolean)
			const maxDepth = Math.max(0, Math.min(5, Number(this.config?.mediaScanDepth ?? 2)))
			const visited = new Set()
			const configuredFiles = this.getConfiguredMediaFiles(rootUrl, extensions)
			const indexFiles = await this.getMediaIndexFiles(rootUrl, extensions)
			let scannedFiles = []
			let scanError = ''

			try {
				scannedFiles = await this.scanHttpDirectory(rootUrl, rootUrl, extensions, maxDepth, visited)
			} catch (error) {
				scanError = error.message
				this.log('warn', `Media library directory scan failed: ${error.message}`)
			}

			const uniqueFiles = new Map()
			for (const file of [...configuredFiles, ...indexFiles, ...scannedFiles]) {
				uniqueFiles.set(file.url, file)
			}
			const files = [...uniqueFiles.values()]

			this.state.mediaFiles = files.sort((a, b) => a.label.localeCompare(b.label))
			this.state.selectedMediaIndex = this.wrapIndex(this.state.selectedMediaIndex || 0, this.state.mediaFiles.length)
			if (scanError && this.state.mediaFiles.length > 0) {
				this.state.mediaLibraryStatus = `Found ${this.state.mediaFiles.length} files; directory scan unavailable: ${scanError}`
			} else if (scanError) {
				this.state.mediaLibraryStatus = `No files found; directory scan unavailable: ${scanError}`
			} else {
				this.state.mediaLibraryStatus = `Found ${this.state.mediaFiles.length} files`
			}
			this.updateActions()
			this.setVariableValues({
				media_library_count: this.state.mediaFiles.length,
				media_library_status: this.state.mediaLibraryStatus,
				selected_media_file: this.getSelectedMediaLabel(),
				selected_media_url: this.getSelectedMediaFile()?.url || '',
			})
		} catch (error) {
			this.state.mediaFiles = []
			this.state.mediaLibraryStatus = error.message
			this.updateActions()
			this.setVariableValues({
				media_library_count: 0,
				media_library_status: this.state.mediaLibraryStatus,
			})
			this.log('warn', `Media library scan failed: ${error.message}`)
		} finally {
			this.mediaScanInProgress = false
		}
	}

	getConfiguredMediaFiles(rootUrl, extensions) {
		const entries = String(this.config?.mediaFileList || '')
			.split(/[\n,]/)
			.map((entry) => entry.trim())
			.filter(Boolean)

		const files = []
		for (const entry of entries) {
			try {
				const url = new URL(entry, rootUrl).toString()
				const pathname = new URL(url).pathname
				const extension = pathname.includes('.') ? pathname.split('.').pop().toLowerCase() : ''
				if (extensions.length && !extensions.includes(extension)) continue

				files.push({
					url,
					label: this.getMediaLibraryLabel(url, rootUrl),
				})
			} catch (error) {
				this.log('warn', `Ignoring invalid media library entry "${entry}": ${error.message}`)
			}
		}

		return files
	}

	async getMediaIndexFiles(rootUrl, extensions) {
		const configuredIndexUrl = String(this.config?.mediaIndexUrl || '').trim()
		const candidates = configuredIndexUrl
			? [new URL(configuredIndexUrl, rootUrl).toString()]
			: ['files.txt', 'index.txt', 'playlist.m3u', 'index.m3u', 'files.json', 'index.json'].map((path) =>
					new URL(path, rootUrl).toString(),
				)

		for (const indexUrl of candidates) {
			try {
				const text = await this.requestText(indexUrl, 3000)
				const files = this.parseMediaIndex(text, indexUrl, rootUrl, extensions)
				if (files.length > 0) return files
			} catch (_error) {
				// Index files are optional.
			}
		}

		return []
	}

	parseMediaIndex(text, indexUrl, rootUrl, extensions) {
		const entries = []
		const trimmed = String(text || '').trim()
		if (!trimmed) return []

		try {
			const parsed = JSON.parse(trimmed)
			const list = Array.isArray(parsed)
				? parsed
				: parsed.files || parsed.tracks || parsed.items || parsed.list || parsed.media || []
			if (Array.isArray(list)) {
				for (const item of list) {
					if (typeof item === 'string') {
						entries.push(item)
					} else if (item && typeof item === 'object') {
						entries.push(item.url || item.uri || item.path || item.file || item.name || '')
					}
				}
			}
		} catch (_error) {
			for (const line of trimmed.split(/\r?\n/)) {
				const entry = line.trim()
				if (!entry || entry.startsWith('#')) continue
				entries.push(entry)
			}
		}

		return this.buildMediaFilesFromEntries(entries, indexUrl, rootUrl, extensions)
	}

	buildMediaFilesFromEntries(entries, baseUrl, rootUrl, extensions) {
		const files = []
		for (const entry of entries) {
			try {
				const url = new URL(entry, baseUrl).toString()
				const pathname = new URL(url).pathname
				const extension = pathname.includes('.') ? pathname.split('.').pop().toLowerCase() : ''
				if (extensions.length && !extensions.includes(extension)) continue

				files.push({
					url,
					label: this.getMediaLibraryLabel(url, rootUrl),
				})
			} catch (error) {
				this.log('warn', `Ignoring invalid media index entry "${entry}": ${error.message}`)
			}
		}

		return files
	}

	async scanHttpDirectory(url, rootUrl, extensions, depth, visited) {
		if (visited.has(url)) return []
		visited.add(url)

		const html = await this.requestText(url, 8000)
		const links = this.extractDirectoryLinks(html, url)
		const files = []

		for (const link of links) {
			if (!link.url.startsWith(rootUrl)) continue
			if (link.url === url || link.url === new URL('../', url).toString()) continue

			const pathname = new URL(link.url).pathname
			const extension = pathname.includes('.') ? pathname.split('.').pop().toLowerCase() : ''
			if (extensions.includes(extension)) {
				files.push({
					url: link.url,
					label: this.getMediaLibraryLabel(link.url, rootUrl),
				})
			} else if (depth > 0 && link.isDirectory) {
				files.push(...(await this.scanHttpDirectory(link.url, rootUrl, extensions, depth - 1, visited)))
			}
		}

		return files
	}

	extractDirectoryLinks(html, baseUrl) {
		const links = []
		const regex = /href\s*=\s*["']([^"']+)["']/gi
		let match
		while ((match = regex.exec(html))) {
			const href = match[1]
			if (!href || href.startsWith('#') || href.startsWith('?')) continue
			try {
				const url = new URL(href, baseUrl).toString()
				links.push({ url, isDirectory: href.endsWith('/') || new URL(url).pathname.endsWith('/') })
			} catch (_error) {
				// Ignore malformed directory listing links.
			}
		}
		return links
	}

	getMediaLibraryLabel(url, rootUrl) {
		const rootPath = new URL(rootUrl).pathname
		const filePath = new URL(url).pathname
		const relativePath = filePath.startsWith(rootPath) ? filePath.slice(rootPath.length) : filePath
		try {
			return decodeURIComponent(relativePath)
		} catch (_error) {
			return relativePath
		}
	}
}

export default ModuleInstance
export { UpgradeScripts as upgradeScripts }
