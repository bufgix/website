<script context="module">
	import h2 from '$lib/components/H2.svelte';
	import h3 from '$lib/components/H2.svelte';

	export { h2, h3 };
</script>

<script>
	export let title;
	export let date;
</script>

<svelte:head>
	<title>{title} - Faruk's Tech Blog</title>
</svelte:head>

<article class="prose">
	<h1>{title}</h1>
	<p>Published: {date}</p>

	<slot />
</article>
