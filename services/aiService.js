// const { OpenAI } = require('openai');
// const { moderateContent } = require('./moderation.ts');
// const { retrieveRelevantArticles } = require('./queryRetrieval.Js');

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// async function generateAIReport(selections) {
//   try {
//     // Combine the selections into a string
//     const contentToModerate = selections.map(s => `${s.question}: ${s.answer}`).join(' ');
//     await moderateContent(contentToModerate);

//     // Retrieve relevant articles from Pinecone based on user selections
//     const relevantArticles = await retrieveRelevantArticles(selections.map(s => s.value));

//     // Add the relevant content from Notion to the prompt
//     const prompt = constructPrompt(selections, relevantArticles);

//     // Generate the response using OpenAI GPT-4
//     const response = await openai.chat.completions.create({
//       model: 'gpt-4',
//       messages: [{ role: 'user', content: prompt }],
//       temperature: 0.7,
//       max_tokens: 1000,
//     });

//     // Parse and return the AI response as JSON
//     const aiResponseText = response.choices[0].message?.content || '';
//     const aiResponse = JSON.parse(aiResponseText);

//     return aiResponse;
//   } catch (error) {
//     console.error('Error generating AI report:', error);
//     throw error;
//   }
// }

// function constructPrompt(selections, relevantArticles) {
//   // Create a string of the retrieved articles from Notion
//   const relevantContent = relevantArticles
//     .map(article => `${article.title}: ${article.content}`)
//     .join('\n\n');

//   return `
// You are an expert assistant helping to design an incentive program based on the following user selections:

// ${selections.map(s => `${s.type}: ${s.value}`).join('\n')}

// Relevant context from the knowledge base:
// ${relevantContent}

// Please provide:

// 1. A summary of the program (approximately 150-200 words).
// 2. 5-7 marketing steps to promote and implement the program.
// 3. 3-5 important considerations or potential challenges for this program.
// 4. Metrics on how long it would take to:
//    a) Design the program
//    b) Implement the program
//    c) Monitor the program
//    d) Launch the program
//    e) Market the program
//    - Provide the estimated time in weeks or months for each.

// Ensure that your response is formatted exactly as the JSON structure provided below, with no additional text or explanations. Do not include any commentary or preamble.

// {
//   "summary": "Your summary here.",
//   "marketingSteps": ["Step 1", "Step 2", "..."],
//   "considerations": ["Consideration 1", "Consideration 2", "..."],
//   "metrics": {
//     "design": "Estimated time for design (e.g., '2 weeks')",
//     "implementation": "Estimated time for implementation",
//     "monitoring": "Estimated time for monitoring",
//     "launch": "Estimated time for launch",
//     "marketing": "Estimated time for marketing",
//     "setupTime": "Estimated setup time",
//     "maintenanceTime": "Estimated maintenance time",
//     "estimatedCost": 0,
//     "rolesNeeded": ["Role 1", "Role 2"]
//   }
// }

// Please output only the JSON object in your response.
//   `.trim();
// }

// module.exports = {
//   generateAIReport,
// };

const { OpenAI } = require("openai");
const { moderateContent } = require("./moderation");
const { generateQueryEmbedding } = require("./queryEmbedding");
const { queryPinecone } = require("./queryPinecone");
const { fetchKnowledgeBase } = require("./notionClient");
const { Pinecone } = require("@pinecone-database/pinecone");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let pinecone = null;
let index = null;

async function initPinecone() {
  if (!pinecone) {
    pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    index = pinecone.index(process.env.PINECONE_INDEX_NAME || "kwik-ai");
  }
}

// Function to populate Pinecone with data from Notion
async function populatePinecone() {
  await initPinecone();
  const knowledgeBase = await fetchKnowledgeBase();

  for (const article of knowledgeBase) {
    if (!article.content || article.content.trim() === "") {
      console.warn(
        `Skipping article with ID: ${article.id} due to empty content.`
      );
      continue;
    }
    const queryEmbedding = await generateQueryEmbedding(article.content);
    index.upsert([
      {
        id: article.id,
        values: queryEmbedding,
        metadata: {
          title: article.title,
          content: article.content,
        },
      },
    ]);
  }
}

// Function to generate AI report based on user selections
// async function generateAIReport(selections) {
//   try {
//     const contentToModerate = selections
//       .map((s) => `${s.question}: ${s.value}`)
//       .join(" ");
//     await moderateContent(contentToModerate);

