const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// API Service Helpers
const fetchWeather = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return { temp: 22, condition: 'Clear (Mock)', humidity: 40 };
  }
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  if (!res.ok) throw new Error('Weather data unavailable');
  const data = await res.json();
  return {
    temp: Math.round(data.main.temp),
    condition: data.weather[0].description,
    humidity: data.main.humidity
  };
};

const fetchLocalTime = async (city) => {
  // Simple heuristic: default to UTC for mock, or use a timezone API
  // For a hackathon, we'll try a public API or return current server time
  try {
    const res = await fetch(`http://worldtimeapi.org/api/timezone/Etc/UTC`);
    const data = await res.json();
    return { datetime: data.datetime, timezone: data.timezone };
  } catch (e) {
    return { datetime: new Date().toISOString(), timezone: 'UTC (Fallback)' };
  }
};

// 1. Health Check (Required for Cloud Run)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// 2. Travel Plan Endpoint
app.get('/api/travel-plan', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    // Fetch multiple data points in parallel for better performance
    const [weather, time] = await Promise.all([
      fetchWeather(city).catch(e => ({ error: 'Weather unavailable' })),
      fetchLocalTime(city).catch(e => ({ error: 'Time unavailable' }))
    ]);

    res.json({
      destination: city,
      weather,
      time,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// 3. 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`
  🚀 Travel API is production-ready!
  📡 Port: ${PORT}
  🔗 Health: http://localhost:${PORT}/health
  🔗 Plan:   http://localhost:${PORT}/api/travel-plan?city=London
  `);
});
