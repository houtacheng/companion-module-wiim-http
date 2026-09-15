# WiiM HTTP

Controls WiiM products using the local HTTP API.

Configure the module by selecting a discovered WiiM device when Bonjour/mDNS discovery is available. This lets Companion keep working when DHCP changes the WiiM IP address. If Bonjour discovery is unavailable, enable `Auto Find WiiM by Subnet Scan`. You can leave `Subnet Scan Prefix` blank to scan the local IPv4 networks automatically, or set a prefix such as `192.168.1.`. Networks wider than a /24 are covered by scanning each /24 block the interface spans, up to four blocks. A failed scan is not retried for 60 seconds. Optionally set `Target Name / MAC / UUID` to identify one specific WiiM. Newer firmware may require HTTPS with a self-signed certificate; discovery probes HTTPS first and then falls back to HTTP. Leave Protocol set to `Auto` unless you know the device only supports one protocol.

## Included controls

- Playback: play/resume, pause, stop, toggle play, previous, next, seek, play URI
- Volume: set, up, down, mute on/off/toggle
- Repeat/shuffle: off, repeat one, repeat all, shuffle on/off
- Sources: network, Bluetooth, line in, optical, USB, coaxial, HDMI, HDMI ARC
- Presets: dedicated recall actions and presets for 1-12
- EQ: on, off, preset loading
- Power: standby and wake
- Advanced: custom WiiM HTTP API command
- Documented API: all 346 endpoints from `cvdlinden/wiim-httpapi` are available through dropdown actions

The module polls `getPlayerStatus`, `getStatusEx`, `getMetaInfo`, and occasionally `getPresetInfo` for variables and feedbacks.

## Documented API mode

Use `Documented API: Execute Endpoint` to run any known WiiM/Linkplay endpoint from the OpenAPI list.

Use `Documented API: Query Endpoint to Variables` to store the response in:

- `api_last_command`
- `api_last_endpoint`
- `api_last_tag`
- `api_last_summary`
- `api_last_response`
- `api_last_error`

Parameters are filled in placeholder order. For example, an endpoint shown as `setPlayerCmd:vol:{value}` uses Param 1 as `value`.

Some documented endpoints are powerful device/account/network operations such as factory reset, token setup, Wi-Fi configuration, firmware update checks, and reboot. Use those deliberately.

## Presets

Presets are included for playback, volume, repeat/shuffle, sources, preset recall, and now playing.

Preset button text references this connection by its label, for example
`$(WiiM:now_playing)`. If you rename the connection, re-add the presets or update
the label in any button text you have already placed.

Encoder presets are included:

- `Encoder: Volume / Mute`: rotate left/right for volume down/up, press to toggle mute.
- `Encoder: Select Input Source`: rotate left/right to switch input source.
- `Encoder: Select / Play Media File`: rotate left/right to select a scanned media file, press to play it.

## Repeat and shuffle

The WiiM API packs shuffle and repeat into one `loop` value, so the module exposes
the six documented combinations rather than separate switches:

| Mode                   | Shuffle | Repeat |
| ---------------------- | ------- | ------ |
| `Off`                  | off     | off    |
| `Repeat All`           | off     | all    |
| `Repeat One`           | off     | one    |
| `Shuffle`              | on      | off    |
| `Shuffle + Repeat All` | on      | all    |
| `Shuffle + Repeat One` | on      | one    |

`Repeat: Off/One/All` and `Shuffle: On/Off` each change only their own half and
carry the other setting across. `Repeat/Shuffle: Cycle Mode` steps through Repeat
One, Repeat All, Shuffle and Off.

## Media Library

Companion cannot open a native SMB file picker inside a module. For browsing files without typing full paths, expose the media folder over HTTP and set `Media Library HTTP Base URL`.

Example:

```text
http://192.168.1.50:8000/
```

The module scans directory listings and adds files to `Media Library: Play File`.

If your HTTP server allows direct playback but blocks directory listing with `403 Forbidden`, add filenames to `Media Library File List` instead:

```text
six.mp3
Meditation.mp3
folder/song.flac
```

You can also enter full HTTP URLs. Separate entries with commas or new lines.

You can also place an index file in the media folder. The module automatically tries these files:

```text
files.txt
index.txt
playlist.m3u
index.m3u
files.json
index.json
```

Example `files.txt`:

```text
six.mp3
Meditation.mp3
folder/song.flac
```

If the index file is somewhere else, enter its URL in `Media Library Index URL`.

Enable `Rescan Media Library Now` and press Save to refresh the file list immediately. The switch resets automatically after scanning.
Enable `Rescan Media Library On Save` to refresh the file list whenever you save other connection changes.
Enable `Auto Rescan Media Library` to refresh the file list automatically in the background. The default interval is 5 minutes.
Use `Media Library: Rescan Files` only if you want a separate Companion button for manual refresh.

Use `Media Library: Play Random File` to play a random file from the scanned library. Leave `Folder filter` blank for the whole library, or enter a relative folder such as `sleep/` to randomize only files under that folder.

Enable `Auto Random Next` to automatically play another random library file when the current HTTP media file naturally reaches the end. Use `Auto Random Folder Filter` to keep the automatic random selection inside one folder. If the filtered folder has only one file, that file will play again.

## Assisted Repeat One

Some WiiM firmware reports Repeat One for direct URL playback, but does not replay `CustomPushUrl` files when they end. Enable `Assist Repeat One for URL playback` to let Companion replay the last HTTP/HTTPS file when loop mode is Repeat One and playback naturally reaches the end.

## Notes

Artwork is exposed as a variable when the WiiM API provides `albumArtURI`. Lyrics, queue browsing, NAS/DLNA/Jellyfin/Music Assistant/Spotify browsing are not part of the stable WiiM HTTP API documented here; use Play URI or Custom Command where your service exposes a compatible URI or command.
