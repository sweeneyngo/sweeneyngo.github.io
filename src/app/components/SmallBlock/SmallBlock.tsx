
import styles from "./smallblock.module.css";
export default function Clock({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <p className={styles.date}>{children}</p>
    )
}
