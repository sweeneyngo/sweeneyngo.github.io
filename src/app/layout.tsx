import type { Metadata } from "next";
import Link from "next/link";
import LastCommit from "./components/LastCommit/LastCommit";
import { getLastCommit } from "@/utils/utils";
import generateFeed from "@/utils/rss";

import { Karla } from "next/font/google"; // Define mainpage font
import { Fira_Code } from "next/font/google";

import styles from "./page.module.css";
import "./globals.css";

const font = Karla({
  subsets: ["latin"],
  variable: "--font"
});
const mono = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "ifu*",
  description: "Homebase [to] -- serving articles & blogs, for ifu.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const commit = await getLastCommit();
  await generateFeed();

  return (
    <html lang="en">
      <body className={`${font.variable} ${mono.variable}`}>
        <main className={styles.main}>
          <div className={styles.header}>
            <p>
              ifu<span className={styles.tick}>✱</span>
            </p>
            <div className={styles.tabs}>
              <p><Link href="/">/</Link></p>
              <p><Link href="/blog">blog</Link></p>
              <p><Link href="/rss.xml">rss</Link></p>
              <p><Link href="/aliases">aliases</Link></p>
              <p><Link href="/faq">faq</Link></p>
            </div>
          </div>
          <div className={styles.subheader}>
            <LastCommit commit={commit} />
          </div>
          <div className={styles.pageContent}>
            {children}
          </div>
          <div className={styles.grid}></div>
        </main>
      </body>
    </html>
  );
}
