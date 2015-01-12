# Fort; Fetch & Sort

Take the effort out of sorting your media library.

Fort sorts through your downloads directory looking for TV episodes, it will then match the show title to directories within your TV shows directory. If the show title matches Fort will move the file into the appropriate season directory.

Fort currently only supports media files but future releases will also allow extraction of `.rar`. Fort also aims to one day automate the process of downloading episodes from your server.

## Methodology

The application follows MVC principles:

- All data is read and written through functions within the util module `./lib/util.js`. The data is stored within a JSON file.
- The view is located at `./views/log.mst` written in HTML5 using mustache templating
- Three controllers provide the operations, these are `./lib/add.js`, `./lib/server.js` and `./lib/clear.js`

Each operation is accessed through `./colour-challenge.js` which acts as the command line interface.

To log the data hourly `node colour-challenge add` should be defined as a cron job and the server can either be spun up when required or could be kept running constantly using a package such as [forever](https://github.com/foreverjs/forever).

## Installation

The application requires Node.js and npm to be installed, instructions can be found at [nodejs.org](http://nodejs.org/). Then follow one of the three methods below to download the application.

##### Git Clone
```
git clone https://github.com/StudioLE/fort.git fort
cd fort
npm update
```

##### NPM (CURRENTLY UNSUPPORTED)
```
npm install -g fort
```

##### Manual

- Download the [latest zip from GitHub](https://github.com/StudioLE/fort/archive/master.zip) and extract to a clean directory
- Then run `npm update` within the directory

## Configuration

Once installed ensure to add paths to your media directories in the `./config.js` file.

### Usage

Add a single colour to the log
```
node fort
```