const openai = require('./openaiClient');

/**
 * Uses OpenAI's Moderation API to check if the provided text contains disallowed content.
 * @param text The text to be moderated.
 * @returns The original text if it's compliant, or throws an error if disallowed content is detected.
 * @throws Error if the content violates OpenAI's usage policies.
 */
async function moderateContent(content) {
  try {
    // Call the OpenAI Moderation API
    const response = await openai.createModeration({
      input: content,
    });

    const result = response.data.results[0];

    if (result.flagged) {
      // Content violates OpenAI's policies
      throw new Error("Content flagged as inappropriate");
    }

    // Content is compliant
    return content;
  } catch (error) {
    console.error("Error in content moderation:", error);
    throw error;
  }
}

module.exports = { moderateContent };
