import * as fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const hashFile = path.join(process.cwd(), 'hash');

async function fetchBookmarks() {
	const bookmarks = await (
		await fetch('https://api.raindrop.io/rest/v1/raindrops/0?perpage=30', {
			headers: {
				Authorization: `Bearer ${process.env.RAINDROP_API_KEY}`
			}
		})
	).json();

	const oldHash = fs.existsSync(hashFile) ? fs.readFileSync(hashFile, 'utf8') : '';
	const newHash = Buffer.from(JSON.stringify(bookmarks)).toString('base64');
	if (oldHash === newHash) {
		console.log('No changes! Current hash:', newHash);
		process.exit(1);
	} else {
		fs.writeFileSync(hashFile, newHash);
		console.log(`new changes! Generated hash: ${newHash}`);
	}
}

fetchBookmarks();
