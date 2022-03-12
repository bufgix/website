import { Client } from '@notionhq/client';
import variables from '$lib/variables';
import { NotionToMarkdown } from 'notion-to-md';
import { compile } from 'mdsvex';
import relativeImages from 'mdsvex-relative-images';
import remarkHeadingId from 'remark-heading-id';
import figure from 'rehype-figure';

const notion = new Client({ auth: variables.NOTION_SECRET });
const n2m = new NotionToMarkdown({ notionClient: notion });
const databaseId = variables.NOTION_DB_ID;

export const get = async (event) => {
	const { results } = await notion.databases.query({ database_id: databaseId });

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const pageIds = results.map(({ properties }) => {
		return properties.Page.title[0].mention.page.id;
	});

	const pagesContent = await Promise.all(
		pageIds.map(async (pageId) => {
			const mdBlocks = await n2m.pageToMarkdown(pageId);
			const body = n2m.toMarkdownString(mdBlocks);

			return {
				id: pageId,
				markdownBody: body,
				html: await compile(body, {
					remarkPlugins: [relativeImages, remarkHeadingId],
					rehypePlugins: [figure]
				})
			};
		})
	);

	return {
		body: pagesContent
	};
};
