module.exports = {

	// TV Show directory (or drive)
	tv_directory: 'M:\\TV',

	// Movie directory (or drive)
	movies_directory: 'M:\\Movies',

	// Download directory (or drive)
	download_directory: 'C:\\Users\\LE\\Downloads\\FTP',

	// Episodes with titles matching 'title' will be renamed to 'change_to'
	// Use lower case for 'title'
	show_aliases: [
		{
			title: 'castle',
			change_to: 'Castle 2009'
		}
	],

	// Would you like to see intensions in console.log?
	log_intent: false,

	// Allow write
	write: true,

	// Allow delete
	remove: true

	// Keywords that will be ignored when matching titles
	// @todo implement feature?
	//ignored_keyword: [ 'the', 'and', 'an', 'a', 'in', 'of' ]

}