<script lang="ts">
	import { page } from '$app/stores';

	$: {
		if (typeof gtag !== 'undefined') {
			// eslint-disable-next-line no-undef
			gtag('config', 'G-Q8C4QGK86X', {
				page_title: document.title,
				page_path: $page.url.pathname
			});
		}
	}
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-Q8C4QGK86X"></script>

	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}

		gtag('js', new Date());
		gtag('config', 'G-Q8C4QGK86X');
	</script>
</svelte:head>
