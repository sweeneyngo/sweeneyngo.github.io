"use client";
import { useRouter } from "next/navigation";
import styles from "./button.module.css";
export default function Button() {
    const router = useRouter();
    const handleNavigation = () => {
        router.push("/blog");
    }
    return (
        <button onClick={handleNavigation}><span className={styles.buttonText}>See more</span></button>

    )
}
