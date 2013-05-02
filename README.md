## About

A simple stream-based podcast fetcher and file splitter

## Installation

### On OSX

```
brew install sox
npm install
```

### Under Debian

```
sudo apt-get install sox
npm install
```

## Config

Create a sample config file ```config.yml```. 
Note: Feed keys are used for directory names, the can be picked freely.

```
path: downloads
age: 7
feeds:
  node: http://feeds.feedburner.com/NodeUp?format=xml
  atp: http://atp.fm/episodes?format=rss
```

## Run

```
node podfetch.js
```

## TODO

Make file splitting optional and it's length customizable