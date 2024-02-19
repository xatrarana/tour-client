import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useNavbar } from "@/context/ResponsiveNabBar";

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
}).required();


type ProfileInformationProps = yup.InferType<typeof schema>

const ProfileInformation = () => {
  const {state} = useNavbar()
  useEffect(()=>{
    document.title = "Profile | Information"
  },[])
  const {register, handleSubmit} = useForm<ProfileInformationProps>({
    resolver: yupResolver(schema),
    defaultValues:{
      username:"castelltech7",
      email:"castelltech7@gmail.com",
      firstname:"Castell",
      lastname:"Tech",
    }
  });

  const submit = (data: ProfileInformationProps) => console.log(data);
  return (
    <>
      <div className="mt-5 flex gap-x-10">
        <Link to={"/profile/information"}>
          <p className="font-bold underline underline-offset-8">Information</p>
        </Link>
        <Link to={"/profile/password"}>
          <p className="font-bold">Password</p>
        </Link>
      </div>
      <hr className="" />
      <div className=" gap-y-5 md:flex lg:flex mt-4 md:gap-x-10">
          <div className="pt-1">
            {state.isNavbarOpen && <p>open</p>}
            <p className="text-2xl font-bold">Personal Information</p>
          </div>
          <div className="pt-2 mt-5 md:mt-0">
            <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5">
            <div className="flex gap-5">
                  <div className="">
                  <label htmlFor="firstname" className="text-sm font-bold mb-2">First name<span className="text-red-700 text-md"> *</span></label>
                  <Input type="text" id="firstname" autoComplete="true" {...register("firstname")} />
                  </div>
                  <div>
                  <label htmlFor="lastname" className="text-sm font-bold mb-2">Last name<span className="text-red-700 text-md"> *</span></label>
                  <Input type="text" id="lastname" autoComplete="true" {...register("lastname")} />
                  </div>
                </div>
                <div>
                  <label htmlFor="username" className="text-sm font-bold">Username<span className="text-red-700 text-md"> *</span></label>
                  <Input type="text" id="username" autoComplete={"true"}  {...register("username")} />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-bold">Email address<span className="text-red-700 text-md"> *</span></label>
                  <Input type="email" id="email" autoComplete="true"  {...register("email")} />
                </div>
                
                <div>
                  <Button>
                    Update my profile
                  </Button>
                </div>
            </form>
          </div>
      </div>
    </>
  );
};

export default ProfileInformation;
