import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useEffect } from "react";

const schema = yup.object({
  password: yup.string().required(),
  confirmpassword: yup.string().required().oneOf([yup.ref("password")],"Passwords must match"),
})

type ProfilePasswordProps = yup.InferType<typeof schema>
const ProfilePassword = () => {
  const {toast} = useToast()
  const {register, handleSubmit, formState:{errors}} = useForm<ProfilePasswordProps>({
    resolver: yupResolver(schema)
  });

  useEffect(()=>{
      document.title = "Profile | Password"
    if(errors.confirmpassword?.message){
      toast({variant: "destructive", title: "Invalid Password", description: errors.confirmpassword?.message});
    }
  },[errors])

  const submit = (data: ProfilePasswordProps) => console.log(data);
  return (
    <>
      <div className="mt-5 flex gap-x-10">
        <Link to={"/profile/information"}>
          <p className="font-bold ">Information</p>
        </Link>
        <Link to={"/profile/password"}>
          <p className="font-bold underline underline-offset-8">Password</p>
        </Link>
      </div>
      <hr className="" />
      <div className=" md:flex gap-y-10 mt-4 md:gap-x-10">
          <div className="pt-1">
            <p className="text-2xl font-bold">Password</p>
          </div>
          <div className="pt-2 mt-5 md:mt-5  w-full  max-w-sm">
            <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5">
                <div className="">
                  <label htmlFor="password" className="text-sm font-bold">Password<span className="text-red-700 text-md"> *</span></label>
                  <Input type="password" id="password" {...register("password")} />
                </div>
                <div>
                  <label htmlFor="confirmpassword" className="text-sm font-bold">Confirm password<span className="text-red-700 text-md"> *</span></label>
                  <Input type="password" id="confirmpassword" {...register("confirmpassword")} />
                </div>
                <div>
                </div>
               
                <div>
                  <Button>
                    Update my password
                  </Button>
                </div>
            </form>
          </div>
      </div>
    </>
  );
};

export default ProfilePassword;
