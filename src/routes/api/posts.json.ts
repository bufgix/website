// posts.json.js
export const get = async () => {
	const allPostFiles = import.meta.glob('../blog/**/*.{md,svx}');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver();

			const postPath = path
				.substring(0, path.lastIndexOf('/'))
				.replace(/\.[^/.]+$/, '')
				.slice(2);

			return {
				meta: metadata,
				path: postPath
			};
		})
	);

	const sortedPosts = allPosts.sort((a, b) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return new Date(b.meta.date) - new Date(a.meta.date);
	});

	return {
		body: sortedPosts
	};
};
