const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const app = express();
const PORT = process.env.PORT || 5000;
const fetchFromApi = global.fetch || ((...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)));

app.use(cors());
app.use(express.json());
app.get('/api/weather', async (req, res) => {
    const city = req.query.city?.trim();
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        console.error('Missing API_KEY in server environment');
        return res.status(500).json({ error: 'Server is not configured with the weather API key.' });
    }
    if (!city) {
        return res.status(400).json({ error: 'City query parameter is required.' });
    }

    console.log(`Fetching weather for city: ${city}`);
    try {
        const response = await fetchFromApi(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=7`
        );

        if (!response.ok) {
            console.error('weather API responded with status', response.status);
            const errorData = await response.json().catch(() => null);
            return res.status(response.status).json({ error: errorData?.error?.message || 'Failed to fetch from weather API.' });
        }

        const data = await response.json();
        res.json(data);
    } catch (e) {
        console.error('weather API error', e);
        res.status(500).json({ error: 'Error fetching weather data.' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});