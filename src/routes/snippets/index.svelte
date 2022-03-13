<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const snippets = await (await fetch('/api/snippets.json')).json();
		return {
			props: {
				snippets
			}
		};
	};
</script>

<script>
	import { fixCodeBlock } from '$lib/utils';

	export let snippets;
</script>

{#each snippets as { html: { code }, title, id }}
	<div class="snippet">
		<h1>{title}</h1>
		{@html fixCodeBlock(code)}
		<a sveltekit:prefetch href={`/snippets/${id}`}>Go detail</a>
	</div>
{/each}
