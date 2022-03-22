import type { RequestHandler } from '@sveltejs/kit';
import { get as getPosts } from './posts.json';
import { get as getSnippets } from './snippets/index.json';

export const get: RequestHandler = async ({ request }) => {
	const [{ body: posts }, { body: snippets }] = await Promise.all([getPosts(), getSnippets()]);

	const allContent = [...posts, ...snippets];
	const randomContent = allContent[Math.floor(Math.random() * allContent.length)];

	return {
		status: 200,
		body: {
			path: randomContent.path
		}
	};
};
