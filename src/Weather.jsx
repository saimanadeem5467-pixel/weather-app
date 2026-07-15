import { useState, useEffect } from 'react';
import SearchBar from './component/SearchBar.jsx';
import CurrentWeather from './component/CurrentWeather.jsx';
import HourlyForecast from './component/HourlyForecast.jsx';
import WeeklyForecast from './component/WeeklyForecast.jsx';
import { getWeatherData } from './assets/api.js';
import { parse } from 'date-fns';

const getGradientClass = (hour) => {
  if (hour >= 6 && hour < 9) return 'bg-sunrise';
  if (hour >= 9 && hour < 17) return 'bg-day';
  if (hour >= 17 && hour < 20) return 'bg-sunset';
  return 'bg-night';
};

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const hour = weatherData?.location?.localtime
    ? (() => {
        try {
          return parse(weatherData.location.localtime, 'yyyy-MM-dd HH:mm', new Date()).getHours();
        } catch {
          return new Date().getHours();
        }
      })()
    : new Date().getHours();

  useEffect(() => {
    if (!city) {
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getWeatherData(city);
        const forecastDay = data?.forecast?.forecastday?.[0];

        if (!forecastDay) {
          throw new Error('Weather data was not returned for that city.');
        }

        const { mintemp_c, maxtemp_c } = forecastDay.day;
        setWeatherData({
          current: { ...data.current, mintemp_c, maxtemp_c },
          hourly: forecastDay.hour,
          weekly: data.forecast.forecastday.slice(1),
          location: data.location,
        });
      } catch (e) {
        setWeatherData(null);
        setError(e?.message ? `Error: ${e.message}` : 'Error fetching weather data.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const gradientClass = getGradientClass(hour);

  return (
    <div className={`app ${gradientClass}`}>
      <div className="weather-container">
        <h2>Weather App</h2>
        <SearchBar onSearch={setCity} />
        {loading && <p>Loading...</p>}
        {error && <p className="status-text">{error}</p>}
        {!loading && !error && !weatherData && city && <p className="status-text">No weather data found yet.</p>}
        {weatherData && (
          <>
            <CurrentWeather data={weatherData.current} location={weatherData.location} />
            <HourlyForecast data={weatherData.hourly} />
            <WeeklyForecast data={weatherData.weekly} />
          </>
        )}
      </div>
    </div>
  );
}

export default Weather;

