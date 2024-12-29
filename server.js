const express = require('express');
const axios = require('axios');
const app = express();


app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { weather: null, error: null });
});


app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = '40021e0b2ee500c96789796fc24fe57c';

  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  let weather;
  let error = null;

  try {
    const response = await axios.get(APIUrl);
    weather = response.data;
  } catch (err) {
    error = 'Error, please try again.';
    weather = null;
  }

  res.render('index', { weather, error });
});


const port = process.env.PORT || 5666;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
