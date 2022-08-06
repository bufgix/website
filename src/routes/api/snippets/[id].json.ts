import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import type { RequestHandler } from '@sveltejs/kit';
import { compile } from 'mdsvex';
import relativeImages from 'mdsvex-relative-images';
import remarkHeadingId from 'remark-heading-id';
import figure from 'rehype-figure';

import variables from '$lib/variables';

const notion = new Client({ auth: variables.NOTION_SECRET });
const n2m = new NotionToMarkdown({ notionClient: notion });

export const GET: RequestHandler<{ id: string }> = async (event) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const [{ properties, created_time }, mdBlocks] = await Promise.all([
		await notion.pages.retrieve({ page_id: event.params.id }),
		await n2m.pageToMarkdown(event.params.id)
	]);
	const title = properties.title.title[0].text.content;

	const body = n2m.toMarkdownString(mdBlocks);
	const htmlBody = await compile(body, {
		remarkPlugins: [relativeImages, remarkHeadingId],
		rehypePlugins: [figure]
	});

	return {
		body: {
			id: event.params.id,
			markdownBody: body,
			html: htmlBody as any,
			title,
			created_time
		}
	};
};
