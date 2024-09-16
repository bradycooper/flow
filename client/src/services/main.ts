import { generateQueryEmbedding } from './queryEmbedding';
import { queryPinecone } from './queryPinecone';
import { constructPrompt } from './promptConstruction';
import { AIResponse, Decision, Article } from '../types';

export async function generateIncentiveProgram(userSelections: Decision[]): Promise<AIResponse> {
  try {
    // Step 1: Generate query embedding
    const queryEmbedding = await generateQueryEmbedding(userSelections.map(d => d.value));

    // Step 2: Retrieve relevant articles
    const relevantArticles = await queryPinecone(queryEmbedding);

    // Step 3: Construct the prompt
    const systemPrompt = "You are an expert assistant helping to design an incentive program.";
    const prompt = constructPrompt(userSelections, relevantArticles, systemPrompt);

    // Step 4: Generate the response
    const responseText = await fetch('/api/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    }).then(res => res.json());

    // Step 5: Parse the response into structured data
    const aiResponse = parseAIResponse(responseText);

    return aiResponse;
  } catch (error) {
    console.error('Error generating incentive program:', error);
    return getDefaultAIResponse();
  }
}

function parseAIResponse(responseText: string): AIResponse {
  try {
    const parsedResponse = JSON.parse(responseText);
    
    // Validate the parsed response
    if (!isValidAIResponse(parsedResponse)) {
      throw new Error('Invalid AI response format');
    }

    return parsedResponse;
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return getDefaultAIResponse();
  }
}

function isValidAIResponse(response: any): response is AIResponse {
  return (
    typeof response === 'object' &&
    typeof response.summary === 'string' &&
    Array.isArray(response.marketingSteps) &&
    Array.isArray(response.considerations) &&
    typeof response.metrics === 'object' &&
    typeof response.metrics.setupTime === 'string' &&
    typeof response.metrics.maintenanceTime === 'string' &&
    typeof response.metrics.estimatedCost === 'number' &&
    Array.isArray(response.metrics.rolesNeeded)
  );
}

function getDefaultAIResponse(): AIResponse {
  return {
    summary: "We apologize, but we couldn't generate a summary at this time.",
    marketingSteps: ["Unable to generate marketing steps."],
    considerations: ["Please try again later."],
    metrics: {
      design: "N/A",
      implementation: "N/A",
      monitoring: "N/A",
      launch: "N/A",
      marketing: "N/A",
      setupTime: "N/A",
      maintenanceTime: "N/A",
      estimatedCost: 0,
      rolesNeeded: ["Unable to determine roles needed."],
    },
  };
}

// Example usage
async function main() {
  const userSelections: Decision[] = [
    { type: 'Goal', value: 'Increase customer engagement', question: 'What is your main goal?', answer: 'Increase customer engagement' },
    { type: 'Audience', value: 'New users', question: 'Who is your target audience?', answer: 'New users' },
    { type: 'IncentiveType', value: 'Loyalty points', question: 'What type of incentive are you offering?', answer: 'Loyalty points' },
    // ... other selections
  ];

  try {
    const result = await generateIncentiveProgram(userSelections);
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Uncomment the following line to run the main function
// main();