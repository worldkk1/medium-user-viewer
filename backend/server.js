var cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    bodyParser      = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(require('./api-routes'));

var port = 3000;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
