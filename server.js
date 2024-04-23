const axios = require('axios');
const express = require('express');
require('dotenv').config();

const GEMINI_API_URL = process.env.GEMINI_API_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.static('../public')); // serving static files from the public dir

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
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data : 'An error occurred';
        res.status(status).json({ error: message });
    });
});
