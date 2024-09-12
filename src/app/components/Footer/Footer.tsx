"use client";

import { FaTwitter, FaGithub, FaYoutube, FaLinkedin } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { FaAnglesUp } from "react-icons/fa6";
import { PiReadCvLogoFill } from "react-icons/pi";
import styles from "./Footer.module.css";
export default function Footer() {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer>
            <section className={styles.footer}>
                <div className={styles.bar} />
                <div><a href="https://www.x.com/ifui0"><FaTwitter /></a></div>
                <div><a href="https://www.github.com/sweeneyngo"><FaGithub /></a></div>
                <div><a href="https://www.linkedin.com/in/sweeneyngo"><FaLinkedin /></a></div>
                <div><a href="https://www.read.cv/ifuxyl/"><PiReadCvLogoFill /></a></div>
                <div onClick={scrollToTop}><FaAnglesUp /></div>
            </section>
            <section className={styles.small}>
                <p>
                    Made with <span><IoHeart /></span> by ifu
                </p>
                <p>
                    © 2024 Sweeney Ngo
                </p>
            </section>

        </footer>
    );
}
