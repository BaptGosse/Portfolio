import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const siteUrl = 'https://baptistegosselin.dev'; // À remplacer par ton URL
	const siteTitle = 'Baptiste Gosselin - Blog';
	const siteDescription = 'Articles techniques sur Linux, DevOps, infrastructure et développement';

	// Charger tous les posts
	const postFiles = import.meta.glob('/src/posts/*.{md,svx}');
	const posts = [];

	for (const path in postFiles) {
		const post = await postFiles[path]();
		const metadata = (post as any).metadata;

		if (metadata && metadata.published) {
			const slug = path.split('/').pop()?.replace(/\.(md|svx)$/, '') || '';
			posts.push({
				slug,
				title: metadata.title,
				description: metadata.description,
				date: metadata.date,
				url: `${siteUrl}/blog/${slug}`
			});
		}
	}

	// Trier par date décroissante
	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${siteTitle}</title>
		<description>${siteDescription}</description>
		<link>${siteUrl}</link>
		<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		${posts
			.map(
				(post) => `
		<item>
			<title>${escapeXml(post.title)}</title>
			<description>${escapeXml(post.description)}</description>
			<link>${post.url}</link>
			<guid isPermaLink="true">${post.url}</guid>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
		</item>`
			)
			.join('')}
	</channel>
</rss>`;

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/rss+xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};

function escapeXml(unsafe: string): string {
	return unsafe.replace(/[<>&'"]/g, (c) => {
		switch (c) {
			case '<':
				return '&lt;';
			case '>':
				return '&gt;';
			case '&':
				return '&amp;';
			case "'":
				return '&apos;';
			case '"':
				return '&quot;';
			default:
				return c;
		}
	});
}
