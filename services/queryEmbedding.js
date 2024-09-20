const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateQueryEmbedding(userSelections) {
  try {
    const query = Array.isArray(userSelections) ? userSelections.join(' ') : userSelections;

    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: query,
    });

    const embedding = response.data[0].embedding;
    return embedding;
  } catch (error) {
    console.error('Error generating query embedding:', error);
    throw error;
  }
}

module.exports = { generateQueryEmbedding };