import { useAuth } from "@/context/AuthContext"

const UserGreeting = () => {
    const {state : {
      user
    }} = useAuth()
  return (
    <div className='mt-1 '>
        <span className='text-2xl md:text-3xl font-bold inline-flex items-center gap-2' >Welcome {user?.username ? user.username.toString() : <div className="skeleton w-32 h-5"></div>}</span>
    </div>
  )
}

export default UserGreeting