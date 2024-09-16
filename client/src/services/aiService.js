const { Configuration, OpenAIApi } = require("openai");
const { moderateContent } = require('./moderation');

// Initialize OpenAI client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Function to generate query embeddings (if needed)
async function generateQueryEmbedding(inputText) {
  try {
    const response = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: inputText,
    });

    const embedding = response.data.data[0].embedding;
    return embedding;
  } catch (error) {
    console.error('Error generating query embedding:', error);
    throw error;
  }
}

// Function to construct the prompt based on user selections
function constructPrompt(selections) {
  const systemPrompt = "You are an expert assistant helping to design an incentive program.";

  let prompt = `${systemPrompt}\n\nUser Selections:\n`;

  selections.forEach(decision => {
    prompt += `- ${decision.type}: ${decision.value}\n`;
  });

  // ... (rest of the prompt construction)

  return prompt;
}

// Function to generate the AI response
async function generateAIReport(selections) {
  try {
    const contentToModerate = selections.map(sel => `${sel.type}: ${sel.value}`).join(' ');
    await moderateContent(contentToModerate);

    const prompt = constructPrompt(selections);

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const aiResponseText = response.data.choices[0].message?.content || '';
    const aiResponse = JSON.parse(aiResponseText);

    return aiResponse;
  } catch (error) {
    console.error('Error generating AI report:', error);
    throw new Error('Failed to generate AI report.');
  }
}

module.exports = {
  generateAIReport,
  generateQueryEmbedding,
};