module.exports = {

	// ---------------------------------------
	// Custom settings
	// ---------------------------------------

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
			title: '10 green bottles (web series)',
			change_to: '10 Green Bottles'
		},
		{
			title: 'the show 2009',
			change_to: 'the show'
		},
	],


	// ---------------------------------------
	// Development settings
	// ---------------------------------------

	// Enable move operations
	move: true,

	// Enable extract operations
	extract: false,

	// Enable remove operations
	remove: false,

	// Would you like to see intensions in console.log?
	log_intent: false,

	// Show all known information about file. Requires log_intent true
	detailed_information: false

	// Keywords that will be ignored when matching titles
	// @todo implement feature?
	//ignored_keyword: [ 'the', 'and', 'an', 'a', 'in', 'of' ]

}