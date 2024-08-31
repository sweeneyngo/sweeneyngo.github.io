import { getPost, getAllPosts } from "@/utils/posts";
import Markdown from "react-markdown"

export default function Page({ params }: { params: { id: string } }) {
    const post = getPost(params.id);
    const wordCount = post.content.trim().split(/\s+/).length;
    const minRead = Math.round(wordCount / 350);
    const maxRead = Math.round(wordCount / 230);

    function formatDate(dateString: string): string {

        const date = new Date(dateString + " GMT-0800");
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{formatDate(post.date)} • {minRead}-{maxRead} min</p>
            <Markdown>{post.content}</Markdown>
        </div>
    );
};

export async function generateStaticParams() {
    const posts = getAllPosts();

    return posts.map((post) => ({
        id: post.id,
    }))
}
