import { Wrench } from 'lucide-react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const EventHome = () => {
    const router = useNavigate()
  return (
    <div className="h-64 flex gap-y-5 flex-col items-center justify-center ">
            <Wrench size={45} />
            <p className="text-2xl font-bold">Features under development { ': }'}</p> 
            <Button onClick={() => router(-1)}>Go Back</Button>
            </div>
  )
}

export default EventHome