// Core modules
var fs = require('fs')
var p = require('path')

// Node Modules 
var async = require('async')
var chalk = require('chalk')
var fse = require('fs-extra')

// Config
var config = require('../config')

// Begin module
module.exports = function(remove, callback) {

	// For each episode in download directory
	async.each(remove, function(episode, next) {

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
			
			console.log(chalk.red('Removing download ') + chalk.gray(episode.episode_title))

			// While testing we're going to remove the file we just created. In reality we'd remove the download
			var remove = 'C:\\Users\\LE\\Downloads\\FTP\\DELETE THIS DIRECTORY'

			// fse.remove(remove, function(err){
			// 	if(err) callback(err)
			// 	console.log(chalk.green('Removed file ') + chalk.gray(episode.episode_title))
			// })
		} // end if

	}, function(err) {
		if(err) {
			console.log(chalk.red('Removing failed'))
			callback(err)
		}
		else {
			callback(null)
		}
	})

}