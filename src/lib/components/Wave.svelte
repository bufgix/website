<script lang="ts">
	export let size = 30;
	export let color = 'white';
</script>

<div class="boxContainer {$$props.class}" style="--size: {size}px; --color: {color}">
	<div class="box box1" />
	<div class="box box2" />
	<div class="box box3" />
	<div class="box box4" />
	<div class="box box5" />
</div>

<style>
	@keyframes quiet {
		25% {
			transform: scaleY(0.6);
		}
		50% {
			transform: scaleY(0.4);
		}
		75% {
			transform: scaleY(0.8);
		}
	}

	@keyframes normal {
		25% {
			transform: scaleY(1);
		}
		50% {
			transform: scaleY(0.4);
		}
		75% {
			transform: scaleY(0.6);
		}
	}
	@keyframes loud {
		25% {
			transform: scaleY(1);
		}
		50% {
			transform: scaleY(0.4);
		}
		75% {
			transform: scaleY(1.2);
		}
	}
	body {
		display: flex;
		justify-content: center;
		background: black;
		margin: 0;
		padding: 0;
		align-items: center;
		height: 100vh;
	}

	.boxContainer {
		display: flex;
		justify-content: space-between;
		height: var(--size);
		--boxSize: calc(var(--size) / 8);
		--gutter: 4px;
		width: calc((var(--boxSize) + var(--gutter)) * 5);
	}

	.box {
		transform: scaleY(0.4);
		height: 100%;
		width: var(--boxSize);
		background: var(--color);
		animation-duration: 1.2s;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
		border-radius: 8px;
	}

	.box1 {
		animation-name: quiet;
	}

	.box2 {
		animation-name: normal;
	}

	.box3 {
		animation-name: quiet;
	}

	.box4 {
		animation-name: loud;
	}

	.box5 {
		animation-name: quiet;
	}
</style>
