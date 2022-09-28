<script lang="ts">
	import Wave from '$lib/components/Wave.svelte';
	import { fade } from 'svelte/transition';

	let isOpen = false;
	let transition = 0.4;
</script>

<div
	class={`dynamic-island ${$$props.class}`}
	style="--transition: {transition}s"
	class:open={isOpen}
	on:click={() => (isOpen = !isOpen)}
>
	<div class="flex items-center">
		<img class="m-2" src="https://placekitten.com/200/300" alt="kitten" />
		{#if isOpen}
			<a class="flex flex-col nostyle-a" target="_blank" href="" in:fade>
				<b>Glimpse of us</b>
				<span class="text-neutral-500">Joji </span>
			</a>
		{/if}
	</div>
	<Wave class="mr-2" size="20" />
</div>

<style lang="scss">
	.dynamic-island {
		display: none;
	}
	@media (max-width: 600px) {
		.dynamic-island {
			display: flex;
			--radius: 2rem;
			--box-width: 50%;
			--box-height: 40px;

			margin-right: auto;
			margin-left: auto;
			width: var(--box-width);
			background: black;
			color: white;
			transition: var(--transition);
			border-radius: var(--radius);
			justify-content: space-between;
			align-items: center;

			& > * {
				transition: var(--transition);
			}

			img {
				width: 30px;
				height: 30px;
				border-radius: 100%;
			}
		}

		.open {
			width: 95%;

			img {
				width: 90px;
				height: 90px;
				border-radius: 30%;
			}
		}
	}
</style>
