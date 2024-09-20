// const { OpenAI } = require('openai');
// const { moderateContent } = require('./moderation.ts');
// const { retrieveRelevantArticles } = require('./queryRetrieval.Js');

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// async function generateAIReport(selections) {
//   try {
//     // Combine the selections into a string
//     const contentToModerate = selections.map(s => `${s.question}: ${s.answer}`).join(' ');
//     await moderateContent(contentToModerate);

//     // Retrieve relevant articles from Pinecone based on user selections
//     const relevantArticles = await retrieveRelevantArticles(selections.map(s => s.value));

//     // Add the relevant content from Notion to the prompt
//     const prompt = constructPrompt(selections, relevantArticles);

//     // Generate the response using OpenAI GPT-4
//     const response = await openai.chat.completions.create({
//       model: 'gpt-4',
//       messages: [{ role: 'user', content: prompt }],
//       temperature: 0.7,
//       max_tokens: 1000,
//     });

//     // Parse and return the AI response as JSON
//     const aiResponseText = response.choices[0].message?.content || '';
//     const aiResponse = JSON.parse(aiResponseText);

//     return aiResponse;
//   } catch (error) {
//     console.error('Error generating AI report:', error);
//     throw error;
//   }
// }

// function constructPrompt(selections, relevantArticles) {
//   // Create a string of the retrieved articles from Notion
//   const relevantContent = relevantArticles
//     .map(article => `${article.title}: ${article.content}`)
//     .join('\n\n');

//   return `
// You are an expert assistant helping to design an incentive program based on the following user selections:

// ${selections.map(s => `${s.type}: ${s.value}`).join('\n')}

// Relevant context from the knowledge base:
// ${relevantContent}

// Please provide:

// 1. A summary of the program (approximately 150-200 words).
// 2. 5-7 marketing steps to promote and implement the program.
// 3. 3-5 important considerations or potential challenges for this program.
// 4. Metrics on how long it would take to:
//    a) Design the program
//    b) Implement the program
//    c) Monitor the program
//    d) Launch the program
//    e) Market the program
//    - Provide the estimated time in weeks or months for each.

// Ensure that your response is formatted exactly as the JSON structure provided below, with no additional text or explanations. Do not include any commentary or preamble.

// {
//   "summary": "Your summary here.",
//   "marketingSteps": ["Step 1", "Step 2", "..."],
//   "considerations": ["Consideration 1", "Consideration 2", "..."],
//   "metrics": {
//     "design": "Estimated time for design (e.g., '2 weeks')",
//     "implementation": "Estimated time for implementation",
//     "monitoring": "Estimated time for monitoring",
//     "launch": "Estimated time for launch",
//     "marketing": "Estimated time for marketing",
//     "setupTime": "Estimated setup time",
//     "maintenanceTime": "Estimated maintenance time",
//     "estimatedCost": 0,
//     "rolesNeeded": ["Role 1", "Role 2"]
//   }
// }

// Please output only the JSON object in your response.
//   `.trim();
// }

// module.exports = {
//   generateAIReport,
// };


const { OpenAI } = require('openai');
const { moderateContent } = require('./moderation');
const { generateQueryEmbedding } = require('./queryEmbedding');
const { queryPinecone } = require('./queryPinecone');
const { fetchKnowledgeBase } = require('./notionClient');
const { Pinecone } = require('@pinecone-database/pinecone');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let pinecone = null;
let index = null;

async function initPinecone() {
  if (!pinecone) {
    pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    index = pinecone.index(process.env.PINECONE_INDEX_NAME || 'kwik-ai');
  }
}

// Function to populate Pinecone with data from Notion
async function populatePinecone() {
  await initPinecone();
  const knowledgeBase = await fetchKnowledgeBase();
  
  for (const article of knowledgeBase) {
    if (!article.content || article.content.trim() === '') {
      console.warn(`Skipping article with ID: ${article.id} due to empty content.`);
      continue;
    }
    const queryEmbedding = await generateQueryEmbedding(article.content);
    index.upsert([
      {
                id: article.id,
                values: queryEmbedding,
                metadata: {
                  title: article.title,
                  content: article.content,
                },
      },
    ])
  }
  
  console.log('Pinecone populated with Notion data');
}

