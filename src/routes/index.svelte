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

<h2 class="mb-2">Latest Blogs</h2>
<hr class="mb-4" />
<ul>
	{#each posts as post}
		<li>
			<a class="no-underline" href={post.path}>{post.meta.title}</a>
		</li>
	{/each}
</ul>
