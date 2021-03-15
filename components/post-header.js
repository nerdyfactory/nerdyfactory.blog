import DateFormatter from '../components/date-formatter'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'

export default function PostHeader({ title, coverImage, date }) {
  return (
    <>
      <CoverImage title={title} src={coverImage} height={620} width={1240} />
      <div className="my-8 md:mb-10 sm:mx-0">
        <PostTitle>{title}</PostTitle>
        <DateFormatter dateString={date} />
      </div>
    </>
  )
}
