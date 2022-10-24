<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async function ({ fetch }) {
		const { bookmarks } = await (await fetch('/api/bookmarks.json')).json();

		return {
			props: {
				bookmarks
			}
		};
	};
</script>

<script>
	import dayjs from 'dayjs';

	export let bookmarks;
</script>

<svelte:head>
	<title>Bookmarks</title>
</svelte:head>

<h1 class="mb-2">Bookmarks</h1>
<h6 class="font-serif text-gray-500">
	Interesting links that I come across while surfing the Internet. Mostly about
	<i> web development. </i>
</h6>
<hr class="my-6" />

{#each bookmarks.items as bookmark}
	<div class="my-9">
		<a target="_blank" rel="external" href={bookmark.link}>
			<h4>{bookmark.title}</h4>
		</a>
		<h6 class="mb-1">{bookmark.excerpt}</h6>
		<span class="text-gray-400">{bookmark.domain}・{dayjs(bookmark.created).fromNow()}</span>
	</div>
{/each}
