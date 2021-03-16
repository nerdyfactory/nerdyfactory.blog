import DateFormatter from '../components/date-formatter'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'

export default function PostHeader({ title, coverImage, date, technologies }) {
  return (
    <>
      <CoverImage title={title} src={coverImage} height={620} width={1240} />
      <div className="my-8 md:mb-10 sm:mx-0">
        <PostTitle>{title}</PostTitle>
        <div className="flex flex-row items-center">
          <DateFormatter dateString={date} />
          <div className="flex flex-row  w-1/3 h-6 justify-start ml-4">
            {technologies?.map(t => (
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
    </>
  )
}
