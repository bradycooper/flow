import openai from './openaiClient';

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}