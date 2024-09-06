import Link from "next/link";
import Footer from "./components/Footer/Footer";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <div>
      <div className={styles.heading}>
        <h1>Welcome, enjoy your stay!</h1>
      </div>
      <div className={styles.pageContent}>
        <p>
          Hello! I&apos;m ifu (refer: <Link className={styles.link} href="/aliases">aliases</Link>). <br />
          I <b>create things on the web</b>, explore <b>interactive interfaces</b>, and <b>architect systems</b>. <br />
          I&apos;m currently a software engineer, building products in healthcare & education, from early-stage startups, non-profits, and large companies.
          I dabble in freeform writing and artistic endeavors through this blog. Here, I write about programming, software development, art, music, and digital independence (hope for revision!).
          Enjoying the pursuit of blogging as an exercise of a <a href="https://www.asc.ohio-state.edu/kilcup.1/262/feynman.html"><b>Feynmanian approach</b></a> to life— acting freely without worrying about the future.
        </p>
        <MusicPlayer musicFile="bridges_Anthemics.mp3" musicTitle="bridges" musicArtist="Anthemics" musicUri="https://youtu.be/4yhy9MBzjgc" />
        <p>
          In previous lives, I went to the University of California, Los Angeles (UCLA) where I majored in Computer Science, and a minor of Bioinformatics. My favorite courses were CS181's Automata, CS161's Fundamentals of AI, and CM122's Algorithms in Bioinformatics. <br />

          <br />
          If you'd like to learn more about me, you can find me on <a href="https://twitter.com/ifui0">Twitter</a>, <a href="https://github.com/sweeneyngo">Github</a>, or <a href="https://linkedin.com/in/sweeneyngo">LinkedIn</a>. <br />

          To see what I've been working on, check out my <a href="https://read.cv/ifuxyl">CV</a>!
        </p>
        <Footer />
      </div>
    </div>
  );
}
