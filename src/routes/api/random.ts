import type { RequestHandler } from '@sveltejs/kit';
import variables from '$lib/variables';

export const GET: RequestHandler = async ({ request }) => {
	const [posts, snippets] = await Promise.all([
		await (await fetch(`${variables.DOMAIN}/api/posts.json`)).json(),
		await (await fetch(`${variables.DOMAIN}/api/snippets.json`)).json()
	]);

	const allContent = [...posts, ...snippets];
	const randomContent = allContent[Math.floor(Math.random() * allContent.length)];

	return {
		status: 200,
		body: {
			path: randomContent.path
		}
	};
};
