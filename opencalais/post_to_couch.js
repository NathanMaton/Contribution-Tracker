#!/usr/bin/env node

var request = require('request');
var es = require('event-stream');
var async = require('async');
var JSONStream = require('JSONStream');

var Calais = require('calais').Calais;



var parser = JSONStream.parse(['rows', true]),
  req = request({url: 'http://isaacs.couchone.com/registry/_all_docs'}),
  logger = es.mapSync(function (data) {
      console.error(data);
      return data;
    });

var objList = es.map(function (data, callback) {
  //console.log(data);
/*
  request.get(baseUrl + data.id, function (e, r, body) {
    console.log(body.transcript);
    process.exit(1);
  });
*/
  //console.log(data.value.transcript);
  var calais = new Calais('fe3gyf8xvtm2a5bxftzymg8d');
  calais.set('content', data.value.transcript);
  calais.fetch(function(err, result) {
    console.log(baseUrl + data.id + '?rev=' + data.value._rev);
    console.log(result);
    callback();
  });

});

/*
var slowDown = es.map(function (d, callback) {
  setInterval(callback, 1000);
});
*/
var pickOC = function (ocData) {
  var org = [];
  var per = [];
  var ind = [];
//console.log(ocData);
  if (ocData && (!ocData.error)) {
    ocData.forEach(function (ent) {
      if(ent._type === 'IndustryTerm') {
        ind.push(ent.name);
      }
      if(ent._type === 'Person') {
        per.push(ent.name);
      }
      if(ent._type === 'Organization') {
        org.push(ent.name);
      }
    });
    return { organizations: org, persons: per, industry: ind };
  }
  else {
    return {};
  }
};

//test url
//var baseUrl = 'https://wapohack:wapohack@jlank.iriscouch.com/wapotranscript/';
var baseUrl = 'https://wapohack:wapohack@jlank.iriscouch.com/wapohack/';

var func = function (data, callback) {

  var calais = new Calais('fe3gyf8xvtm2a5bxftzymg8d');
  if (data.value.transcript !== '') {
  var content = data.value.transcript;
  if (content.length > 100000) {
    content = data.value.transcript.substring(0, 95000);
  }
  calais.set('content', content);
  calais.fetch(function(err, result) {
    var postUrl = baseUrl + data.id + '?rev=' + data.value._rev;
    var newDoc = {};
    //data.calais = result;
//console.log(data.value);
    newDoc.calais = pickOC(result);
    newDoc.id = data.id;
    newDoc.speaker = data.value.speaker;
    newDoc.transcript = data.value.transcript;
    newDoc.date = data.value.date;
    //console.log(newDoc);
    //callback();
    request.put({ uri: postUrl, json: newDoc }, function (err, res, body) {
      if (err) {
        console.log('error pushing: ' + postUrl);
      }
      else {
        console.log(body);
        callback();
      }
    });
    //process.exit(1);
  });
  }


/*
  var obj = JSON.parse(task);
  console.log(task);
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
*/
};

var q = async.queue(func, 4);

var line = es.map(function (data, callback) {
  q.push(data);
  callback();
});

process.stdin.resume();
process.stdin.pipe(parser).pipe(line);
//process.stdin.pipe(parser).pipe(slowDown).pipe(objList);
