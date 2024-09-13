import Link from "next/link";

import { getAllPosts } from "@/utils/posts";
import Button from "./components/Button/Button";
import Posts from "./components/Posts/Posts";
import Footer from "./components/Footer/Footer";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import styles from "./page.module.css";

export default async function Home() {

  const posts = getAllPosts();

  return (
    <section className={styles.gridLayout}>
      <header className={styles.heading}>
        <h1>Welcome, <br /> enjoy your stay.</h1>
      </header>
      <section className={styles.content}>

        <p className={styles.subtitle}>
          Hello! I&apos;m ifu (see: <Link className={styles.link} href="/aliases">aliases</Link>). <br />
          <b>I create things on the web</b>, explore <b>interactive interfaces</b>, and <b>architect systems</b>.
          Building products in healthcare and education, from early-stage startups, non-profits, et cetera.
          I write about programming, software development, art, music, and digital independence<sup>†</sup>. Enjoying the pursuit of blogging as an exercise of a <a href="https://www.asc.ohio-state.edu/kilcup.1/262/feynman.html">Feynmanian approach</a> to life— acting freely without worrying about the future.
        </p>

        <div className={styles.smallHeading}>
          <small>✱ SONG OF THE DAY </small>
          <div className={styles.divider} />
        </div>

        <div className={styles.section}>
          <MusicPlayer musicFile="bridges_Anthemics.mp3" musicTitle="bridges" musicArtist="Anthemics" musicUri="https://youtu.be/4yhy9MBzjgc" />
        </div>

        <div className={styles.smallHeading}>
          <small>✱ PAST LIVES </small>
          <div className={styles.divider} />
        </div>

        <p className={styles.description}>
          In previous lives, I went to the University of California, Los Angeles (UCLA) where I majored in Computer Science and a minor in Bioinformatics. My favorite courses were CS181&apos;s Automata, CS161&apos;s Fundamentals of AI, and CM122&apos;s Algorithms in Bioinformatics. <br />
          <br />
          If you&apos;d like to learn more about me, you can find me on <a href="https://twitter.com/ifui0">Twitter</a>, <a href="https://github.com/sweeneyngo">Github</a>, or <a href="https://linkedin.com/in/sweeneyngo">LinkedIn</a>. <br />
          To see what I&apos;ve been working on, check out my <a href="https://read.cv/ifuxyl">CV</a>!
        </p>

        <div className={styles.smallHeading}>
          <small>✱ ARTICLES </small>
          <div className={styles.divider} />
        </div>

        <div className={styles.section}>
          <Posts posts={posts} />
          <Button />
        </div>
        <div className={styles.smallHeading}>
          <small>✱ ODE TO NEOCITIES </small>
          <div className={styles.divider} />
        </div>

        <div className={styles.section}>
          <div className={styles.inline}>
            <a href="https://cadeion.neocities.org/"><img width={91} height={30} className={styles.bnr} src="/bns/Cadeion_Button.gif" alt="Cadeion (at) neocities" /></a>
            <a href="https://ceiadon.neocities.org/"><img width={91} height={30} className={styles.bnr} src="/bns/kitebutton.webp" alt="Kite (at) neocities" /></a>
            <a href="https://corru.observer/"><img width={91} height={30} className={styles.bnr} src="/bns/corru.gif" alt="corru.observer (at) neocities" /></a>
            <a href="https://obby.dog/"><img width={91} height={30} className={styles.bnr} src="/bns/vertpushbutton.gif" alt="vert (at) neocities" /></a>
          </div>
        </div>

      </section>
    </section>
  );
}
