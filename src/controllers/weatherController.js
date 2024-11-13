// src/controllers/weatherController.js

const weatherService = require('../services/weatherService');
const cacheUtils = require('../utils/cacheUtils');

const getWeather = async (req, res) => {
  const city = req.query.city || 'Nairobi';

  try {
    // Fetch weather data using the updated service method
    const weatherData = await weatherService.fetchWeather(city); 
    res.json(weatherData);
  } catch (error) {
    console.error('Error in getWeather:', error);

    // Send the detailed error message as part of the response
    res.status(500).json({
      error: 'An unexpected error occurred.',
      message: error.message, // Include the detailed error message
    });
  }
};

module.exports = { getWeather };
