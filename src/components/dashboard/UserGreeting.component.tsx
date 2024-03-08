import { useEffect, useState } from "react"

const UserGreeting = () => {
    const [name, setName] = useState<string | null>(null)
    
    useEffect( ()=>{
       const data = localStorage.getItem('user');
       const user = JSON.parse(data!);
      setName(user.username)
    },[name])
  return (
    <div className='mt-1 '>
        <span className='text-2xl md:text-3xl font-bold inline-flex items-center gap-2' >Welcome {name ? name.toString() : <div className="skeleton w-32 h-5"></div>}</span>
    </div>
  )
}

export default UserGreeting