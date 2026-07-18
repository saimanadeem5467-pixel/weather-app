export const getWeatherData = async (cityName) => {
   const response = await fetch(
     `https://weather-app-production-7138.up.railway.app//api/weather?city=${encodeURI( cityName)}`
   );
   const data = await response.json();
   if (!response.ok || data.error) {
     throw new Error(data.error || 'Failed to fetch weather data');
   }
   return data;
};