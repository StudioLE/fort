// Node Modules 
var _ = require('underscore')
var async = require('async')

// Begin module
module.exports = function(shows, episodes, ignored, callback) {

	var keep_episodes = []
	
	// For each episode in download directory
	async.each(episodes, function(episode, next) {

		// If the episode.show_title is in the shows list
		if(_.contains(shows, episode.show_title)) {
			keep_episodes.push(episode)
		}
		// Else add it to ignored
		else {
			episode.ignored = 'Show not in TV directory';
			ignored.push(episode)
		}

		next()

	}, function(err) {
		callback(err, keep_episodes, ignored)
	});
}