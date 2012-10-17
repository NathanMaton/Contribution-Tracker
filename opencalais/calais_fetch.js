var Calais = require('calais').Calais;

var calais = new Calais('b5aramfr9xtq6n7vymp5b2h3');
calais.set('content', 'The Federal Reserve is the enemy of Ron Paul.');
calais.fetch(function(err, result) {
  console.log(result);
});