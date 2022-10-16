<script lang="ts">
	import { onMount } from 'svelte';
	import type { WithTarget } from '../../app';
	import { PAGES } from '$lib/constants';
	import { goto } from '$app/navigation';
	import { getRandomCommandPlaceholder } from '$lib/utils';
	import Icon from '$lib/components/Icon.svelte';
	import variables from '$lib/variables';

	let placeholder = '';
	let output = '';
	let theme;
	let searchInput: HTMLInputElement;

	onMount(() => {
		placeholder = getRandomCommandPlaceholder();
		theme = localStorage.getItem('theme');

		document.addEventListener('keydown', (e) => {
			if (e.ctrlKey && e.key === 'k') {
				searchInput.focus();
			}
		});
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
					theme = value;
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

	const changeTheme = () => {
		theme = theme === 'dark' ? 'light' : 'dark';
		COMMANDS.theme.func(null, theme);
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

<header class="prose dark:prose-invert container mx-auto p-4  flex flex-col">
	<div class="flex flex-row">
		<a class="no-underline" href="/">
			<code class="text-base md:text-3xl">faruk@webdev:$ </code>
		</a>
		<input
			bind:this={searchInput}
			autocapitalize="none"
			class=" w-full ml-2 text-base md:text-2xl focus-visible:outline-none font-mono bg-light dark:bg-dark"
			type="text"
			{placeholder}
			on:keyup={onKeyup}
		/>
	</div>
	{#if output}
		<code class="text-sm md:text-base text-gray-400 mt-2">{@html output}</code>
	{/if}

	<nav class="mt-4">
		<ul class="flex flex-row flex-wrap items-center">
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="/blog">Blog</a>
			</li>
			<li>
				<a href="/snippets">Snippets</a>
			</li>
			<li>
				<a href="/bookmarks">Bookmarks</a>
			</li>
			<li on:click={COMMANDS.random.func}>
				<button>I'm feeling lucky</button>
			</li>
			<li>
				<a href="https://github.com/bufgix" target="_blank"
					><Icon name="github" size="20px" class="fill-dark dark:fill-white" /></a
				>
			</li>
			<li>
				<a target="_blank" href="https://twitter.com/bufgix_">
					<Icon name="twitter" size="21px" class="fill-dark dark:fill-white" />
				</a>
			</li>
			<li>
				<Icon
					name={theme === 'dark' ? 'moon' : 'sun'}
					size="21px"
					class="fill-dark dark:fill-white cursor-pointer"
					on:click={changeTheme}
				/>
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

				li:first-child {
					padding-left: 0;
				}

				li {
					@apply mr-1;

					button {
						color: var(--tw-prose-links);
						text-decoration: underline;
						font-weight: 500;
					}
				}
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
