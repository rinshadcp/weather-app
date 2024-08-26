import React, { useState, useEffect } from 'react';
import { fetchHistoricalWeather, fetchCurrentWeather } from '../api/weather';
import { WeatherData } from '../types/Weather';

const Weather: React.FC = () => {
  const [location, setLocation] = useState('Delhi');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const locations = [
    'Delhi',
    'Moscow',
    'Paris',
    'New York',
    'Sydney',
    'Riyadh',
  ];

  const fetchWeather = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (fromDate && toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        const diffTime = Math.abs(to.getTime() - from.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 30) {
          setError('Date range should not exceed 30 days.');
          setIsLoading(false);
          return;
        }

        const data = await fetchHistoricalWeather(location, fromDate, toDate);
        setWeatherData(data);
      } else {
        const data = await fetchCurrentWeather(location);
        setWeatherData([data]);
      }
    } catch (err: unknown) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [location]);

  const handleFetchWeather = () => {
    if (!fromDate || !toDate) {
      setError('Please select both From and To dates.');
      return;
    }
    fetchWeather();
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center border-8 rounded-lg"
      style={{ backgroundImage: "url('/src/assets/images/bg.jpg')" }}
    >
      <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Weather App</h1>
        <div className="mb-4">
          <label className="block mb-2">Select Location:</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 rounded"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">From Date:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">To Date:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleFetchWeather}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Get Historical Weather
        </button>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Weather Data</h2>
            {weatherData.map((weather, index) => (
              <div key={index} className="mb-2">
                <p>{formatDate(weather.date)}</p>
                <div className="flex items-center">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                    alt="Weather icon"
                    className="mr-2"
                  />
                  <p>{weather.temperature}°C</p>
                </div>
                <p>{weather.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
