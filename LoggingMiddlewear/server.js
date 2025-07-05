const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/logs', async (req, res) => {
  // Use req.body instead of req.query
  const { stack, level, package: packageName, message } = req.body;
  
  if (!stack || !level || !packageName || !message) {
    return res.status(400).json({ error: 'Missing stack, level, package, or message' });
  }

  try {
    const response = await axios.post(
      `http://20.244.56.144/evaluation-service/logs`,
      {
        stack,
        level,
        package: packageName,
        message
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
    console.error('API call failed:', error.response?.data || error.message);
    res.status(500).json({ error: 'API request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
