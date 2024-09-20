const { generateQueryEmbedding } = require("./queryEmbedding");
const { queryPinecone } = require("./queryPinecone");


async function retrieveRelevantArticles(userSelections) {
  // Generate embedding for the query using existing function
  const query = userSelections.join(" ");
  const queryEmbedding = await generateQueryEmbedding(query);

  // Query Pinecone and retrieve relevant articles
  const relevantArticles = await queryPinecone(queryEmbedding);

  return relevantArticles;
}

module.exports = { retrieveRelevantArticles };
