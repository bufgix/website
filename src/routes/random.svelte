<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async function ({ fetch }) {
		const [posts, snippets] = await Promise.all([
			await (await fetch('/api/posts.json')).json(),
			await (await fetch('/api/snippets.json')).json()
		]);
		const allContent = [...posts, ...snippets];
		const randomContent = allContent[Math.floor(Math.random() * allContent.length)];

		return {
			status: 302,
			redirect: randomContent.path
		};
	};
</script>
