<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/components/Icon.svelte';

	let loading = true;
	let result = null;
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
</script>

<div class="flex items-center">
	<Icon name="spotify" size="24px" class="mr-2" />
	{#if !loading && result}
		<span in:fly={{ y: -10 }}>
			<b>{result.title}</b> <span class="mx-1"> - </span>
			<span>{result.artist}</span>
		</span>
	{:else}
		<b>Not Playing</b> <span class="mx-1"> - </span> <span>Spotify</span>
	{/if}
</div>
