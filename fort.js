// Node Modules 
var async = require('async')
var chalk = require('chalk')

// Fort Modules
var out = require('./lib/out')
var read_downloads = require('./lib/read_downloads')
var read_tv = require('./lib/read_tv')
var match_show = require('./lib/match_show')
var prep_downloads = require('./lib/prep_downloads')
var move_downloads = require('./lib/move_downloads')

// Config 
var config = require('./config')


// --------------------------------------------------
// Fort - Fetch and sort for media archives
// --------------------------------------------------

var hr = '--------------------------------------------------'

// Format the console output
out.ln([
	hr,
	chalk.cyan('Fort ') + '- Fetch and sort for media archives',
	hr,
	chalk.magenta('Download directory: ') + config.download_directory,
	chalk.magenta('TV directory: ') + config.tv_directory,
	chalk.magenta('Movies directory: ') + config.movies_directory,
	hr
])

out.send()

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
				// console.log(shows)
				// console.log(episodes)
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
					out.ln(chalk.green('Copy: ') + copy[i].copy)
				}

				// Extract
				for(var i in extract) {
					out.ln(chalk.cyan('Extract: ') + extract[i].extract)
				}

				// Ignore
				for(var i in ignored) {
					out.ln(chalk.yellow('Ignore: ') + ignored[i].file_name + ' (' + ignored[i].ignored + ')')
				}
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

		// @todo this must be called directly after the move operation otherwise it will delete content too early
		// remove_downloads(remove, function(err, remove) {
		// 	callback(err, copy, extract, ignored, remove)
		// })

	}

],
function(err, copy, extract, ignored, remove) {

	if(err) throw err

	// Log the output
	out.send()
})