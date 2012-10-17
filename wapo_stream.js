#!/usr/bin/env node

var es = require('event-stream'),
    wapojson = require('./transcripts_wapo_510');
    transparency = require('./transparencydata');
    koch = require('./koch');

    var count = 0;
wapojson.objects.forEach(function (trans) {
  if (trans.speakers.length > 0) {
    var obj = {};
    var speaker = "";
    count++;
    trans.speakers.forEach(function (speaker) {
      if (speaker === '/politics/transcripts/api/v1/speaker/1/') {
        obj.speaker = 'obama';
      }
      if (speaker === '/politics/transcripts/api/v1/speaker/2/') {
        obj.speaker = 'romney';
      }
      obj.date = trans.date;
      obj.transcript = trans.text;
    });

    if (obj.speaker === 'obama' || obj.speaker === 'romney') {
      console.log(JSON.stringify(obj));
    }
  }
});

/*
//console.log(transparency[0].contributor_name);
var date = [];
var amount = [];
koch.forEach(function (data) {
  date.push(data.date);
  amount.push(data.amount);
});

console.log(date);
console.log(amount);
*/