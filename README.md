# companion-module-wiim-http

A [Bitfocus Companion](https://bitfocus.io/companion) module for controlling
WiiM streamers and amplifiers over their built-in HTTP API.

Works with WiiM Mini, Pro, Pro Plus, Amp, Amp Pro and Ultra — and, in practice,
with most LinkPlay-based devices, since they share the same `httpapi.asp`
interface.

|                          |                           |
| ------------------------ | ------------------------- |
| Actions                  | 78                        |
| Feedbacks                | 7                         |
| Variables                | 56                        |
| Presets                  | 36, in 7 sections         |
| Documented API endpoints | 346, across 17 categories |

Requires Companion 4.0 or newer (module API v2).

## Installing

Download the `.tgz` from [Releases](https://github.com/houtacheng/companion-module-wiim-http/releases),
then in Companion go to **Modules → Import module package** and select the file.

To build it yourself:

```bash
yarn install
yarn package
```

## Connecting to a device

Set up the connection in one of three ways, in order of preference:

1. **Bonjour discovery** — pick the device from _Discovered WiiM Device_. This
   keeps working when DHCP changes the device's address.
2. **Manual address** — type the IP or hostname into _Manual WiiM IP Address /
   Hostname_.
3. **Subnet scan** — enable _Auto Find WiiM by Subnet Scan_. Leave _Subnet Scan
   Prefix_ blank to derive the networks from your interfaces, or set a prefix
   such as `192.168.1.`. Networks wider than a /24 are covered by scanning each
   /24 block the interface spans, up to four. Set _Target Name / MAC / UUID_ to
   pin the scan to one specific device.

Newer firmware may only answer over HTTPS, using a self-signed certificate.
Leave **Protocol** on `Auto` and the module tries HTTPS first, then HTTP.

The module polls `getPlayerStatus`, `getStatusEx` and `getMetaInfo` on the
configured interval (2s by default), plus `getPresetInfo` occasionally.

## What it can control

**Playback** — play, pause, stop, toggle, next, previous, absolute and relative
seek, play arbitrary URI.

**Volume** — set, step up/down, mute on/off/toggle, max volume, channel balance.

**Sources** — network, Bluetooth, line in, optical, USB, coaxial, HDMI, HDMI ARC,
plus next/previous stepping for encoders.

**Repeat and shuffle** — see the table below.

**Presets** — recall 1–12, either as numbered actions or a single action with a
number option.

**EQ** — on, off, 24 named presets, bass and treble levels.

**Device** — standby, wake, reboot, factory reset, status LED, touch controls,
shutdown timer, Bluetooth pairing and discovery, alarm stop, room correction.

**Media library** — see below.

**Anything else** — `Advanced: Custom HTTP API Command` sends a raw command, and
the two `Documented API` actions expose all 346 endpoints from the OpenAPI
description as a dropdown, either fire-and-forget or capturing the response into
`api_last_*` variables.

> Some documented endpoints are genuinely destructive — factory reset, network
> reconfiguration, firmware operations. There is no confirmation step; use them
> deliberately.

## Repeat and shuffle

The WiiM API packs shuffle and repeat into a single `loop` value, so the module
exposes the six documented combinations rather than two independent switches:

| Label                | Shuffle | Repeat | `loop` |
| -------------------- | ------- | ------ | ------ |
| Off                  | off     | off    | 4      |
| Repeat All           | off     | all    | 0      |
| Repeat One           | off     | one    | 1      |
| Shuffle              | on      | off    | 3      |
| Shuffle + Repeat All | on      | all    | 2      |
| Shuffle + Repeat One | on      | one    | 5      |

`Repeat: Off/One/All` and `Shuffle: On/Off` each change only their own half and
carry the other setting across, so turning shuffle off no longer silently
changes the repeat mode. `Repeat/Shuffle: Cycle Mode` steps through Repeat One →
Repeat All → Shuffle → Off.

## Media library

Companion cannot open a native file picker inside a module, so the module reads
a media folder over HTTP. Point _Media Library HTTP Base URL_ at a directory:

```text
http://192.168.1.50:8000/music/
```

Files are collected from up to three sources, deduplicated by URL:

- the directory listing, walked to _Media Scan Depth_ levels;
- an index file — `files.txt`, `index.txt`, `playlist.m3u`, `index.m3u`,
  `files.json` or `index.json` — or whatever _Media Library Index URL_ points at;
- explicit entries in _Media Library File List_, separated by commas or newlines.

Use the index file or the explicit list when your server serves files but returns
`403` for directory listings.

The resulting list drives `Media Library: Play File`, a random-play action with
an optional folder filter, and encoder-friendly select-previous / select-next /
play-selected actions.

_Auto Random Next_ plays another random library file when the current one reaches
its end. _Assist Repeat One for URL playback_ works around firmware that reports
Repeat One for direct URL playback but does not actually replay the file.

## Variables

56 variables covering connection and discovery state, device identity, playback
status and position, track metadata, EQ, presets, and the media library. Preset
button text references them by connection label, for example
`$(WiiM:now_playing)`.

See [companion/HELP.md](companion/HELP.md) for the full list and per-field notes.

## Development

```bash
yarn install
yarn format      # prettier
yarn package     # build the .tgz
```

The module is ESM. `src/main.js` holds the instance lifecycle, HTTP transport,
polling and state; actions, feedbacks, presets and variables each register from
their own file; `src/choices.js` holds the shared enumerations, including the
loop-mode table that is the single source of truth for shuffle/repeat;
`src/api-catalog.js` is generated and should not be hand-edited.

## Sources

This module is built against, but does not redistribute, the following:

- **[HTTP API for WiiM Products](https://www.wiimhome.com/pdf/HTTP%20API%20for%20WiiM%20Products.pdf)**
  (version 1.2) — WiiM's official API documentation.
- **[cvdlinden/wiim-httpapi](https://github.com/cvdlinden/wiim-httpapi)** — the
  OpenAPI description that `src/api-catalog.js` was generated from.

Neither is included here; download them from the links above if you want them
locally.

## License

[MIT](LICENSE)
