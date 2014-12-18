// Core modules
var fs = require('fs')

// Node Modules
var _ = require('underscore')

// Config
var config = require('../config')
var regex = require('./regex')

// Begin module
module.exports = function(path, callback) {

	var info = {
		file_name: path.substr(config.download_directory.length + 1),
		path: path,
		show_title: null,
		season: null,
		episode: null
	}

	// Detemine season and episode
	var se = regex.S00E00.exec(path)
	if( ! se) se = regex.x00.exec(path)

	if(se) {
		info.show_title = se[1].replace(/[.]/g, ' ')

		// if there is an alternate alias for the show title 
		alias = _.findWhere(config.show_aliases, { 
			title: info.show_title.toLowerCase()
		})
		if(alias) {
			info.show_title = alias.change_to
		}

		info.season = se[2]
		info.episode = se[3]

		callback(null, info)
	}
	// If not recognised as a TV show
	else {
		callback('Not a TV show', info)
	}

}