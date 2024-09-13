"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEgg } from "react-icons/fa6";
import styles from "./nav.module.css";
export default function Nav() {

    const [showEgg, setShowEgg] = useState(false);
    const [isBouncing, setIsBouncing] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleClick = () => {
        setShowEgg(!showEgg);
    }

    const handleBounce = () => {

        if (audioRef.current) {
            audioRef.current.currentTime = 0.35;
            audioRef.current.play();
        }

        setIsBouncing(true);
        setTimeout(() => setIsBouncing(false), 400); // Match duration with animation time
    }
    return (
        <div>
            <section className={styles.tabs}>
                <p><Link href="/">/</Link></p>
                <p><Link href="/blog">blog</Link></p>
                <p><Link href="/rss.xml">rss</Link></p>
                <p><Link href="/aliases">aliases</Link></p>
                <p><Link href="/faq">faq</Link></p>
                <div onClick={() => handleClick()} className={styles.egg}><FaEgg /></div>
            </section>
            <div onClick={handleBounce}
                className={`${styles.pocket} ${showEgg && styles.active}`}>
                <audio ref={audioRef} src={`/sounds/riolucry.mp3`} preload="auto" />
                <Image width={42} height={45} alt="Riolu" className={`${isBouncing && styles.bounce}`} src="/images/Riolu.png" />
                <div className={`${styles.diskShadow}`} />
            </div>
        </div>

    );
}
