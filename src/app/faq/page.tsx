import Footer from '../components/Footer/Footer';
import styles from './page.module.css';

export default async function Blog() {
  return (
    <div>
      <div className={styles.panels}>
        <h1>Frequently Asked Questions</h1>
        <h2>For developers,</h2>
        <p>
          Q. What do you mainly work with? <br />
          A. TypeScript + Go! (in a perfect world, I would work with these two
          languages forever) <br />
        </p>
        <p>
          Q. Anything you&apos;re curious about? <br />
          A. Building things I don&apos;t really understand. So, like graphics,
          networking, game theory, command-line interfaces, compilers.. hmm, I
          guess there&apos;s a lot more to learn! <br />
        </p>
        <p>
          Q. What IDE do you use? <br />
          A. I use VSCode because that&apos;s what I&apos;m used to. I did
          experiment with neovim and Emacs but they never really clicked with me
          yet. I do enjoy vim keybinds though. I&apos;m always under the
          impression that IDEs are less about personal preference and more about
          the right tool for the job, but that might be a conversation for
          another day.
          <br />
        </p>
        <p>
          Q. What drives you to build? What are you thinking of building next?{' '}
          <br />
          A. I think it mainly stems from curiosity. So if I ever see a cool
          article or a concept I don&apos;t quite understand, I try to apply
          that knowledge somehow. Honestly, I try to de-scope my projects down
          to a simple prototype. I feel like if it ends up suffering from
          feature creep, it becomes far too unwieldy and I ultimately lose the
          point of building it in the first place. I can&apos;t say what I would
          do next (not keen on describing short-term plans), but I generally try
          to build things that will help me learn a new concept or domain, while
          also generally being fun and interactive.
          <br />
        </p>
        <h2>For artists,</h2>
        <p>
          Q. What do you draw with? <br />
          A. Photoshop + MSPaint w/ mouse. <br />
        </p>
        <p>
          Q. Sens/DPI? <br />
          A. Sens varies, but 800 DPI. Basically aim for 24.35in/360
          (61.85cm/360) usually. <br />
        </p>
        <p>
          Q. Any advice on developing an artstyle? <br />
          A. I&apos;m a personal advocate in imitating your heroes. If you are
          inspired by someone&apos;s art, it&apos;s okay to replicate their
          style or take parts of their artistic choices. As long as you&apos;re
          having fun and learning something new, you&apos;ll develop your own
          consistency. <br />
        </p>
        <h2>For the strange techie,</h2>
        <p>
          Q. Recommended software? <br />
          A. Quite a bit: Samba, VLC, Obsidian, Syncthing, foobar2000. But
          honestly, there&apos;s a vast world of software if you start
          self-hosting! <br />
        </p>
      </div>
    </div>
  );
}
