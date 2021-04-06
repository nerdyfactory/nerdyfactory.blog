import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import PostPreview from "../components/post-preview";
import config from "../config";

export default function Index({ allPosts }) {
  return (
    <Layout>
      <Head>
        <title>Nerdy Blog</title>
        <meta name="description" content={config.description} />
      </Head>
      {allPosts.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          coverImage={post.coverImage}
          technologies={post.technologies}
          date={post.date}
          author={post.author}
          slug={post.slug}
          excerpt={post.excerpt}
        />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "technologies",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
}
