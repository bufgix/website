<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ url }) => {
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
	export let currentRoute;
</script>

<svelte:head>
	<title>Faruk Oruç</title>
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

	article {
		figure {
			figcaption {
				@apply text-sm text-center mt-0;
			}
		}
	}
</style>
