var express = require('express');
var medium = require('medium-sdk');
// var promise = require('promise');

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

app.post('/api/medium/user', function(req, res) {
  console.log('=========/api/medium/user=========');
  if (req.body) {
    var authen_code = req.body.authen_code;
    console.log('authen_code: '+authen_code);
    client.exchangeAuthorizationCode(authen_code, redirectURL, function (err, token) {
      client.getUser(function (err, user) {
        res.status(200).send(user);
      })
    })
  }
  // res.status(200).send({url: 'dd'});
});

// app.post('/api/medium/pub', function(req, res) {
//   console.log('=========/api/medium/pub=========');
//   if (req.body) {
//     var authen_code = req.body.authen_code;
//     var user_id = req.body.user_id;
//     var pubsCon = [];
//     var promises = [];
//     console.log('userId: '+user_id);
//     client.exchangeAuthorizationCode(authen_code, redirectURL, function (err, token) {
//       client.getPublicationsForUser({userId: user_id}, function (err, data) {
//         // console.log('data: '+JSON.stringify(data));
//         // client.getContributorsForPublication({publicationId: data[3].id}, function(err, data2) {
//         //   // console.log('data2 '+JSON.stringify(data2));
//         //   console.log(data2[userId]);
//         // })
//         for (i in data) {
//           client.getContributorsForPublication({publicationId: data[i].id}, function(err, data2) {
//             for (j in data2) {
//               if (user_id === data2[j].userId) {
//                 console.log('match: '+data2[j].userId);
//                 pubsCon.push(data2[j].publicationId);
//                 break;
//               }
//             }
//             console.log('publicationId: '+pubsCon);
//             // res.status(200).send(data);
//           })
//           console.log(i+': '+data[i].name);
//         }
//         console.log('ddd');
//         res.status(200).send(data);
//       })
//     })
//   }
// });
app.post('/api/medium/pub', function(req, res) {
  console.log('=========/api/medium/pub=========');
  if (req.body) {
    var authen_code = req.body.authen_code;
    var user_id = req.body.user_id;
    var pubsCon = [{id: '2506ecfa972f', role: 'test'}];
    var promises = [];
    console.log('userId: '+user_id);
    client.exchangeAuthorizationCode(authen_code, redirectURL, function (err, token) {
      client.getPublicationsForUser({userId: user_id}, function (err, data) {
        // console.log('data: '+JSON.stringify(data));
        // client.getContributorsForPublication({publicationId: data[3].id}, function(err, data2) {
        //   // console.log('data2 '+JSON.stringify(data2));
        //   console.log(data2[userId]);
        // })
        for (i in data) {
          promises.push(new Promise(function(resolve, reject) {
            client.getContributorsForPublication({publicationId: data[i].id}, function(err, data2) {
              for (j in data2) {
                if (user_id === data2[j].userId) {
                  console.log('data2: '+JSON.stringify(data2[j]));
                  console.log('match: '+data2[j].userId);
                  // pubsCon.push(data2[j].publicationId);
                  pubsCon.push({id: data2[j].publicationId, role: data2[j].role});
                  break;
                }
              }
              // console.log('publicationId: '+pubsCon);
              // res.status(200).send(data);
              // console.log('finish['+i+']');
              resolve();
            })
          }));
          // console.log(i+'.name: '+data[i].name);
        }
        // console.log(promises);
        Promise.all(promises).then(() => {
          // console.log('ddd');
          console.log('publicationId: '+pubsCon);
          res.status(200).send({
            data: data,
            pubsCon: pubsCon
          });
        });
      })
    })
  }
});

app.get('/testkk', function(req, res) {
  console.log('=========test-api=========');
  res.status(200).send('kk');
});
