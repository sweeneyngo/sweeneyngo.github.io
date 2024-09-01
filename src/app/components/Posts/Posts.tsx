import Link from "next/link";
import styles from "./page.module.css";

type Props = {
    posts: {
        id: string,
        title: string,
        date: string,
        tags: string,
        description: string,
        content: string
    }[];
}

export default function Posts({ posts }: Props) {
    return (
        <div>
            {posts.map(post => (
                <div key={post.id} className={styles.post}>
                    <p className={styles.title}><Link href={`/blog/${post.id}`}>{post.title}</Link></p>
                    <span>{post.description}</span>
                    <p className={styles.date}>{post.date}</p>
                </div>
            ))}
        </div>
    );
}
