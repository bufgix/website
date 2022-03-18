import fs from 'fs';
import fetch from 'node-fetch';
import 'dotenv/config';

// Lol

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
fetch('https://api.raindrop.io/rest/v1/raindrops/0?perpage=30', {
	headers: {
		Authorization: `Bearer ${process.env.VITE_RAINDROP_API_KEY}`
	}
})
	.then((r) => r.json())
	.then((res) => {
		fs.writeFileSync(
			'./static/bookmarks.md',
			`---
title: Bookmarks
slug: "/bookmarks"
---


${res// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
.items
	.map(({ link, title }) => {
		return `- [${title}](${link})\n`;
	})
	.join('')}
    `,
			{ flag: 'w' }
		);
	});
