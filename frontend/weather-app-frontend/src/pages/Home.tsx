import React from 'react';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';

const Home: React.FC = () => {
  const forecastData = [
    { time: 'Now', temperature: 25 },
    { time: '2 AM', temperature: 25 },
    { time: '3 AM', temperature: 24 },
    { time: '4 AM', temperature: 23 },
    { time: '5 AM', temperature: 22 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 flex items-center justify-center">
      <div className="max-w-sm w-full lg:max-w-lg">
        <WeatherCard
          temperature={32}
          condition="Sunny"
          location="California, Los Angeles"
          date="21 Oct 2019"
          feelsLike="30"
          sunset="18:20"
        />
        <ForecastCard forecast={forecastData} />
        <div className="mt-4 text-white text-sm">
          <p>Random Text</p>
          <p>
            Improve him believe opinion offered met and cheered forbade.
            Friendly as stronger speedily by recurred...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
