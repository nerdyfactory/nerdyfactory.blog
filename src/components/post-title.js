export default function PostTitle({ children }) {
  return (
    <h1 className="nf-title text-5xl md:text-5xl lg:text-5xl font-bold tracking-tighter leading-tight md:leading-none mb-6 text-center md:text-left">
      {children}
    </h1>
  )
}
