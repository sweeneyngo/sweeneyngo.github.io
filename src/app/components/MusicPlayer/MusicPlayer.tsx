"use client"

import { useState, useRef, useEffect } from "react";
import { MdOutlinePause } from "react-icons/md";
import { RiPlayFill, RiPauseFill, RiStopFill, RiRewindFill, RiLoopRightFill } from "react-icons/ri";
import styles from "./MusicPlayer.module.css";

type Props = {
    musicFile: string,
    musicTitle: string,
    musicArtist: string,
    musicUri: string
}

export default function MusicPlayer({ musicFile, musicTitle, musicArtist, musicUri }: Props) {

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(true);
    const [progress, setProgress] = useState(0);

    const handlePlay = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.loop = true;
                audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    }

    const handleStop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }

    const handleRestart = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            setIsPlaying(true);
        }
    }

    const toggleLoop = () => {
        if (audioRef.current) {
            audioRef.current.loop = !audioRef.current.loop;
            setIsLooping(audioRef.current.loop);
        }
    }

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const updateProgress = () => {
                if (audio.duration) {
                    setProgress((audio.currentTime / audio.duration) * 100);
                }
            };

            const handleEnded = () => {
                setIsPlaying(false); // Reset to "Play" state
            };

            audio.addEventListener('timeupdate', updateProgress);
            audio.addEventListener('loadedmetadata', updateProgress);
            audio.addEventListener('ended', handleEnded); // Add ended event listener

            return () => {
                audio.removeEventListener('timeupdate', updateProgress);
                audio.removeEventListener('loadedmetadata', updateProgress);
                audio.removeEventListener('ended', handleEnded); // Cleanup
            };
        }
    }, []);

    return (
        <div className={styles.bar}>
            <div className={styles.leftPanel}>
                <div className={styles.modeButton} onClick={handlePlay}>{isPlaying ? <MdOutlinePause /> : <RiPlayFill />}</div>
                <div className={styles.modeButton} onClick={handleStop}><RiStopFill /></div>
                <div className={styles.modeButton} onClick={handleRestart}><RiRewindFill /></div>
            </div>
            <div className={styles.progressContainer}>
                <div
                    className={styles.progressBar}
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className={`${styles.modeButton} ${isLooping ? styles.active : ""}`} onClick={toggleLoop}>
                <RiLoopRightFill />
            </div>
            <audio ref={audioRef} src={`/sounds/${musicFile}`} preload="auto" />
            <a href={musicUri}><p className={styles.song}>{musicTitle} / {musicArtist}</p></a>
        </div>

    );
}
