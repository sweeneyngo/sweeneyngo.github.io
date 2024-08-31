import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "src/posts");

export function getAllPostIds() {
    const files = fs.readdirSync(dir);
    const posts = files.map((name) => {
        const id = name.replace(/\.md$/, '');
        return { id };
    });

    return posts;
}

export function getAllPosts() {

    const files = fs.readdirSync(dir);
    const posts = files.map((name) => {

        const id = name.replace(/\.md$/, '');
        const fileData = fs.readFileSync(path.join(dir, name), 'utf8');
        const metadata = matter(fileData).data;

        return {
            id,
            title: metadata.title,
            date: metadata.date,
            tags: metadata.tags,
            description: metadata.description
        };
    });

    return posts;

    // return posts.sort((a, b) => {
    //     if (a.date < b.date) {
    //         return 1;
    //     } else {
    //         return -1;
    //     }
    // });
}

export function getPost(id: string) {
    const fileData = fs.readFileSync(path.join(dir, `${id}.md`), "utf8");
    const { content, data } = matter(fileData);

    return {
        id,
        title: data.title,
        date: data.date,
        tags: data.tags,
        description: data.description,
        content: content
    }
}
