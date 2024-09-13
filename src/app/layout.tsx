import type { Metadata } from "next";
import Link from "next/link";

import Clock from "./components/Clock/Clock";
import Nav from "./components/Nav/Nav";
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
  display: "swap",
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
  const backgroundText = new Array(12).fill("Vouloir, cest pouvoir");

  return (
    <html lang="en">
      <body className={`${font.variable} ${display.variable} ${mono.variable}`}>
        <div className={styles.backgroundText}>
          {backgroundText.map((item, index) => <h1 key={index}>{item}</h1>)}
        </div>
        <main className={styles.main}>
          <div className={styles.header}>
            <h3 className={styles.title}>
              <GiDiamonds /><sup className={styles.tick}>✱</sup>
            </h3>
            <Nav />
          </div>
          <section className={styles.subheader}>
            <LastCommit commit={commit} />
          </section>
          <section className={styles.subheader}>
            <Clock />
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
