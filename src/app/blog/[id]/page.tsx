import MusicPlayer from '@/app/components/MusicPlayer/MusicPlayer';
import Footer from '@/app/components/Footer/Footer';
import { getPost, getAllPosts } from '@/utils/posts';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

import styles from './page.module.css';

export default function Page({ params }: { params: { id: string } }) {
  const {
    id,
    title,
    date,
    musicFile,
    musicTitle,
    musicArtist,
    musicURI,
    content,
  } = getPost(params.id);
  const wordCount = content.trim().split(/\s+/).length;
  const minRead = Math.round(wordCount / 350);
  const maxRead = Math.round(wordCount / 230);

  function formatDate(dateString: string): string {
    const date = new Date(dateString + ' GMT-0800');
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <div className={styles.subheader}>
        <p>
          {formatDate(date)} • {minRead}-{maxRead} min
        </p>
        <div className={styles.bar} />
      </div>

      <div className={styles.smallHeading}>
        <small>✱ SONG OF THE DAY </small>
        <div className={styles.divider} />
      </div>

      <MusicPlayer
        musicFile={musicFile}
        musicTitle={musicTitle}
        musicArtist={musicArtist}
        musicUri={musicURI}
      />

      <div className={styles.smallHeading}>
        <small>✱ READY, SET, GO. </small>
        <div className={styles.divider} />
      </div>

      <Markdown
        children={content}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                PreTag="div"
                language={match[1]}
                className={styles.code}
                style={solarizedlight}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
          img({ node, ...props }) {
            return (
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  border: '1px solid #cacaca',
                  background: 'gainsboro',
                  /* Border around the block */
                  borderRadius: '4px',
                  padding: '1rem',
                }}
              >
                <img
                  {...props}
                  alt="Rendered markdown image"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </span>
            );
          },
        }}
      ></Markdown>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}
