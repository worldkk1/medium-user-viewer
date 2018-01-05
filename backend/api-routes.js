var express = require('express');
var medium = require('medium-sdk');

var app = module.exports = express.Router();
var client = new medium.MediumClient({
  clientId: 'bfd5f510809e',
  clientSecret: '988e2718d4fe4cb78fd936333f5e4ee73b40bb59'
});
var redirectURL = 'http://127.0.0.1:4200/callback/medium';

app.post('/api/medium/init', function(req, res) {
  console.log('=========/api/medium/init=========');
  var url = client.getAuthorizationUrl('secretState', redirectURL, [
    medium.Scope.BASIC_PROFILE, medium.Scope.LIST_PUBLICATIONS
  ])

  res.status(200).send({
    url: url
  });
});

app.get('/testkk', function(req, res) {
  console.log('=========test-api=========');
  res.status(200).send('kk');
});
