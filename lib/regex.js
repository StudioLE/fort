module.exports = {

	// Match .rar extensions
	archive: RegExp('\\.rar$'),

	// Match .mkv extensions
	media: RegExp('\\.mkv$'),

	// Match S00E00 season format
	S00E00: RegExp(/([.a-z]*).[s](\d+)[e](\d+)/i),

	// Match 0x00 season format
	x00: RegExp(/([.a-z]*).(\d+)[x](\d+)/i)

}