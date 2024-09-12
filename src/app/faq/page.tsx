import Footer from "../components/Footer/Footer";
import styles from "./page.module.css";

export default async function Blog() {
    return (
        <div>

            <div className={styles.panels}>
                <h1>Frequently Asked Questions</h1>
                <h2>For developers,</h2>
                <p>
                    Q. What do you mainly work with? <br />
                    A. TypeScript, React, Next.js, Vite. <br />
                </p>
                <p>
                    Q. Anything you&apos;re curious about? <br />
                    A. Learning Go, building graphics in C++, and trying out Rust. <br />
                </p>
                <p>
                    Q. What IDE should I use? <br />
                    A. Whatever works for you. People can say use VSCode, or IntelliJ, or even Neovim, but it highly depends on your preference & project. I often use VSCode because it&apos;s built for web applications & high customizability, but neovim is great for quick editing, and IntelliJ was more appropriate for building Java.<br />
                </p>
                <h2>For artists,</h2>
                <p>
                    Q. What do you draw with? <br />
                    A. Photoshop + MSPaint w/ mouse. <br />
                </p>
                <p>
                    Q. Sens/DPI? <br />
                    A. Sens varies, but 800 DPI. Basically aim for 24.35in/360 (61.85cm/360) usually. <br />
                </p>
                <p>
                    Q. Any advice on developing an artstyle? <br />
                    A. I&apos;m a personal advocate in imitating your heroes. If you are inspired by someone&apos;s art, it&apos;s okay to replicate their style or take parts of their artistic choices. As long as you&apos;re having fun and learning something new, you&apos;ll develop your own consistency. <br />
                </p>
                <h2>For the strange techie,</h2>
                <p>
                    Q. Recommended software? <br />
                    A. Quite a bit: VSCode, Firefox, Obsidian, Syncthing, foobar2000. <br />
                </p>
            </div>
        </div>
    );
}
