import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown/with-html";
import style from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ErrorPage from "next/error";
import PostHeader from "../../components/post-header";
import PostFooter from "../../components/post-footer";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";

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
              <title className="nf-title">
                {post.title} | Next.js Blog Example with {CMS_NAME}
              </title>
              <meta property="og:image" content={post.ogImage.url} />
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
              renderers={{ code: CodeBlock, image: MarkdownImage }}
            />
            <PostFooter 
              author={post.author}
            />
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
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
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

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter style={style} language={language}>
      {value}
    </SyntaxHighlighter>
  );
};

const MarkdownImage = ({ alt, src }) => (
  <Image
    alt={alt}
    src={`/assets/blog/authors/jj.jpeg`}
    webpSrc={`/assets/blog/authors/jj.jpeg`}
    previewSrc={`/assets/blog/authors/jj.jpeg`}
    className="w-full"
  />
);