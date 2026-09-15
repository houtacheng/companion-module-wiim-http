import { combineRgb } from '@companion-module/base'

const COLORS = {
	black: combineRgb(0, 0, 0),
	white: combineRgb(255, 255, 255),
	green: combineRgb(0, 150, 70),
	yellow: combineRgb(245, 190, 0),
	red: combineRgb(210, 0, 0),
	blue: combineRgb(0, 90, 190),
	gray: combineRgb(45, 48, 52),
	dark: combineRgb(18, 20, 24),
}

function action(actionId, options = {}) {
	return { actionId, options }
}

function press(actionId, options = {}) {
	return [{ name: 'Press', down: [action(actionId, options)], up: [] }]
}

function encoderStep(down = [], rotateLeft = [], rotateRight = []) {
	return [
		{
			name: 'Encoder',
			down,
			up: [],
			rotate_left: rotateLeft,
			rotate_right: rotateRight,
		},
	]
}

function style(text, bgcolor = COLORS.gray, color = COLORS.white, size = '18') {
	return {
		text,
		size,
		color,
		bgcolor,
	}
}

function simplePreset(name, text, actionId, options = {}, feedbacks = [], keywords = []) {
	return {
		type: 'simple',
		name,
		keywords,
		style: style(text),
		steps: press(actionId, options),
		feedbacks,
	}
}

function playbackFeedback(status, bgcolor, color = COLORS.white) {
	return {
		feedbackId: 'playback_status',
		options: { status },
		style: { bgcolor, color },
	}
}

function loopFeedback(mode, bgcolor = COLORS.blue) {
	return {
		feedbackId: 'loop_mode',
		options: { mode },
		style: { bgcolor, color: COLORS.white },
	}
}

function muteFeedback() {
	return {
		feedbackId: 'mute',
		options: {},
		style: { bgcolor: COLORS.red, color: COLORS.white },
	}
}

function inputFeedback(input) {
	return {
		feedbackId: 'input',
		options: { input },
		style: { bgcolor: COLORS.blue, color: COLORS.white },
	}
}

