// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const validator = require('validator');


// date endpoint...
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//  /api/:date endpoint
app.get('/api/:date', function(req, res) {
  // get path parameter
  const { date } = req.params;

  // check the date format in YYYY/MM/DD
  if (validator.isDate(date)) {
    const unix = Date.parse(date);
    const utc = new Date(date).toUTCString();

    res.json({
      unix: unix,
      utc: utc
    });

  // check the date format in UNIX
  } else if (Date(date)) {
    const unix = date;
    const utc = new Date(Number(date)).toUTCString();

    res.json({
      unix: unix,
      utc: utc
    });

  } else {
    res.json({
      error: "Invalid Date"
    });
  }
});

app.get('/api', function(req, res) {
  const unix = Date.now();
  const utc = new Date().toUTCString();

  res.json({
    unix: unix,
    utc: utc
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});