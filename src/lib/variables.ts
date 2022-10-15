const variables = {
	NOTION_SECRET: import.meta.env.VITE_NOTION_SECRET as string,
	NOTION_DB_ID: import.meta.env.VITE_NOTION_DB_ID as string,
	RAINDROP_API_KEY: import.meta.env.VITE_RAINDROP_API_KEY as string,
	UPSTASH_TOKEN: import.meta.env.VITE_UPSTASH_TOKEN as string,
	UPSTASH_URL: import.meta.env.VITE_UPSTASH_URL as string,
	DOMAIN: import.meta.env.VITE_DOMAIN as string,
	SPOTIFY_CLIENT_ID: import.meta.env.VITE_SPOTIFY_CLIENT_ID as string,
	SPOTIFY_CLIENT_SECRET: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET as string,
	SPOTIFY_REFRESH_TOKEN: import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN as string,
	GITHUB_TOKEN: import.meta.env.VITE_GITHUB_TOKEN as string
};

export default variables;
