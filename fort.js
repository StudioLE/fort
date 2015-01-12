// Node Modules 
var async = require('async')
var chalk = require('chalk')
var sqwk = require('sqwk')

// Fort Modules
//var sqwk.= require('./lib/sqwk.)
var read_downloads = require('./lib/read_downloads')
var read_tv = require('./lib/read_tv')
var match_show = require('./lib/match_show')
var prep_downloads = require('./lib/prep_downloads')
var move_downloads = require('./lib/move_downloads')
var extract_downloads = require('./lib/extract_downloads')

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

// Begin script
async.waterfall([

	// Read the download directory
	function(callback) {

		read_downloads(config.download_directory, function(err, episodes, ignored) {
			callback(err, episodes, ignored)
		})

	},

	// Match downloads to TV shows
	function(episodes, ignored, callback) {
		
		read_tv(config.tv_directory, function(err, shows) {
			match_show(shows, episodes, ignored, function(error, episodes) {
				callback(err, episodes, ignored)
			})
		})

	},

	// Decide what needs to be copied or extracted
	function(episodes, ignored, callback) {

		prep_downloads(episodes, ignored, function(err, copy, extract, ignored) {

			if(config.log_intent) {

				// Copy
				for(var i in copy) {
					sqwk.send([['{green}', 'Copy:', copy[i].episode_title]])
					//if(config.detailed_information) console.log(copy[i])
				}

				// Extract
				for(var i in extract) {
					sqwk.send([['{cyan}', 'Extract:', extract[i].episode_title]])
					//if(config.detailed_information) console.log(extract[i])
				}

				// Ignore
				for(var i in ignored) {
					sqwk.send([['{yellow}', 'Ignore:', ignored[i].file_name + ' (' + ignored[i].ignored + ')']])
					if(config.detailed_information) console.log(ignored[i])
				}

				sqwk.send(sqwk.hr())
			}

			callback(err, copy, extract, ignored)
		})

	},

	// Move episodes
	function(copy, extract, ignored, callback) {

		move_downloads(copy, function(err) {
			callback(err, extract, ignored)
		})

	},

	// Extract episodes
	function(extract, ignored, callback) {

		extract_downloads(extract, function(err) {
			callback(err, ignored)
		})
	}

],
function(err, ignored) {

	if(err) throw err

	sqwk.send()
})