const axios = require('axios');
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Define route for generating text from text-only input
app.post('/generateText', async (req, res) => {
    const userPrompt = req.body.prompt;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
        const result = await model.generateContent(userPrompt);
        res.json(result);
    } catch (error) {
        console.error('Error generating text:', error);
        res.status(500).json({ error: 'An error occurred while generating text' });
    }
});

// Define route for generating text from text-and-image input (multimodal)
app.post('/generateTextWithImage', async (req, res) => {
    const userPrompt = req.body.prompt;
    const imageData = req.body.imageData; // Assuming imageData is provided in base64 format

    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    try {
        const result = await model.generateContent([
            userPrompt,
            { inlineData: { data: imageData, mimeType: 'image/png' } }
        ]);
        res.json(result);
    } catch (error) {
        console.error('Error generating text with image:', error);
        res.status(500).json({ error: 'An error occurred while generating text with image' });
    }
});

// Define route for building multi-turn conversations (chat)
// Note: gemini-pro model is recommended for chat use cases
app.post('/startChat', async (req, res) => {
    const initialMessage = req.body.message;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
        const chat = model.startChat({ history: [{ role: "user", parts: [{ text: initialMessage }] }] });
        res.json({ success: true, message: 'Chat started successfully' });
    } catch (error) {
        console.error('Error starting chat:', error);
        res.status(500).json({ error: 'An error occurred while starting chat' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
