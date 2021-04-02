import Avatar from "../components/avatar";
import DateFormatter from "../components/date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  technologies,
  slug,
}) {
  return (
    <div className="my-20 shadow-lg rounded-sm">
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          src={coverImage}
          height={278}
          width={"100%"}
        />
      </div>
      <div className="px-5 pb-5">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <h3 className="w-auto text-3xl mb-3 leading-snug font-semibold nf-title">
            <a aria-label={title} className="hover:none">
              {title}
            </a>
          </h3>
        </Link>
        <div className="text-lg mb-4">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-lg leading-relaxed mb-8">{excerpt}</p>
        <div className="flex flex-row items-center justify-between">
          <Avatar
            name={author.name}
            picture={author.picture}
            role={author.role}
          />
          <div className="flex flex-row w-1/3 h-8 justify-end">
            {technologies?.map((t) => (
              <img
                key={t}
                src={`/assets/img/${t}.png`}
                alt={t}
                layout="responsive"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
