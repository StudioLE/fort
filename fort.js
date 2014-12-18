// Node Modules 
var async = require('./node_modules/async')
var chalk = require('chalk')

// Fort Modules
var read_downloads = require('./lib/read_downloads')
var read_tv = require('./lib/read_tv')
var match_show = require('./lib/match_show')
var prep_downloads = require('./lib/prep_downloads')

// Config 
var config = require('./config')


// --------------------------------------------------
// Fort - Fetch and sort for media archives
// --------------------------------------------------

var out = []
var hr = chalk.gray('--------------------------------------------------')

// Format the console output
out.push(hr)
out.push(chalk.cyan.bold('Fort ') + chalk.gray('- Fetch and sort for media archives'))
out.push(hr)
out.push(chalk.magenta('Download directory: ') + chalk.gray(config.download_directory))
out.push(chalk.magenta('TV directory: ') + chalk.gray(config.tv_directory))
out.push(chalk.magenta('Movies directory: ') + chalk.gray(config.movies_directory))
out.push(hr)

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

			// Copy
			for(var i in copy) {
				out.push(chalk.green('Copy: ') + chalk.gray(copy[i].copy))
			}

			// Extract
			for(var i in extract) {
				out.push(chalk.cyan('Extract: ') + chalk.gray(extract[i].extract))
			}

			// Ignore
			for(var i in ignored) {
				out.push(chalk.yellow('Ignore: ') + chalk.gray(ignored[i].file_name + ' (' + ignored[i].ignored + ')'))
			}

			callback(err, copy, extract, ignored)
		})

	}

],
function(err, copy, extract, ignored) {

	if(err) throw err;

	// Log the output
	for(var i in out) console.log(out[i])
})