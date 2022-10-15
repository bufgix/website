import { compile } from 'mdsvex';
import relativeImages from 'mdsvex-relative-images';
import remarkHeadingId from 'remark-heading-id';
import figure from 'rehype-figure';
import { ISSUE_LABEL, ISSUE_URL } from '$lib/constants';
import variables from '$lib/variables';

export const GET = async () => {
	const searchParams = new URLSearchParams();
	searchParams.set('labels', ISSUE_LABEL);

	return {
		body: await fetch(`${ISSUE_URL}?${searchParams.toString()}`, {
			headers: {
				'Content-Type': 'application/vnd.github+json',
				Authorization: `Bearer ${variables.GITHUB_TOKEN}`
			}
		})
			.then((res) => res.json())
			.then(async (snippets) => {
				return Promise.all(
					snippets.map(async (snippet) => {
						return {
							id: snippet.id,
							title: snippet.title,
							path: `/snippets/${snippet.number}`,
							tags: snippet.labels
								.map((label) => label.name)
								.filter((label) => label !== ISSUE_LABEL),
							created_time: snippet.created_at,
							markdownBody: snippet.body,
							html: await compile(snippet.body, {
								remarkPlugins: [relativeImages, remarkHeadingId],
								rehypePlugins: [figure]
							})
						};
					})
				);
			})
	};
};
