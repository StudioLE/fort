// Core modules
var fs = require('fs')
var p = require('path')

// Config
var regex = require('./regex')

// Begin module
module.exports = function(dir_path, callback) {

	// Read the directory
	// @todo can this become async without breaking the application?
	files = fs.readdirSync(dir_path)

	var media = null
	var archive = null

	// For each item in download directory
	for(var i in files) {

		var file_name = files[i]
		//console.log(file_name)

		// If media file
		if(regex.media.test(file_name)) {
			media = p.join(dir_path, file_name)
		}

		// If archive file
		if(regex.archive.test(file_name)) {
			archive = p.join(dir_path, file_name)
		}
		
	} // end for
	
	// console.log(media, archive)
	
	callback(null, media, archive)
}