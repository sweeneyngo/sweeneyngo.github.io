import MusicPlayer from "@/app/components/MusicPlayer/MusicPlayer";
import Footer from "@/app/components/Footer/Footer";
import { getPost, getAllPosts } from "@/utils/posts";
import Markdown from "react-markdown"

import styles from "./page.module.css";

export default function Page({ params }: { params: { id: string } }) {
    const { id, title, date, musicFile, musicTitle, musicArtist, musicURI, content } = getPost(params.id);
    const wordCount = content.trim().split(/\s+/).length;
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
            <h1>{title}</h1>
            <div className={styles.subheader}>
                <p>{formatDate(date)} • {minRead}-{maxRead} min</p>

                <div className={styles.bar} />

            </div>


            <MusicPlayer musicFile={musicFile} musicTitle={musicTitle} musicArtist={musicArtist} musicUri={musicURI} />
            <Markdown>{content}</Markdown>
            <Footer />
        </div>
    );
};

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        id: post.id,
    }))
}
