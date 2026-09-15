const { Regex } = require('@companion-module/base')
const { inputChoices, loopModeChoices, eqPresetChoices } = require('./choices')
const { documentedEndpointChoices, documentedEndpointMap } = require('./api-catalog')

function transportAction(name, command) {
	return {
		name,
		options: [],
		callback: async (_event, _context) => {
			await this.sendCommand(`setPlayerCmd:${command}`)
		},
	}
}

function simpleCommandAction(name, command) {
	return {
		name,
		options: [],
		callback: async (_event, _context) => {
			await this.sendCommand(command)
		},
	}
}

function sourceAction(name, input) {
	return {
		name,
		options: [],
		callback: async (_event, _context) => {
			const result = await this.sendCommand(`setPlayerCmd:switchmode:${input}`)
			if (result !== undefined) {
				this.state.player = { ...this.state.player, mode: input }
				this.updateVariablesFromState()
				this.checkFeedbacks('input')
			}
		},
	}
}

function buildDocumentedCommand(endpoint, options) {
	let command = endpoint.command
	for (let index = 1; index <= 8; index++) {
		const value = String(options[`param${index}`] ?? '')
		const param = endpoint.params[index - 1]
		if (param) {
			command = command.replaceAll(`{${param.name}}`, value)
		}
	}
	return command
}

const documentedApiOptions = [
	{
		id: 'endpoint',
		type: 'dropdown',
		label: 'Documented API endpoint',
		default: 'getStatusEx',
		choices: documentedEndpointChoices,
	},
	{
		id: 'param1',
		type: 'textinput',
		label: 'Param 1',
		default: '',
	},
	{
		id: 'param2',
		type: 'textinput',
		label: 'Param 2',
		default: '',
	},
	{
		id: 'param3',
		type: 'textinput',
		label: 'Param 3',
		default: '',
	},
	{
		id: 'param4',
		type: 'textinput',
		label: 'Param 4',
		default: '',
	},
	{
		id: 'param5',
		type: 'textinput',
		label: 'Param 5',
		default: '',
	},
	{
		id: 'param6',
		type: 'textinput',
		label: 'Param 6',
		default: '',
	},
	{
		id: 'param7',
		type: 'textinput',
		label: 'Param 7',
		default: '',
	},
	{
		id: 'param8',
		type: 'textinput',
		label: 'Param 8',
		default: '',
	},
]

