import { Client } from '@notionhq/client';
import { Article } from '../types';

const notion = new Client({ auth: process.env.REACT_APP_NOTION_API_KEY });
const NOTION_DATABASE_ID = '0fe1520b22b48011ad66d5121f2bf659';

export async function fetchKnowledgeBase(): Promise<Article[]> {
  const pages: any[] = [];
  let cursor: string | undefined = undefined;

  do {
    const response: any = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      start_cursor: cursor,
      page_size: 100,
    });

    pages.push(...response.results);
    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  const articles: Article[] = [];
  for (const page of pages) {
    const title = page.properties.Name?.title?.[0]?.plain_text || '';
    const content = await extractContentFromPage(page.id);
    articles.push({
      id: page.id,
      title,
      content,
    });
  }

  return articles;
}

async function extractContentFromPage(pageId: string): Promise<string> {
  const blocks: any[] = [];
  let cursor: string | undefined = undefined;

  do {
    const response: any = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });

    blocks.push(...response.results);
    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  const text = blocks
    .map((block: any) => {
      if ('paragraph' in block && block.paragraph.text) {
        return block.paragraph.text.map((t: any) => t.plain_text).join('');
      }
      // Handle other block types as needed
      return '';
    })
    .join('\n');

  return text;
}