// Function to generate AI report based on user selections
async function generateAIReport(selections) {
  try {
    const contentToModerate = selections.map(s => `${s.question}: ${s.value}`).join(' ');
    await moderateContent(contentToModerate);

    const userSelections = selections.map(s => s.value);
    const relevantArticles = await retrieveRelevantArticles(userSelections);

    const prompt = constructPrompt(selections, relevantArticles);

    // Call OpenAI API to generate a report
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const aiResponseText = response.choices[0].message?.content || '';
    const aiResponse = JSON.parse(aiResponseText);

    return aiResponse;
  } catch (error) {
    console.error('Error generating AI report:', error);
    throw error;
  }
}

// Helper function to construct the prompt for OpenAI API
function constructPrompt(selections, articles) {
  return `
  Hey AI, you’re speaking with a company owner who owns a business and is looking at creating a program like this! Based on their selections, here’s how their incentive program will work:
  
  User Selections:
  ${selections.map(s => `${s.question}: ${s.value}`).join('\n')}
  
  Using the following relevant knowledge base from our database:
  ${articles.map(a => `${a.title}: ${a.content}`).join('\n')}
  
  Please provide:
  
  1. **Summary**:
  You are the Kwik reward AI here to show the business owner how their program will function. Break down their program and talk about how exciting it is, how much their customers will love what they designed, and give a short summary (150-200 words).
  
  2. **Marketing Steps**:
  Okay AI, put on your marketing hat and pretend you’re creating a proposal to market this program. Outline every step required to market this program successfully. Focus on the entire process, from initial setup to campaign launches, without missing any details. Remember, no need to go into pricing but ensure everything necessary is mentioned to give them a clear roadmap.
  
  3. **Next Steps**:
  Tell the business owner exactly what needs to be done to bring this program to life. List all development needs, software requirements, setup steps, marketing strategies, popups, and promotions. Make this detailed but in bullet points, so they know every step involved. Make sure you showcase the complexity and make them aware of all the tasks required.
  
  4. **Considerations**:
  Look into our database and based on their selections, show them what they might not have considered. Let them know all potential challenges and things to think about to ensure the program runs smoothly. The idea here is to highlight things they might not have thought about.
  
  5. **Metrics**:
     a) **Estimated Cost**:
     Do some market research based on our knowledge base and estimate the cost this program might require to implement without Kwik. Think about software, human resources, and any other associated costs.
  
     b) **Implementation Timeline**:
     Provide an estimate on how long this program might take to implement without Kwik. Factor in the design, marketing, development, and all other steps. Give estimates in weeks or months.
  
     c) **Roles Needed**:
     Based on their selections, what roles and talents would they need to make this program successful? List 3-5 roles.
  
  Ensure that your response is formatted exactly as the JSON structure provided below, without any additional text or explanations. Do not include any commentary or preamble.
  
  {
    "summary": "Your summary here.",
    "marketingSteps": ["Step 1", "Step 2", "..."],
    "nextSteps": ["Step 1", "Step 2", "..."],
    "considerations": ["Consideration 1", "Consideration 2", "..."],
    "metrics": {
      "estimatedCost": "Estimated cost range",
      "implementationTimeline": "Estimated time for implementation",
      "rolesNeeded": ["Role 1", "Role 2"]
    }
  }
  
  Please output only the JSON object in your response.
    `.trim();
  }

// Function to retrieve relevant articles from Pinecone based on user selections
async function retrieveRelevantArticles(userSelections) {
  const query = userSelections.join(" ");
  const queryEmbedding = await generateQueryEmbedding(query);
  const relevantArticles = await queryPinecone(queryEmbedding);

  return relevantArticles;
}

module.exports = {
  generateAIReport,
  populatePinecone,
};
