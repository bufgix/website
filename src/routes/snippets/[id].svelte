<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, fetch }) => {
		const snippetData = await (await fetch(`/api/snippets/${params.id}`)).json();

		return {
			props: {
				...snippetData,
				code: snippetData.html.code
			}
		};
	};
</script>

<script>
	import { page } from '$app/stores';

	export let id, markdownBody, code;
</script>

<div>
	{@html code
		.replace(/>{@html `<code class="language-/g, '><code class="language-')
		.replace(/<\/code>`}<\/pre>/g, '</code></pre>')}
</div>
