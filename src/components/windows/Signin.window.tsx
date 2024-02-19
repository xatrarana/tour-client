import logo from "@/assets/new_logo.png";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthState from "@/hooks/Auth.hook";

const loginSchema = yup.object({
  username: yup.string().required({ message: "Username is required" }),
  password: yup
    .string()
    .required({ message: "Password is required" })
}).required();

type TLoginFormData = yup.InferType<typeof loginSchema>;

const SignInWindow = () => {
  const {isLoggedIn} = useAuthState();
  useEffect(()=>{
    if(isLoggedIn){
      navigate('/')
    }
  },[isLoggedIn])
    

  // react hook form 
  const { register, handleSubmit, formState: { errors } } = useForm<TLoginFormData >({
    resolver: yupResolver(loginSchema)
  });
  const navigate = useNavigate()
  const onSubmit = (data: TLoginFormData) => console.log(data);

  console.log(errors);

  return (
    <div className="h-screen bg-neutral-50 dark:bg-slate-800 flex md:items-center justify-center ">
      <div className="bg-neutral-50 dark:bg-slate-800 md:dark:bg-slate-700 p-5 rounded-lg md:shadow-lg max-w-md md:max-w-lg w-full flex flex-col gap-5 md:gap-0">
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
                className="block mb-2 text-md  text-gray-700 dark:text-white self-start"
              >
                username
              </label>
              <Input
                id="username"
                autoComplete="on"
                className={cn(
                  "h-12 md:h-14 text-md dark:bg-gray-100 dark:text-black"
                )}
                {...register("username")}
              />
            </div>
            <div className="mb-3 w-full ">
              <label
                htmlFor="password"
                className="block mb-2 text-md  text-gray-700 self-start dark:text-white"
              >
                password
              </label>
              <Input
                id="password"
                type="password"
                className={cn(
                  " h-12 md:h-14 text-md dark:bg-gray-100 dark:text-black"
                )}
                {...register("password")}
              />

            </div>
            <div className="flex items-end justify-end  w-full">
              <Link to={'/users/password/new'} className="text-sm text-gray-500 hover:text-gray-700">
                Forgot Password?
              </Link>
            </div>
            <Button
              type="submit"
              className={cn(
                "mt-4 w-full h-14   font-semibold text-md "
              )}
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInWindow;
