<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const posts = await (await fetch('/api/posts.json')).json();
		return {
			props: {
				posts
			}
		};
	};
</script>

<script lang="ts">
	export let posts: any[];
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1 class="mb-2">Latest Blogs</h1>
<h6 class="font-serif text-gray-500">
	I write about web development, design, and other things I find interesting.
</h6>
<hr class="my-6" />

<ul>
	{#each posts as post}
		<li>
			<a class="no-underline" href={post.path}>{post.meta.title}</a>
		</li>
	{/each}
</ul>
