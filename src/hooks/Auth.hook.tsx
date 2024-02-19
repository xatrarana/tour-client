import { useEffect, useState } from "react";

export default function useAuthState(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() =>{
        const token = localStorage.getItem('token');
        if(token){
            setIsLoggedIn(true);
        }
    },[isLoggedIn]);

    return {isLoggedIn, setIsLoggedIn}
}