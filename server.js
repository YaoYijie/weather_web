const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

let apiKey = '1ca9c25649f0dff47936746b0d3ad416';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
})
app.post('/', function(req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  request(url, function(err, response, body){
    if (err) {
      res.render('index', {weather: null, error: 'Error, please try again.'});
    }else {
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render('index', {weather: null, error: 'Error, no sush city'});
      }else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }

  })
})
app.listen(3000, function() {
  console.log('Example app listeningon port 3000.');
})
