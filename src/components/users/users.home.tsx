import PlaceActionButton from "../places/place.create"
import { UserPlus } from "lucide-react"
import UserSignUpForm from "./usersignupform"
import UsersTableList from "./users.table"

const UserHomeCenter = () => {
  
  return (
    <div className="">
      <div className=" flex justify-between items-center mb-2">
        <h1 className="text-center text-xl font-semibold lg:sfont-bold lg:text-2xl">Mangage users</h1>
        <div className="flex gap-x-2">
        <PlaceActionButton icon={<UserPlus />} action={<UserSignUpForm/>}  title= {"Add users"}/>
        </div>
      </div>
      <div className="scroll-only p-3">
          <UsersTableList/>
      </div>
    </div>
  )
}

export default UserHomeCenter