const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Uses OpenAI's Moderation API to check if the provided text contains disallowed content.
 * @param text The text to be moderated.
 * @returns The original text if it's compliant, or throws an error if disallowed content is detected.
 * @throws Error if the content violates OpenAI's usage policies.
 */
async function moderateContent(text) {
  try {
    const response = await openai.moderations.create({
      input: text,
    });

    const results = response.results[0];
    if (results.flagged) {
      throw new Error("Content violates OpenAI's usage policies.");
    }
  } catch (error) {
    console.error('Error during content moderation:', error);
    throw error;
  }
}

module.exports = { moderateContent };
