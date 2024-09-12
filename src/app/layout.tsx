import type { Metadata } from "next";
import Link from "next/link";
import Footer from "./components/Footer/Footer";
import LastCommit from "./components/LastCommit/LastCommit";
import { getLastCommit } from "@/utils/utils";
import generateFeed from "@/utils/rss";

import { GiDiamonds } from "react-icons/gi";

import { Karla } from "next/font/google"; // Define mainpage font
import { Viga } from "next/font/google";
import { Fira_Code } from "next/font/google";

import styles from "./page.module.css";
import "./globals.css";

const font = Karla({
  subsets: ["latin"],
  variable: "--font"
});

const display = Viga({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display"
});

const mono = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "𝙞𝒇𝙪✱",
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
      <body className={`${font.variable} ${display.variable} ${mono.variable}`}>
        <main className={styles.main}>
          <div className={styles.header}>
            <h3 className={styles.title}>
              <GiDiamonds /><sup className={styles.tick}>✱</sup>
            </h3>
            <section className={styles.tabs}>
              <p><Link href="/">/</Link></p>
              <p><Link href="/blog">blog</Link></p>
              <p><Link href="/rss.xml">rss</Link></p>
              <p><Link href="/aliases">aliases</Link></p>
              <p><Link href="/faq">faq</Link></p>
            </section>
          </div>
          <section className={styles.subheader}>
            <LastCommit commit={commit} />
          </section>
          <section className={styles.pageContent}>
            {children}
            <section className={styles.section}>
              <Footer />
            </section>
          </section>
          <div className={styles.grid}></div>
        </main>
      </body>
    </html>
  );
}
