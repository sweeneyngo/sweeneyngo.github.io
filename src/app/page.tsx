import Link from "next/link";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <p>
      Hello! I&apos;m ifu (refer: <Link className={styles.link} href="/aliases">aliases</Link>). <br />
      I dabble in freeform writing and artistic endeavors through this blog.<br />
      By day, I&apos;m a software engineer, building software in healthcare and education.<br />
      By night, I&apos;m an online vagabond, hoping to promote &quot;digital independence&quot; on the Internet.
    </p>
  );
}
