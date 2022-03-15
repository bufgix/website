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
	<div class="prose-headings:text-2xl">
		<a sveltekit:prefetch href={`/snippets/${id}`}>
			<h1>{title}</h1>
		</a>
		{@html fixCodeBlock(code)}
	</div>
	<hr />
{/each}
