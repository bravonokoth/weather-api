# Weather API

This project is a simple **Weather API** that fetches weather data for a given city using the [Visual Crossing Weather API](https://www.visualcrossing.com/). The API provides current weather conditions, temperature, humidity, wind speed, and other metrics for the specified city.

### Project Structure

```plaintext
/weather-api
├── src
│   ├── controllers
│   │   └── weatherController.js         # Handles API routes related to weather
│   ├── services
│   │   └── weatherService.js            # Contains logic to fetch weather data from external API
│   ├── routes
│   │   └── weatherRoutes.js            # Defines routes for the weather API
│   └── index.js                        # Main entry point to start the server
├── node_modules                        # Installed dependencies
├── .env                                 # Environment variables (contains API keys)
├── package.json                        # Project metadata and dependencies
└── README.md                           # Project documentation (this file)
The link:localhost:3000/api/weather?city=Nairobi
