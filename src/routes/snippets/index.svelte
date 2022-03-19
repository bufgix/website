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

<script lang="ts">
	import { fixCodeBlock } from '$lib/utils';
	import dayjs from 'dayjs';

	export let snippets;
</script>

<svelte:head>
	<title>Snippets</title>
</svelte:head>

<h1 class="mb-2">Snippets</h1>
<h6 class="font-serif text-gray-500">Quick Notes & Tips</h6>
<hr class="my-6" />
<section>
	{#each snippets as { html: { code }, title, id, tags, created_time }}
		<article class="prose-headings:text-2xl mb-20 md:mb-10 break-words">
			<a class="no-underline" sveltekit:prefetch href={`/snippets/${id}`}>
				<h1 class="mb-0">{title}</h1>
			</a>
			<i class="text-gray-500">{dayjs(created_time).fromNow()}</i>
			<div>
				{#each tags as tag}
					<span class={`p-1 font-mono`}>
						{tag.name}
					</span>
				{/each}
			</div>
			{@html fixCodeBlock(code)}
		</article>
	{/each}
</section>
