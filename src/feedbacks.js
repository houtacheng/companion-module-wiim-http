import { combineRgb } from '@companion-module/base'
import { inputChoices, loopModeChoices, playbackStatusChoices, sourceAliases } from './choices.js'

function normalize(value) {
	return String(value || '').toLowerCase()
}

export default function (self) {
	self.setFeedbackDefinitions({
		connection: {
			type: 'boolean',
			name: 'Connection OK',
			description: 'Change style when the WiiM device is connected',
			defaultStyle: {
				bgcolor: combineRgb(0, 150, 70),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => self.state.connection === 'Connected',
		},

		playback_status: {
			type: 'boolean',
			name: 'Playback Status',
			description: 'Change style when the WiiM playback status matches',
			defaultStyle: {
				bgcolor: combineRgb(0, 180, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'status',
					type: 'dropdown',
					label: 'Status',
					default: 'play',
					choices: playbackStatusChoices,
				},
			],
			callback: (feedback) => self.getPlaybackText() === feedback.options.status,
		},

		mute: {
			type: 'boolean',
			name: 'Muted',
			description: 'Change style when muted',
			defaultStyle: {
				bgcolor: combineRgb(210, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => String(self.state.player.mute ?? self.state.status.mute ?? '0') === '1',
		},

		input: {
			type: 'boolean',
			name: 'Input/Source Active',
			description: 'Change style when the active input matches',
			defaultStyle: {
				bgcolor: combineRgb(0, 90, 180),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'input',
					type: 'dropdown',
					label: 'Input',
					default: 'wifi',
					choices: inputChoices,
				},
			],
			callback: (feedback) => {
				const input = normalize(feedback.options.input)
				const mode = normalize(self.state.player.mode ?? self.state.status.mode)
				const source = normalize(self.getSourceText())
				const aliases = sourceAliases[input] || [input]
				return aliases.includes(mode) || aliases.includes(source)
			},
		},

		loop_mode: {
			type: 'boolean',
			name: 'Repeat/Loop Mode',
			description: 'Change style when loop mode matches',
			defaultStyle: {
				bgcolor: combineRgb(0, 80, 220),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Loop mode',
					default: '1',
					choices: loopModeChoices,
				},
			],
			callback: (feedback) => String(self.state.player.loop ?? '') === String(feedback.options.mode),
		},

		shuffle: {
			type: 'boolean',
			name: 'Shuffle On',
			description: 'Change style when shuffle is active',
			defaultStyle: {
				bgcolor: combineRgb(0, 80, 220),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => self.isShuffleMode(),
		},

		volume_level: {
			type: 'boolean',
			name: 'Volume Level',
			description: 'Change style when volume is above or below a threshold',
			defaultStyle: {
				bgcolor: combineRgb(220, 120, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'comparison',
					type: 'dropdown',
					label: 'Comparison',
					default: 'above',
					choices: [
						{ id: 'above', label: 'At or above' },
						{ id: 'below', label: 'At or below' },
						{ id: 'equal', label: 'Equal to' },
					],
				},
				{
					id: 'volume',
					type: 'number',
					label: 'Volume',
					default: 50,
					min: 0,
					max: 100,
					step: 1,
				},
			],
			callback: (feedback) => {
				const current = Number(self.state.player.vol ?? self.state.status.vol ?? 0)
				const target = Number(feedback.options.volume)
				if (feedback.options.comparison === 'below') return current <= target
				if (feedback.options.comparison === 'equal') return current === target
				return current >= target
			},
		},
	})
}
