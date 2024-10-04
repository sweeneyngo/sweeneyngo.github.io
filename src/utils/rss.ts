import fs from 'fs';
import { Feed } from 'feed';
import { getAllPosts } from './posts';

export default async function generateFeed() {
  const posts = getAllPosts();
  const uri = 'https://ifuxyl.dev';
  const feedOptions = {
    title: "ifu's Blog",
    description: 'Homebase [to] -- serving articles & blogs, for ifu.',
    id: uri,
    link: uri,
    language: 'en',
    image: `${uri}/favicon.png`,
    favicon: `${uri}/favicon.svg`,
    site_url: uri,
    feed_url: `${uri}/rss.xml`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, ifu`,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${uri}/rss.xml`,
    },
    author: {
      name: 'Sweeney Ngo (ifu)',
      email: 'sweeneyngo@proton.me',
    },
  };

  const feed = new Feed(feedOptions);

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${uri}/blog/${post.id}`,
      link: `${uri}/blog/${post.id}`,
      description: post.description,
      date: new Date(post.date),
      content: post.content,
    });
  });

  fs.writeFileSync('./public/rss.xml', feed.rss2());
}
