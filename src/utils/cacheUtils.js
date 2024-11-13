// src/utils/cacheUtils.js

const redis = require('redis');
const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379', // Default to localhost if no URL is set in env
});

// Connect to Redis
client.connect();

// Get cached data
const getCache = async (key) => {
  try {
    const data = await client.get(key);
    return data; // Returns null if no data is found
  } catch (err) {
    console.error('Error fetching from cache:', err);
    return null;
  }
};

// Set data in cache
const setCache = async (key, value, ttl = 3600) => { // TTL in seconds (default 1 hour)
  try {
    await client.setEx(key, ttl, value);
  } catch (err) {
    console.error('Error setting cache:', err);
  }
};

module.exports = { getCache, setCache };
