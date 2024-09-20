const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const NOTION_DATABASE_ID = '0fe1520b22b48011ad66d5121f2bf659';

async function fetchKnowledgeBase() {
  const pages = [];
  let cursor = undefined;

  do {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      start_cursor: cursor,
      page_size: 100,
    });

    pages.push(...response.results);
    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  const articles = [];
  for (const page of pages) {
    const title = page.properties.Name?.title?.[0]?.plain_text || '';
    const id = page.id // Fetching the 'ID' property from Notion
    const content = await extractContentFromPage(page.id);
    
    articles.push({
      id: id || page.id, // Use Notion ID if available, or fallback to page ID
      title,
      content,
    });
  }

  return articles;
}


async function extractContentFromPage(pageId) {
  const blocks = [];
  let cursor = undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });

    blocks.push(...response.results);
    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  // Process the blocks and filter out non-paragraphs or empty text
  const text = blocks
    .map((block) => {
      if (block.type === 'paragraph' && block.paragraph.rich_text.length > 0) {
        return block.paragraph.rich_text.map((t) => t.plain_text).join('');
      }
      // Handle other block types if needed, such as headings or to-do lists
      return '';
    })
    .filter((line) => line.trim() !== '') 
    .join('\n');

  return text;
}

module.exports = { fetchKnowledgeBase };