import * as fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import MD5 from 'crypto-js/md5.js';

const hashFile = path.join(process.cwd(), 'hash');

async function fetchBookmarks() {
	const bookmarks = await (
		await fetch('https://api.raindrop.io/rest/v1/raindrops/0?perpage=30', {
			headers: {
				Authorization: `Bearer ${process.env.RAINDROP_API_KEY}`
			}
		})
	).json();

	console.log('Result:', bookmarks['result']);
	if (bookmarks['result'] === false) {
		console.log('Error fetching bookmarks!');
		process.exit(1);
	}

	bookmarks['items'].forEach((b) => console.log(b.link));

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
