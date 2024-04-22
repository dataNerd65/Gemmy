const axios = require('axios');
const express = require('express');
require('dotenv').config();

const GEMINI_API_URL = process.env.GEMINI_API_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const app = express();
app.use(express.json()); // for parsing application/json

app.post('/sendMessage', (req, res) => {
    const userMessage = req.body.message;

    axios.post(GEMINI_API_URL, {
        message: userMessage
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + GEMINI_API_KEY
        }
    })
    .then(response => {
        res.json({ botResponse: response.data.response });
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));