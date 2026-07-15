export const getWeatherData = async (cityName) => {
   const response = await fetch(
     `http://localhost:5000/api/weather?city=${encodeURI( cityName)}`
   );
   const data = await response.json();
   if (!response.ok || data.error) {
     throw new Error(data.error || 'Failed to fetch weather data');
   }
   return data;
};