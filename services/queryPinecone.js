const { Pinecone } = require('@pinecone-database/pinecone');
let pinecone = null;
let index = null;

async function initPinecone() {
  if (!pinecone) {
    pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    index = pinecone.Index(process.env.PINECONE_INDEX_NAME || 'kwik-ai');
  }
}

async function queryPinecone(queryEmbedding) {
  await initPinecone();

  const queryResponse = await index.query({
    vector: queryEmbedding,
    topK: 5,
    includeMetadata: true,
  });

  const articles = queryResponse.matches.map((match) => ({
    id: match.id,
    title: match.metadata.title,
    content: match.metadata.content,
  }));

  return articles;
}

module.exports = { queryPinecone };
