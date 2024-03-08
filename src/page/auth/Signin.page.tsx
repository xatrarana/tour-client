import SignInWindow from "@/components/windows/Signin.window"
import { useAuth } from "@/context/AuthContext"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const {state} = useAuth();
  const navigate = useNavigate()
  useEffect(() => {
    if(state.isAuthenticated){
      return navigate('/')
    }
  },[state.isAuthenticated])
  return (
    <SignInWindow/>
  )
}

export default SignInPage