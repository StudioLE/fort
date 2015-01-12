module.exports = {

	// Match .rar extensions
	archive: RegExp('\\.rar$'),

	// Match .mkv extensions
	media: RegExp('\\.mkv$'),

	// Match S00E00 season format
	S00E00: RegExp(/([ _.a-z0-9]*).[s](\d+)[e](\d+)/i),

	// Match 0x00 season format
	x00: RegExp(/([ _.a-z0-9]*?).(\d+)[x](\d+)/i),

	// Replace characters in show title
	title_replace: /[_.]/g
}