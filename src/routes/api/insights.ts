import { Redis } from '@upstash/redis';
import variables from '$lib/variables';
import type { RequestHandler } from '@sveltejs/kit';

const redis = new Redis({
	url: variables.UPSTASH_URL,
	token: variables.UPSTASH_TOKEN
});

export const POST: RequestHandler = async ({ request }) => {
	const { path } = await request.json();

	const old = parseInt(await redis.get(`${path}_visits`)) || 0;
	await redis.set(`${path}_visits`, old + 1);

	return {
		status: 200
	};
};
