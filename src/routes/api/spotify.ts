import type { RequestHandler } from '@sveltejs/kit';
import variables from '$lib/variables';
import querystring from 'query-string';

const {
	SPOTIFY_CLIENT_ID: client_id,
	SPOTIFY_CLIENT_SECRET: client_secret,
	SPOTIFY_REFRESH_TOKEN: refresh_token
} = variables;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: querystring.stringify({
			grant_type: 'refresh_token',
			refresh_token
		})
	});

	return response.json();
};

export const getNowPlaying = async () => {
	const { access_token } = await getAccessToken();

	return fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});
};

export const GET: RequestHandler = async () => {
	const response = await getNowPlaying();

	if (response.status === 204 || response.status > 400) {
		return {
			status: 204,
			reason: 'No currently playing track'
		};
	}

	const song = await response.json();
	const isPlaying = song.is_playing;
	const title = song.item.name;
	const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
	const album = song.item.album.name;
	const albumImageUrl = song.item.album.images[0].url;
	const songUrl = song.item.external_urls.spotify;
	const previewUrl = song.item.preview_url;

	return {
		status: 200,
		body: {
			album,
			albumImageUrl,
			artist,
			isPlaying,
			songUrl,
			title,
			previewUrl
		}
	};
};