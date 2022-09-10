<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/components/Icon.svelte';

	let loading = true;
	let result = null;
	let audio: HTMLAudioElement = null;


	onMount(async () => {
		loading = true;
		try {
			const res = await fetch('/api/spotify');
			if (res.status === 204) {
				return;
			}
			result = await (await fetch('/api/spotify')).json();
			loading = false;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	});

	const toggleSample = () => {
		if (audio) {
			audio.pause();
			audio = null;
		} else {
			audio = new Audio(result.previewUrl);
			audio.play();
		}
	};
</script>

<div class="flex items-center">
	{#if !loading && result}
		<button on:click={toggleSample}>
			<img
				src={result.albumImageUrl}
				alt={result.album}
				class="rounded-full mr-2 m-0"
				width="24px"
				height="24px"
			/>
		</button>
		<a class="nostyle-a" target="_blank" href={result.songUrl} in:fly={{ y: -10 }}>
			<b>{result.title}</b> <span class="mx-1"> - </span>
			<span>{result.artist}</span>
		</a>
	{:else}
		<Icon name="spotify" size="24px" class="mr-2" />
		<b>Not Playing</b> <span class="mx-1"> - </span> <span>Spotify</span>
	{/if}
</div>