export default function (self) {
	// Companion has no "this connection" placeholder for preset text: a literal
	// this: scope is left verbatim on the button and renders as $NA. Reference the
	// connection by its current label instead; configUpdated re-runs this after a
	// rename.
	const variable = (name) => `$(${self.label}:${name})`

	const presets = {
		play: simplePreset('Play', 'PLAY', 'play', {}, [playbackFeedback('play', COLORS.green)], ['transport']),
		pause: simplePreset(
			'Pause',
			'PAUSE',
			'pause',
			{},
			[playbackFeedback('pause', COLORS.yellow, COLORS.black)],
			['transport'],
		),
		stop: simplePreset('Stop', 'STOP', 'stop', {}, [playbackFeedback('stop', COLORS.red)], ['transport']),
		toggle_play: simplePreset(
			'Toggle Play/Pause',
			'PLAY\nPAUSE',
			'toggle_play',
			{},
			[playbackFeedback('play', COLORS.green), playbackFeedback('pause', COLORS.yellow, COLORS.black)],
			['transport'],
		),
		next: simplePreset('Next Track', 'NEXT', 'next', {}, [], ['transport']),
		previous: simplePreset('Previous Track', 'PREV', 'previous', {}, [], ['transport']),
		volume_up: simplePreset('Volume Up', 'VOL +', 'volume_up', { step: 5 }, [], ['volume']),
		volume_down: simplePreset('Volume Down', 'VOL -', 'volume_down', { step: 5 }, [], ['volume']),
		mute_toggle: simplePreset('Mute Toggle', 'MUTE', 'mute_toggle', {}, [muteFeedback()], ['volume']),
		encoder_volume: {
			type: 'simple',
			name: 'Encoder: Volume / Mute',
			keywords: ['encoder', 'volume', 'mute', 'rotary'],
			style: style(`ENC VOL\n${variable('volume')}`, COLORS.gray, COLORS.white, '14'),
			steps: encoderStep(
				[action('mute_toggle')],
				[action('volume_down', { step: 2 })],
				[action('volume_up', { step: 2 })],
			),
			feedbacks: [muteFeedback()],
		},
		repeat_one: simplePreset('Repeat One', 'RPT\nONE', 'repeat_one', {}, [loopFeedback('1')], ['repeat']),
		repeat_all: simplePreset('Repeat All', 'RPT\nALL', 'repeat_all', {}, [loopFeedback('0')], ['repeat']),
		repeat_off: simplePreset('Repeat Off', 'RPT\nOFF', 'repeat_off', {}, [loopFeedback('4', COLORS.gray)], ['repeat']),
		repeat_cycle: {
			type: 'simple',
			name: 'Cycle Repeat / Shuffle',
			keywords: ['repeat', 'shuffle', 'loop', 'cycle'],
			style: style(variable('loop_mode_text'), COLORS.gray, COLORS.white, '18'),
			steps: press('repeat_cycle'),
			feedbacks: [
				loopFeedback('1', COLORS.blue),
				loopFeedback('0', COLORS.blue),
				{ feedbackId: 'shuffle', options: {}, style: { bgcolor: COLORS.blue, color: COLORS.white } },
				loopFeedback('4', COLORS.gray),
			],
		},
		shuffle_on: simplePreset(
			'Shuffle On',
			'SHUFFLE',
			'shuffle_on',
			{},
			[{ feedbackId: 'shuffle', options: {}, style: { bgcolor: COLORS.blue, color: COLORS.white } }],
			['shuffle'],
		),
		source_network: simplePreset('Source Network', 'NET', 'switch_network', {}, [inputFeedback('wifi')], ['source']),
		source_bluetooth: simplePreset(
			'Source Bluetooth',
			'BT',
			'switch_bluetooth',
			{},
			[inputFeedback('bluetooth')],
			['source'],
		),
		source_optical: simplePreset('Source Optical', 'OPT', 'switch_optical', {}, [inputFeedback('optical')], ['source']),
		source_line_in: simplePreset(
			'Source Line In',
			'LINE',
			'switch_line_in',
			{},
			[inputFeedback('line-in')],
			['source'],
		),
		source_usb: simplePreset('Source USB', 'USB', 'switch_usb', {}, [inputFeedback('udisk')], ['source']),
		encoder_source: {
			type: 'simple',
			name: 'Encoder: Select Input Source',
			keywords: ['encoder', 'source', 'input', 'rotary'],
			style: style(`ENC SRC\n${variable('selected_source')}`, COLORS.gray, COLORS.white, '12'),
			steps: encoderStep([], [action('switch_source_previous')], [action('switch_source_next')]),
			feedbacks: [
				inputFeedback('wifi'),
				inputFeedback('bluetooth'),
				inputFeedback('optical'),
				inputFeedback('line-in'),
				inputFeedback('udisk'),
			],
		},
		random_media_file: simplePreset(
			'Random Media File',
			'RANDOM\nFILE',
			'play_random_media_file',
			{},
			[],
			['media', 'random'],
		),
		encoder_media_file: {
			type: 'simple',
			name: 'Encoder: Select / Play Media File',
			keywords: ['encoder', 'media', 'file', 'music', 'rotary'],
			style: style(`MUSIC\n${variable('selected_media_file')}`, COLORS.dark, COLORS.white, '11'),
			steps: encoderStep(
				[action('play_selected_media_file')],
				[action('select_media_previous')],
				[action('select_media_next')],
			),
			feedbacks: [playbackFeedback('play', COLORS.green), playbackFeedback('pause', COLORS.yellow, COLORS.black)],
		},
		now_playing: {
			type: 'simple',
			name: 'Now Playing',
			keywords: ['metadata', 'song', 'track'],
			style: style(variable('now_playing'), COLORS.dark, COLORS.white, '18'),
			steps: press('refresh_status'),
			feedbacks: [
				playbackFeedback('play', COLORS.green),
				playbackFeedback('pause', COLORS.yellow, COLORS.black),
				muteFeedback(),
			],
		},
	}

	for (let number = 1; number <= 12; number++) {
		presets[`preset_${number}`] = simplePreset(
			`Preset ${number}`,
			`PRESET\n${number}`,
			`preset_${number}`,
			{},
			[],
			['preset', String(number)],
		)
	}

	const sections = [
		{
			id: 'encoders',
			name: 'Encoder / Rotary',
			definitions: ['encoder_volume', 'encoder_source', 'encoder_media_file'],
		},
		{
			id: 'transport',
			name: 'Playback',
			definitions: ['play', 'pause', 'stop', 'toggle_play', 'previous', 'next', 'now_playing'],
		},
		{
			id: 'volume',
			name: 'Volume',
			definitions: ['volume_down', 'volume_up', 'mute_toggle'],
		},
		{
			id: 'repeat',
			name: 'Repeat / Shuffle',
			definitions: ['repeat_cycle', 'repeat_one', 'repeat_all', 'repeat_off', 'shuffle_on'],
		},
		{
			id: 'sources',
			name: 'Sources',
			definitions: ['source_network', 'source_bluetooth', 'source_optical', 'source_line_in', 'source_usb'],
		},
		{
			id: 'media',
			name: 'Media Library',
			definitions: ['random_media_file'],
		},
		{
			id: 'presets',
			name: 'Presets 1-12',
			definitions: Array.from({ length: 12 }, (_value, index) => `preset_${index + 1}`),
		},
	]

	self.setPresetDefinitions(sections, presets)
}
