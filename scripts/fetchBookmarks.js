import * as fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import MD5 from 'crypto-js/md5.js';

const hashFile = path.join(process.cwd(), 'hash');

console.log(process.env);

async function fetchBookmarks() {
	const bookmarks = await (
		await fetch('https://api.raindrop.io/rest/v1/raindrops/0?perpage=30', {
			headers: {
				Authorization: `Bearer ${process.env.RAINDROP_API_KEY}`
			}
		})
	).json();

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	console.log('Result:', bookmarks.result);
	console.log(bookmarks);
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	bookmarks.items.forEach((b) => console.log(b.link));

	const oldHash = fs.existsSync(hashFile) ? fs.readFileSync(hashFile, 'utf8') : '';
	const newHash = MD5(JSON.stringify(bookmarks)).toString();
	if (oldHash === newHash) {
		console.log('No changes! Current hash:', newHash);
		process.exit(1);
	} else {
		fs.writeFileSync(hashFile, newHash);
		console.log(`new changes! Generated hash: ${newHash}`);
	}
}

fetchBookmarks();
