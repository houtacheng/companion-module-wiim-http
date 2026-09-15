# Changelog

## 1.5.1

### Fixed

- **Preset button text showed `$NA`.** Presets referenced variables as
  `$(this:volume)`, but Companion has no "this connection" placeholder and does
  not rewrite the scope when a preset is dropped onto a button, so the text was
  left verbatim and failed to resolve. Presets now build the reference from the
  connection's label. Affected `Cycle Repeat / Shuffle`, `Now Playing` and all
  three encoder presets.

## 1.5.0

### Fixed

- **Repeat and shuffle were inverted.** `loop` values 0 and 4 were swapped
  against the WiiM API documentation, so `Repeat: Off` switched repeat-all _on_
  and `Repeat: All` switched repeat _off_. Mode 3 was labelled as repeating when
  it does not, and mode 5 lost its shuffle bit, which also made shuffle feedback
  miss it. The six documented shuffle/repeat combinations now come from one
  table.

  Because both settings share a single value, `Shuffle: Off` used to reset
  repeat as a side effect. Each action now changes only its own half.

  _Existing feedbacks keep their stored number, so a feedback set to the old
  "Repeat Off" now reads as Repeat All and needs reselecting._

- **Playback time variables were 1000× too large.** `curpos` and `totlen` are
  milliseconds; they were reported as seconds, so a position of 63,634 ms
  rendered as 17:40:34 instead of 1:03. Affects `position_seconds`,
  `duration_seconds`, `position_time` and `duration_time`.

- **Relative seek jumped past the end of the track.** `Playback: Seek
Forward/Back` added its seconds to the millisecond position and sent the
  result to an API that expects seconds. It now converts, and clamps to the
  track length.

- **Track titles could turn into mojibake.** WiiM hex-encodes metadata, and the
  decoder accepted anything made only of `[0-9a-f]` with an even length — so
  "ABBA", "cafe", "Facade", "decade" and bare years like "2024" were decoded as
  bytes. Decoding now requires the bytes to round-trip as UTF-8 and the result
  to read as text.

- **Polls could stack up and subnet scans could stampede.** A poll issues up to
  four sequential requests and could outlast the interval while the timer kept
  firing. With Auto Find enabled, every failed command started its own 254-host
  sweep. Polls are now guarded by an in-flight flag, concurrent rediscovery
  shares one scan, and a failed scan backs off for 60 seconds.

- **Subnet scanning assumed a /24.** Prefixes came from the first three octets
  of the interface address, so on a /22 only one of the four blocks was
  searched. Prefixes are now derived from the netmask, up to four /24 blocks.

- **Four presets were unreachable.** `repeat_one`, `repeat_all`, `repeat_off`
  and `shuffle_on` were defined but left out of every section, so they had
  nowhere to appear in the sectioned preset UI.

- **Preset button text had literal `\n`** instead of line breaks.

- **`Room Correction: Set Mode` built its JSON by string interpolation**, so any
  value containing a quote or backslash produced malformed JSON.

- **Requests outlived the instance.** `destroy()` left in-flight HTTP requests
  running, and their replies landed on a torn-down instance. Responses are also
  now capped at 4 MB, since directory scanning fetches pages from arbitrary
  servers.

### Changed

- The module is now ESM. `src/main.js` previously mixed CommonJS `require()`
  with an ESM `export default`, which meant the source tree could not be loaded
  at all — only packaged builds worked, because the bundler injects a
  `createRequire` shim.
- `src/upgrades.js` is wired up as an `upgradeScripts` export instead of being
  unreferenced. It is still empty.
- `loop_mode` feedback now defaults to Repeat One rather than the rarely used
  shuffle-plus-repeat-one mode.

## 1.4.4

Starting point for this changelog.
