import { PlusCircle } from "lucide-react"
import PlaceActionButton from "./place.create"
import PlaceTable from "./place.table"
import PlaceCreateForm from "./place.form"

const PlacesHome = () => {
  return (
    <div className="">
    <div className=" flex justify-between items-center mb-2">
      <h1 className="text-center text-xl font-semibold lg:sfont-bold lg:text-2xl">Places</h1> 
      <PlaceActionButton icon={ <PlusCircle/>} title={"Add Place"} action={<PlaceCreateForm/>}/>
    </div>
    <div className="scroll-only ">
      <PlaceTable/>
    </div>
    </div>
  )
}

export default PlacesHome