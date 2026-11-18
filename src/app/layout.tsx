import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

import Clock from './components/Clock/Clock';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import LastCommit from './components/LastCommit/LastCommit';

import generateFeed from '@/utils/rss';

import { GiDiamonds } from 'react-icons/gi';

import { Fira_Code } from 'next/font/google';
import localFont from 'next/font/local';

import styles from './page.module.css';
import './globals.css';

const font = localFont({
  src: './fonts/Allo/AlloVariableFriendly.woff2',
  display: 'swap',
  variable: '--font',
  weight: '100 900',
});

const mono = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: '𝙞𝒇𝙪✱',
  description: 'Homebase [to] -- serving articles & blogs, for ifu.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await generateFeed();
  const backgroundText = new Array(12).fill(
    '4c 69 66 65 20 69 73 20 6c 69 6b 65 20 61 20 f0 9f 93 a6 20 6f 66 20 f0 9f 8d ab',
  );

  return (
    <html lang="en">
      <body className={`${font.variable} ${mono.variable}`}>
        <div className={styles.backgroundText}>
          {backgroundText.map((item, index) => (
            <h1 key={index}>{item}</h1>
          ))}
        </div>
        <main className={styles.main}>
          <div className={styles.header}>
            <h3 className={styles.title}>
              <GiDiamonds />
              <sup className={styles.tick}>✱</sup>
            </h3>
            <Nav />
          </div>
          <section className={styles.subheader}>
            <LastCommit />
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
      <GoogleAnalytics gaId="G-V8SM7WME8B" />
    </html>
  );
}