module.exports = function (self) {
	const actions = {
		play: transportAction.call(self, 'Playback: Play / Resume', 'resume'),
		pause: transportAction.call(self, 'Playback: Pause', 'pause'),
		stop: transportAction.call(self, 'Playback: Stop', 'stop'),
		toggle_play: transportAction.call(self, 'Playback: Toggle Play/Pause', 'onepause'),
		next: transportAction.call(self, 'Playback: Next Track', 'next'),
		previous: transportAction.call(self, 'Playback: Previous Track', 'prev'),

		seek_absolute: {
			name: 'Playback: Seek Absolute',
			options: [
				{
					id: 'position',
					type: 'number',
					label: 'Position (seconds)',
					default: 0,
					min: 0,
					max: 86400,
					step: 1,
				},
			],
			callback: async (event) => {
				await self.sendCommand(`setPlayerCmd:seek:${event.options.position}`)
			},
		},

		seek_relative: {
			name: 'Playback: Seek Forward/Back',
			options: [
				{
					id: 'seconds',
					type: 'number',
					label: 'Seconds',
					default: 15,
					min: -3600,
					max: 3600,
					step: 1,
				},
			],
			callback: async (event) => {
				const current = Number(self.state.player.curpos ?? 0)
				const next = Math.max(0, current + Number(event.options.seconds))
				await self.sendCommand(`setPlayerCmd:seek:${next}`)
			},
		},

		play_uri: {
			name: 'Playback: Play URI',
			options: [
				{
					id: 'uri',
					type: 'textinput',
					label: 'URI',
					default: '',
					regex: Regex.SOMETHING,
				},
			],
			callback: async (event) => {
				await self.sendCommand(`setPlayerCmd:play:${event.options.uri}`)
			},
		},

		play_media_file: {
			name: 'Media Library: Play File',
			description: 'Play a file from the configured HTTP media library',
			options: [
				{
					id: 'url',
					type: 'dropdown',
					label: 'File',
					default: self.getMediaFileChoices()[0]?.id || '__none',
					choices: self.getMediaFileChoices(),
				},
			],
			callback: async (event) => {
				if (event.options.url === '__none') return
				await self.sendCommand(`setPlayerCmd:play:${event.options.url}`)
			},
		},

		play_random_media_file: {
			name: 'Media Library: Play Random File',
			description: 'Play a random file from the configured HTTP media library',
			options: [
				{
					id: 'folder',
					type: 'textinput',
					label: 'Folder filter (optional)',
					default: '',
				},
				{
					id: 'rescan',
					type: 'checkbox',
					label: 'Rescan before playing',
					default: false,
				},
			],
			callback: async (event) => {
				await self.playRandomMediaFile(event.options.folder, event.options.rescan)
			},
		},

		rescan_media_library: {
			name: 'Media Library: Rescan Files',
			options: [],
			callback: async () => {
				await self.scanMediaLibrary()
			},
		},

		select_media_previous: {
			name: 'Media Library: Select Previous File',
			options: [],
			callback: async () => {
				self.selectMediaRelative(-1)
			},
		},

		select_media_next: {
			name: 'Media Library: Select Next File',
			options: [],
			callback: async () => {
				self.selectMediaRelative(1)
			},
		},

		play_selected_media_file: {
			name: 'Media Library: Play Selected File',
			options: [],
			callback: async () => {
				await self.playSelectedMediaFile()
			},
		},

		set_volume: {
			name: 'Volume: Set',
			options: [
				{
					id: 'volume',
					type: 'number',
					label: 'Volume',
					default: 50,
					min: 0,
					max: 100,
					step: 1,
					required: true,
					range: true,
				},
			],
			callback: async (event) => {
				await self.sendCommand(`setPlayerCmd:vol:${event.options.volume}`)
			},
		},

		volume_up: {
			name: 'Volume: Up',
			options: [
				{
					id: 'step',
					type: 'number',
					label: 'Step',
					default: 5,
					min: 1,
					max: 50,
					step: 1,
				},
			],
			callback: async (event) => {
				await self.setVolumeRelative(Number(event.options.step))
			},
		},

		volume_down: {
			name: 'Volume: Down',
			options: [
				{
					id: 'step',
					type: 'number',
					label: 'Step',
					default: 5,
					min: 1,
					max: 50,
					step: 1,
				},
			],
			callback: async (event) => {
				await self.setVolumeRelative(-Number(event.options.step))
			},
		},

		switch_source_previous: {
			name: 'Source: Previous Input',
			options: [],
			callback: async () => {
				await self.switchInputRelative(-1)
			},
		},

		switch_source_next: {
			name: 'Source: Next Input',
			options: [],
			callback: async () => {
				await self.switchInputRelative(1)
			},
		},

		mute_on: simpleCommandAction.call(self, 'Volume: Mute On', 'setPlayerCmd:mute:1'),
		mute_off: simpleCommandAction.call(self, 'Volume: Mute Off', 'setPlayerCmd:mute:0'),
		mute_toggle: {
			name: 'Volume: Toggle Mute',
			options: [],
			callback: async () => {
				const current = String(self.state.player.mute ?? self.state.status.mute ?? '0')
				await self.sendCommand(`setPlayerCmd:mute:${current === '1' ? '0' : '1'}`)
			},
		},

		repeat_off: simpleCommandAction.call(self, 'Repeat: Off', 'setPlayerCmd:loopmode:0'),
		repeat_one: simpleCommandAction.call(self, 'Repeat: One', 'setPlayerCmd:loopmode:1'),
		repeat_all: simpleCommandAction.call(self, 'Repeat: All', 'setPlayerCmd:loopmode:4'),
		shuffle_on: simpleCommandAction.call(self, 'Shuffle: On', 'setPlayerCmd:loopmode:2'),
		shuffle_off: simpleCommandAction.call(self, 'Shuffle: Off', 'setPlayerCmd:loopmode:0'),
		repeat_cycle: {
			name: 'Repeat/Shuffle: Cycle Mode',
			description: 'Cycle through Repeat One, Repeat All, Shuffle, and Off',
			options: [],
			callback: async () => {
				const current = String(self.state.player.loop ?? '0')
				const nextMode = current === '1' ? '4' : current === '4' ? '2' : current === '2' || current === '3' ? '0' : '1'
				await self.sendCommand(`setPlayerCmd:loopmode:${nextMode}`)
			},
		},

		switch_network: sourceAction.call(self, 'Source: Network', 'wifi'),
		switch_bluetooth: sourceAction.call(self, 'Source: Bluetooth', 'bluetooth'),
		switch_line_in: sourceAction.call(self, 'Source: Line In', 'line-in'),
		switch_optical: sourceAction.call(self, 'Source: Optical', 'optical'),
		switch_usb: sourceAction.call(self, 'Source: USB', 'udisk'),
		switch_coaxial: sourceAction.call(self, 'Source: Coaxial', 'co-axial'),
		switch_hdmi: sourceAction.call(self, 'Source: HDMI', 'hdmi'),
		switch_hdmi_arc: sourceAction.call(self, 'Source: HDMI ARC', 'hdmi_arc'),

		switch_input: {
			name: 'Source: Switch Input',
			options: [
				{
					id: 'input',
					type: 'dropdown',
					label: 'Input',
					default: 'wifi',
					choices: inputChoices,
				},
			],
			callback: async (event) => {
				const result = await self.sendCommand(`setPlayerCmd:switchmode:${event.options.input}`)
				if (result !== undefined) {
					self.state.player = { ...self.state.player, mode: event.options.input }
					self.updateVariablesFromState()
					self.checkFeedbacks('input')
				}
			},
		},

		loop_mode: {
			name: 'Repeat: Set Loop Mode',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Loop mode',
					default: '0',
					choices: loopModeChoices,
				},
			],
			callback: async (event) => {
				await self.sendCommand(`setPlayerCmd:loopmode:${event.options.mode}`)
			},
		},

		preset: {
			name: 'Preset: Recall Number',
			options: [
				{
					id: 'preset',
					type: 'number',
					label: 'Preset number',
					default: 1,
					min: 1,
					max: 12,
					step: 1,
				},
			],
			callback: async (event) => {
				await self.sendCommand(`MCUPreset:${event.options.preset}`)
			},
		},

		eq_on: simpleCommandAction.call(self, 'EQ: On', 'EQOn'),
		eq_off: simpleCommandAction.call(self, 'EQ: Off', 'EQOff'),

		eq_preset: {
			name: 'EQ: Load Preset',
			options: [
				{
					id: 'preset',
					type: 'dropdown',
					label: 'EQ preset',
					default: 'Flat',
					choices: eqPresetChoices,
				},
			],
			callback: async (event) => {
				await self.sendCommand(`EQLoad:${event.options.preset}`)
			},
		},

		power_standby: simpleCommandAction.call(self, 'Power: Standby', 'MCUPower:0'),
		power_wake: simpleCommandAction.call(self, 'Power: Wake', 'MCUPower:1'),
		alarm_stop: simpleCommandAction.call(self, 'Alarm: Stop Current Alarm', 'alarmStop'),
		bluetooth_pairing: simpleCommandAction.call(self, 'Bluetooth: Enter Pairing Mode', 'btavkenterpair'),
		bluetooth_disconnect_all: simpleCommandAction.call(self, 'Bluetooth: Disconnect All Devices', 'btdisconnectall'),
		bluetooth_scan_start: simpleCommandAction.call(self, 'Bluetooth: Start Discovery', 'startbtdiscovery:1'),
		bluetooth_scan_stop: simpleCommandAction.call(self, 'Bluetooth: Stop Discovery', 'stopbtdiscovery'),
		led_on: simpleCommandAction.call(self, 'Device: Status LED On', 'LED_SWITCH_SET:1'),
		led_off: simpleCommandAction.call(self, 'Device: Status LED Off', 'LED_SWITCH_SET:0'),
		touch_controls_on: simpleCommandAction.call(self, 'Device: Touch Controls On', 'Button_Enable_SET:1'),
		touch_controls_off: simpleCommandAction.call(self, 'Device: Touch Controls Off', 'Button_Enable_SET:0'),
		reboot_device: simpleCommandAction.call(self, 'Device: Reboot', 'reboot'),
		factory_reset: simpleCommandAction.call(self, 'Device: Factory Reset', 'restoreToDefault'),

		shutdown_timer: {
			name: 'Device: Set Shutdown Timer',
			options: [
				{
					id: 'seconds',
					type: 'number',
					label: 'Seconds',
					default: 0,
					min: 0,
					max: 86400,
					step: 60,
				},
			],
			callback: async (event) => {
				await self.sendCommand(`setShutdown:${event.options.seconds}`)
			},
		},

		channel_balance: {
			name: 'Audio Output: Channel Balance',
			options: [
				{
					id: 'balance',
					type: 'number',
					label: 'Balance',
					default: 0,
					min: -100,
					max: 100,
					step: 1,
				},
			],
			callback: async (event) => {
				await self.sendCommand(`setChannelBalance:${event.options.balance}`)
			},
		},

		bass_level: {
			name: 'EQ: Set Bass',
			options: [
				{
					id: 'level',
					type: 'number',
					label: 'Level',
					default: 0,
					min: -10,
					max: 10,
					step: 1,
				},
			],
			callback: async (event) => {
				await self.sendCommand(`EQSet:Bass:${event.options.level}`)
			},
		},

		treble_level: {
			name: 'EQ: Set Treble',
			options: [
				{
					id: 'level',
					type: 'number',
					label: 'Level',
					default: 0,
					min: -10,
					max: 10,
					step: 1,
				},
			],
			callback: async (event) => {
				await self.sendCommand(`EQSet:Treble:${event.options.level}`)
			},
		},

		max_volume: {
			name: 'Audio Output: Set Max Volume',
			options: [
				{
					id: 'volume',
					type: 'number',
					label: 'Max volume',
					default: 100,
					min: 0,
					max: 100,
					step: 1,
				},
			],
			callback: async (event) => {
				await self.sendCommand(`setMaxVolume:${event.options.volume}`)
			},
		},

		room_correction_mode: {
			name: 'Room Correction: Set Mode',
			options: [
				{
					id: 'mode',
					type: 'textinput',
					label: 'Mode',
					default: '',
				},
			],
			callback: async (event) => {
				await self.sendCommand(`RoomCorrSetMode:{"Mode":"${event.options.mode}"}`)
			},
		},

		refresh_status: {
			name: 'Status: Refresh Now',
			options: [],
			callback: async () => {
				await self.pollStatus()
			},
		},

		documented_api_execute: {
			name: 'Documented API: Execute Endpoint',
			description:
				'Execute any endpoint listed in cvdlinden/wiim-httpapi. Parameters map to placeholders in endpoint order.',
			options: documentedApiOptions,
			callback: async (event) => {
				const endpoint = documentedEndpointMap[event.options.endpoint]
				if (!endpoint) return
				await self.sendCommand(buildDocumentedCommand(endpoint, event.options))
			},
		},

		documented_api_query: {
			name: 'Documented API: Query Endpoint to Variables',
			description: 'Query any endpoint listed in cvdlinden/wiim-httpapi and store the result in api_last_* variables.',
			options: documentedApiOptions,
			callback: async (event) => {
				const endpoint = documentedEndpointMap[event.options.endpoint]
				if (!endpoint) return
				await self.queryDocumentedEndpoint(buildDocumentedCommand(endpoint, event.options), endpoint)
			},
		},

		custom_command: {
			name: 'Advanced: Custom HTTP API Command',
			options: [
				{
					id: 'command',
					type: 'textinput',
					label: 'Command after command=',
					default: 'getStatusEx',
					regex: Regex.SOMETHING,
				},
			],
			callback: async (event) => {
				await self.sendCommand(String(event.options.command || ''))
			},
		},
	}

	for (let preset = 1; preset <= 12; preset++) {
		actions[`preset_${preset}`] = simpleCommandAction.call(self, `Preset: Recall ${preset}`, `MCUPreset:${preset}`)
	}

	self.setActionDefinitions(actions)
}
