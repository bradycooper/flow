const { Configuration, OpenAIApi } = require('openai');
const { moderateContent } = require('./moderation');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateAIReport(selections) {
  try {
    const contentToModerate = selections.map(s => `${s.type}: ${s.value}`).join(' ');
    await moderateContent(contentToModerate);

    const prompt = constructPrompt(selections);

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const aiResponseText = response.data.choices[0].message?.content || '';
    const aiResponse = JSON.parse(aiResponseText);

    return aiResponse;
  } catch (error) {
    console.error('Error generating AI report:', error);
    throw error;
  }
}

function constructPrompt(selections) {
  return `
You are an expert assistant helping to design an incentive program based on the following user selections:

${selections.map(s => `${s.type}: ${s.value}`).join('\n')}

Please provide:

1. A summary of the program (approximately 150-200 words).
2. 5-7 marketing steps to promote and implement the program.
3. 3-5 important considerations or potential challenges for this program.
4. Metrics on how long it would take to:
   a) Design the program
   b) Implement the program
   c) Monitor the program
   d) Launch the program
   e) Market the program
   - Provide the estimated time in weeks or months for each.

Ensure that your response is formatted exactly as the JSON structure provided below, with no additional text or explanations. Do not include any commentary or preamble.

{
  "summary": "Your summary here.",
  "marketingSteps": ["Step 1", "Step 2", "..."],
  "considerations": ["Consideration 1", "Consideration 2", "..."],
  "metrics": {
    "design": "Estimated time for design (e.g., '2 weeks')",
    "implementation": "Estimated time for implementation",
    "monitoring": "Estimated time for monitoring",
    "launch": "Estimated time for launch",
    "marketing": "Estimated time for marketing",
    "setupTime": "Estimated setup time",
    "maintenanceTime": "Estimated maintenance time",
    "estimatedCost": 0,
    "rolesNeeded": ["Role 1", "Role 2"]
  }
}

Please output only the JSON object in your response.
  `.trim();
}

module.exports = {
  generateAIReport,
};