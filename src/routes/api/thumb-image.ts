import satori from 'satori';
import type { RequestHandler } from '@sveltejs/kit';
import fs from 'fs';
import { join } from 'path';

const robotoRegularPath = join(process.cwd(), 'static', 'fonts', 'Roboto-Regular.ttf');
const robotoBoldPath = join(process.cwd(), 'static', 'fonts', 'Roboto-Bold.ttf');

export const GET: RequestHandler = async ({ request }) => {
	const requestUrl = new URL(request.url);

	const title = requestUrl.searchParams.get('title');
	const readTime = requestUrl.searchParams.get('readTime');

	const body = await satori(
		{
			type: 'div',
			props: {
				style: {
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
					width: '100%',
					backgroundColor: 'black',
					color: 'white'
				},
				children: [
					{
						type: 'h1',
						props: {
							style: {
								fontSize: '52px',
								fontFamily: 'Roboto-Bold'
							},
							children: `${title}`
						}
					},
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								flexDirection: 'row'
							},
							children: [
								{
									type: 'span',
									props: {
										style: {
											opacity: 0.6
										},
										children: 'farukoruc.com'
									}
								},
								{
									type: 'span',
									props: {
										style: {
											opacity: 0.6,
											marginLeft: '8px',
											marginRight: '2px'
										},
										children: '•'
									}
								},
								{
									type: 'span',
									props: {
										style: {
											opacity: 0.6,
											marginLeft: '8px',
											marginRight: '8px'
										},
										children: readTime
									}
								}
							]
						}
					}
				]
			}
		},
		{
			width: 800,
			height: 400,

			fonts: [
				{
					name: 'Roboto-Bold',
					weight: 700,
					data: fs.readFileSync(robotoBoldPath)
				},
				{ name: 'Roboto-Regular', weight: 400, data: fs.readFileSync(robotoRegularPath) }
			]
		}
	);
	return {
		body,
		headers: {
			'Content-Type': 'image/svg+xml'
		}
	};
};
