import axios from 'axios';
import config from '../config';
import { WeatherData } from '../types/Weather';

export const fetchCurrentWeather = async (
  location: string
): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${config.API_URL}current?location=${location}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw new Error('Failed to fetch current weather data');
  }
};

export const fetchHistoricalWeather = async (
  location: string,
  from: string,
  to: string
): Promise<WeatherData[]> => {
  try {
    const response = await axios.get<WeatherData[]>(
      `${config.API_URL}historical`,
      {
        params: { location, from, to },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    throw new Error('Failed to fetch historical weather data');
  }
};
