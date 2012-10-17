#!/usr/bin/env node

var es = require('event-stream'),
    koch = require('../koch');

exports.amount = function (req, res) {
  var amount = [];
  var callback = req.query.callback;

  koch.forEach(function (data) {
    amount.push(data.amount);
  });

  if (!req.query.callback) {
    res.send(amount);
  }
  else {
    res.send(callback + '(' + JSON.stringify(amount) + ')');
  }
};