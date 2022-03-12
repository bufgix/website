import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import type { RequestHandler } from '@sveltejs/kit';
import { compile } from 'mdsvex';

import variables from '$lib/variables';

const notion = new Client({ auth: variables.NOTION_SECRET });
const n2m = new NotionToMarkdown({ notionClient: notion });

export const get: RequestHandler<{ id: string }> = async (event) => {
	const mdBlocks = await n2m.pageToMarkdown(event.params.id);
	const body = n2m.toMarkdownString(mdBlocks);
	const htmlBody = await compile(body, );

	return {
		body: {
			id: event.params.id,
			markdownBody: body,
			html: htmlBody as any
		}
	};
};
