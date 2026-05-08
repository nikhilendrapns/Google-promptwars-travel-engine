import React, { useState, useEffect } from 'react';
import './index.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function App() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchTravelData = async (e) => {
    if (e) e.preventDefault();
    if (!city) return;

    setLoading(true);
    setError(null);
    try {
      // Fetch Weather
      const weatherRes = await fetch(`${API_BASE_URL}/api/weather/${city}`);
      const weatherData = await weatherRes.json();

      // Fetch Country (derived from weather response or search)
      // For simplicity, we'll assume the city search helps us find the country
      // In a real app, you'd use a geocoding API to get the country code
      const countryRes = await fetch(`${API_BASE_URL}/api/country/${city}`);
      const countryData = await countryRes.json();

      // Fetch Time (Placeholder - usually requires lat/lon or timezone area/location)
      // We'll mock the time for now or use a fixed one if area/location isn't known
      const timeRes = await fetch(`${API_BASE_URL}/api/time/Europe/London`); // Default for demo
      const timeData = await timeRes.json();

      setData({
        weather: weatherData,
        country: countryData.status !== 500 ? countryData : null,
        time: timeData
      });
    } catch (err) {
      setError('Could not find data for that destination.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container fade-in">
      <header className="header">
        <h1>Vagabond AI</h1>
        <p>Your lightweight travel companion powered by Google Cloud</p>
      </header>

      <form className="search-container" onSubmit={fetchTravelData}>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Where to next? (e.g. Paris, Tokyo, New York)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="search-button">
          Explore
        </button>
      </form>

      <main>
        {loading && <div className="loading" role="status">Mapping your journey...</div>}
        
        {error && <div className="glass-card" style={{ textAlign: 'center', color: '#f87171' }} role="alert">{error}</div>}

        {data && !loading && (
          <div className="dashboard fade-in">
            {/* Weather Card */}
            <article className="glass-card info-card">
              <h3><span>🌤️</span> Weather</h3>
              <div className="data" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
                {Math.round(data.weather.main?.temp || 0)}°C
              </div>
              <div className="label">{data.weather.weather?.[0]?.description}</div>
              <div className="label">Humidity: {data.weather.main?.humidity}%</div>
            </article>

            {/* Time Card */}
            <article className="glass-card info-card">
              <h3><span>🕒</span> Local Time</h3>
              <div className="data" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
                {data.time.datetime ? new Date(data.time.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
              </div>
              <div className="label">{data.time.timezone || 'Timezone unknown'}</div>
              <div className="label">Day of week: {data.time.day_of_week || '-'}</div>
            </article>

            {/* Country Card */}
            {data.country && (
              <article className="glass-card info-card">
                <h3><span>🌍</span> Destination</h3>
                <div className="data">{data.country.name?.common}</div>
                <div className="label">Capital: {data.country.capital?.[0]}</div>
                <div className="label">Currency: {Object.values(data.country.currencies || {})[0]?.name} ({Object.values(data.country.currencies || {})[0]?.symbol})</div>
                <div className="label">Language: {Object.values(data.country.languages || {})[0]}</div>
              </article>
            )}
          </div>
        )}
      </main>

      {!data && !loading && !error && (
        <div style={{ textAlign: 'center', opacity: 0.5, marginTop: '4rem' }}>
          <p>Search for a city to see real-time travel intelligence.</p>
        </div>
      )}
    </div>
  );
}

export default App;