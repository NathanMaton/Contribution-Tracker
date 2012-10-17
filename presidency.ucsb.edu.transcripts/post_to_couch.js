#!/usr/bin/env node

var request = require('request');
var es = require('event-stream');
var async = require('async');


var func = function (task, callback) {
  var obj = JSON.parse(task);
  // ALERT!!! this is for the wapo transcript dates, comment out for scraped data
  obj.date = obj.date.split('-');
  // END ALERT
  request.post({ uri: 'http://wapohack:wapohack@jlank.iriscouch.com/wapohack/', json: obj }, function (err, res, body) {
    if (err) {
      console.log('err:' + err);
      process.exit(1);
    }
    else {
      console.log(body);
      callback();
    }
  });
};

var q = async.queue(func, 10);

var line = es.map(function (data, callback) {
  q.push(data);
  callback();
});

process.stdin.resume();
process.stdin.pipe(es.split()).pipe(line);
