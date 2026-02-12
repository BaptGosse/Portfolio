import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { POR_POSTS } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { PUBLIC_SITE_URL } from '$env/static/public';
import { marked } from 'marked';

export const prerender = false;

export const GET: RequestHandler = async ({ url }) => {
	const langParam = url.searchParams.get('lang');
	const locale = (langParam === 'en' || langParam === 'fr') ? langParam : 'fr';
	
	const siteTitle = 'Baptiste Gosselin - Blog';
	const siteDescription = locale === 'en' 
		? 'Technical articles on Linux, DevOps, infrastructure and development' 
		: 'Articles techniques sur Linux, DevOps, infrastructure et développement';

	// Récupérer tous les posts publiés
	const dbPosts = await db
		.select()
		.from(POR_POSTS)
		.where(eq(POR_POSTS.POS_PUBLISHED, true))
		.orderBy(desc(POR_POSTS.POS_PUBLISHED_AT));

	const posts = await Promise.all(dbPosts.map(async post => {
		const rawContent = post.POS_CONTENT[locale] || post.POS_CONTENT.fr;
		// Convertir markdown en HTML
		const htmlContent = await marked(rawContent);
		
		return {
			slug: post.POS_SLUG,
			title: post.POS_TITLE[locale] || post.POS_TITLE.fr,
			description: post.POS_DESCRIPTION[locale] || post.POS_DESCRIPTION.fr,
			content: htmlContent,
			date: post.POS_PUBLISHED_AT || post.POS_CREATED_AT,
			url: `${PUBLIC_SITE_URL}/blog/${post.POS_SLUG}`
		};
	}));

	const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
	<channel>
		<title>${siteTitle}</title>
		<description>${siteDescription}</description>
		<link>${PUBLIC_SITE_URL}</link>
		<atom:link href="${PUBLIC_SITE_URL}/rss.xml${langParam ? `?lang=${langParam}` : ''}" rel="self" type="application/rss+xml"/>
		<language>${locale === 'en' ? 'en-us' : 'fr-fr'}</language>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		${posts
			.map(
				(post) => `
		<item>
			<title>${escapeXml(post.title)}</title>
			<description>${escapeXml(post.description)}</description>
			<content:encoded><![CDATA[${post.content}]]></content:encoded>
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
