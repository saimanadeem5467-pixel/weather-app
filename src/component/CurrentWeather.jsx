import './CurrentWeather.css';
import { format, parse } from 'date-fns';

const getWindDescription = (value) => {
   if (value < 10) return 'Calm';
   if (value < 20) return 'Breezy';
   if (value < 30) return 'Windy';
   return 'Very windy';
};

const getHumidityDescription = (value) => {
   if (value < 30) return 'Dry';
   if (value < 60) return 'Comfortable';
   if (value < 80) return 'Humid';
   return 'Sticky';
};

const getUVDescription = (value) => {
   if (value < 3) return 'Low';
   if (value < 6) return 'Moderate';
   if (value < 8) return 'High';
   if (value < 11) return 'Very high';
   return 'Extreme';
};

const getDayAndHHMM = (rawDate) => {
   if (!rawDate) return 'Time unavailable';
   try {
       return format(parse(rawDate, 'yyyy-MM-dd HH:mm', new Date()), 'EEEE HH:mm');
   } catch {
       return rawDate;
   }
};

const CurrentWeather = ({ data, location }) => {
   if (!data || !location) return null;

   const { localtime, name } = location;
   const {
       temp_c,
       condition,
       feelslike_c,
       maxtemp_c,
       mintemp_c,
       wind_kph,
       humidity,
       uv,
   } = data;

   return (
       <div className="current-weather">
           <div className="card left-card">
               <h2>{name}</h2>
               <h1 className="temp">{Math.round(temp_c ?? 0)}°C</h1>
               <p>{Math.round(maxtemp_c ?? 0)}°C / {Math.round(mintemp_c ?? 0)}°C</p>
               <p>Feels like: {Math.round(feelslike_c ?? 0)}°C</p>
               <p>{getDayAndHHMM(localtime)}</p>
           </div>
           <div className="condition">
               <img src={condition?.icon} alt={condition?.text || 'Weather condition'} />
               <h2 className="condition-text">{condition?.text || 'No condition data'}</h2>
           </div>
           <div className="card right-card">
               <div className="detail-item">
                   <span className="detail-label">Wind</span>
                   <span className="detail-value">
                       {wind_kph ?? 0} km/h
                       <br />
                       <small>{getWindDescription(wind_kph ?? 0)}</small>
                   </span>
               </div>

               <div className="detail-item">
                   <span className="detail-label">Humidity</span>
                   <span className="detail-value">
                       {humidity ?? 0}%
                       <br />
                       <small>{getHumidityDescription(humidity ?? 0)}</small>
                   </span>
               </div>

               <div className="detail-item">
                   <span className="detail-label">UV index</span>
                   <span className="detail-value">
                       {uv ?? 0}
                       <br />
                       <small>{getUVDescription(uv ?? 0)}</small>
                   </span>
               </div>
           </div>
       </div>
   );
};

export default CurrentWeather;