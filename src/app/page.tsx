import { getAllPosts } from '@/utils/posts';
import Posts from './components/Posts/Posts';
import Footer from './components/Footer/Footer';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import styles from './page.module.css';

export default async function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className={styles.gridLayout}>
      <header className={styles.heading}>
        <h1>
          Welcome, <br /> enjoy your stay.
        </h1>
      </header>
      <section className={styles.content}>
        <p className={styles.subtitle}>
          I create things on the web, explore interfaces, and experiment
          with systems. I like to write about my experiences in art, music,
          software, and digital independence. Enjoying the pursuit
          of blogging as an exercise of a{' '}
          <a href="https://www.asc.ohio-state.edu/kilcup.1/262/feynman.html">
            Feynmanian approach
          </a>{' '}
          to life— acting freely without worrying about the future.
        </p>

        <div className={styles.smallHeading}>
          <small>✱ SONG OF THE DAY </small>
          <div className={styles.divider} />
        </div>

        <div className={styles.section}>
          <MusicPlayer
            musicFile="bridges_Anthemics.mp3"
            musicTitle="bridges"
            musicArtist="Anthemics"
            musicUri="https://youtu.be/4yhy9MBzjgc"
          />
        </div>

        <div className={styles.smallHeading}>
          <small>✱ ARTICLES </small>
          <div className={styles.divider} />
        </div>

        <div className={styles.section}>
          <Posts posts={posts} />
        </div>
        <div className={styles.smallHeading}>
          <small>✱ ODE TO NEOCITIES </small>
          <div className={styles.divider} />
        </div>

        <div className={styles.section}>
          <div className={styles.inline}>
            <a href="https://cadeion.neocities.org/">
              <img
                width={91}
                height={30}
                className={styles.bnr}
                src="/bns/Cadeion_Button.gif"
                alt="Cadeion (at) neocities"
              />
            </a>
            <a href="https://ceiadon.neocities.org/">
              <img
                width={91}
                height={30}
                className={styles.bnr}
                src="/bns/kitebutton.webp"
                alt="Kite (at) neocities"
              />
            </a>
            <a href="https://corru.observer/">
              <img
                width={91}
                height={30}
                className={styles.bnr}
                src="/bns/corru.gif"
                alt="corru.observer (at) neocities"
              />
            </a>
            <a href="https://obby.dog/">
              <img
                width={91}
                height={30}
                className={styles.bnr}
                src="/bns/vertpushbutton.gif"
                alt="vert (at) neocities"
              />
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}
