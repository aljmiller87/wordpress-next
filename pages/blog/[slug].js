import { gql } from "@apollo/client";
import Link from "next/link";
import { client } from '../../lib/apollo'
export default function BlogPage({ post }) {
    return (
        <>
            <div style={{ padding: "50px", wordWrap: "break-word", maxWidth: "100vw" }}>
                <Link href="/">
                    <a>back to home</a>
                </Link>

                <h2>{post.title}</h2>
                <p>{post.date}</p>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

        </>
    )
}

export async function getStaticPaths() {
    const result = await client.query({
        query: gql`
        query GetWordPressPosts {
          posts {
            nodes {      
              slug
            }
          }
        }
        `
    });
    console.log('path result', result.data.posts.nodes)
    return {
        paths: result.data.posts.nodes.map(({ slug }) => {
            return {
                params: { slug }
            }
        }),
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    console.log('params', params)
    const { slug } = params;
    const result = await client.query({
        query: gql`
        query GetWordPressPostBySlug($slug: String!) {
            postBy(slug: $slug) {
              title
              content
              date
            }
          }

        `,
        variables: { slug }
    });
    return {
        props: {
            post: result.data.postBy
            // post: "hello"
        }
    };
}