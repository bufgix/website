import variables from '$lib/variables';

const RAINDROP_URL = 'https://api.raindrop.io/rest/v1/raindrops/0?perpage=30';

export const GET = async () => {
	const bookmarks = await (
		await fetch(RAINDROP_URL, {
			headers: {
				Authorization: `Bearer ${variables.RAINDROP_API_KEY}`
			}
		})
	).json();

	return {
		body: {
			bookmarks
		}
	};
};
