// Core modules
var p = require('path')

// Fort modules
var find_episode =  require('./find_episode')

// Config
var config = require('../config')

// Begin module
module.exports = function(episodes, callback) {

	var copy = []
	var extract = []
	
	// For each episode found
	for(var i in episodes) {
		
		episode = episodes[i]
		
		// If the episode is a directory
		if(episode.status == 'directory') {

			// If the directory contains a media file then add it to the copy array
			// Else if it contains an archive file add it to the extract array
			// A directory may contain both an archive and a media file 
			// in this instance only the media file is added
			find_episode(episode.path, function(err, media, archive) {
				
				if(err) callback(err)
				
				if(media) {
					episode.copy = media
					copy.push(episode)
				}
				else if(archive) {
					episode.extract = archive
					extract.push(episode)
				}
			})

		}
		// If the episode is an archive
		else if(episode.status == 'archive') {
			episode.extract =  p.join(config.download_directory, episode.file_name)
			extract.push(episode)
		}
		// If the episode is a media file
		else if(episode.status == 'file') {
			episode.copy = p.join(config.download_directory, episode.file_name)
			copy.push(episode)
		}

	} // end for

	callback(null, copy, extract)

}



