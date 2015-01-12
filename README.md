# Fort: Fetch & Sort

Take the effort out of sorting your media library.

Fort sorts through your downloads directory looking for TV episodes, it will then match the show title to directories within your TV shows directory. If the show title matches Fort will move the file into the appropriate season directory.

Fort currently only supports media files but future releases will also allow extraction of `.rar`. Fort also aims to one day automate the process of downloading episodes from your server.

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

## Usage

Add a single colour to the log
```
node fort
```

## Methodology

Some inspiration was drawn from the [Automatic Transfer Script](http://matt.coneybeare.me/automatically-sorting-downloaded-television-e/) written in Ruby by Matt Coneybeare.

Methodology is simple.

1. Read downloads folder 
2. Identify TV episodes using regular expressions
3. Match downloaded show title to directory in TV show directory
4. Move / extract file to TV show directory
