<script>
	import Spotify from '$lib/components/Spotify.svelte';
</script>

<footer class="prose md:mx-auto dark:prose-invert py-8 px-4">
	<hr class="my-3" />
	<div class="flex justify-between items-center flex-wrap gap-6">
		<Spotify />
		<span>
			Made with <a
				target="_blank"
				href="https://kit.svelte.dev/"
				class="text-orange-500 no-underline font-serif">SvelteKit</a
			>
			by
			<a class="no-underline" href="https://github.com/bufgix/website" target="_blank">@bufgix</a>;
			hosted on <a href="https://vercel.com" target="_blank">Vercel</a>
		</span>
	</div>
</footer>
