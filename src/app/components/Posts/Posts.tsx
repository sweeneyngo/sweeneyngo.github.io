import Link from "next/link";
import SmallBlock from "../SmallBlock/SmallBlock";
import styles from "./posts.module.css";

type Props = {
    posts: {
        id: string,
        title: string,
        date: string,
        tags: string[],
        description: string,
        content: string
    }[];
}

export default function Posts({ posts }: Props) {


    const parseDate = (date: string) => {
        const [year, month, day] = date.split('-');
        const formattedDate = `${month}.${day}.${year.slice(-2)}`;
        return formattedDate;
    }

    return (
        <div>
            {posts.map(post => (
                <div key={post.id} className={styles.post}>
                    <div className={styles.smallHeading}><SmallBlock>{parseDate(post.date)}</SmallBlock> <div className={styles.divider} /></div>
                    <div className={styles.highlight}>

                        <h4 className={styles.title}><Link href={`/blog/${post.id}`}>{post.title}</Link></h4>
                        <p>{post.description}</p>

                    </div>
                    <div className={styles.tags}>
                        {(post.tags).map(tag => (
                            <div key={tag} className={styles.tag}><p>{tag}</p></div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
