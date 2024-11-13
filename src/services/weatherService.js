const axios = require('axios');
const redis = require('@redis/client').createClient();
require('dotenv').config();

// Ensure Redis connection is open
redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

redis.connect();

// Function to fetch weather data for a city with Redis caching
const fetchWeather = async (city = 'Nairobi') => {
    const redisKey = `weather:${city}`;

    try {
        // Check if the weather data is already cached in Redis
        const cachedData = await redis.get(redisKey);

        if (cachedData) {
            // If cached data exists, return it
            console.log('Returning cached weather data');
            return JSON.parse(cachedData);
        }

        const apiKey = process.env.WEATHER_API_KEY; // Ensure correct API key from .env
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`;
        
        // Fetch fresh weather data from the external API
        const response = await axios.get(url, { timeout: 5000 });

        if (response && response.data) {
            // Cache the fetched data in Redis for future requests (with an expiry time of 1 hour)
            await redis.setEx(redisKey, 3600, JSON.stringify(response.data));

            console.log('Returning fresh weather data');
            return response.data;
        } else {
            throw new Error('Invalid response data');
        }
    } catch (error) {
        console.error('Error Details:', error);

        // Rethrow the error with a more descriptive message
        if (error.response) {
            // API returned a response with an error status
            throw new Error(`API Error: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
            // The request was made, but no response was received
            throw new Error('No response received from the weather API.');
        } else {
            // General error
            throw new Error(`Unexpected error: ${error.message}`);
        }
    }
};

module.exports = { fetchWeather };
