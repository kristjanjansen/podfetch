var fs = require('fs')
var path = require('path')
var spawn = require('child_process').spawn

var request = require('request')
var moment = require('moment')
var fp = require('feedparser')
require('js-yaml');

var config = require('./config.yml')

var feeds = []
for (var key in config.feeds) {
  feeds.push({id: key, url: config.feeds[key]})
}

feeds.forEach(function(item) {
 
  request(item.url)
    .pipe(new fp())
    .on('article', function(article) {

      var date = moment(article.date)

      var dir = item.id + '-' + date.format('DMMM')
      var fulldir = path.join(config.path, dir)
      var length = 300


      if (date.isAfter(moment().subtract(config.age, 'days')) && !fs.existsSync(fulldir)) {
        console.log('Fetching ' + fulldir)
        fs.mkdirSync(fulldir)    
        var split = spawn(
          'sox', 
          ['-t', 'mp3', '-', path.join(fulldir, dir + '-%2n') + '.mp3', 'trim', '0', length, ':', 'newfile', 'restart'],
          ['pipe']
        )
        split.on('close', function () {
          console.log('Done with ' + fulldir)
        });
        request(article.enclosures[0].url).pipe(split.stdin)    
    }
      
  })
})
