// Core modules
var fs = require('fs')
var p = require('path')

// Node Modules 
var async = require('async')
var chalk = require('chalk')
var fse = require('fs-extra')

// Fort Modules
var remove_download = require('./remove_download')

// Config
var config = require('../config')

// Begin module
module.exports = function(copy, callback) {

	// For each episode in download directory
	async.each(copy, function(episode, next) {

		// Combine the destination directory with the basename of the media file
		// @todo System to rename media files if desired ?
		episode.destination = p.join(episode.destination, p.basename(episode.copy))

		// Inform the console
		//console.log(chalk.green('Moving episode ') + chalk.gray(episode.copy + ' to ' + episode.destination))
		console.log(chalk.green('Moving episode ') + chalk.gray(episode.episode_title))
		
		// Perform copy if enabled
		if(config.write) {
			fse.move(episode.copy, episode.destination, function(err) {
				if(err){
					if (err.code === 'EEXIST') {
						console.log(chalk.yellow('Episode already exists ') + chalk.gray(episode.episode_title));
					}
					else {
						callback(err)
					}
				}
				else {

					// Inform user
					console.log(chalk.green('Moved episode ') + chalk.gray(episode.episode_title))
				}

				remove_download(episode, function() {

				})

			}) // fse.copy
		}
		else {
			console.log(chalk.yellow('Writing disabled in config'))
		}
		next(null)

	}, function(err) {
		if(err) {
			console.log(chalk.red('Moving failed'))
			callback(err)
		}
		else {
			//console.log(chalk.green('Copying complete'))
			callback(null)
		}
	})

	
}