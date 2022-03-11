module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				dark: '#1e293b',
				light: '#fcfefd'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
