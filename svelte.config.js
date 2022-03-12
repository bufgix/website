import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import relativeImages from 'mdsvex-relative-images';
import remarkHeadingId from 'remark-heading-id';
import figure from 'rehype-figure';

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
			remarkPlugins: [relativeImages, remarkHeadingId],
			rehypePlugins: [figure]
		})
	],

	extensions: ['.svelte', '.md', '.svx'],

	kit: {
		adapter: adapter()
	}
};

export default config;
