<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, fetch }) => {
		const snippetData = await (await fetch(`/api/snippets/${params.id}.json`)).json();

		return {
			props: {
				...snippetData,
				code: snippetData.html.code
			}
		};
	};
</script>

<script>
	import { fixCodeBlock } from '$lib/utils';

	export let code;
</script>

<div>
	{@html fixCodeBlock(code)}
</div>
