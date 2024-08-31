import { getAllPosts } from "@/utils/posts";
import Posts from "../components/Posts/Posts";

export default async function Blog() {
    const posts = getAllPosts();
    return (
        <Posts posts={posts} />
    );
}
