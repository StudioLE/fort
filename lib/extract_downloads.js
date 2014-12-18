// Core modules
var fs = require('fs')
var p = require('path')

// Node Modules 
var async = require('async')
var chalk = require('chalk')
var Zip = require('node-7z')

// Fort Modules
var remove_download = require('./remove_download')

// Config
var config = require('../config')

// Begin module
module.exports = function(extract, callback) {

	// For each episode in download directory
	async.each(extract, function(episode, next) {

		// Combine the destination directory with the basename of the media file
		// @todo System to rename media files if desired ?
		//episode.destination = p.join(episode.destination, p.basename(episode.copy))

		// Inform the console
		console.log(chalk.blue('Extracting episode ') + chalk.gray(episode.episode_title))

		// Perform extract if enabled
		if(config.write) {
			var unrar = new Zip();

			console.log(episode.extract, episode.destination)
			
			unrar.extractFull(episode.extract, episode.destination)

			// Equivalent to `on('data', function (files) { // ... })`
			.progress(function(files) {
				console.log('Some files are extracted: %s', files)
			})

			// When all is done
			.then(function() {
				// Inform user
				console.log(chalk.green('Extracted episode ') + chalk.gray(episode.episode_title))

				remove_download(episode, function() { })
			})

			// On error
			.catch(function(err) {
				console.log(err)
				callback(err)
			});
		}
		else {
			console.log(chalk.yellow('Writing disabled in config'))
		}
		next(null)

	}, function(err) {
		if(err) {
			console.log(chalk.red('Extracting failed'))
			callback(err)
		}
		else {
			//console.log(chalk.green('Copying complete'))
			callback(null)
		}
	})

	
}