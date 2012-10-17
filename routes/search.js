#!/usr/bin/env node

var es = require('event-stream');
var request = require('request');

exports.search = function (req, res) {
  var results = [];
  var callback = req.query.callback;
  var query = req.query.query;
  var candidate = req.query.candidate.toLowerCase();

  if (req.query.query && req.query.candidate) {
  request.get('https://jlank.iriscouch.com/wapohack/_design/lists/_view/by_speaker_person_date?startkey=[%22'+candidate+'%22,%22'+req.query.query+'%22,{}]&endkey=[%22'+candidate+'%22,%22'+req.query.query+'%22]&descending=true',
  function (err, r, body) {
    if (err) {
      console.log(err);
    }
    else {
      var obj = JSON.parse(body);
      obj.rows.forEach(function (data) {
        results.push(data);
      });

      if (!req.query.callback) {
        res.send(results);
      }
      else {
        res.send(callback + '(' + JSON.stringify(results) + ')');
      }
    }
  });
  }
};

exports.search2 = function (req, res) {

var  request = require('request'),
  url = require('url');

var query = req.query.query;
var candidate = req.query.candidate;
//console.log(query);
//console.log(candidate);

var apiKey = 'd7629613d1f41332b037a66125bdbbf0';

var stri = 'http://api.searchbox.io/api-key/'+apiKey+ '/wapohack/docs/_search?size=100&q=calas.organizations:'+query+' OR calais.persons:'+query+' AND speaker:' + candidate;


  request.get({uri: stri, timeout: 2000}, function (err, r, b) {
  if (err) {
    console.log(err);
  }

  var o = JSON.parse(b);
  var resp = []
  console.log(o.hits.total);
if (o.hits && o.hits.total > 0) {
  o.hits.hits.forEach(function (resu) {
    resp.push({ speaker: resu._source.speaker, calais: resu._source.calais, date: resu._source.date});
    //console.log(resp);
  });
    if (!req.query.callback) {
      res.send(resp);
    }
    else {
      res.send(req.query.callback + '(' + JSON.stringify(resp) + ')');
    }
}
else {
  res.send(req.query.callback + '(' + JSON.stringify({ "err": "no results"}) + ')');
}


});








}