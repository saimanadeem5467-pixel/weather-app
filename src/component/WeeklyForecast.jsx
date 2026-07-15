import { format, parseISO } from 'date-fns';
import './weeklyForecast.css';

const WeeklyForecast = ({ data }) => {
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <div className="daily-container">
            {data.map((day, index) => {
                const dayLabel = (() => {
                    try {
                        return format(parseISO(day.date), 'EEE');
                    } catch {
                        return day.date || 'Day';
                    }
                })();

                return (
                    <div className="day-row" key={`${day.date || index}-${index}`}>
                        <div className="day-label">{dayLabel}</div>
                        <div className="day-rain">{day.day?.daily_chance_of_rain ?? 0}%</div>
                        <div className="day-condition">
                            <img src={day.day?.condition?.icon} alt={day.day?.condition?.text || 'Weather'} className="daily-icon" />
                            <span className="day-text">{day.day?.condition?.text || 'No condition'}</span>
                            <div className="day-temp">
                                {Math.round(day.day?.maxtemp_c ?? 0)}° / {Math.round(day.day?.mintemp_c ?? 0)}°
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default WeeklyForecast;