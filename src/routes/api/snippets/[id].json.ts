import type { RequestHandler } from '@sveltejs/kit';
import { compile } from 'mdsvex';
import relativeImages from 'mdsvex-relative-images';
import remarkHeadingId from 'remark-heading-id';
import figure from 'rehype-figure';

import variables from '$lib/variables';
import { ISSUE_URL } from '$lib/constants';

export const GET: RequestHandler<{ id: string }> = async (event) => {
	return {
		body: await fetch(`${ISSUE_URL}/${event.params.id}`, {
			headers: {
				'Content-Type': 'application/vnd.github+json',
				Authorization: `Bearer ${variables.GITHUB_TOKEN}`
			}
		})
			.then((res) => res.json())
			.then(async (snippet) => {
				return {
					id: snippet.id,
					title: snippet.title,
					create_time: snippet.created_at,
					markdownBody: snippet.body,
					html: (await compile(snippet.body, {
						remarkPlugins: [relativeImages, remarkHeadingId],
						rehypePlugins: [figure]
					})) as any
				};
			})
	};
};
