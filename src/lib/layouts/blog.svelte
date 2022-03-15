<script context="module">
	import h2 from '$lib/components/H2.svelte';
	import h3 from '$lib/components/H2.svelte';

	export { h2, h3 };
</script>

<script>
	import dayjs from 'dayjs';

	export let title;
	export let date;
	export let tags;
</script>

<svelte:head>
	<title>{title} - Faruk's Tech Blog</title>
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
