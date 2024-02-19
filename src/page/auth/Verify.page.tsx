import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { yupResolver } from "@hookform/resolvers/yup"
import { ChevronLeft } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email().required({message: 'Email is required'})
}).required()
type FormValues = yup.InferType<typeof schema>
const VerifyPage = () => {
  const navigate = useNavigate()
  const {register,handleSubmit,formState:{errors}} = useForm<FormValues>({
    resolver: yupResolver(schema)
  })
  const onsubmit = (data:FormValues) => console.log(data)
  

  return (
    <div className="h-screen flex justify-center items-baseline">
     
      <div className="shadow-lg rounded-md self-center">
      <button onClick={() => navigate('/users/login')} className=" btn-ghost rounded-md cursor-pointer">
        <ChevronLeft size={30}/>
      </button>
        <div className="text-center p-3">
          <h1 className="text-xl font-bold">Forgot password</h1>
        </div>
        
        <div className="email-container max-w-lg mx-auto p-5">
          <p>To receive instructions on how to reset your password, please enter your current email address.</p>
            <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-y-5 mt-5">
              <label className="font-bold" htmlFor="email">Email address</label>
              <Input id="email" {...register('email')} type="email" className={cn("w-full h-12 font-semibold pl-2")}/>
              <Button type="submit" className={cn("w-full h-12 tracking-wide")}>Send</Button>
            </form>
            <p className="text-center mt-2">
            <Link to={'/users/login'} className="text-sm  underline underline-offset-1 text-green-500">Don't mind me, I remembered</Link>
            </p>
        </div>

      </div>
    </div>
  )
}

export default VerifyPage