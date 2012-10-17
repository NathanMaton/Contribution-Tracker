var ElasticSearchClient = require('elasticsearchclient'),
  request = require('request'),
  url = require('url');

var apiKey = 'd7629613d1f41332b037a66125bdbbf0';

  request.get({uri: 'http://api.searchbox.io/api-key/'+apiKey+
    '/wapohack/docs/_search?size=100&q=calas.organizations:Soros OR calais.persons:Soros AND speaker:romney'}, function (err, r, b) {
  if (err) {
    console.log(err);
  }

  var o = JSON.parse(b);
if (o.hits) {
  o.hits.hits.forEach(function (res) {
    console.log({ speaker: res._source.speaker, calais: res._source.calais, date: res._source.date});
  });
}
else {
  console.log({ "err": "no results"});
}


});







