import satori from 'satori';
import type { SatoriOptions } from 'satori';
import type { RequestHandler } from '@sveltejs/kit';
import fs from 'fs';
import { join } from 'path';

const robotoRegularPath = join(process.cwd(), 'static', 'fonts', 'Roboto-Regular.ttf');
const robotoBoldPath = join(process.cwd(), 'static', 'fonts', 'Roboto-Bold.ttf');
const playFairDisplay = join(process.cwd(), 'static', 'fonts', 'playfair-display.ttf');

const h = (element = 'div', style = {}, children = null, rest = {}) => {
	return {
		type: element,
		props: {
			style,
			children,
			...rest
		}
	};
};

const wrapperStyle = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	height: '100%',
	width: '100%',
	backgroundColor: 'black',
	color: 'white',
	padding: '20px',
	backgroundImage:
		'radial-gradient(circle at 25px 25px, rgba(255,255,255, 0.2) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255,255,255, 0.2) 2%, transparent 0%)',
	backgroundSize: '100px 100px'
};

const satoriOptions = {
	width: 800,
	height: 400,
	fonts: [
		{
			name: 'Roboto-Bold',
			weight: 700,
			data: fs.readFileSync(robotoBoldPath)
		},
		{ name: 'Roboto-Regular', weight: 400, data: fs.readFileSync(robotoRegularPath) },
		{ name: 'PlayfairDisplay', weight: 400, data: fs.readFileSync(playFairDisplay) }
	]
} as SatoriOptions;

export const GET: RequestHandler = async ({ request }) => {
	const requestUrl = new URL(request.url);

	const title = requestUrl.searchParams.get('title');
	const readTime = requestUrl.searchParams.get('readTime');

	const body = await satori(
		h('div', wrapperStyle, [
			h('div', { fontSize: '52px', fontFamily: 'Roboto-Bold' }, title),
			h('div', { display: 'flex', flexDirection: 'row', marginTop: '15px' }, [
				h(
					'span',
					{
						opacity: 0.6
					},
					readTime
				)
			]),
			h(
				'div',
				{
					display: 'flex',
					alignItems: 'center',
					position: 'absolute',
					bottom: '20px',
					right: '20px'
				},
				[
					h(
						'img',
						{ width: '30px', height: '30px', background: 'white', borderRadius: '5px' },
						null,
						{
							src: 'https://www.farukoruc.com/apple-touch-icon.png'
						}
					),
					h(
						'div',
						{
							fontSize: '18px',
							fontFamily: 'Roboto-Bold',
							marginLeft: '7px'
						},
						'farukoruc.com'
					)
				]
			)
		]),
		satoriOptions
	);
	return {
		body,
		headers: {
			'Content-Type': 'image/svg+xml'
		}
	};
};
