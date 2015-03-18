// Core modules
var fs = require('fs')
var p = require('path')

// Node Modules 
var async = require('async')

// Fort Modules
var read_downloads = require('./read_downloads')
var read_tv = require('./read_tv')
var match_show = require('./match_show')
var prep_downloads = require('./prep_downloads')
var move_downloads = require('./move_downloads')
var extract_downloads = require('./extract_downloads')

// Config
var config = require('../config')
var regex = require('./regex')

// Begin module
module.exports = function(end) {

	async.waterfall([

		// Read the download directory
		function(callback) {

			read_tv(config.tv_directory, function(err, shows) {
				if(err) return callback(err)

				var list = {}
				var ignored = []
				
				console.log(shows)

				callback(false, shows, list, ignored)
			})
			

		},

		// for each show
		function(shows, list, ignored, callback) {

			shows.forEach(function(show) {
				show_dir = p.join(config.tv_directory, show)
				if(fs.lstatSync(show_dir).isDirectory()) {
					season_dirs = fs.readdirSync(show_dir)
					list[show] = {}

					current = {
						path: show_dir,
						show: show
					}

					callback(false, current, season_dirs, list, ignored)

				}
				else {
					ignored.push(show_dir)
				}

				
			})
			

		},

		// for each season
		function(current, season_dirs, list, ignored, callback) {

			season_dirs.forEach(function(season) {
				season_dir = p.join(current.path, season)
				if(fs.lstatSync(season_dir).isDirectory()) {
					episodes = fs.readdirSync(season_dir)
					list[current.show][season] = []

					next = {
						path: season_dir,
						show: current.show,
						season: season
					}

					callback(false, next, episodes, list, ignored)
				}
				else {
					ignored.push(season_dir)
				}
			})

		},

		// for each episode
		function(current, episodes, list, ignored, callback) {
			
			episodes.forEach(function(episode, callback3) {
				episode_path = p.join(current.path, episode)
				if(fs.lstatSync(episode_path).isDirectory()) {
					episodes = fs.readdirSync(episode_path)

					//list[current.show][current.season].push(episode)
					console.log('final is directory')
				}
				else if(regex.S00E00.test(episode_path) || regex.x00.test(episode_path)) {
					se = regex.S00E00.exec(episode_path)

					if( ! se) {
						se = regex.x00.exec(episode_path)
					}

					//console.log(se)

					list[current.show][current.season].push(se[3])

					
				}
				else {
					

					// for each episode
					ignored.push(episode)
				}

				callback(false, list)
			})
			
		}

	],
	function(err, list) {

		if(err) throw err
		//sqwk.send('end')
	
		process.on('exit', function () {
			console.log(list)
		})

	})


	







}