import React, { useEffect, useState } from "react";
import { fetchWeather } from "@/utils/weather";

function WeatherWidget({ lat, lon }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (
      typeof lat !== "number" ||
      typeof lon !== "number" ||
      isNaN(lat) ||
      isNaN(lon)
    ) {
      setError("No weather data");
      return;
    }
    fetchWeather(lat, lon)
      .then((data) => {
        if (data && data.list && data.list.length > 0) {
          setWeather(data);
        } else {
          setError("No weather data");
        }
      })
      .catch(() => setError("Weather unavailable"));
  }, [lat, lon]);

  if (error) return <div className="text-gray-400">{error}</div>;
  if (!weather) return <div className="text-gray-400">Loading weather...</div>;

  const today = weather.list[0];
  return (
    <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-2 shadow">
      <img src={`https://openweathermap.org/img/wn/${today.weather[0].icon}.png`} alt="" />
      <div>
        <div className="font-bold">{Math.round(today.main.temp)}°C</div>
        <div className="text-xs">{today.weather[0].main}</div>
      </div>
    </div>
  );
}

export default WeatherWidget;