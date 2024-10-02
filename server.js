const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const NodeCache = require('node-cache');
require('dotenv').config();
const { generateAIReport, populatePinecone } = require('./services/aiService');
const { MongoDBConnection } = require('./db');
const {questions} = require('./utils/questions.json');
const app = express();
const port = process.env.PORT || 3005;
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

app.use(cors({
  origin: 'http://localhost:3000', // or the URL where your React app is running
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'client/build')));

MongoDBConnection();

// populatePinecone()
//   .then(() => {
//     console.log('Pinecone has been populated with data from Notion.');
//   })
//   .catch((error) => {
//     console.error('Error populating Pinecone:', error);
//     process.exit(1); // Exit the process if population fails
//   });


console.log('About to connect to MongoDB Atlas...');

// Define schemas
const chatHistorySchema = new mongoose.Schema({
  question: String,
  answer: String,
  timestamp: { type: Date, default: Date.now }
});

const formQuestionSchema = new mongoose.Schema({
  id: { type: String, index: true },
  text: String,
  description: String,
  options: [{
    id: String,
    name: String,
    text: String,
    description: String
  }]
});

// Create models
const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);
const FormQuestion = mongoose.model('FormQuestion', formQuestionSchema);

// Keep the existing questions array
// const questions = [
//   // ... (include all the questions from the original server.js file)
// ];

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.get('/api/questions', async (req, res) => {
  console.log('Received request for /api/questions');
  try {
    const cachedQuestions = questions;
    if (cachedQuestions) {
      return res.json(cachedQuestions);
    }

    const formQuestions = await FormQuestion.find();
    const dbQuestions = formQuestions.map(q => ({
      id: q.id,
      text: q.text,
      options: q.options.map(o => ({
        id: o.id,
        text: o.text,
        description: o.description
      }))
    }));

    cache.set('questions', dbQuestions);
    res.json(dbQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

app.post('/api/chat-history', async (req, res) => {
  try {
    const { question, answer } = req.body;
    const chatHistory = new ChatHistory({ question, answer });
    await chatHistory.save();
    res.status(201).json({ message: 'Chat history saved successfully' });
  } catch (error) {
    console.error('Error saving chat history:', error);
    res.status(500).json({ error: 'Failed to save chat history' });
  }
});

app.post('/api/generate-report', async (req, res) => {
  try {
    const userSelections = req.body.selections;
    const aiResponse = await generateAIReport(userSelections);
    res.json({ report: aiResponse });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Error: Port ${port} is already in use. Please free up port ${port} or choose a different port.`);
    process.exit(1);
  } else {
    console.error(err);
  }
});