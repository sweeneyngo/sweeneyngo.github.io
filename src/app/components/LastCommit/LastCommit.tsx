"use client";
import { useState, useEffect } from "react";
import styles from "./LastCommit.module.css";
import { getLastCommit } from "@/utils/utils";

export default function LastCommit() {

    const [commit, setCommit] = useState<string | void>("");

    useEffect(() => {
        // Define an async function inside the useEffect
        const fetchCommit = async () => {
            try {
                const newCommit = await getLastCommit();
                setCommit(newCommit);
            } catch (error) {
                console.error("Failed to fetch commit:", error);
                setCommit("");
            }
        };

        // Call the async function
        fetchCommit();
    }, []); // Empty dependency array means this effect runs once when the component mounts


    return (
        <div className={styles.subtext}>
            <p className={styles.text}>Last updated: <br />{commit ? commit : "No commit data found."}</p>
        </div>

    );
}
