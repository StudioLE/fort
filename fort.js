// Fort Modules
var read_downloads = require('./lib/read_downloads');
var prep_downloads = require('./lib/prep_downloads');

// Config 
var config = require('./config');

//var dirname = process.argv[2];
//var ext = process.argv[3];

// Read the download directory and return info for each episode found
read_downloads(config.download_directory, function(err, episodes, ignored) {

	prep_downloads(episodes, function(err, copy, extract) {
		
		console.log('THESE FILES WILL BE COPIED');
		for(var i in copy) {
			console.log(copy[i].copy);
		}

		console.log('THESE FILES WILL BE EXTRACTED');
		for(var i in extract) {
			console.log(extract[i].extract);
		}

		console.log('THESE FILES ARE BEING IGNORED');
		for(var i in ignored) {
			console.log(ignored[i]);
		}
	});
});