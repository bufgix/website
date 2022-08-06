import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import relativeImages from 'mdsvex-relative-images';
import remarkHeadingId from 'remark-heading-id';
import figure from 'rehype-figure';
import codeTitle from 'remark-code-titles';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess(),
		mdsvex({
			extensions: ['.md', '.svx'],
			layout: {
				blog: 'src/lib/layouts/blog.svelte',
				_: 'src/lib/layouts/default.svelte'
			},
			remarkPlugins: [relativeImages, remarkHeadingId, codeTitle],
			rehypePlugins: [figure]
		})
	],

	extensions: ['.svelte', '.md', '.svx'],

	kit: {
		adapter: adapter(),
		prerender: {
			default: true
		}
	}
};

export default config;
