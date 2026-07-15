import './HourlyForecast.css';
import { parse, format } from 'date-fns';

const HourlyForecast = ({ data }) => {
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <div className="hourly-container">
            {data.map((hour, index) => {
                const displayTime = (() => {
                    try {
                        return format(parse(hour.time, 'yyyy-MM-dd HH:mm', new Date()), 'h a');
                    } catch {
                        return hour.time || 'Time unavailable';
                    }
                })();

                return (
                    <div className="hour-card" key={`${hour.time || index}-${index}`}>
                        <div className="hour-time">{displayTime}</div>
                        <img src={hour.condition?.icon} alt={hour.condition?.text || 'Weather'} className="hour-icon" />
                        <div className="hour-temp">{Math.round(hour.temp_c ?? 0)}°C</div>
                        <div className="hour-rain">{hour.chance_of_rain ?? 0}%</div>
                    </div>
                );
            })}
        </div>
    );
};

export default HourlyForecast;