//     const userSelections = selections.map((s) => s.value);
//     const relevantArticles = await retrieveRelevantArticles(userSelections);

//     const prompt = constructPrompt(selections, relevantArticles);

//     // Call OpenAI API to generate a report
//     const response = await openai.chat.completions.create(
//       {
//         model: "gpt-4",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7,
//         max_tokens: 1000,
//         stream: true,
//       },
//     );

//     console.log({ response });

//     // const aiResponseText = response.choices[0].message?.content || "";
//     // const aiResponse = JSON.parse(aiResponseText);

//     return response;
//   } catch (error) {
//     console.error("Error generating AI report:", error);
//     throw error;
//   }
// }

async function generateAIReport(selections, res) {
  try {
    const contentToModerate = selections
      .map((s) => `${s.question}: ${s.value}`)
      .join(" ");
    await moderateContent(contentToModerate);

    const userSelections = selections.map((s) => s.value);
    const relevantArticles = await retrieveRelevantArticles(userSelections);

    // Define the sections to generate
    const sections = [
      "summary",
      "marketingSteps",
      "nextSteps",
      "considerations",
      "metrics",
    ];

    // Iterate through each section and stream the response
    for (const section of sections) {
      const prompt = constructSectionPrompt(
        selections,
        relevantArticles,
        section
      );

      // Call OpenAI API for each section
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
        stream: true,
      });

      // Stream section content
      res.write(`"${section}": `);
      let sectionContent = '"'; // Start the content as a string for JSON format

      for await (const part of response) {
        const contentPart = part.choices[0]?.delta.content || "";
        sectionContent += contentPart;
        res.write(contentPart);
      }

      console.log({ sectionContent });

      sectionContent += '",\n'; // Close the content string for this section
      res.write(sectionContent);
    }
  } catch (error) {
    console.error("Error generating AI report:", error);
    throw error;
  }
}

// Helper function to construct the prompt for OpenAI API
// function constructPrompt(selections, articles) {
//   return `
//   Hey AI, you’re speaking with a company owner who owns a business and is looking at creating a program like this! Based on their selections, here’s how their incentive program will work:

//   User Selections:
//   ${selections.map((s) => `${s.question}: ${s.value}`).join("\n")}

//   Using the following relevant knowledge base from our database:
//   ${articles.map((a) => `${a.title}: ${a.content}`).join("\n")}

//   Please provide:

//   1. **Summary**:
//   Okay AI, we want you to respond to this company owner as the Kwik AI Bot. We want to make this response to the program and questions they answered to let them know what they chose and why we think it’s going to be an awesome program for their company.So in this repeat the program, and why you think it’s going to be a huge hit. But also talk about why this program could become more difficult than they think. Utilize the knowledge base to find really advanced points or content that the average business owner might not know about an incentive program.Also frame this as a tool to help them understand the intricacies of the program they filled out. As well as give them tips and steps to execute.
//   Here is just an example:Hey {Name used in submission}! Your program looks amazing! I think you’re business will thrive targeting your old customer base to make them become affiliates of your brand! There might be more to this program than you thought and we’re happy to help you out here at Kwik figure out how to implement this program! We will layout some ideas, marketing content, next steps and an idea of what this program is going to take to implement it!

//   2. **Marketing Steps**:
//   Okay AI, now you’re putting on your marketing cap on, utilizing the knowledge base given to you, and your understanding of the customer journey and flow, you need to come up with every single way you can market this program.Your boss wants you to cover everything with about 10 different points on what you can do to market this program with your business flow.Think about the entire customer journey and what kind of assets you need to market this program from A-Z.

//   3. **Next Steps**:
//   Now OpenAI put your product manager hat on. Think about each answer, each knowledge base, each main answer that needs to be answered to figure out the technicalities behind he program. What meetings need to be happened, who needs to be updated on this, how is ti going to be rolled out, what software provider are you going to use, what is your budget, what is your timeline, how much is this costing you by not having one.How will they market, launch the marketing, how will they review the program weekly.
//   We want to showcase to them that there are at least 10-15 steps to get a program launched and live.
//   Here is an example of next steps for the similar point program.
//   1. Design an incentive program
//   2. Figure out the financial implication of the program.
//   3. Get approval from management.
//   4. Meet with marketing about the concept.
//   5. Meet with IT about possibilities.
//   6. Develop the point program to work with your brand.
//   7. Create the marketing assets to push the program.
//   8. Talk to a rewards expert and do market research.
//   9. Setup the program
//   10. Test the program
//   11. Launch the program
//   12. Review KPI’s and get customer feedback on the program
//   13. Review the financial implications of this program
//   14. Deal with accrued liability from the points.

