import axios from 'axios';
import Weather from '../models/Weather.js';

export const getWeather = async (req, res) => {
  try {
    const { location } = req.query;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}`
    );
    const weatherData = response.data;

    const newWeather = new Weather({
      location: weatherData.name,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
      date: new Date(),
    });

    await newWeather.save();
    res.json(newWeather);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
};

export const getHistoricalData = async (req, res) => {
  try {
    const { location, from, to } = req.query;

    const fromDate = new Date(from);
    fromDate.setUTCHours(0, 0, 0, 0);

    const toDate = new Date(to);
    toDate.setUTCHours(23, 59, 59, 999);

    const historicalData = await Weather.find({
      location,
      date: { $gte: fromDate, $lte: toDate },
    });

    res.json(historicalData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching historical data' });
  }
};
