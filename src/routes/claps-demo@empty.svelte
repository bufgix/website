<script lang="ts">
	import { Claps } from 'svelte-claps';

	let fixed = 'default';
	let replyUrl = 'https://github.com/bufgix/svelte-claps';
</script>

<svelte:head>
	<title>Svelte-claps</title>
</svelte:head>

<section class="pt-4">
	<h1>svelte-claps</h1>
	<p class="m-0">Adds clap button (like medium) to any page for your SvelteKit apps.</p>
	<p class="m-0">
		This package originally was created for Next.js by <a href="https://github.com/upstash/claps"
			>@upstash</a
		>
	</p>
	<p class="m-0">Nothing to maintain, it is completely serverless 💯</p>

	<Claps class="my-4" {fixed} {replyUrl} />

	<div class="mt-5">
		<h3 class="font-mono">fixed:</h3>
		<button class="bg-orange-600 text-white p-2 mr-1 rounded" on:click={() => (fixed = 'default')}>
			Default</button
		>
		<button class="bg-orange-600 text-white p-2 mr-1 rounded" on:click={() => (fixed = 'left')}>
			Left</button
		>
		<button class="bg-orange-600 text-white p-2 mr-1 rounded" on:click={() => (fixed = 'center')}>
			Center</button
		>
		<button class="bg-orange-600 text-white p-2 mr-1 rounded" on:click={() => (fixed = 'right')}>
			Right</button
		>
	</div>
	<div class="mt-5">
		<h3 class="font-mono">replyUrl:</h3>
		<input
			type="text"
			class="bg-neutral-200  dark:bg-zinc-800 text-black dark:text-white p-2 mr-1 rounded w-full"
			bind:value={replyUrl}
		/>
	</div>

	<hr class="my-5" />
	<h2>Installation</h2>
	<p>
		See <a href="https://github.com/bufgix/svelte-claps" target="_blank">Github README.md</a>
	</p>
	<hr class="my-5" />

	<p class="opacity-40">
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error et iste numquam placeat, quasi
		quisquam sit? Blanditiis commodi delectus deleniti dolores eaque fuga id magni nemo pariatur
		quibusdam quidem, tenetur!
		<br />
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error et iste numquam placeat, quasi quisquam
		sit? Blanditiis commodi delectus deleniti dolores eaque fuga id magni nemo pariatur quibusdam quidem,
		tenetur!
		<br />
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error et iste numquam placeat, quasi quisquam
		sit? Blanditiis commodi delectus deleniti dolores eaque fuga id magni nemo pariatur quibusdam quidem,
		tenetur!
		<br />
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error et iste numquam placeat, quasi quisquam
		sit? Blanditiis commodi delectus deleniti dolores eaque fuga id magni nemo pariatur quibusdam quidem,
		tenetur!
		<br />
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error et iste numquam placeat, quasi quisquam
		sit? Blanditiis commodi delectus deleniti dolores eaque fuga id magni nemo pariatur quibusdam quidem,
		tenetur!
		<br />
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error et iste numquam placeat, quasi quisquam
		sit? Blanditiis commodi delectus deleniti dolores eaque fuga id magni nemo pariatur quibusdam quidem,
		tenetur!
		<br />
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error et iste numquam placeat, quasi quisquam
		sit? Blanditiis commodi delectus deleniti dolores eaque fuga id magni nemo pariatur quibusdam quidem,
		tenetur!
	</p>
</section>
