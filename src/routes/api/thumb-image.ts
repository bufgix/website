import satori from 'satori';
import type { SatoriOptions } from 'satori';
import sharp from 'sharp';
import type { RequestHandler } from '@sveltejs/kit';

const robotoRegularPath = 'http://farukoruc.com/fonts/Roboto-Regular.ttf';
const robotoBoldPath = 'http://farukoruc.com/fonts/Roboto-Bold.ttf';

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
	padding: '40px',
	backgroundImage:
		'radial-gradient(circle at 25px 25px, rgba(255,255,255, 0.2) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255,255,255, 0.2) 2%, transparent 0%)',
	backgroundSize: '100px 100px'
};

const cacheFontsData = {
	robotoBold: null,
	robotoRegular: null
};

const satoriOptions = async () => {
	return {
		width: 800,
		height: 400,
		fonts: [
			{
				name: 'Roboto-Bold',
				weight: 700,
				data:
					cacheFontsData.robotoRegular ||
					(await fetch(robotoBoldPath)
						.then((res) => res.arrayBuffer())
						.then((buf) => {
							cacheFontsData.robotoBold = buf;
							return buf;
						}))
			},
			{
				name: 'Roboto-Regular',
				weight: 400,
				data:
					cacheFontsData.robotoBold ||
					(await fetch(robotoRegularPath)
						.then((res) => res.arrayBuffer())
						.then((buf) => {
							cacheFontsData.robotoRegular = buf;
							return buf;
						}))
			}
		]
	} as SatoriOptions;
};

export const GET: RequestHandler = async ({ request }) => {
	const requestUrl = new URL(request.url);

	const title = requestUrl.searchParams.get('title');
	const readTime = requestUrl.searchParams.get('readTime');

	const svg = await satori(
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
		await satoriOptions()
	);
	const body = await sharp(Buffer.from(svg)).png().toBuffer();
	return {
		body,
		headers: {
			'Content-Type': 'image/png'
		}
	};
};
