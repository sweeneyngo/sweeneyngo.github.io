import styles from "./LastCommit.module.css";

type Props = {
    commit: string | void;
}

export default function LastCommit({ commit }: Props) {
    return (
        <div className={styles.subtext}>
            <p className={styles.text}>Last updated: <br />{commit ? commit : "No commit data found."}</p>
        </div>

    );
}
