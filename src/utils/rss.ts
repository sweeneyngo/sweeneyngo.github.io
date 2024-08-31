import fs from "fs";
import { Feed } from "feed";
import { getAllPosts } from "./posts";

export default async function generateFeed() {
    const posts = getAllPosts();
    const uri = "ifuxyl.dev";
    const feedOptions = {
        title: "ifu's Blog",
        description: "ifu's blog + personal homepage.",
        id: uri,
        link: uri,
        image: `${uri}/favicon.ico`,
        favicon: `${uri}/favicon.ico`,
        site_url: uri,
        feed_url: `${uri}/rss.xml`,
        pubDate: new Date(),
        copyright: `All rights reserved ${new Date().getFullYear()}, ifu`,
        generator: "Feed for Node.js",
        feedLinks: {
            rss2: `${uri}/rss.xml`,
        },
    };

    const feed = new Feed(feedOptions);

    posts.forEach((post) => {
        feed.addItem({
            title: post.title,
            id: `${uri}/blog/${post.id}`,
            link: `${uri}/blog/${post.id}`,
            description: post.description,
            date: new Date(post.date)
        });
    });

    fs.writeFileSync("./public/rss.xml", feed.rss2());
}
