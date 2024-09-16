import { Pinecone } from "@pinecone-database/pinecone";
import openai from "./openaiClient";
import { Article } from '../types';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

async function generateEmbeddings(articles: Article[]): Promise<Array<Article & { embedding: number[] }>> {
  const embeddings = await Promise.all(
    articles.map(async (article) => {
      const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: article.content,
      });
      return {
        ...article,
        embedding: response.data[0].embedding,
      };
    })
  );
  return embeddings;
}

export async function upsertEmbeddings(articles: Article[]) {
  const embeddings = await generateEmbeddings(articles);

  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

  const batchSize = 100;
  for (let i = 0; i < embeddings.length; i += batchSize) {
    const batch = embeddings.slice(i, i + batchSize);

    await index.upsert(
      batch.map((embedding) => ({
        id: embedding.id,
        values: embedding.embedding,
        metadata: {
          title: embedding.title || '',
          content: embedding.content,
        },
      }))
    );
  }
}