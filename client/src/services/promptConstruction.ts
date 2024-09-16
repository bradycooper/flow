import { Decision, Article } from '../types';

export function constructPrompt(selections: Decision[], relevantArticles: Article[], systemPrompt: string): string {
  let prompt = `${systemPrompt}\n\nUser Selections:\n`;

  selections.forEach(decision => {
    prompt += `- ${decision.question}: ${decision.answer}\n`;
  });

  prompt += `\n\nRelevant Articles:\n`;
  relevantArticles.forEach((article, index) => {
    prompt += `Article ${index + 1}: ${article.title}\n${article.content}\n\n`;
  });

  prompt += `
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
`;

  return prompt;
}
