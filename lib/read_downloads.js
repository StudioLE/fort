// Core modules
var fs = require('fs')
var p = require('path')

// Fort modules
var episode_info =  require('./episode_info')

// Config
var regex = require('./regex')

// Begin module
module.exports = function(dir_path, callback) {

	// Read the download directory
	fs.readdir(dir_path, function(err, files) {

		if(err) {
			callback(err)
		}
		else {

			var episodes = []
			var ignored = []

			// For each item in download directory
			for(var i in files) {

				var file_name = files[i]
				var path = p.join(dir_path, file_name)

				// If directory
				if(fs.lstatSync(path).isDirectory() && (regex.S00E00.test(file_name) || regex.x00.test(file_name))) {
					episode_info(path, function(err, info) {
						info.status = 'directory'
						episodes.push(info)
					})
				}
				// If media file
				else if(regex.media.test(file_name)) {
					episode_info(path, function(err, info) {
						info.status = 'file'
						episodes.push(info)
					})
				}
				// If archive file
				else if(regex.archive.test(file_name)) {
					episode_info(path, function(err, info) {
						info.status = 'archive'
						episodes.push(info)
					})
				}
				// Must be something else
				else {
					ignored.push({
						file_name: file_name,
						ignored: 'Not an episode'
					})
				}
				
			} // end for
			
			callback(null, episodes, ignored)

		} // end else

	})
}