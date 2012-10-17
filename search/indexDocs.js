var ElasticSearchClient = require('elasticsearchclient'),
  request = require('request'),
  url = require('url');

var apiKey = 'd7629613d1f41332b037a66125bdbbf0';
var connectionString = url.parse('http://api.searchbox.io/api-key/'+apiKey+'/');

var serverOptions = {
   host:connectionString.hostname,
   path:connectionString.pathname
};

var elasticSearchClient = new ElasticSearchClient(serverOptions);

  var qryObj = {
    "query":{
      "query_string":{
          "name":"Gates"
        },
      "facets" : {
        "tags" : { "terms" : {"organizations" : "Koch", "persons": "Koch"} }
      }
    }
  };
var sample = { "name":"First" };

// add doc to index
var docs = require('./allWapoHackDocs');

docs.rows.forEach(function (item) {
request.get('https://jlank.iriscouch.com/wapohack/' + item.id, function (err, re, body) {
  body = JSON.parse(body);
  delete body.id;
  delete body._id;
  delete body._rev;
  delete body.rev;
  request.post({uri: 'http://api.searchbox.io/api-key/'+apiKey+'/wapohack/docs/', json: body }, function (e, r, b) {
    if(e) { console.log(e); }
    console.log(b);
  });
});
});


/*
// search index
  request.get({uri: 'http://api.searchbox.io/api-key/'+apiKey+'/wapohack/docs/_search', qs: qryObj }, function (err, r, b) {
  if (err) {
    console.log(err);
  }

  //console.log(JSON.parse(JSON.stringify(b,null,2)));
  console.log(b);

});

*/






