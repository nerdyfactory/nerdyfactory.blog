export default function Avatar({ name, picture, role }) {
  return (
    <div className="flex flex-row items-center">
      <img src={picture} className="w-12 h-12 rounded-full mr-6" alt={name} />
      <div className="flex flex-col ">
        <div className="text-base font-semibold">{name}</div>
        {role && <div className="text-sm font-medium">{role}</div>}
      </div>
    </div>
  )
}
