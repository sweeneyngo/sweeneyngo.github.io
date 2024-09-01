"use client";

import { FaTwitter, FaGithub, FaYoutube } from "react-icons/fa";
import { FaAnglesUp } from "react-icons/fa6";
import styles from "./Footer.module.css";
export default function Footer() {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className={styles.footer}>
            <div className={styles.bar} />
            <div><a href="https://www.x.com/ifuxyl"><FaTwitter /></a></div>
            <div><a href="https://www.github.com/sweeneyngo"><FaGithub /></a></div>
            <div><a href="https://www.youtube.com/@9ifu"><FaYoutube /></a></div>
            <div onClick={scrollToTop}><FaAnglesUp /></div>
        </div>
    );
}
