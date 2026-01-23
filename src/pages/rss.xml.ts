import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  return rss({
    title: 'jasisz blog',
    description: 'Ten blog z pewnością cię nie śledzi i nie używa ciasteczek. To dobry, grzeczny blog.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/${post.slug}`,
    })),
  });
}
