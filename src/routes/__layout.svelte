<script context="module">
	export const load = ({ url }) => {
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

	import Header from '$lib/components/Header.svelte';
	import '$lib/style/index.scss';
	import '$lib/style/atom-dark.css';

	export let currentRoute;
</script>

<Header />

{#key currentRoute}
	<main
		class="prose container md:mx-auto"
		in:fade={{ duration: 150, delay: 150 }}
		out:fade={{ duration: 150 }}
	>
		<slot />
	</main>
{/key}
