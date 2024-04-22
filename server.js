const axios = require('axios');
require('dotenv').config();

const GEMINI_API_URL =process.env.GEMINI_API_URL;
const GEMINI_API_KEY =process.env.GEMINI_API_KEY;

function sendMessageToBot(userMessage) {
    axios.post(GEMINI_API_KEY, {
        message: userMessage
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + GEMINI_API_KEY
        }
    })
    .then(response => {
        console.log('Bot response:', response.data.response);
    })
    .catch(error => console.error('Error:', error));
}
//eg usage
sendMessageToBot('Hello, bot!');