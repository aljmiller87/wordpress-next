import Head from 'next/head';
import Link from "next/link";
import { gql } from "@apollo/client";
import { client } from "../lib/apollo"
import styles from '../styles/Home.module.css'

export default function Home({ posts, title, content }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>{title}</h1>
        {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}
        <ul>
          {posts.map(({ title, slug }) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const result = await client.query({
    query: gql`
    query GetWordPressHomePageAndPosts {
      pageBy(uri: "/") {
        title
        content(format: RENDERED)
      }
      posts {
        nodes {      
          title
          content
          date
          slug
        }
      }
    }
    `
  });
  console.log('result', result)
  return {
    props: {
      posts: result.data.posts.nodes,
      title: result.data.pageBy.title,
      content: result.data.pageBy.content
    }
  }
}