import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const siteUrl = 'https://baptistegosselin.dev'; // À remplacer par ton URL
	const siteTitle = 'Baptiste Gosselin - Blog';
	const siteDescription = 'Articles techniques sur Linux, DevOps, infrastructure et développement';
	const author = {
		name: 'Baptiste Gosselin',
		email: 'contact@baptistegosselin.dev' // À remplacer
	};

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

	const updated = posts.length > 0 ? new Date(posts[0].date).toISOString() : new Date().toISOString();

	const atom = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
	<title>${escapeXml(siteTitle)}</title>
	<subtitle>${escapeXml(siteDescription)}</subtitle>
	<link href="${siteUrl}/atom.xml" rel="self"/>
	<link href="${siteUrl}"/>
	<updated>${updated}</updated>
	<id>${siteUrl}/</id>
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
