import { useState } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloud, WiThermometer, WiHumidity } from 'react-icons/wi';


function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null); 
  const [error, setError] = useState('');

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      setError('');
      const response = await axios.get(
         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'14a13aa17e552bb1d91a34614925601e'}`);
 setWeather(response);
    } catch (error) {
      setError('City not found or API error.');  
      console.log('Error fetching weather data:', error);
    }
  };

  return (
    <div className="body">
      <h2 style={{ color: '#fff' }}>
        {weather && weather.data.weather[0].main === "Clear"  
          ? <WiDaySunny size={50} />
          : <WiCloud size={50} />}
        Weather App
      </h2>

      <div className="weather-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
        />
        <div>
          <button onClick={fetchWeatherData}>Search</button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>} 

        {weather && (
          <div className="weather-info">
            <h3>{weather.data.name}</h3>
            <p>
          
              Temperature: {weather.data.main.temp}°C<WiThermometer size={40} />
            </p>
            <p>{weather.data.weather[0].description}{weather && weather.data.weather[0].main === "Clear"  
          ? <WiDaySunny size={50} />
          : <WiCloud size={50} />}</p>
            <p>
              Humidity: {weather.data.main.humidity}% <WiHumidity size={40} />
              
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;