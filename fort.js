// Node Modules 
var sqwk = require('sqwk')

// Fort Modules
var sort_downloads = require('./lib/sort_downloads')
var scan_tv = require('./lib/scan_tv')

// Config
var config = require('./config')


// --------------------------------------------------
// Fort - Fetch and sort for media archives
// --------------------------------------------------

// Format the console output
sqwk.send([
	'{hr}',
	['{cyan}', 'Fort ', '- Fetch and sort for media archives'],
	'{hr}',
	['{magenta}', 'Download directory: ', config.download_directory],
	['{magenta}', 'TV directory: ', config.tv_directory],
	['{magenta}', 'Movies directory: ', config.movies_directory],
	'{hr}',
])

// Read the 3rd command line argument
var operation = process.argv[2]

if(operation == 'sort') {
	sort_downloads()
}
else if(operation == 'fetch') {
	console.log('Fetch')

}
else if(operation == 'scan') {
	scan_tv(function(err, list) {
		console.log(list)
	})
}
else {
	console.log('invalid operation %s', operation)
}