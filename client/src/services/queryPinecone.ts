import { Pinecone } from '@pinecone-database/pinecone';
import { Article } from '../types';

let pinecone: Pinecone | null = null;
let index: ReturnType<Pinecone['Index']> | null = null;

async function initPinecone() {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });

    index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);
  }
}

export async function queryPinecone(queryEmbedding: number[]): Promise<Article[]> {
  // Initialize Pinecone client and index if not already initialized
  if (!pinecone || !index) {
    await initPinecone();
  }

  const queryResponse = await index!.query({
    vector: queryEmbedding,
    topK: 5,
    includeMetadata: true,
  });

  const articles: Article[] = queryResponse.matches?.map((match: any) => ({
    id: match.id,
    title: (match.metadata?.title as string) || '',
    content: (match.metadata?.content as string) || '',
  })) || [];

  return articles;
}