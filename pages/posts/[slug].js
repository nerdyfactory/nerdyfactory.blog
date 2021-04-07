import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/CodeBlock";
import ErrorPage from "next/error";
import PostHeader from "../../components/post-header";
import PostFooter from "../../components/post-footer";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import config from "../../config";

export default function Post({ post, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className="mb-32 mt-16">
            <Head>
              <title className="nf-title">{post.title}</title>
              <meta property="og:image" content={post.ogImage.url} />
              <meta name="description" content={config.description} />
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              technologies={post.technologies}
              date={post.date}
            />
            <ReactMarkdown
              className="mb-4 prose lg:prose-lg dark:prose-dark"
              escapeHtml={false}
              source={post.content}
              renderers={{
                code: CodeBlock,
                image: MarkdownImage,
              }}
            />
            <PostFooter author={post.author} />
          </article>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "technologies",
  ]);

  return {
    props: {
      post: {
        ...post,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

const MarkdownImage = ({ alt, src }) => (
  <Image
    alt={alt}
    src={`/assets/blog/authors/jj.jpeg`}
    webpSrc={`/assets/blog/authors/jj.jpeg`}
    previewSrc={`/assets/blog/authors/jj.jpeg`}
    className="w-full"
  />
);
