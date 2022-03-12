<script lang="ts">
	import { onMount } from 'svelte';
	import type { WithTarget } from '../../app';
	import { PAGES } from '$lib/constants';
	import { goto } from '$app/navigation';
	import { getRandomCommandPlaceholder } from '$lib/utils';

	let placeholder = '';
	let output = '';

	onMount(() => {
		placeholder = getRandomCommandPlaceholder();
	});

	const COMMANDS = {
		theme: (event: WithTarget<KeyboardEvent, HTMLInputElement>, value: string) => {
			if (['light', 'dark'].includes(value)) {
				localStorage.setItem('theme', value);
				if (value === 'dark') document.documentElement.classList.add('dark');
				else document.documentElement.classList.remove('dark');
			} else {
				placeholder = `${value} is not a valid theme`;
			}
		},
		go: (event: WithTarget<KeyboardEvent, HTMLInputElement>, name: string) => {
			const page = PAGES.find((page) => page.name === name);
			if (page) goto(page.path, { keepfocus: true });
			else placeholder = `${name} is not a valid page`;
		},

		help: () => {
			output = `Available commands: ${Object.keys(COMMANDS).join(', ')}`;
		}
	};

	const onKeyup = (e: WithTarget<KeyboardEvent, HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const { value } = e.target;
			if (!value) return;
			placeholder = getRandomCommandPlaceholder();
			output = '';
			const [command, ...args] = value.split(' ');

			if (COMMANDS[command]) {
				COMMANDS[command](e, args.join(' '));
			} else {
				placeholder = `${command} not found`;
			}
			e.target.value = '';
		}
	};
</script>

<header class="prose dark:prose-invert container mx-auto p-4 pb-5 flex flex-col">
	<div class="flex flex-row">
		<a class="no-underline" href="/">
			<code class="text-base md:text-2xl">faruk@webdev:$ </code>
		</a>
		<input
			autocapitalize="none"
			class="w-full ml-2 text-base md:text-2xl focus-visible:outline-none font-mono bg-light dark:bg-dark"
			type="text"
			{placeholder}
			on:keyup={onKeyup}
		/>
	</div>
	{#if output}
		<code class="text-sm md:text-base text-gray-400">{output}</code>
	{/if}
	<nav>
		<ul class="flex flex-row">
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="/about">About</a>
			</li>
			<li>
				<a href="/snippets">Snippets</a>
			</li>
			<li>
				<a href="/bookmarks">Bookmarks</a>
			</li>
		</ul>
	</nav>
</header>

<style lang="scss">
	header {
		nav {
			ul {
				display: flex;
				flex-direction: row;
				list-style: none;
				margin: 0;
				padding: 0;
			}
		}

		code {
			&:after,
			&:before {
				content: ' ';
			}
		}
	}
</style>
