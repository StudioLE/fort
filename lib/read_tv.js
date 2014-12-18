// Core modules
var fs = require('fs')
var p = require('path')

// Config
var config = require('../config')

// Begin module
module.exports = function(dir_path, callback) {

	// Read the TV directory
	fs.readdir(dir_path, function(err, files) {

		if(err) {
			callback(err)
		}
		else {

			var shows = []

			// For each item in tv directory
			for(var i in files) {

				var file_name = files[i]
				var path = p.join(dir_path, file_name)

				// If directory
				if(fs.lstatSync(path).isDirectory()) {
					shows.push(file_name)
				}
				
			} // end for
			
			callback(null, shows)

		} // end else

	})
}