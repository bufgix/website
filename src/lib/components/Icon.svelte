<script lang="ts">
	export let name: string;
	export let size: string;
</script>

<svg width={size} height={size} {...$$restProps} on:click>
	<use xlink:href={`#${name}`} />
</svg>
