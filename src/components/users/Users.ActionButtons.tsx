import instance from "@/lib/axiosConfig"
import { Button } from "../ui/button";

const UserActionButtons = () => {
  const handleWhoAmI = async () => {
    const response = await instance.get('/auth/me');
    console.log(response.data)
  } 
  return (
    <div>
        fdf
        <Button onClick={handleWhoAmI}>who am i </Button>
    </div>
  )
}

export default UserActionButtons