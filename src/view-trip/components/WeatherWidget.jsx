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

  if (error) return (
    <div className="text-gray-500 dark:text-gray-400 text-sm font-medium bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
      {error}
    </div>
  );
  
  if (!weather) return (
    <div className="text-gray-500 dark:text-gray-400 text-sm font-medium bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700 flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      Loading weather...
    </div>
  );

  const today = weather.list[0];
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 dark:from-blue-900/30 dark:via-cyan-900/20 dark:to-sky-900/30 rounded-xl p-4 flex items-center gap-3 shadow-lg border border-blue-100 dark:border-blue-800/50 overflow-hidden group hover:shadow-xl transition-all duration-300">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-cyan-400/5 to-sky-400/5 opacity-50"></div>
      
      {/* Weather icon container */}
      <div className="relative flex-shrink-0 w-12 h-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-white/50 dark:border-gray-700/50 group-hover:scale-110 transition-transform duration-300">
        <img 
          src={`https://openweathermap.org/img/wn/${today.weather[0].icon}.png`} 
          alt="" 
          className="w-8 h-8 object-contain"
        />
      </div>
      
      {/* Weather info */}
      <div className="relative flex-1 min-w-0">
        <div className="flex items-baseline gap-1 mb-1">
          <span className="font-bold text-lg text-gray-800 dark:text-white">
            {Math.round(today.main.temp)}°C
          </span>
          <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
        </div>
        <div className="text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-100/50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 w-fit">
          {today.weather[0].main}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-60"></div>
      <div className="absolute bottom-2 left-2 w-1 h-1 bg-gradient-to-br from-sky-400 to-blue-400 rounded-full opacity-40"></div>
      
      {/* Subtle animation line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
    </div>
  );
}

export default WeatherWidget;