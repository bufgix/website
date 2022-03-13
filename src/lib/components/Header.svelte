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
		theme: {
			help: () => 'Change the theme. `light` or `dark`',
			func: (event: WithTarget<KeyboardEvent, HTMLInputElement>, value: string) => {
				if (!value) {
					placeholder = 'Missing theme';
					return;
				}
				if (['light', 'dark'].includes(value)) {
					localStorage.setItem('theme', value);
					if (value === 'dark') document.documentElement.classList.add('dark');
					else document.documentElement.classList.remove('dark');
				} else {
					placeholder = `${value} is not a valid theme`;
				}
			}
		},

		go: {
			help: () => `Available pages ${PAGES.map((p) => p.name).join(',')}`,

			func: (event: WithTarget<KeyboardEvent, HTMLInputElement>, name: string) => {
				if (!name) {
					placeholder = 'Missing page';
					return;
				}
				const page = PAGES.find((page) => page.name === name);
				if (page) goto(page.path, { keepfocus: true });
				else placeholder = `${name} is not a valid page`;
			}
		},

		random: {
			help: () => 'Go to random blog or snippet',
			func: async () => {
				const [posts, snippets] = await Promise.all([
					await (await fetch('/api/posts.json')).json(),
					await (await fetch('/api/snippets.json')).json()
				]);
				const allContent = [...posts, ...snippets];
				const randomContent = allContent[Math.floor(Math.random() * allContent.length)];
				goto(`${randomContent.path}`, { keepfocus: true });
			}
		},

		help: {
			help: () =>
				`Available commands: ${Object.keys(COMMANDS).join(', ')}<br />usage: help &lt;command&gt;`,
			func: (event: WithTarget<KeyboardEvent, HTMLInputElement>, value) => {
				if (!value) output = `Available commands: ${Object.keys(COMMANDS).join(', ')}`;
				else {
					const command = COMMANDS[value];
					if (command) output = `${value}: ${command.help()}`;
					else output = `${value} is not a valid command`;
				}
			}
		}
	};

	const onKeyup = (e: WithTarget<KeyboardEvent, HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const { value } = e.target;
			if (!value) return;
			placeholder = getRandomCommandPlaceholder();
			output = '';
			const [command, ...args] = value.split(' ');

			if (command === 'help' && args.length === 0) {
				COMMANDS.help.func(e, 'help');
				e.target.value = '';
				return;
			}

			if (COMMANDS[command]) {
				COMMANDS[command].func(e, args.join(' '));
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
		<code class="text-sm md:text-base text-gray-400">{@html output}</code>
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
