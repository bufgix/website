<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async function ({ fetch }) {
		const { path } = await (await fetch('/api/random')).json();

		return {
			status: 302,
			redirect: path
		};
	};

	export const prerender = false
</script>
