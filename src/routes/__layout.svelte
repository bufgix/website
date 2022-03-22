<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url }) => {
		const currentRoute = url.pathname;

		return {
			props: {
				currentRoute
			}
		};
	};
</script>

<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';

	import TheIcons from '$lib/components/TheIcons.svelte';

	dayjs.extend(relativeTime);

	export let currentRoute;

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	onMount(() => {
		// set theme
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});

	$: {
		if (typeof window !== 'undefined')
			navigator.sendBeacon('/api/insights', JSON.stringify({ path: currentRoute }));
	}
</script>

<svelte:head>
	<title>Faruk Oruç</title>

	<link rel="manifest" href="/site.webmanifest" crossorigin="anonymous" />
	<meta name="theme-color" content="#f97316" />
	<link rel="apple-touch-icon" sizes="192x192" href="/android-chrome-192x192.png" />
	<link rel="apple-touch-icon" sizes="512x512" href="/android-chrome-512x512.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<meta name="description" content="A tech blog generally about Frontend and Javascript" />

	<meta name="image" content="https://farukoruc.com/banner.png" data-react-helmet="true" />
	<meta property="og:title" content="Faruk Oruç" />
	<meta property="og:url" content="https://farukoruc.com/" />
	<meta property="og:description" content="A tech blog generally about Frontend and Javascript" />
	<meta property="og:image" content="https://farukoruc.com//banner.png" />
	<meta property="og:type" content="website" />
	<meta property="og:image:alt" content="A tech blog generally about Frontend and Javascript" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Faruk's Tech Blog" />
	<meta name="twitter:url" content="https://farukoruc.com/" />
	<meta name="twitter:description" content="A tech blog generally about Frontend and Javascript" />
	<meta name="twitter:image" content="https://farukoruc.com/banner.jpg" />
	<meta name="twitter:image:alt" content="A tech blog generally about Frontend and Javascript" />
	<meta name="twitter:creator" content="@bufgix_" />
</svelte:head>

<TheIcons />

<main class="bg-light dark:bg-dark dark:text-white min-h-screen transition-colors duration-100">
	<Header />

	{#key currentRoute}
		<main
			class="prose container w-full md:mx-auto px-4 dark:prose-invert"
			in:fade={{ duration: 150, delay: 150 }}
			out:fade={{ duration: 150 }}
		>
			<slot />
		</main>
	{/key}

	<Footer />
</main>

<style lang="scss" global>
	@use '../lib/style/index';
	@use '../lib/style/one-dark.css';
</style>
