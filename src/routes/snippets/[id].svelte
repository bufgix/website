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
	import dayjs from 'dayjs';
	import { fixCodeBlock } from '$lib/utils';

	export let code, title, created_time;
</script>

<article>
	<h1 class="mb-0">{title}</h1>
	<i class="text-gray-500">{dayjs(created_time).fromNow()}</i>

	{@html fixCodeBlock(code)}
</article>
