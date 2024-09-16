import openai from './openaiClient';

export async function generateQueryEmbedding(userSelections: string | string[]): Promise<number[]> {
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