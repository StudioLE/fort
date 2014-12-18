// Core modules
var fs = require('fs')
var p = require('path')

// Node Modules 
var chalk = require('chalk')
var fse = require('fs-extra')

// Config
var config = require('../config')

// Begin module
module.exports = function(episode, callback) {
		
	console.log(chalk.red('Removing download ') + chalk.gray(episode.episode_title))

	// Delete download if enabled
	if(config.remove) {
		if(episode.status == 'directory' || episode.status == 'file') {
			remove = episode.path
		}
		else if(episode.status == 'archive') {
			// This will only delete the first .rar file
			// @todo Implement a method to delete .r00 to .r99
			remove = episode.path
		}
		else {
			console.log('Unsure how to delete')
			callback('Unsure how to delete')
		}

		fse.remove(remove, function(err){
			if(err) callback(err)
			console.log(chalk.green('Removed file ') + chalk.gray(episode.episode_title))
		})
	}
	else {
		console.log(chalk.yellow('Removing disabled in config'))
	}


	callback(null)

}