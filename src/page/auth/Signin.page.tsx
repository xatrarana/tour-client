import SignInWindow from "@/components/windows/Signin.window"
import useAuthState from "@/hooks/Auth.hook"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const {isLoggedIn} = useAuthState();
  const navigate = useNavigate();
  useEffect(() => {
    if(isLoggedIn){
      navigate('/')
    }
  
  },[isLoggedIn])
  return (
    <SignInWindow/>
  )
}

export default SignInPage