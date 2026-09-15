const inputChoices = [
	{ id: 'wifi', label: 'Network' },
	{ id: 'bluetooth', label: 'Bluetooth' },
	{ id: 'line-in', label: 'Line In' },
	{ id: 'optical', label: 'Optical' },
	{ id: 'udisk', label: 'USB' },
	{ id: 'co-axial', label: 'Coaxial' },
	{ id: 'hdmi', label: 'HDMI' },
	{ id: 'hdmi_arc', label: 'HDMI ARC' },
]

// Loop mode packs shuffle and repeat into a single value. The pairings below are
// taken verbatim from the WiiM HTTP API v1.2 documentation, which defines them
// identically for setPlayerCmd:loopmode:n and for getPlayerStatus.loop.
const loopModes = [
	{ id: '0', shuffle: false, repeat: 'all', label: 'Repeat All' },
	{ id: '1', shuffle: false, repeat: 'one', label: 'Repeat One' },
	{ id: '2', shuffle: true, repeat: 'all', label: 'Shuffle + Repeat All' },
	{ id: '3', shuffle: true, repeat: 'off', label: 'Shuffle' },
	{ id: '4', shuffle: false, repeat: 'off', label: 'Off' },
	{ id: '5', shuffle: true, repeat: 'one', label: 'Shuffle + Repeat One' },
]

// Order presented by the "Cycle Mode" action: Repeat One, Repeat All, Shuffle, Off.
const loopModeCycle = ['1', '0', '3', '4']

const loopModeChoices = loopModes.map(({ id, label }) => ({ id, label }))

function getLoopMode(id) {
	return loopModes.find((mode) => mode.id === String(id ?? ''))
}

// Resolve the combined value for a desired shuffle/repeat pair.
function findLoopModeId(shuffle, repeat) {
	return loopModes.find((mode) => mode.shuffle === shuffle && mode.repeat === repeat)?.id
}

const eqPresetChoices = [
	{ id: 'Flat', label: 'Flat' },
	{ id: 'Acoustic', label: 'Acoustic' },
	{ id: 'Bass Booster', label: 'Bass Booster' },
	{ id: 'Bass Reducer', label: 'Bass Reducer' },
	{ id: 'Classical', label: 'Classical' },
	{ id: 'Dance', label: 'Dance' },
	{ id: 'Deep', label: 'Deep' },
	{ id: 'Electronic', label: 'Electronic' },
	{ id: 'Game', label: 'Game' },
	{ id: 'Hip-Hop', label: 'Hip-Hop' },
	{ id: 'Jazz', label: 'Jazz' },
	{ id: 'Latin', label: 'Latin' },
	{ id: 'Loudness', label: 'Loudness' },
	{ id: 'Lounge', label: 'Lounge' },
	{ id: 'Movie', label: 'Movie' },
	{ id: 'Piano', label: 'Piano' },
	{ id: 'Pop', label: 'Pop' },
	{ id: 'R&B', label: 'R&B' },
	{ id: 'Rock', label: 'Rock' },
	{ id: 'Small Speakers', label: 'Small Speakers' },
	{ id: 'Spoken Word', label: 'Spoken Word' },
	{ id: 'Treble Booster', label: 'Treble Booster' },
	{ id: 'Treble Reducer', label: 'Treble Reducer' },
	{ id: 'Vocal Booster', label: 'Vocal Booster' },
]

const playbackStatusChoices = [
	{ id: 'play', label: 'Playing' },
	{ id: 'pause', label: 'Paused' },
	{ id: 'stop', label: 'Stopped' },
]

const sourceAliases = {
	wifi: ['wifi', 'network', 'net', '0', '1', '2', '10', '20'],
	bluetooth: ['bluetooth', 'bt', '41'],
	'line-in': ['line-in', 'line_in', 'line', 'linein', '40'],
	optical: ['optical', 'spdif', '43'],
	udisk: ['udisk', 'usb', 'usb disk', 'u-disk', '11', '42', '51'],
	'co-axial': ['co-axial', 'coaxial', 'coax'],
	hdmi: ['hdmi'],
	hdmi_arc: ['hdmi_arc', 'hdmi arc', 'arc'],
}

export {
	inputChoices,
	loopModes,
	loopModeCycle,
	loopModeChoices,
	getLoopMode,
	findLoopModeId,
	eqPresetChoices,
	playbackStatusChoices,
	sourceAliases,
}
