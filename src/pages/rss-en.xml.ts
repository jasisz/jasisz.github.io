import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPosts } from './rss.xml';

export async function GET(context: APIContext) {
  const allPosts = await getAllPosts();
  const enPosts = allPosts.filter((post) => post.data.lang === 'en');

  return rss({
    title: 'jasisz – digital garden (EN)',
    description: 'A digital garden – a place where I plant and nurture thoughts about technology, society and code.',
    site: context.site!,
    customData: '<language>en</language>',
    items: enPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/${post.slug}`,
    })),
  });
}
