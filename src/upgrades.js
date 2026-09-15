// Config/action migrations, applied when an existing instance is loaded after a
// module update. Empty until the first breaking change to the config shape.
//
// Note: base v2 removed runEntrypoint and expects a default export for the
// instance class, but ships no manifest field or InstanceBase member for upgrade
// scripts -- the host reads them off its own instance context. A named export
// from the entrypoint is the only remaining channel, so main.js re-exports this
// as `upgradeScripts`. Confirm that against Companion's module loader before
// relying on a real migration here.
export default []
