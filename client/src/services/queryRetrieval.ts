import { Article } from '../types';
import { generateQueryEmbedding } from './queryEmbedding';
import { queryPinecone } from './queryPinecone';

export async function retrieveRelevantArticles(userSelections: string[]): Promise<Article[]> {
  // Generate embedding for the query using existing function
  const query = userSelections.join(" ");
  const queryEmbedding = await generateQueryEmbedding(query);

  // Query Pinecone and retrieve relevant articles
  const relevantArticles = await queryPinecone(queryEmbedding);

  return relevantArticles;
}