//   4. **Considerations**:
//   Okay AI, this is where you put on your Kwik. AI hat and you really look at our knowledge base to come up with the technicalities of the program. Please look at the knowledge base I provided in depth and find out every detail and information we have on the answers the user submitted.
//   You need to come up with minimum 15 different complex and unique points that they might have not thought of but our team has thought of. You really need to think about the knowledge base I provided and things your average business person who doesn’t know much about rewards program might not know.
//   Also include some technical questions they have to answer, you can form this on questions based on different options and ways they can go in the knowledge base I provided to showcase to them all the different ways they could execute on this program.Here are some examples for someone choosing new customers and loyalty points.
//   1. Are points the right reward for a new customers?
//   2. Have you had a program previously?
//   3. Do your customers buy enough to justify points.
//   4. How much are you going to give on a purchase?
//   5. How much liability do you have in points?
//   6. How do you plan on marketing this program?
//   7. Have you considered different typers of rewards for retention
//   8. What software are you going to use to automate it.
//   9. Are you going to have customers support trained on the point system.
//   10. Are you going to incentivize referrals with points? Or with another form of point?
//   11. Is your tech team ready to implement this program and do you have the resources?
//   12. Do you know how to create a great rewards program?
//   13. How will you deal with point rounding?
//   14. How will users redeem these points?
//   15. Do points expire? If so when?
//   16. Do you have an email flow for the points?

//   5. **Metrics**:
//      a) **Estimated Cost**:
//      Okay AI, you’re a marketing manager that was tasked by your boss to figure out how much this program is going to cost so that it fits within your marketing budget. But you need to be strategic, you don’t want to guess to low or you won’t be able to execute the program.
//      So think deeply about the roles you’re going to need, how much time they’re going to take to implement, and how much that will cost you with their time dedicated to the program.
//      Then think about the software, the IT team, the finance team, and everyone that has to be involved and how much of their time will be invested and what that will cost.
//      You should also think about the larger the company, the more people involved, the more resources dedicated and the more the program will take to implement. A 100,000,000 million a year in revenue company will take hundreds of thousands or even millions to implement while a smaller brand can be 75k.

//      b) **Implementation Timeline**:
//      Provide an estimate on how long this program might take to implement without Kwik. Factor in the design, marketing, development, and all other steps. Give estimates in weeks or months.

//      c) **Roles Needed**:
//      Based on their selections, what roles and talents would they need to make this program successful? List 3-5 roles.

//   Ensure that your response is formatted exactly as the JSON structure provided below, without any additional text or explanations. Do not include any commentary or preamble.

//   {
//     "summary": "Your summary here.",
//     "marketingSteps": ["Step 1", "Step 2", "..."],
//     "nextSteps": ["Step 1", "Step 2", "..."],
//     "considerations": ["Consideration 1", "Consideration 2", "..."],
//     "metrics": {
//       "estimatedCost": "Estimated cost range in $ (e.g., '$10,000 - $15,000')",
//       "implementationTimeline": "Estimated time for implementation",
//       "rolesNeeded": ["Role 1", "Role 2"]
//     }
//   }

//   Please output only the JSON object in your response.
//     `.trim();
// }

