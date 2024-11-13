const express = require('express');
const { getWeather } = require('../controllers/weatherController');
const router = express.Router();

// Route to handle GET requests for weather data

router.get('/', getWeather);

module.exports = router;




