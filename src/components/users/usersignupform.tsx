
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../ui/button";
import instance, { cancelTokenSource } from "@/lib/axiosConfig";
import { isAxiosError, isCancel } from "axios";
import { useToast } from "../ui/use-toast";
export enum ROLE {
  ADMIN = "admin",
  USER = "user",
}


const userSchema = yup.object().shape({
  fullname: yup.string().required('Full name is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().optional().matches(/^[0-9]+$/, 'Invalid phone number'),
  password: yup.string().required('Password is required'),
  confirmpassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  avatar: yup.string().optional(),
  role: yup.string().oneOf(Object.values(ROLE)).required('Role is required')
});

export type TUser = yup.InferType<typeof userSchema>
const UserSignUpForm = () => {
  const { toast } = useToast()
  const { register, handleSubmit, formState: { errors, isLoading } } = useForm<TUser>({
    resolver: yupResolver(userSchema)
  })

  const handleCancel = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Operation canceled by the user.');
    }
  }
  const onSubmit = async (data: TUser) => {
    try {
      const response = await instance.post('/users/signup', data, {
        headers: {
          "Content-Type": 'application/json'
        },
        cancelToken: cancelTokenSource.token
      })
      toast({
        variant: 'success',
        description: response.data.message
      })
      window.location.reload()
    } catch (error) {
      console.log(error)
      if (isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: error.response?.data.message ?? error.response?.data.error
        })
      }
      else if (isCancel(error)) {
        toast({ variant: 'destructive', title: 'Request canceled', description: error.message })
      }
    } finally {

    }
  }
  return (

    <div className="grid gap-2">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-7 my-2">
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            type="text"
            autoComplete='true'
            {...register('fullname')}
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            autoComplete="true"
            {...register('email')}
            className="col-span-2 h-8"
          />
          {errors.email?.message && <p className="text-red-500">{errors.email?.message}</p>}
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="username">username</Label>
          <Input
            id="username"
            autoComplete="true"
            {...register('username')}
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label
            htmlFor="category"
            className="block font-semibold text-gray-700 mb-2 dark:text-white"
          >
            Role
          </Label>
          <select id="category" {...register('role')} className="mt-1 p-2 w-full border dark:bg-black rounded-lg">
            <option value="">Select role</option>
            {
              Object.values(ROLE).map((role) => (
                <option value={role} key={role}>{role}</option>
              ))
            }
          </select>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="confirmpassword">Confirm password</Label>
          <Input
            id="confirmpassword"
            type="password"
            {...register('confirmpassword')}
            className="col-span-2 h-8"
          />
          {errors.confirmpassword?.message && <p className="text-red-500">{errors.confirmpassword?.message}</p>}
        </div>
        <div className="text-end">
          {
            !isLoading && <Button type="submit" disabled={isLoading}>
              Add user
            </Button>

          }
          {
            isLoading && (
              <div>
                <span className="loading loading-dots loading-lg"></span>
                <p onClick={handleCancel}>cancel</p>
              </div>
            )
          }
        </div>
      </form>
    </div>

  )
}

export default UserSignUpForm




