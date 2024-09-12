import { getAllPosts } from "@/utils/posts";
import Posts from "../components/Posts/Posts";

export default async function Blog() {
    const posts = getAllPosts();
    return (
        <div>
            <h1>Articles</h1>
            <Posts posts={posts} />
        </div>

    );
}
