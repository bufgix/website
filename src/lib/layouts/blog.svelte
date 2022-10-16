<script context="module">
	import { Claps } from 'svelte-claps';

	import h2 from '$lib/components/H2.svelte';
	import h3 from '$lib/components/H2.svelte';

	export { h2, h3 };
</script>

<script>
	import dayjs from 'dayjs';
	import variables from '$lib/variables';

	export let title;
	export let date;
	export let tags;
	export let description;
</script>

<svelte:head>
	<title>{title} | Faruk Oruç</title>

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${title} | Faruk Oruç`} />
	<meta name="twitter:url" content="https://faruk-website.vercel.app/" />
	<meta
		name="twitter:description"
		content={description || 'A tech blog generally about Frontend and Javascript'}
	/>
	<meta
		name="twitter:image"
		content={`${variables.DOMAIN}/api/thumb-image?title=${title}&readTime=6%20min%20read&desc=${description}`}
	/>
	<meta name="twitter:creator" content="@bufgix_" />
</svelte:head>

<article class="prose dark:prose-invert">
	<div class="md:my-16">
		<span class="font-serif text-xl">{dayjs(date).format('MMM DD, YYYY')} </span>
		<h1 class="md:text-5xl mb-4">{title}</h1>
		{#each tags as tag}
			<span class="font-serif font-semibold mr-2">
				#{tag}
			</span>
		{/each}
	</div>

	<slot />
</article>

<Claps fixed="center" replyUrl="https://twitter.com/bufgix_" />