function constructSectionPrompt(selections, articles, section) {
  const basePrompt = `
    Hey AI, you’re speaking with a company owner who owns a business and is looking at creating a program like this! Based on their selections, here’s how their incentive program will work:
    
    User Selections:
    ${selections.map((s) => `${s.question}: ${s.value}`).join("\n")}
    
    Using the following relevant knowledge base from our database:
    ${articles.map((a) => `${a.title}: ${a.content}`).join("\n")}
  `;

  switch (section) {
    case "summary":
      return `
        ${basePrompt}
        
        1. **Summary**:
        Okay AI, we want you to respond to this company owner as the Kwik AI Bot. We want to make this response to the program and questions they answered to let them know what they chose and why we think it’s going to be an awesome program for their company. So in this, repeat the program, and why you think it’s going to be a huge hit. But also talk about why this program could become more difficult than they think. Utilize the knowledge base to find really advanced points or content that the average business owner might not know about an incentive program. Frame this as a tool to help them understand the intricacies of the program they filled out and give them tips and steps to execute.
        
        Here is just an example:
        Hey {Name used in submission}! Your program looks amazing! I think you’re business will thrive targeting your old customer base to make them become affiliates of your brand! There might be more to this program than you thought and we’re happy to help you out here at Kwik figure out how to implement this program! We will layout some ideas, marketing content, next steps, and an idea of what this program is going to take to implement it!
      `;
    case "marketingSteps":
      return `
        ${basePrompt}
        
        2. **Marketing Steps**:
        Okay AI, now you’re putting on your marketing cap on, utilizing the knowledge base given to you, and your understanding of the customer journey and flow, you need to come up with every single way you can market this program. Your boss wants you to cover everything with about 10 different points on what you can do to market this program with your business flow. Think about the entire customer journey and what kind of assets you need to market this program from A-Z.
      `;
    case "nextSteps":
      return `
        ${basePrompt}
        
        3. **Next Steps**:
        Now OpenAI, put your product manager hat on. Think about each answer, each knowledge base, each main answer that needs to be answered to figure out the technicalities behind the program. What meetings need to be happened, who needs to be updated on this, how is it going to be rolled out, what software provider are you going to use, what is your budget, what is your timeline, how much is this costing you by not having one? How will they market, launch the marketing, how will they review the program weekly?
        
        We want to showcase to them that there are at least 10-15 steps to get a program launched and live.
        
        Example:
        1. Design an incentive program
        2. Figure out the financial implication of the program
        3. Get approval from management
        4. Meet with marketing about the concept
        5. Meet with IT about possibilities
        6. Develop the point program to work with your brand
        7. Create the marketing assets to push the program
        8. Talk to a rewards expert and do market research
        9. Setup the program
        10. Test the program
        11. Launch the program
        12. Review KPIs and get customer feedback on the program
        13. Review the financial implications of this program
        14. Deal with accrued liability from the points
      `;
    case "considerations":
      return `
        ${basePrompt}
        
        4. **Considerations**:
        Okay AI, this is where you put on your Kwik AI hat and really look at our knowledge base to come up with the technicalities of the program. Please look at the knowledge base in-depth and find out every detail and information we have on the answers the user submitted. You need to come up with a minimum of 15 complex and unique points that they might not have thought of but our team has. Think about the knowledge base and things the average business person who doesn’t know much about rewards programs might not know.
        
        Examples of technical questions:
        1. Are points the right reward for new customers?
        2. Have you had a program previously?
        3. Do your customers buy enough to justify points?
        4. How much are you going to give on a purchase?
        5. How much liability do you have in points?
        6. How do you plan on marketing this program?
        7. Have you considered different types of rewards for retention?
        8. What software are you going to use to automate it?
        9. Are your customer support teams trained on the point system?
        10. Are you incentivizing referrals with points? Or another reward type?
        11. Is your tech team ready to implement this program?
        12. How will users redeem these points?
        13. Do points expire? If so, when?
        14. How will you deal with point rounding?
        15. Do you have an email flow for the points?
      `;
    case "metrics":
      return `
        ${basePrompt}
        
        5. **Metrics**:
        a) **Estimated Cost**:
        Okay AI, you’re a marketing manager tasked with figuring out how much this program will cost so that it fits within their marketing budget. Be strategic, considering roles, time, software, and other team resources required for this program.
        
        b) **Implementation Timeline**:
        Provide an estimate on how long this program might take to implement without Kwik. Factor in the design, marketing, development, and all other steps. Give estimates in weeks or months.
        
        c) **Roles Needed**:
        Based on their selections, what roles and talents would they need to make this program successful? List 3-5 roles.
      `;
    default:
      throw new Error("Invalid section");
  }
}

// Function to retrieve relevant articles from Pinecone based on user selections
async function retrieveRelevantArticles(userSelections) {
  const query = userSelections.join(" ");
  const queryEmbedding = await generateQueryEmbedding(query);
  const relevantArticles = await queryPinecone(queryEmbedding);

  return relevantArticles;
}

module.exports = {
  generateAIReport,
  populatePinecone,
};
