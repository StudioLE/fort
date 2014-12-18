// Node Modules 
var async = require('./node_modules/async')

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
		
	console.log('THESE FILES WILL BE COPIED')
	for(var i in copy) {
		console.log(copy[i].copy)
	}

	console.log('THESE FILES WILL BE EXTRACTED')
	for(var i in extract) {
		console.log(extract[i].extract)
	}

	console.log('THESE FILES ARE BEING IGNORED')
	for(var i in ignored) {
		console.log(ignored[i])
	}
})