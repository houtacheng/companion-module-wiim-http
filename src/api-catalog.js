// Generated from cvdlinden/wiim-httpapi openapi.json on 2026-07-15.
// Source: https://github.com/cvdlinden/wiim-httpapi

const documentedEndpoints = [
	{
		id: 'setTimeSync',
		tag: 'Alarm clock',
		summary: 'Get network time',
		command: 'timeSync:{YYYYMMDDHHMMSS}',
		params: [
			{
				name: 'YYYYMMDDHHMMSS',
				required: true,
			},
		],
	},
	{
		id: 'getAlarmClock',
		tag: 'Alarm clock',
		summary: 'getAlarmClock',
		command: 'getAlarmClock:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setAlarmClock',
		tag: 'Alarm clock',
		summary: 'Set Alarm',
		command: 'setAlarmClock:{n}:{trig}:{op}:{time}:{day}:{url}',
		params: [
			{
				name: 'n',
				required: true,
			},
			{
				name: 'trig',
				required: true,
			},
			{
				name: 'op',
				required: true,
			},
			{
				name: 'time',
				required: true,
			},
			{
				name: 'day',
				required: true,
			},
			{
				name: 'url',
				required: true,
			},
		],
	},
	{
		id: 'stopAlarmClock',
		tag: 'Alarm clock',
		summary: 'Stop the current alarm',
		command: 'alarmStop',
		params: [],
	},
	{
		id: 'alexaEnableBetaId',
		tag: 'Alexa',
		summary: 'Enable Alexa Beta ID',
		command: 'alexaEnableBetaId:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'getAlexaCountry',
		tag: 'Alexa',
		summary: 'Get Alexa Country',
		command: 'getAlexaCountry',
		params: [],
	},
	{
		id: 'alexaLanguageListGet',
		tag: 'Alexa',
		summary: 'Get Alexa Language List',
		command: 'alexaLanguageListGet',
		params: [],
	},
	{
		id: 'alexaGetLanguage',
		tag: 'Alexa',
		summary: 'Get Alexa Language',
		command: 'alexaGetLanguage',
		params: [],
	},
	{
		id: 'getAlexaProfile',
		tag: 'Alexa',
		summary: 'Get Alexa Profile',
		command: 'getAlexaProfile',
		params: [],
	},
	{
		id: 'getAvsDevInfo',
		tag: 'Alexa',
		summary: 'Get Alexa Voice Service Device Info',
		command: 'getAvsDevInfo',
		params: [],
	},
	{
		id: 'getAvsMusicHDEnable',
		tag: 'Alexa',
		summary: 'Get Alexa Voice Service Music HD enable status',
		command: 'getAvsMusicHDEnable',
		params: [],
	},
	{
		id: 'alexaLogOut',
		tag: 'Alexa',
		summary: 'Log out of Alexa',
		command: 'alexaLogOut',
		params: [],
	},
	{
		id: 'setAlexaCountry',
		tag: 'Alexa',
		summary: 'Set Alexa Country',
		command: 'setAlexaCountry:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'alexaSetLanguage',
		tag: 'Alexa',
		summary: 'Set Alexa Language',
		command: 'alexaSetLanguage:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setAvsMusicHDEnable',
		tag: 'Alexa',
		summary: 'Set Alexa Voice Service Music HD enable',
		command: 'setAvsMusicHDEnable:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'enableAmazonAtmos',
		tag: 'Amazon music',
		summary: 'Enable Amazon Atmos',
		command: 'EnableAmazonAtmos:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'enableAmazonHD',
		tag: 'Amazon music',
		summary: 'Enable Amazon HD',
		command: 'EnableAmazonHD:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'getAmazonHD',
		tag: 'Amazon music',
		summary: 'Get Amazon HD status',
		command: 'GetAmazonHD',
		params: [],
	},
	{
		id: 'getAmazonConfig',
		tag: 'Amazon music',
		summary: 'Get Amazon Music configuration',
		command: 'getAmazonConfig',
		params: [],
	},
	{
		id: 'setAmazonAccessToken',
		tag: 'Amazon music',
		summary: 'Set Amazon access token',
		command: 'setAmazonAccessToken:{str}:{str2}',
		params: [
			{
				name: 'str',
				required: true,
			},
			{
				name: 'str2',
				required: true,
			},
		],
	},
	{
		id: 'setAmazonMusicParams',
		tag: 'Amazon music',
		summary: 'Set Amazon Music parameters',
		command: 'setAmazonMusicParams:code={str1}:redirect_uri={str2}:client_id={str3}:code_verifier={str4}',
		params: [
			{
				name: 'str1',
				required: true,
			},
			{
				name: 'str2',
				required: true,
			},
			{
				name: 'str3',
				required: true,
			},
			{
				name: 'str4',
				required: true,
			},
		],
	},
	{
		id: 'setPrimeToken',
		tag: 'Amazon music',
		summary: 'Set Amazon Prime token',
		command: 'setPrimeToken:username={str1}:token={str2}:refreshToken={str3}:expires_in={n}',
		params: [
			{
				name: 'str1',
				required: true,
			},
			{
				name: 'str2',
				required: true,
			},
			{
				name: 'str3',
				required: true,
			},
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'getNewAudioOutputHardwareMode',
		tag: 'Audio output control',
		summary: 'Get audio output mode',
		command: 'getNewAudioOutputHardwareMode',
		params: [],
	},
	{
		id: 'getFadeFeature',
		tag: 'Audio output control',
		summary: 'Get fade in/out feature status',
		command: 'GetFadeFeature',
		params: [],
	},
	{
		id: 'getChannelBalance',
		tag: 'Audio output control',
		summary: 'Get left/right channel balance',
		command: 'getChannelBalance',
		params: [],
	},
	{
		id: 'getSpdifOutSwitchDelayMs',
		tag: 'Audio output control',
		summary: 'Get SPDIF sample rate switch latency',
		command: 'getSpdifOutSwitchDelayMs',
		params: [],
	},
	{
		id: 'setAudioOutputHardwareMode',
		tag: 'Audio output control',
		summary: 'Set audio output mode',
		command: 'setAudioOutputHardwareMode:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setFadeFeature',
		tag: 'Audio output control',
		summary: 'Set fade in/out feature',
		command: 'SetFadeFeature:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setChannelBalance',
		tag: 'Audio output control',
		summary: 'Set left/right channel balance',
		command: 'setChannelBalance:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setSpdifOutSwitchDelayMs',
		tag: 'Audio output control',
		summary: 'Set SPDIF sample rate switch latency',
		command: 'setSpdifOutSwitchDelayMs:{Delay}',
		params: [
			{
				name: 'Delay',
				required: true,
			},
		],
	},
	{
		id: 'clearBtDiscoveryResult',
		tag: 'Bluetooth',
		summary: 'Clear Bluetooth device scan result',
		command: 'clearbtdiscoveryresult',
		params: [],
	},
	{
		id: 'connectBtA2dpsynk',
		tag: 'Bluetooth',
		summary: 'Connect to a Bluetooth device',
		command: 'connectbta2dpsynk:{BT_MAC_ADDRESS}',
		params: [
			{
				name: 'BT_MAC_ADDRESS',
				required: true,
			},
		],
	},
	{
		id: 'connectbta2dpsource',
		tag: 'Bluetooth',
		summary: 'Connect to a Bluetooth source device',
		command: 'connectbta2dpsource:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'delbthistory',
		tag: 'Bluetooth',
		summary: 'Delete Bluetooth history',
		command: 'delbthistory:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'btdisconnectall',
		tag: 'Bluetooth',
		summary: 'Disconnect all Bluetooth devices',
		command: 'btdisconnectall',
		params: [],
	},
	{
		id: 'disconnectBtA2dpsynk',
		tag: 'Bluetooth',
		summary: 'Disconnect from a Bluetooth device',
		command: 'disconnectbta2dpsynk:{BT_MAC_ADDRESS}',
		params: [
			{
				name: 'BT_MAC_ADDRESS',
				required: true,
			},
		],
	},
	{
		id: 'btavkenterpair',
		tag: 'Bluetooth',
		summary: 'Enter Bluetooth pairing mode',
		command: 'btavkenterpair',
		params: [],
	},
	{
		id: 'getBleDiscoveryResult',
		tag: 'Bluetooth',
		summary: 'Get BLE discovery result',
		command: 'getblediscoveryresult',
		params: [],
	},
	{
		id: 'getBleHidStatus',
		tag: 'Bluetooth',
		summary: 'Get BLE HID status',
		command: 'getblehidstatus',
		params: [],
	},
	{
		id: 'getBtDiscoveryResult',
		tag: 'Bluetooth',
		summary: 'Get Bluetooth device scan result',
		command: 'getbtdiscoveryresult',
		params: [],
	},
	{
		id: 'getbtPairDevStat',
		tag: 'Bluetooth',
		summary: 'Get Bluetooth pair device status',
		command: 'getbtPairDevStat',
		params: [],
	},
	{
		id: 'getBtPairStatus',
		tag: 'Bluetooth',
		summary: 'Get Bluetooth pairing status',
		command: 'getbtpairstatus',
		params: [],
	},
	{
		id: 'getbtstatus',
		tag: 'Bluetooth',
		summary: 'Get Bluetooth status',
		command: 'getbtstatus',
		params: [],
	},
	{
		id: 'getBtHistory',
		tag: 'Bluetooth',
		summary: 'Get paired Bluetooth devices',
		command: 'getbthistory',
		params: [],
	},
	{
		id: 'blehidpair',
		tag: 'Bluetooth',
		summary: 'Pair with a BLE HID device',
		command: 'blehidpair:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'btrecovery',
		tag: 'Bluetooth',
		summary: 'Recovery Bluetooth',
		command: 'btrecovery',
		params: [],
	},
	{
		id: 'blehidremoveall',
		tag: 'Bluetooth',
		summary: 'Remove all paired BLE HID devices',
		command: 'blehidremoveall',
		params: [],
	},
	{
		id: 'startBleScan',
		tag: 'Bluetooth',
		summary: 'Start BLE scan',
		command: 'startblescan:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'startBtDiscovery',
		tag: 'Bluetooth',
		summary: 'Start Bluetooth device scan',
		command: 'startbtdiscovery:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'startbtserver',
		tag: 'Bluetooth',
		summary: 'Start Bluetooth server',
		command: 'startbtserver',
		params: [],
	},
	{
		id: 'startgetbtPairDevStat',
		tag: 'Bluetooth',
		summary: 'Start getting Bluetooth pair device status',
		command: 'startgetbtPairDevStat',
		params: [],
	},
	{
		id: 'stopbtdiscovery',
		tag: 'Bluetooth',
		summary: 'Stop Bluetooth discovery',
		command: 'stopbtdiscovery',
		params: [],
	},
	{
		id: 'stopbtserver',
		tag: 'Bluetooth',
		summary: 'Stop Bluetooth server',
		command: 'stopbtserver:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'noSendMoreDeviceEvent',
		tag: 'Device control',
		summary: 'Disable sending more device events',
		command: 'noSendMoreDeviceEvent:1',
		params: [],
	},
	{
		id: 'buttonEnableGet',
		tag: 'Device control',
		summary: 'Get button enable status',
		command: 'Button_Enable_GET',
		params: [],
	},
	{
		id: 'getDeviceNameChangeable',
		tag: 'Device control',
		summary: 'Get device name changeable status',
		command: 'getDeviceNameChangeable',
		params: [],
	},
	{
		id: 'getFirmwareVersion',
		tag: 'Device control',
		summary: 'Get firmware version',
		command: 'getFirmwareVersion',
		params: [],
	},
	{
		id: 'getHwErrorInfo',
		tag: 'Device control',
		summary: 'Get hardware error information',
		command: 'getHwErrorInfo',
		params: [],
	},
	{
		id: 'getsyslog',
		tag: 'Device control',
		summary: 'Get system log',
		command: 'getsyslog',
		params: [],
	},
	{
		id: 'getShutdownTimer',
		tag: 'Device control',
		summary: 'Get the shutdown timer',
		command: 'getShutdown',
		params: [],
	},
	{
		id: 'rebootDevice',
		tag: 'Device control',
		summary: 'Reboot',
		command: 'reboot',
		params: [],
	},
	{
		id: 'restoreToDefault',
		tag: 'Device control',
		summary: 'Restoring the factory setting',
		command: 'restoreToDefault',
		params: [],
	},
	{
		id: 'setHexDeviceName',
		tag: 'Device control',
		summary: 'Set hex device name',
		command: 'setHexDeviceName:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setDeviceName',
		tag: 'Device control',
		summary: 'Setting the name of device',
		command: 'setDeviceName:{name}',
		params: [
			{
				name: 'name',
				required: true,
			},
		],
	},
	{
		id: 'setShutdownTimer',
		tag: 'Device control',
		summary: 'Shutdown',
		command: 'setShutdown:{sec}',
		params: [
			{
				name: 'sec',
				required: true,
			},
		],
	},
	{
		id: 'setLedSwitch',
		tag: 'Device control',
		summary: 'Turn on/off status LED ("Status Light" option from app)',
		command: 'LED_SWITCH_SET:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setTouchControls',
		tag: 'Device control',
		summary: 'Turn on/off touch controls',
		command: 'Button_Enable_SET:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'getDebugInfo',
		tag: 'Device information',
		summary: 'Get device debug information',
		command: 'getDebugInfo',
		params: [],
	},
	{
		id: 'getStatusEx',
		tag: 'Device information',
		summary: 'Get device information',
		command: 'getStatusEx',
		params: [],
	},
	{
		id: 'eqChangeFX',
		tag: 'Equalizer',
		summary: 'Change FX',
		command: 'EQChangeFX:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'eqChangeSourceFX',
		tag: 'Equalizer',
		summary: 'Change source FX',
		command: 'EQChangeSourceFX:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'getEQList',
		tag: 'Equalizer',
		summary: 'Check all the possible EQ settings',
		command: 'EQGetList',
		params: [],
	},
	{
		id: 'getEQStat',
		tag: 'Equalizer',
		summary: 'Check if the EQ is ON or OFF',
		command: 'EQGetStat',
		params: [],
	},
	{
		id: 'eqv2Delete',
		tag: 'Equalizer',
		summary: 'Delete EQ v2 settings',
		command: 'EQv2Delete:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'eqDisable',
		tag: 'Equalizer',
		summary: 'Equalizer disable',
		command: 'EQDisable',
		params: [],
	},
	{
		id: 'eqEnable',
		tag: 'Equalizer',
		summary: 'Equalizer enable',
		command: 'EQEnable',
		params: [],
	},
	{
		id: 'eqv2GetList',
		tag: 'Equalizer',
		summary: 'Get EQ v2 list',
		command: 'EQv2GetList:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'eqGetLV2BandEx',
		tag: 'Equalizer',
		summary: 'Get LV2 band with extra parameters',
		command: 'EQGetLV2BandEx:{pluginURI}',
		params: [
			{
				name: 'pluginURI',
				required: true,
			},
		],
	},
	{
		id: 'eqGetLV2Band',
		tag: 'Equalizer',
		summary: 'Get LV2 band',
		command: 'EQGetLV2Band:{pluginURI}',
		params: [
			{
				name: 'pluginURI',
				required: true,
			},
		],
	},
	{
		id: 'eqGetLV2SourceBandEx',
		tag: 'Equalizer',
		summary: 'Get LV2 source band with extra parameters',
		command: 'EQGetLV2SourceBandEx:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'eqGetLV2SourceBand',
		tag: 'Equalizer',
		summary: 'Get LV2 source band',
		command: 'EQGetLV2SourceBand:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'eqv2GetNewList',
		tag: 'Equalizer',
		summary: 'Get new EQ v2 list',
		command: 'EQv2GetNewList:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'getEQBand',
		tag: 'Equalizer',
		summary: 'Get the current EQ band',
		command: 'EQGetBand',
		params: [],
	},
	{
		id: 'eqGetSourceModes',
		tag: 'Equalizer',
		summary: 'Get the EQ source modes',
		command: 'EQGetSourceModes',
		params: [],
	},
	{
		id: 'eqv2Load',
		tag: 'Equalizer',
		summary: 'Load EQ v2 settings',
		command: 'EQv2Load:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'eqv2Rename',
		tag: 'Equalizer',
		summary: 'Rename EQ v2 settings',
		command: 'EQv2Rename:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'eqSave',
		tag: 'Equalizer',
		summary: 'Save EQ settings',
		command: 'EQSave:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'eqSourceSave',
		tag: 'Equalizer',
		summary: 'Save EQ source settings',
		command: 'EQSourceSave:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'eqSaveCustom',
		tag: 'Equalizer',
		summary: 'Save the current EQ setting as "Custom"',
		command: 'EQSave:Custom',
		params: [],
	},
	{
		id: 'eqSetBand',
		tag: 'Equalizer',
		summary: 'Set (a specific) band of the 10-band EQ',
		command: 'EQSetBand:{"EQBand":[{"index":{n1},"param_name":{str},"value":{n2}}]}',
		params: [
			{
				name: 'n1',
				required: true,
			},
			{
				name: 'str',
				required: true,
			},
			{
				name: 'n2',
				required: true,
			},
			{
				name: '"EQBand":[{"index":{n1',
				required: true,
			},
		],
	},
	{
		id: 'eqSetBass',
		tag: 'Equalizer',
		summary: 'Set Bass level',
		command: 'EQSet:Bass:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'eqSetChannelMode',
		tag: 'Equalizer',
		summary: 'Set channel mode',
		command: 'EQSetChannelMode:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'eqSetLV2Band',
		tag: 'Equalizer',
		summary: 'Set LV2 band',
		command: 'EQSetLV2Band:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'eqSetLV2SourceBand',
		tag: 'Equalizer',
		summary: 'Set LV2 source band',
		command: 'EQSetLV2SourceBand:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'loadEQByName',
		tag: 'Equalizer',
		summary: 'Set the specific EQ with name',
		command: 'EQLoad:{name}',
		params: [
			{
				name: 'name',
				required: true,
			},
		],
	},
	{
		id: 'eqSetTreble',
		tag: 'Equalizer',
		summary: 'Set Treble level',
		command: 'EQSet:Treble:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'eqv2SourceLoad',
		tag: 'Equalizer',
		summary: 'Source load EQ v2 settings',
		command: 'EQv2SourceLoad:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'eqSourceOff',
		tag: 'Equalizer',
		summary: 'Turn off EQ source',
		command: 'EQSourceOff:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setEQOff',
		tag: 'Equalizer',
		summary: 'Turn off the EQ setting',
		command: 'EQOff',
		params: [],
	},
	{
		id: 'setEQOn',
		tag: 'Equalizer',
		summary: 'Turn on the EQ',
		command: 'EQOn',
		params: [],
	},
	{
		id: 'genericCommand',
		tag: 'Generic',
		summary: 'Generic command',
		command: '{command}',
		params: [
			{
				name: 'command',
				required: true,
			},
		],
	},
	{
		id: 'multiroomUngroup',
		tag: 'Multiroom',
		summary: 'Disabling Multi-Room',
		command: 'multiroom:Ungroup',
		params: [],
	},
	{
		id: 'setPlayerCmdSlaveMute',
		tag: 'Multiroom',
		summary: 'General activation Mute',
		command: 'setPlayerCmd:slave_mute:mute',
		params: [],
	},
	{
		id: 'setPlayerCmdSlaveUnmute',
		tag: 'Multiroom',
		summary: 'General Mute Disabling',
		command: 'setPlayerCmd:slave_mute:unmute',
		params: [],
	},
	{
		id: 'setPlayerCmdSlaveVolume',
		tag: 'Multiroom',
		summary: 'General Volume Adjustment',
		command: 'setPlayerCmd:slave_vol:{volume}',
		params: [
			{
				name: 'volume',
				required: true,
			},
		],
	},
	{
		id: 'multiroomGetSlaveList',
		tag: 'Multiroom',
		summary: 'Get a list of LinkPlay available',
		command: 'multiroom:getSlaveList',
		params: [],
	},
	{
		id: 'getMRMSubLPF',
		tag: 'Multiroom',
		summary: 'Get multi-room sub LPF',
		command: 'getMRMSubLPF:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'getSubLPF',
		tag: 'Multiroom',
		summary: 'Get subwoofer LPF',
		command: 'getSubLPF',
		params: [],
	},
	{
		id: 'multiroomGetNameGroupList',
		tag: 'Multiroom',
		summary: 'Get the list of group names in multi-room mode',
		command: 'multiroom:getnamegrouplist',
		params: [],
	},
	{
		id: 'multiroomConfigGetRealtimeCacheLimit',
		tag: 'Multiroom',
		summary: 'Get the real-time cache limit',
		command: 'multiroom:ConfigGet:realtime_cache_limit',
		params: [],
	},
	{
		id: 'multiroomSlaveMask',
		tag: 'Multiroom',
		summary: 'Hide the IP address of a LinkPlay',
		command: 'multiroom:SlaveMask:{ip}',
		params: [
			{
				name: 'ip',
				required: true,
			},
		],
	},
	{
		id: 'multiroomSlaveSetDeviceName',
		tag: 'Multiroom',
		summary: 'Individual definition of the device Name',
		command: 'multiroom:SlaveSetDeviceName:{ip}:{s}',
		params: [
			{
				name: 'ip',
				required: true,
			},
			{
				name: 's',
				required: true,
			},
		],
	},
	{
		id: 'multiroomSlaveChannel',
		tag: 'Multiroom',
		summary: 'Individual management of the audio signal Right / left',
		command: 'multiroom:SlaveChannel:{ip}:{channel}',
		params: [
			{
				name: 'ip',
				required: true,
			},
			{
				name: 'channel',
				required: true,
			},
		],
	},
	{
		id: 'multiroomSlaveMute',
		tag: 'Multiroom',
		summary: 'Individual muting',
		command: 'multiroom:SlaveMute:{ip}:{mute}',
		params: [
			{
				name: 'ip',
				required: true,
			},
			{
				name: 'mute',
				required: true,
			},
		],
	},
	{
		id: 'multiroomSlaveVolume',
		tag: 'Multiroom',
		summary: 'Individual volume adjustment',
		command: 'multiroom:SlaveVolume:{ip}:{volume}',
		params: [
			{
				name: 'ip',
				required: true,
			},
			{
				name: 'volume',
				required: true,
			},
		],
	},
	{
		id: 'multiroomJoinGroup',
		tag: 'Multiroom',
		summary: 'Joining a multi-room group',
		command: 'multiroom:JoinGroup:IP={IP}:uuid={uuid}',
		params: [
			{
				name: 'IP',
				required: true,
			},
			{
				name: 'uuid',
				required: true,
			},
		],
	},
	{
		id: 'multiroomLeaveGroup',
		tag: 'Multiroom',
		summary: 'Leaving the multi-room mode',
		command: 'multiroom:LeaveGroup',
		params: [],
	},
	{
		id: 'multiroomConfigGetLeadtime',
		tag: 'Multiroom',
		summary: 'Multi-room get lead time',
		command: 'multiroom:ConfigGet:leadtime',
		params: [],
	},
	{
		id: 'multiroomSlaveDeviceName',
		tag: 'Multiroom',
		summary: 'Multi-room get slave device name',
		command: 'multiroom:SlaveDeviceName:{ip}:{str}',
		params: [
			{
				name: 'ip',
				required: true,
			},
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'multiroomConfigSetLeadtime',
		tag: 'Multiroom',
		summary: 'Multi-room set lead time',
		command: 'multiroom:ConfigSet:leadtime:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'multiroomSubwooferForget',
		tag: 'Multiroom',
		summary: 'Multi-room subwoofer forget',
		command: 'multiroom:subwooferForget:{"uuid":"{uuid}"}',
		params: [
			{
				name: 'uuid',
				required: true,
			},
			{
				name: '"uuid":"{uuid',
				required: true,
			},
		],
	},
	{
		id: 'multiroomSubwooferGetPairInfo',
		tag: 'Multiroom',
		summary: 'Multi-room subwoofer get pair info',
		command: 'multiroom:subwooferGetPairInfo',
		params: [],
	},
	{
		id: 'multiroomSubwooferPair',
		tag: 'Multiroom',
		summary: 'Multi-room subwoofer pair',
		command: 'multiroom:subwooferPair:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setPlayerCmdSlaveChannel',
		tag: 'Multiroom',
		summary: 'Overal management of the audio signal Right / left',
		command: 'setPlayerCmd:{slave_channel}:{channel}',
		params: [
			{
				name: 'slave_channel',
				required: true,
			},
			{
				name: 'channel',
				required: true,
			},
		],
	},
	{
		id: 'multiroomSlaveUnMask',
		tag: 'Multiroom',
		summary: 'Releasing a Multi-Room Mode',
		command: 'multiroom:SlaveUnMask:{ip}',
		params: [
			{
				name: 'ip',
				required: true,
			},
		],
	},
	{
		id: 'multiroomSlaveKickout',
		tag: 'Multiroom',
		summary: 'Removing a LinkPlay from the multi-room',
		command: 'multiroom:SlaveKickout:{ip}',
		params: [
			{
				name: 'ip',
				required: true,
			},
		],
	},
	{
		id: 'setMRMSubLPF',
		tag: 'Multiroom',
		summary: 'Set multiroom subwoofer LPF',
		command: 'setMRMSubLPF:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setSubLPF',
		tag: 'Multiroom',
		summary: 'Set subwoofer LPF',
		command: 'setSubLPF:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'multiroomConfigSetRealtimeCacheLimit',
		tag: 'Multiroom',
		summary: 'Set the real-time cache limit',
		command: 'multiroom:ConfigSet:realtime_cache_limit:{value}',
		params: [
			{
				name: 'value',
				required: true,
			},
		],
	},
	{
		id: 'multiroomSlaveStartWPS',
		tag: 'Multiroom',
		summary: 'Start WPS on a LinkPlay device',
		command: 'multiroom:SlaveStartWPS:{ip}',
		params: [
			{
				name: 'ip',
				required: true,
			},
		],
	},
	{
		id: 'setSSID',
		tag: 'Network',
		summary: 'Change the SSID name of the device',
		command: 'setSSID:{value}',
		params: [
			{
				name: 'value',
				required: true,
			},
		],
	},
	{
		id: 'getIPV6Enable',
		tag: 'Network',
		summary: 'Get IPV6 enable status',
		command: 'getIPV6Enable',
		params: [],
	},
	{
		id: 'getNetworkHealth',
		tag: 'Network',
		summary: 'Get network health status',
		command: 'getNetworkHealth',
		params: [],
	},
	{
		id: 'wlanGetConnectState',
		tag: 'Network',
		summary: 'Get the connection status',
		command: 'wlanGetConnectState',
		params: [],
	},
	{
		id: 'getNetwork',
		tag: 'Network',
		summary: 'Get the network configuration',
		command: 'getNetwork',
		params: [],
	},
	{
		id: 'getNetworkPreferDNS',
		tag: 'Network',
		summary: 'Get the preferred DNS server',
		command: 'getNetworkPreferDNS',
		params: [],
	},
	{
		id: 'getStaticIpInfo',
		tag: 'Network',
		summary: 'Get the static IP information',
		command: 'getStaticIpInfo',
		params: [],
	},
	{
		id: 'getWlanBandConfig',
		tag: 'Network',
		summary: 'Get the WLAN band configuration',
		command: 'getWlanBandConfig',
		params: [],
	},
	{
		id: 'getWlanRoamConfig',
		tag: 'Network',
		summary: 'Get the WLAN roaming configuration',
		command: 'getWlanRoamConfig',
		params: [],
	},
	{
		id: 'wlanGetApFullList',
		tag: 'Network',
		summary: 'Get WLAN AP list',
		command: 'wlanGetApFullList',
		params: [],
	},
	{
		id: 'wlanGetApListEx',
		tag: 'Network',
		summary: 'Get WLAN AP list',
		command: 'wlanGetApListEx',
		params: [],
	},
	{
		id: 'getWlanConnectDisableStatus',
		tag: 'Network',
		summary: 'Get WLAN connect disable status',
		command: 'getWlanConnectDisableStatus',
		params: [],
	},
	{
		id: 'getStaticIP',
		tag: 'Network',
		summary: 'Query networking status',
		command: 'getStaticIP',
		params: [],
	},
	{
		id: 'setHideSSID',
		tag: 'Network',
		summary: 'Set hide SSID',
		command: 'setHideSSID:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setIPV6Enable',
		tag: 'Network',
		summary: 'Set IPv6 enable',
		command: 'setIPV6Enable:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setNetworkPreferDNS',
		tag: 'Network',
		summary: 'Set network preferred DNS',
		command: 'setNetworkPreferDNS:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setNetworkExAES',
		tag: 'Network',
		summary: 'Set network with AES encryption',
		command: 'setNetworkExAES:{n}:{password}',
		params: [
			{
				name: 'n',
				required: true,
			},
			{
				name: 'password',
				required: true,
			},
		],
	},
	{
		id: 'setEthStaticIp',
		tag: 'Network',
		summary: 'Set static Ethernet network config',
		command: 'setEthStaticIp:{IpAddress}:{GatewayIp}:{DnsServerIp}',
		params: [
			{
				name: 'IpAddress',
				required: true,
			},
			{
				name: 'GatewayIp',
				required: true,
			},
			{
				name: 'DnsServerIp',
				required: true,
			},
		],
	},
	{
		id: 'setWlanStaticIp',
		tag: 'Network',
		summary: 'Set static WLAN network config',
		command: 'setWlanStaticIp:{IpAddress}:{GatewayIp}:{DnsServerIp}',
		params: [
			{
				name: 'IpAddress',
				required: true,
			},
			{
				name: 'GatewayIp',
				required: true,
			},
			{
				name: 'DnsServerIp',
				required: true,
			},
		],
	},
	{
		id: 'setWlanBandConfig',
		tag: 'Network',
		summary: 'Set WLAN band configuration',
		command: 'setWlanBandConfig:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setWlanConnectDisable',
		tag: 'Network',
		summary: 'Set WLAN connect disable',
		command: 'setWlanConnectDisable:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setWlanRoamConfig',
		tag: 'Network',
		summary: 'Set WLAN roam configuration',
		command: 'setWlanRoamConfig:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setNetwork',
		tag: 'Network',
		summary: 'Setting the password WIFI',
		command: 'setNetwork:{n}:{password}',
		params: [
			{
				name: 'n',
				required: true,
			},
			{
				name: 'password',
				required: true,
			},
		],
	},
	{
		id: 'setPowerWifiDown',
		tag: 'Network',
		summary: 'Stop WIFI signal',
		command: 'setPowerWifiDown',
		params: [],
	},
	{
		id: 'wlanConnectHideApEx',
		tag: 'Network',
		summary: 'WLAN connect to hidden AP with extra parameters',
		command: 'wlanConnectHideApEx:{str1}:{str2}:{str3}',
		params: [
			{
				name: 'str1',
				required: true,
			},
			{
				name: 'str2',
				required: true,
			},
			{
				name: 'str3',
				required: true,
			},
		],
	},
	{
		id: 'wlanConnectHideAp',
		tag: 'Network',
		summary: 'WLAN connect to hidden AP',
		command: 'wlanConnectHideAp:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'wlanSwitchConnectedAp',
		tag: 'Network',
		summary: 'Wlan switch connected AP',
		command: 'wlanSwitchConnectedAp:ssid={ssid}:bssid={bssid}',
		params: [
			{
				name: 'ssid',
				required: true,
			},
			{
				name: 'bssid',
				required: true,
			},
		],
	},
	{
		id: 'wpscannel',
		tag: 'Network',
		summary: 'WPS Channel',
		command: 'wpscannel',
		params: [],
	},
	{
		id: 'wpsclientmode',
		tag: 'Network',
		summary: 'WPS Client Mode',
		command: 'wpsclientmode',
		params: [],
	},
	{
		id: 'wpsservermode',
		tag: 'Network',
		summary: 'WPS Server Mode',
		command: 'wpsservermode',
		params: [],
	},
	{
		id: 'alertGet',
		tag: 'Other',
		summary: 'Alert get',
		command: 'alertget',
		params: [],
	},
	{
		id: 'audioCastGetSpeakerList',
		tag: 'Other',
		summary: 'Audio Cast get speaker list',
		command: 'audio_cast:get_speaker_list',
		params: [],
	},
	{
		id: 'audioCastSpeakerGetTranscodeBufferTime',
		tag: 'Other',
		summary: 'Audio Cast get speaker transcode buffer time',
		command: 'audio_cast:speaker_get_transcode_buffer_time',
		params: [],
	},
	{
		id: 'audioCastSpeakerGetTranscodeProfile',
		tag: 'Other',
		summary: 'Audio Cast get speaker transcode profile',
		command: 'audio_cast:speaker_get_transcode_profile',
		params: [],
	},
	{
		id: 'audioCastScanSpeaker',
		tag: 'Other',
		summary: 'Audio Cast scan speaker',
		command: 'audio_cast:scan_speaker',
		params: [],
	},
	{
		id: 'audioCastSpeakerSetPassword',
		tag: 'Other',
		summary: 'Audio Cast set speaker password',
		command: 'audio_cast:speaker_set_password:{str1}:{str2}',
		params: [
			{
				name: 'str1',
				required: true,
			},
			{
				name: 'str2',
				required: true,
			},
		],
	},
	{
		id: 'audioCastSpeakerSetVolume',
		tag: 'Other',
		summary: 'Audio Cast set speaker volume',
		command: 'audio_cast:speaker_set_volume:{str}:{volume}',
		params: [
			{
				name: 'str',
				required: true,
			},
			{
				name: 'volume',
				required: true,
			},
		],
	},
	{
		id: 'autoPlaySet',
		tag: 'Other',
		summary: 'Auto play setting',
		command: 'AutoPlaySet',
		params: [],
	},
	{
		id: 'checkAccessPIN',
		tag: 'Other',
		summary: 'Check access PIN',
		command: 'checkAccessPIN',
		params: [],
	},
	{
		id: 'createRoutine',
		tag: 'Other',
		summary: 'Create routine',
		command: 'createRoutine:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'castDisable',
		tag: 'Other',
		summary: 'Disable Cast',
		command: 'Cast:Disable',
		params: [],
	},
	{
		id: 'disableLowPriorityPrompt',
		tag: 'Other',
		summary: 'Disable low priority prompt',
		command: 'disableLowPriorityPrompt:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'castDisableUsageReport',
		tag: 'Other',
		summary: 'Disable usage report for Cast',
		command: 'Cast:DisableUsageReport',
		params: [],
	},
	{
		id: 'easyLinkResponseStop',
		tag: 'Other',
		summary: 'EasyLink response stop',
		command: 'EasyLinkResponseStop',
		params: [],
	},
	{
		id: 'enableCast',
		tag: 'Other',
		summary: 'Enable Cast',
		command: 'Cast:EnableCast',
		params: [],
	},
	{
		id: 'enableSysInfo',
		tag: 'Other',
		summary: 'Enable system information output',
		command: 'EnableSysInfo:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'enableCastUsageReport',
		tag: 'Other',
		summary: 'Enable usage report for Cast',
		command: 'Cast:EnableUsageReport',
		params: [],
	},
	{
		id: 'getAirplayExtraDelay',
		tag: 'Other',
		summary: 'Get AirPlay extra delay',
		command: 'GetAirplayExtraDelay',
		params: [],
	},
	{
		id: 'getAllRoutines',
		tag: 'Other',
		summary: 'Get all routines',
		command: 'getAllRoutines',
		params: [],
	},
	{
		id: 'getAudioInputCapability',
		tag: 'Other',
		summary: 'Get audio input capability',
		command: 'getAudioInputCapbility',
		params: [],
	},
	{
		id: 'getAudioOutMax32bit',
		tag: 'Other',
		summary: 'Get audio output maximum 32-bit support',
		command: 'getAudioOutMax32bit',
		params: [],
	},
	{
		id: 'getAudioOutputVrms',
		tag: 'Other',
		summary: 'Get audio output VRMS for a specific output',
		command: 'getAudioOutputVrms:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'getAutoSenseEnable',
		tag: 'Other',
		summary: 'Get auto-sense enable status',
		command: 'getAutoSenseEnable',
		params: [],
	},
	{
		id: 'getAsrStatus',
		tag: 'Other',
		summary: 'Get Automatic Speech Recognition Status',
		command: 'getAsrStatus',
		params: [],
	},
	{
		id: 'getAuxAutoSenseEnable',
		tag: 'Other',
		summary: 'Get AUX auto-sense enable status',
		command: 'getAuxAutoSenseEnable',
		params: [],
	},
	{
		id: 'getAuxInMaxCap',
		tag: 'Other',
		summary: 'Get AUX input maximum capacity',
		command: 'getAuxInMaxCap',
		params: [],
	},
	{
		id: 'getAuxVoltageSupportList',
		tag: 'Other',
		summary: 'Get auxiliary voltage support list',
		command: 'getAuxVoltageSupportList',
		params: [],
	},
	{
		id: 'getbatteryval',
		tag: 'Other',
		summary: 'Get battery value',
		command: 'getbatteryval',
		params: [],
	},
	{
		id: 'getCBLStatus',
		tag: 'Other',
		summary: 'Get CBL status',
		command: 'getCBLStatus',
		params: [],
	},
	{
		id: 'getCecPowerCtrl',
		tag: 'Other',
		summary: 'Get CEC power control status',
		command: 'getCecPowerCtrl',
		params: [],
	},
	{
		id: 'getChannelMode',
		tag: 'Other',
		summary: 'Get channel mode',
		command: 'getChannelMode',
		params: [],
	},
	{
		id: 'getDigitalFilterType',
		tag: 'Other',
		summary: 'Get current digital filter type',
		command: 'getDigitalFilterType',
		params: [],
	},
	{
		id: 'getOutputDigitalFilterType',
		tag: 'Other',
		summary: 'Get current output digital filter type',
		command: 'getOutputDigitalFilterType:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'getCurrentWirelessConnect',
		tag: 'Other',
		summary: 'Get current wireless connection information',
		command: 'GetCurrentWirelessConnect',
		params: [],
	},
	{
		id: 'getCxdishPrecent',
		tag: 'Other',
		summary: 'Get CXDISH percentage',
		command: 'getCxdishPrecent',
		params: [],
	},
	{
		id: 'getFeatureCapability',
		tag: 'Other',
		summary: 'Get feature capability',
		command: 'getFeatureCapbility',
		params: [],
	},
	{
		id: 'getHDMIAutoSenseEnable',
		tag: 'Other',
		summary: 'Get HDMI auto-sense enable',
		command: 'getHDMIAutoSenseEnable',
		params: [],
	},
	{
		id: 'getModeRename',
		tag: 'Other',
		summary: 'Get input mode rename information',
		command: 'getModeRename',
		params: [],
	},
	{
		id: 'ledSwitchGet',
		tag: 'Other',
		summary: 'Get LED switch status',
		command: 'LED_SWITCH_GET',
		params: [],
	},
	{
		id: 'getLightOperationBrightConfig',
		tag: 'Other',
		summary: 'Get light operation brightness configuration',
		command: 'getLightOperationBrightConfig',
		params: [],
	},
	{
		id: 'getLineInMaxCap',
		tag: 'Other',
		summary: 'Get LINE IN maximum capacity',
		command: 'getLineInMaxCap',
		params: [],
	},
	{
		id: 'getAudioOutputVrmsSupportList',
		tag: 'Other',
		summary: 'Get list of audio outputs that support VRMS',
		command: 'getAudioOutputVrmsSupportList',
		params: [],
	},
	{
		id: 'getDigitalFilterTypeSupportList',
		tag: 'Other',
		summary: 'Get list of supported digital filter types',
		command: 'getDigitalFilterTypeSupportList',
		params: [],
	},
	{
		id: 'getInputModeSupportList',
		tag: 'Other',
		summary: 'Get list of supported input modes',
		command: 'getInputModeSupportList',
		params: [],
	},
	{
		id: 'getOutputDigitalFilterTypeSupportList',
		tag: 'Other',
		summary: 'Get list of supported output digital filter types',
		command: 'getOutputDigitalFilterTypeSupportList',
		params: [],
	},
	{
		id: 'getLMPFilterCapability',
		tag: 'Other',
		summary: 'Get LMP filter capability',
		command: 'getLMPFilterCapability',
		params: [],
	},
	{
		id: 'getLowPriorityPromptDisable',
		tag: 'Other',
		summary: 'Get low priority prompt disable status',
		command: 'getLowPriorityPromptDisable',
		params: [],
	},
	{
		id: 'getLPAuthCode',
		tag: 'Other',
		summary: 'Get LP Auth Code',
		command: 'getLPAuthCode:hostId={str}:clientId={str2}',
		params: [
			{
				name: 'str',
				required: true,
			},
			{
				name: 'str2',
				required: true,
			},
		],
	},
	{
		id: 'getMainSubExtraDelay',
		tag: 'Other',
		summary: 'Get main/sub extra delay',
		command: 'getMainSubExtraDelay',
		params: [],
	},
	{
		id: 'getMQAReceiverCap',
		tag: 'Other',
		summary: 'Get MQA receiver capacity',
		command: 'getMQAReceiverCap',
		params: [],
	},
	{
		id: 'getMvRemoteUpdateDeviceOtaInfo',
		tag: 'Other',
		summary: 'Get MV remote update device OTA information',
		command: 'getMvRemoteUpdateDeviceOtaInfo',
		params: [],
	},
	{
		id: 'getMvRomDownloadV2Status',
		tag: 'Other',
		summary: 'Get MV ROM download status V2',
		command: 'getMvRomDownloadV2Status',
		params: [],
	},
	{
		id: 'getMvRomDownloadStatus',
		tag: 'Other',
		summary: 'Get MV ROM download status',
		command: 'getMvRomDownloadStatus',
		params: [],
	},
	{
		id: 'getOutputVoltage',
		tag: 'Other',
		summary: 'Get output voltage',
		command: 'getOutputVoltage',
		params: [],
	},
	{
		id: 'phonoModeSwitchGet',
		tag: 'Other',
		summary: 'Get phono mode switch state',
		command: 'PHONO_MODE_SWITCH_GET',
		params: [],
	},
	{
		id: 'getPlayModeGainConfig',
		tag: 'Other',
		summary: 'Get play mode gain configuration',
		command: 'getPlayModeGainConfig',
		params: [],
	},
	{
		id: 'getPlayModeVolumeEnable',
		tag: 'Other',
		summary: 'Get play mode volume enable',
		command: 'getPlayModeVolumeEnable',
		params: [],
	},
	{
		id: 'getPlayModeVolumeValue',
		tag: 'Other',
		summary: 'Get play mode volume value',
		command: 'getPlayModeVolumeValue',
		params: [],
	},
	{
		id: 'getPowerModeTime',
		tag: 'Other',
		summary: 'Get power mode time',
		command: 'getPowerModeTime',
		params: [],
	},
	{
		id: 'getRoutineCapability',
		tag: 'Other',
		summary: 'Get routine capability',
		command: 'getRoutineCapability',
		params: [],
	},
	{
		id: 'getSetupRouterInfo',
		tag: 'Other',
		summary: 'Get setup router information',
		command: 'getSetupRouterInfo',
		params: [],
	},
	{
		id: 'getSoftMute',
		tag: 'Other',
		summary: 'Get soft mute status',
		command: 'getSoftMute',
		params: [],
	},
	{
		id: 'getSoundCardModeSupportList',
		tag: 'Other',
		summary: 'Get sound card mode support list',
		command: 'getSoundCardModeSupportList',
		params: [],
	},
	{
		id: 'getSpdifAutoSenseEnable',
		tag: 'Other',
		summary: 'Get SPDIF auto-sense enable status',
		command: 'getSpdifAutoSenseEnable',
		params: [],
	},
	{
		id: 'getSpdifInNoiseRemove',
		tag: 'Other',
		summary: 'Get SPDIF input noise removal status',
		command: 'getSpdifInNoiseRemove',
		params: [],
	},
	{
		id: 'getSpdifOutMaxCap',
		tag: 'Other',
		summary: 'Get SPDIF output maximum capabilities',
		command: 'getSpdifOutMaxCap',
		params: [],
	},
	{
		id: 'getStreamServiceConfig',
		tag: 'Other',
		summary: 'Get stream service config for a specific source',
		command: 'getStreamServiceConfig:{source}',
		params: [
			{
				name: 'source',
				required: true,
			},
		],
	},
	{
		id: 'streamServicesCapability',
		tag: 'Other',
		summary: 'Get streaming services capabilities',
		command: 'streamServicesCapability',
		params: [],
	},
	{
		id: 'getDigitalInputAudioTypeSupport',
		tag: 'Other',
		summary: 'Get supported digital input audio types',
		command: 'getDigitalInputAudioTypeSupport',
		params: [],
	},
	{
		id: 'getSyncPlayExtraDelay',
		tag: 'Other',
		summary: 'Get sync play extra delay',
		command: 'GetSyncPlayExtraDelay',
		params: [],
	},
	{
		id: 'getsyslogIp',
		tag: 'Other',
		summary: 'Get system log for a specific IP address',
		command: 'getsyslog:ip:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'getActiveSoundCardOutputMode',
		tag: 'Other',
		summary: 'Get the active sound card output mode',
		command: 'getActiveSoundCardOutputMode',
		params: [],
	},
	{
		id: 'getStatusIp',
		tag: 'Other',
		summary: 'Get the device status',
		command: 'getStatus:ip:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'getCoaxOutMaxCap',
		tag: 'Other',
		summary: 'Get the maximum capabilities of the coaxial output',
		command: 'getCoaxOutMaxCap',
		params: [],
	},
	{
		id: 'getMvRemoteSilenceUpdateTime',
		tag: 'Other',
		summary: 'Get the MV remote silence update time',
		command: 'getMvRemoteSilenceUpdateTime',
		params: [],
	},
	{
		id: 'getRemoteVolumeStep',
		tag: 'Other',
		summary: 'Get the remote volume step',
		command: 'get_remote_volume_step',
		params: [],
	},
	{
		id: 'getButtonVolumeStep',
		tag: 'Other',
		summary: 'Get the volume step of the buttons',
		command: 'get_button_volume_step',
		params: [],
	},
	{
		id: 'getTvsDevInfo',
		tag: 'Other',
		summary: 'Get TVS device information',
		command: 'getTvsDevInfo',
		params: [],
	},
	{
		id: 'getTvsState',
		tag: 'Other',
		summary: 'Get TVS state',
		command: 'TvsState',
		params: [],
	},
	{
		id: 'getUacOutMaxCap',
		tag: 'Other',
		summary: 'Get UAC output maximum capacity',
		command: 'getUacOutMaxCap',
		params: [],
	},
	{
		id: 'getUiConfig',
		tag: 'Other',
		summary: 'Get UI config',
		command: 'get_ui_config',
		params: [],
	},
	{
		id: 'getUiWallpaperList',
		tag: 'Other',
		summary: 'Get UI wallpaper list',
		command: 'get_ui_wallpaper_list',
		params: [],
	},
	{
		id: 'getUpdateServer',
		tag: 'Other',
		summary: 'Get update server',
		command: 'GetUpdateServer',
		params: [],
	},
	{
		id: 'getWeatherInfo',
		tag: 'Other',
		summary: 'Get weather info',
		command: 'getWeatherInfo',
		params: [],
	},
	{
		id: 'mediaserverScan',
		tag: 'Other',
		summary: 'Media server scan',
		command: 'mediaserver:scan',
		params: [],
	},
	{
		id: 'mediaserverUdiskumount',
		tag: 'Other',
		summary: 'Media server USB disk unmount',
		command: 'mediaserver:udiskumount',
		params: [],
	},
	{
		id: 'notifyUpgradeTypeFirmware',
		tag: 'Other',
		summary: 'Notify upgrade type firmware',
		command: 'NotifyUpgradeType:firmware',
		params: [],
	},
	{
		id: 'phonoModeSwitchSet',
		tag: 'Other',
		summary: 'Phono mode switch set',
		command: 'PHONO_MODE_SWITCH_SET:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'reloadButtonGet',
		tag: 'Other',
		summary: 'Reload button status',
		command: 'Reload_Button_GET',
		params: [],
	},
	{
		id: 'reloadButtonUpdate',
		tag: 'Other',
		summary: 'Reload button update',
		command: 'Reload_Button_UPDATE:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'getMvRemoteUpdateStartCheck',
		tag: 'Other',
		summary: 'Search for firmware updates available (check for updates)',
		command: 'getMvRemoteUpdateStartCheck',
		params: [],
	},
	{
		id: 'setAccessPIN',
		tag: 'Other',
		summary: 'Set access PIN',
		command: 'setAccessPIN:{"PIN":"{str}"}',
		params: [
			{
				name: 'str',
				required: true,
			},
			{
				name: '"PIN":"{str',
				required: true,
			},
		],
	},
	{
		id: 'setAudioOutMax32bit',
		tag: 'Other',
		summary: 'Set audio output maximum 32-bit support',
		command: 'setAudioOutMax32bit:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setAudioOutputVrms',
		tag: 'Other',
		summary: 'Set audio output VRMS for a specific output',
		command: 'setAudioOutputVrms:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setAutoSenseEnable',
		tag: 'Other',
		summary: 'Set auto-sense enable',
		command: 'setAutoSenseEnable:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setAuxAutoSenseEnable',
		tag: 'Other',
		summary: 'Set AUX auto-sense enable',
		command: 'setAuxAutoSenseEnable:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setAuxInMaxCap',
		tag: 'Other',
		summary: 'Set auxiliary input max capacity',
		command: 'setAuxInMaxCap:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setCecPowerCtrl',
		tag: 'Other',
		summary: 'Set CEC power control status',
		command: 'setCecPowerCtrl:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setChannelMode',
		tag: 'Other',
		summary: 'Set channel mode',
		command: 'setChannelMode:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setCoaxOutMaxCap',
		tag: 'Other',
		summary: 'Set coaxial output max capacity',
		command: 'setCoaxOutMaxCap:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setDigitalFilterType',
		tag: 'Other',
		summary: 'Set digital filter type',
		command: 'setDigitalFilterType:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setHandshakeCode',
		tag: 'Other',
		summary: 'Set handshake code',
		command: 'setHandshakeCode:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setHDMIAutoSenseEnable',
		tag: 'Other',
		summary: 'Set HDMI auto-sense enable',
		command: 'setHDMIAutoSenseEnable:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setHexGroupName',
		tag: 'Other',
		summary: 'Set hex group name',
		command: 'setHexGroupName:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setInitialConfiguration',
		tag: 'Other',
		summary: 'Set initial configuration',
		command: 'setInitialConfiguration:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setModeRename',
		tag: 'Other',
		summary: 'Set input mode rename information',
		command: 'setModeRename:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setLanguage',
		tag: 'Other',
		summary: 'Set language',
		command: 'setLanguage:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setLineInMaxCap',
		tag: 'Other',
		summary: 'Set line input max capacity',
		command: 'setLineInMaxCap:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setMaxVolume',
		tag: 'Other',
		summary: 'Set max volume',
		command: 'setMaxVolume:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setMQAReceiverCap',
		tag: 'Other',
		summary: 'Set MQA receiver capacity',
		command: 'setMQAReceiverCap:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setMusicExplicit',
		tag: 'Other',
		summary: 'Set music explicit content filter',
		command: 'setMusicExplicit:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setMvRemoteSilenceOTATime',
		tag: 'Other',
		summary: 'Set MV remote silence OTA time',
		command: 'setMvRemoteSilenceOTATime:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setMvRemoteSilenceUpdateTime',
		tag: 'Other',
		summary: 'Set MV remote silence update time',
		command: 'setMvRemoteSilenceUpdateTime:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setOutputDigitalFilterType',
		tag: 'Other',
		summary: 'Set output digital filter type',
		command: 'setOutputDigitalFilterType:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setOutputVoltage',
		tag: 'Other',
		summary: 'Set output voltage',
		command: 'setOutputVoltage:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setPlayModeGainConfig',
		tag: 'Other',
		summary: 'Set play mode gain configuration',
		command: 'setPlayModeGainConfig:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setPlayModeVolumeEnable',
		tag: 'Other',
		summary: 'Set play mode volume enable',
		command: 'setPlayModeVolumeEnable:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setPlayModeVolumeValue',
		tag: 'Other',
		summary: 'Set play mode volume value',
		command: 'setPlayModeVolumeValue:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setPowerModeTime',
		tag: 'Other',
		summary: 'Set power mode time',
		command: 'setPowerModeTime:{"idleInterval":"{str}"}',
		params: [
			{
				name: 'str',
				required: true,
			},
			{
				name: '"idleInterval":"{str',
				required: true,
			},
		],
	},
	{
		id: 'setSetupRouterInfo',
		tag: 'Other',
		summary: 'Set setup router information',
		command: 'setSetupRouterInfo:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setSoftMute',
		tag: 'Other',
		summary: 'Set soft mute',
		command: 'setSoftMute:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setSpdifAutoSenseEnable',
		tag: 'Other',
		summary: 'Set SPDIF auto-sense enable',
		command: 'setSpdifAutoSenseEnable:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setSpdifInNoiseRemove',
		tag: 'Other',
		summary: 'Set SPDIF input noise removal',
		command: 'setSpdifInNoiseRemove:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setSpdifOutMaxCap',
		tag: 'Other',
		summary: 'Set SPDIF output max capacity',
		command: 'setSpdifOutMaxCap:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setSyncPlayExtraDelay',
		tag: 'Other',
		summary: 'Set sync play extra delay',
		command: 'SetSyncPlayExtraDelay:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'talksetAlarmcommon',
		tag: 'Other',
		summary: 'Set talk alarm common settings',
		command: 'talksetAlarmcommon:prewake:{str}:vol:{n1}:tone:{n2}',
		params: [
			{
				name: 'str',
				required: true,
			},
			{
				name: 'n1',
				required: true,
			},
			{
				name: 'n2',
				required: true,
			},
		],
	},
	{
		id: 'talksetAlarmPreWake',
		tag: 'Other',
		summary: 'Set talk alarm pre-wake',
		command: 'talksetAlarmPreWake:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'talksetAlarmTonePreview',
		tag: 'Other',
		summary: 'Set talk alarm tone preview',
		command: 'talksetAlarmTonePreview:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'talksetAlarmTone',
		tag: 'Other',
		summary: 'Set talk alarm tone',
		command: 'talksetAlarmTone:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'talksetAlarmVolume',
		tag: 'Other',
		summary: 'Set talk alarm volume',
		command: 'talksetAlarmVolume:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'talksetPrompt',
		tag: 'Other',
		summary: 'Set talk prompt',
		command: 'talksetPrompt:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setRemoteVolumeStep',
		tag: 'Other',
		summary: 'Set the remote volume step',
		command: 'set_remote_volume_step:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setButtonVolumeStep',
		tag: 'Other',
		summary: 'Set the volume step of the buttons',
		command: 'set_button_volume_step:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setTimezone',
		tag: 'Other',
		summary: 'Set timezone',
		command: 'setTimezone:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setTokenParams',
		tag: 'Other',
		summary: 'Set token parameters',
		command: 'setTokenParams:code={str}:redirect_uri={str2}',
		params: [
			{
				name: 'str',
				required: true,
			},
			{
				name: 'str2',
				required: true,
			},
		],
	},
	{
		id: 'setTuneinToken',
		tag: 'Other',
		summary: 'Set TuneIn authentication token information',
		command:
			'setTuneinToken:username={username}:token={token}:refreshToken={refreshToken}:expires_in={expires_in}:userid={userid}',
		params: [
			{
				name: 'username',
				required: true,
			},
			{
				name: 'token',
				required: true,
			},
			{
				name: 'refreshToken',
				required: true,
			},
			{
				name: 'expires_in',
				required: true,
			},
			{
				name: 'userid',
				required: true,
			},
		],
	},
	{
		id: 'setTuneinFavoriteState',
		tag: 'Other',
		summary: 'Set TuneIn favorite state for a song',
		command: 'setTuneinFavoriteState:songId={songId}:statu={status}',
		params: [
			{
				name: 'songId',
				required: true,
			},
			{
				name: 'status',
				required: true,
			},
		],
	},
	{
		id: 'setTuneinLocation',
		tag: 'Other',
		summary: 'Set TuneIn location information',
		command: 'setTuneinLocation:latitude={latitude}:longitude={longitude}:serial={serial}',
		params: [
			{
				name: 'latitude',
				required: true,
			},
			{
				name: 'longitude',
				required: true,
			},
			{
				name: 'serial',
				required: true,
			},
		],
	},
	{
		id: 'setTVSAccessToken',
		tag: 'Other',
		summary: 'Set TVS access token',
		command: 'setTVSAccessToken:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setTvsClientID',
		tag: 'Other',
		summary: 'Set TVS client ID',
		command: 'setTvsClientID:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setTVSDebugMode',
		tag: 'Other',
		summary: 'Set TVS debug mode',
		command: 'setTVSDebugMode:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setUacOutMaxCap',
		tag: 'Other',
		summary: 'Set UAC out max cap',
		command: 'setUacOutMaxCap:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setUiConfig',
		tag: 'Other',
		summary: 'Set UI config',
		command: 'set_ui_config:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setUiWallpaperList',
		tag: 'Other',
		summary: 'Set UI wallpaper list',
		command: 'set_ui_wallpaper_list:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setUpdateServer',
		tag: 'Other',
		summary: 'Set update server',
		command: 'SetUpdateServer:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setVolumeControl',
		tag: 'Other',
		summary: 'Set volume control',
		command: 'setVolumeControl:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setWeatherLocation',
		tag: 'Other',
		summary: 'Set weather location',
		command: 'setWeatherLocation:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'slaveAlertGet',
		tag: 'Other',
		summary: 'Slave alert get',
		command: 'SlaveIP:{ip}:alertget',
		params: [
			{
				name: 'ip',
				required: true,
			},
		],
	},
	{
		id: 'slaveTalkSetAlarmVolume',
		tag: 'Other',
		summary: 'Slave set alarm volume',
		command: 'SlaveIP:{ip}:talksetAlarmVolume:{n}',
		params: [
			{
				name: 'ip',
				required: true,
			},
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'squeezeliteAutoConnectEnable',
		tag: 'Other',
		summary: 'Squeezelite auto connect enable',
		command: 'Squeezelite:autoConnectEnable:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'squeezeliteConnectServer',
		tag: 'Other',
		summary: 'Squeezelite connect server',
		command: 'Squeezelite:connectServer:{ip}',
		params: [
			{
				name: 'ip',
				required: true,
			},
		],
	},
	{
		id: 'squeezeliteDiscover',
		tag: 'Other',
		summary: 'Squeezelite discover',
		command: 'Squeezelite:discover',
		params: [],
	},
	{
		id: 'squeezeliteGetState',
		tag: 'Other',
		summary: 'Squeezelite get state',
		command: 'Squeezelite:getState',
		params: [],
	},
	{
		id: 'startCheck',
		tag: 'Other',
		summary: 'Start check',
		command: 'StartCheck',
		params: [],
	},
	{
		id: 'getMvRemoteUpdateStart',
		tag: 'Other',
		summary: 'Start firmware update',
		command: 'getMvRemoteUpdateStart',
		params: [],
	},
	{
		id: 'startRebootTime',
		tag: 'Other',
		summary: 'Start reboot time',
		command: 'StartRebootTime:1',
		params: [],
	},
	{
		id: 'getMvRemoteUpdateStatus',
		tag: 'Other',
		summary: 'Status of the update process',
		command: 'getMvRemoteUpdateStatus',
		params: [],
	},
	{
		id: 'getMvRomBurnPrecent',
		tag: 'Other',
		summary: 'Status of the update process',
		command: 'getMvRomBurnPrecent',
		params: [],
	},
	{
		id: 'tidalLogin',
		tag: 'Other',
		summary: 'Tidal login using OAuth code',
		command: 'tidallogin:oauthcode={str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'tvsLogout',
		tag: 'Other',
		summary: 'TVS logout',
		command: 'TvsLogout',
		params: [],
	},
	{
		id: 'setLightOperationBrightConfig',
		tag: 'Other',
		summary: 'WiiM Ultra enable/disable LCD',
		command: 'setLightOperationBrightConfig:{"auto_sense_enable":{s},"default_bright":{b},"disable":{d}}',
		params: [
			{
				name: 's',
				required: true,
			},
			{
				name: 'b',
				required: true,
			},
			{
				name: 'd',
				required: true,
			},
			{
				name: '"auto_sense_enable":{s',
				required: true,
			},
		],
	},
	{
		id: 'getPlayerStatus',
		tag: 'Playback control',
		summary: 'Get the playback status',
		command: 'getPlayerStatus',
		params: [],
	},
	{
		id: 'setPlayerCmdLoopmode',
		tag: 'Playback control',
		summary: 'Loop mode set',
		command: 'setPlayerCmd:loopmode:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setPlayerCmdMute',
		tag: 'Playback control',
		summary: 'Mute',
		command: 'setPlayerCmd:mute:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'setPlayerCmdNext',
		tag: 'Playback control',
		summary: 'Next',
		command: 'setPlayerCmd:next',
		params: [],
	},
	{
		id: 'setPlayerCmdPause',
		tag: 'Playback control',
		summary: 'Pause',
		command: 'setPlayerCmd:pause',
		params: [],
	},
	{
		id: 'setPlayerCmdHexPlaylistUrl',
		tag: 'Playback control',
		summary: 'Play a specific track from a playlist by URL and index',
		command: 'setPlayerCmd:hex_playlist:url:{index}',
		params: [
			{
				name: 'index',
				required: true,
			},
		],
	},
	{
		id: 'setPlayerCmdPlaylistUrl',
		tag: 'Playback control',
		summary: 'Play audio playlist',
		command: 'setPlayerCmd:playlist:{url}:{index}',
		params: [
			{
				name: 'index',
				required: true,
			},
			{
				name: 'url',
				required: true,
			},
		],
	},
	{
		id: 'setPlayerCmdPlayUrl',
		tag: 'Playback control',
		summary: 'Play audio URL',
		command: 'setPlayerCmd:play:{url}',
		params: [
			{
				name: 'url',
				required: true,
			},
		],
	},
	{
		id: 'setPlayerCmdPrev',
		tag: 'Playback control',
		summary: 'Previous',
		command: 'setPlayerCmd:prev',
		params: [],
	},
	{
		id: 'setPlayerCmdResume',
		tag: 'Playback control',
		summary: 'Resume',
		command: 'setPlayerCmd:resume',
		params: [],
	},
	{
		id: 'setPlayerCmdSeekPosition',
		tag: 'Playback control',
		summary: 'Seek',
		command: 'setPlayerCmd:seek:position',
		params: [],
	},
	{
		id: 'setPlayerCmdVol',
		tag: 'Playback control',
		summary: 'Set volume',
		command: 'setPlayerCmd:vol:{value}',
		params: [
			{
				name: 'value',
				required: true,
			},
		],
	},
	{
		id: 'setPlayerCmdStop',
		tag: 'Playback control',
		summary: 'Stop',
		command: 'setPlayerCmd:stop',
		params: [],
	},
	{
		id: 'setPlayerCmdOnePause',
		tag: 'Playback control',
		summary: 'Toggle pause/play',
		command: 'setPlayerCmd:onepause',
		params: [],
	},
	{
		id: 'getPresetInfo',
		tag: 'Presets',
		summary: 'Get Preset List',
		command: 'getPresetInfo',
		params: [],
	},
	{
		id: 'getMCUKeyShortClickTrack',
		tag: 'Presets',
		summary: 'Play preset with preset number and track number',
		command: 'MCUKeyShortClick:{n}:{t}',
		params: [
			{
				name: 'n',
				required: true,
			},
			{
				name: 't',
				required: true,
			},
		],
	},
	{
		id: 'getMCUKeyShortClick',
		tag: 'Presets',
		summary: 'Play preset with preset number',
		command: 'MCUKeyShortClick:{n}',
		params: [
			{
				name: 'n',
				required: true,
			},
		],
	},
	{
		id: 'roomCorrGetMode',
		tag: 'Room correction',
		summary: 'Get the current room correction mode',
		command: 'RoomCorrGetMode',
		params: [],
	},
	{
		id: 'roomCorrGet',
		tag: 'Room correction',
		summary: 'Get the current room correction settings',
		command: 'RoomCorrGet',
		params: [],
	},
	{
		id: 'roomCorrSetMode',
		tag: 'Room correction',
		summary: 'Set the room correction mode',
		command: 'RoomCorrSetMode:{"Mode":"{str}"}',
		params: [
			{
				name: 'str',
				required: true,
			},
			{
				name: '"Mode":"{str',
				required: true,
			},
		],
	},
	{
		id: 'roomCorrSetLR',
		tag: 'Room correction',
		summary: 'Set the room correction settings for left and right channels',
		command: 'RoomCorrSetLR:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setRoomCorrection',
		tag: 'Room correction',
		summary: 'Set the room correction settings with version and time parameters',
		command: 'setRoomCorrection:{"RC_Version":"{str}","Time":"{time}"}',
		params: [
			{
				name: 'str',
				required: true,
			},
			{
				name: 'time',
				required: true,
			},
			{
				name: '"RC_Version":"{str',
				required: true,
			},
		],
	},
	{
		id: 'roomCorrSet',
		tag: 'Room correction',
		summary: 'Set the room correction settings',
		command: 'RoomCorrSet:{str}',
		params: [
			{
				name: 'str',
				required: true,
			},
		],
	},
	{
		id: 'setPlayerCmdSwitchMode',
		tag: 'Source input switch',
		summary: 'Switch the source input',
		command: 'setPlayerCmd:switchmode:{mode}',
		params: [
			{
				name: 'mode',
				required: true,
			},
		],
	},
	{
		id: 'getMetaInfo',
		tag: 'Track metadata',
		summary: 'Get Current Track Metadata',
		command: 'getMetaInfo',
		params: [],
	},
]

const documentedEndpointChoices = documentedEndpoints.map((endpoint) => ({
	id: endpoint.id,
	label: endpoint.params.length
		? `[${endpoint.tag}] ${endpoint.summary} - ${endpoint.command}`
		: `[${endpoint.tag}] ${endpoint.summary}`,
}))

const documentedEndpointMap = Object.fromEntries(documentedEndpoints.map((endpoint) => [endpoint.id, endpoint]))

export { documentedEndpoints, documentedEndpointChoices, documentedEndpointMap }
