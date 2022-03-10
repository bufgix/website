<script>
	import { slugify } from '../utils';

	export let id = null;

	let _this;
	let link;

	$: {
		if (id || _this) {
			link = id || slugify(_this?.innerText);
		} else {
			link = '';
		}
	}
</script>

<h2 id={link} bind:this={_this} {...$$props}>
	<a class="no-underline" href={`#${link}`}>
		<slot />
	</a>
</h2>

<style lang="scss">
	a:hover {
		&:after {
			@apply ml-1 text-lg text-gray-500;
			content: '#';
		}
	}
</style>
