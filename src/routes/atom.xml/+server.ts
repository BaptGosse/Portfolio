import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { POR_POSTS } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { PUBLIC_SITE_URL, PUBLIC_EMAIL } from '$env/static/public';
import { marked } from 'marked';

export const prerender = false;

export const GET: RequestHandler = async ({ url }) => {
	const langParam = url.searchParams.get('lang');
	const locale = (langParam === 'en' || langParam === 'fr') ? langParam : 'fr';
	
	const siteTitle = 'Baptiste Gosselin - Blog';
	const siteDescription = locale === 'en' 
		? 'Technical articles on Linux, DevOps, infrastructure and development' 
		: 'Articles techniques sur Linux, DevOps, infrastructure et développement';
	
	const author = {
		name: 'Baptiste Gosselin',
		email: PUBLIC_EMAIL || 'contact@baptistegosselin.dev'
	};

	// Récupérer tous les posts publiés
	const dbPosts = await db
		.select()
		.from(POR_POSTS)
		.where(eq(POR_POSTS.POS_PUBLISHED, true))
		.orderBy(desc(POR_POSTS.POS_PUBLISHED_AT));

	const posts = await Promise.all(dbPosts.map(async post => {
		const rawContent = post.POS_CONTENT[locale] || post.POS_CONTENT.fr;
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

	const updated = posts.length > 0 ? new Date(posts[0].date).toISOString() : new Date().toISOString();

	const atom = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${locale}">
	<title>${escapeXml(siteTitle)}</title>
	<subtitle>${escapeXml(siteDescription)}</subtitle>
	<link href="${PUBLIC_SITE_URL}/atom.xml${langParam ? `?lang=${langParam}` : ''}" rel="self"/>
	<link href="${PUBLIC_SITE_URL}"/>
	<updated>${updated}</updated>
	<id>${PUBLIC_SITE_URL}/</id>
	<author>
		<name>${escapeXml(author.name)}</name>
		<email>${author.email}</email>
	</author>
	${posts
		.map(
			(post) => `
	<entry>
		<title>${escapeXml(post.title)}</title>
		<link href="${post.url}"/>
		<id>${post.url}</id>
		<updated>${new Date(post.date).toISOString()}</updated>
		<summary>${escapeXml(post.description)}</summary>
		<content type="html"><![CDATA[${post.content}]]></content>
		<author>
			<name>${escapeXml(author.name)}</name>
		</author>
	</entry>`
		)
		.join('')}
</feed>`;

	return new Response(atom, {
		headers: {
			'Content-Type': 'application/atom+xml',
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
