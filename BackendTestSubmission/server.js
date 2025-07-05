const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/shorturls', (req, res) => {
  const { url, validity, shortcode } = req.body;

  const generatedShortcode = shortcode || 'abcd123';
  const baseUrl = 'https://localhost:6000';

  const expiryDate = new Date(Date.now() + (validity || 30) * 60000); 

  return res.status(201).json({
    shortLink: `${baseUrl}/${generatedShortcode}`,
    expiry: expiryDate.toISOString()
  });
});

app.post('/api/shorturl', async (req, res) => {
  const { url, validity, shortcode } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'url is required' });
  }

  try {
    const response = await axios.post(
      'http://localhost:6000/shorturls', 
      {
        url,
        validity: validity || 30,
        shortcode: shortcode || null
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.access_token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'API failed',
      message: error.response?.data || error.message
    });
  }
});

const PORT = 6000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});