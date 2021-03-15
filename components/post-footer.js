import Avatar from '../components/avatar'

export default function PostFooter({ author }) {
  const {name, picture, role, description} = author
  return (
    <div className="my-8 md:mb-10 sm:mx-0">
      <h1 className="mb-5 text-2xl nf-title font-semibold">About the author</h1>
      <Avatar name={name} picture={picture} role={role} />
      {
        description && 
        <p className="mt-8 text-sm">
          {description}
        </p>
      }
    </div>
  )
}
