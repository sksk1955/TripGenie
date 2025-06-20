export async function fetchWeather(lat, lon) {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const res = await fetch(url);
  return res.json();
}