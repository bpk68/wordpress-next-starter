import Head from 'next/head';
import Link from 'next/link';

// data
import { getAllPostsWithSlug, getPost } from '../../lib/api';

// styles
import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/Blog.module.css';

export default function Post({ postData }) {
  if (!postData) {
    return <p>No data could be found for the post...</p>;
  }

  const formatDate = date => {
    const newDate = new Date(date);

    return `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{postData.title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <article className={blogStyles.article}>
          <div className={blogStyles.postmeta}>
            <h1 className={styles.title}>{postData.title}</h1>
            <p>{formatDate(postData.date)}</p>
          </div>
          <div
            className='post-content content'
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
        </article>
        <p>
          <Link href='/blog'>
            <a>back to articles</a>
          </Link>
        </p>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const data = await getPost(params.slug);

  return {
    props: {
      postData: data.post
    }
  };
}
