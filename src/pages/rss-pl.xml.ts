import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPosts } from './rss.xml';

export async function GET(context: APIContext) {
  const allPosts = await getAllPosts();
  const plPosts = allPosts.filter((post) => post.data.lang === 'pl');

  return rss({
    title: 'jasisz – cyfrowy ogród (PL)',
    description: 'Cyfrowy ogród – miejsce, gdzie sadzę i pielęgnuję myśli o technologii, społeczeństwie i kodzie.',
    site: context.site!,
    customData: '<language>pl</language>',
    items: plPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/${post.slug}`,
    })),
  });
}
