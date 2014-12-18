// Node Modules 
var async = require('./node_modules/async')
var chalk = require('chalk')

// Fort Modules
var read_downloads = require('./lib/read_downloads')
var prep_downloads = require('./lib/prep_downloads')

// Config 
var config = require('./config')

// Begin script
async.waterfall([

	function(callback) {

		read_downloads(config.download_directory, function(err, episodes, ignored) {
			callback(err, episodes, ignored)
		})

	}, 

	function(episodes, ignored, callback) {

		prep_downloads(episodes, function(err, copy, extract) {
			callback(err, copy, extract, ignored)
		})

	}

],
function(err, copy, extract, ignored) {

	if(err) throw err;

	var out = []
	var hr = chalk.gray('------------------------------------------------')

	out.push(hr)
	out.push(chalk.cyan.bold('Fort ') + chalk.gray('- Fetch and sort for media archives'))
	out.push(hr)
	out.push(chalk.blue('Download directory: ') + chalk.gray(config.download_directory))
	out.push(chalk.blue('TV directory: ') + chalk.gray(config.tv_directory))
	out.push(chalk.blue('Movies directory: ') + chalk.gray(config.movies_directory))
	out.push(hr)
	
	// Copy
	for(var i in copy) {
		out.push(chalk.green('Copy: ') + chalk.gray(copy[i].copy))
	}

	// Extract
	for(var i in extract) {
		out.push(chalk.magenta('Extract: ') + chalk.gray(extract[i].extract))
	}

	// Ignore
	for(var i in ignored) {
		out.push(chalk.yellow('Ignore: ') + chalk.gray(ignored[i]))
	}

	// Log the output
	for(var i in out) console.log(out[i])
})