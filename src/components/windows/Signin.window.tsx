import logo from "@/assets/new_logo.png";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "@/lib/axiosConfig";
import { useToast } from "../ui/use-toast";
import { AxiosError } from "axios";
import { useAuth } from "@/context/AuthContext";


const loginSchema = yup.object({
  username: yup.string().required({ message: "Username is required" }),
  password: yup
    .string()
    .required({ message: "Password is required" })
}).required();

export type TLoginFormData = yup.InferType<typeof loginSchema>;

const SignInWindow = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {toast} = useToast()
  const { register, handleSubmit} = useForm<TLoginFormData >({
    resolver: yupResolver(loginSchema)
  });
  const {handleLogin} = useAuth()
  const navigate = useNavigate()
  const onSubmit = async (data: TLoginFormData) => {
    setIsLoading(true);
    try {
        const response = await axios.post('/auth/signin/ad', data);
        const userData = response.data.data.user;
          handleLogin(userData, response.data.data.accessToken);
          toast({ variant: 'success' ,title: response.data.message });
          navigate('/');
    } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error)
            const errorMessage = error.response?.data.error ||  error.response?.data.errors[0].message;
            toast({ variant: 'destructive', title: errorMessage });
        } else {
            // console.error('An unexpected error occurred:', error);
            toast({ variant: 'destructive', title: 'An unexpected error occurred' });
        }
    } finally {
        setIsLoading(false);
    }
};


  

  return (
    <div className="h-screen flex md:items-center justify-center ">
      <div className="bg-gray-300 p-5 rounded-lg md:shadow-lg max-w-md md:max-w-lg w-full flex flex-col gap-5 md:gap-0">
        <div className="mb-5">
          <div className="flex items-center justify-between gap-x-5">
            <img src={logo} width="80px" height="80px" />
            <span className="font-bold text-sm text-red-700 lg:text-md md:text-xl">
              ज्वालामूखी गाउँपालिका, गाउँकार्यपालिकाको कार्यालय, धादिङ, बागमती
              प्रदेश
            </span>
          </div>
        </div>

        <div className="md:m-5 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:p-3 flex flex-col md:items-center md:justify-center gap-2"
          >
            <div className="mb-4 w-full flex flex-col items-center ">
              <label
                htmlFor="username"
                className="block mb-2 text-md  font-semibold self-start text-black"
              >
                username
              </label>
              <Input
                id="username"
                autoComplete="on"
                className={cn(
                  "h-10 md:h-12 text-md dark:bg-gray-100 dark:text-black border-none"
                )}
                {...register("username")}
              />
            </div>
            <div className="mb-3 w-full ">
              <label
                htmlFor="password"
                className="block mb-2 text-md font-semibold self-start text-black"
              >
                password
              </label>
              <Input
                id="password"
                type="password"
                className={cn(
                  " h-10 md:h-12 text-md dark:bg-gray-100 dark:text-black border-none"
                )}
                {...register("password")}
              />

            </div>
            <div className="flex items-end justify-end  w-full">
              <Link to={'/auth/password/new'} className="text-sm text-gray-800 hover:text-gray-700">
                Forgot Password?
              </Link>
            </div>
            <Button
              type="submit"
              className={cn(
                "mt-4 w-full h-12 bg-black text-white font-semibold text-xl hover:bg-gray-900"
              )}
              disabled={isLoading}
            >
              { isLoading ? <span className="loading loading-dots loading-lg"></span> : "Signin"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInWindow;
