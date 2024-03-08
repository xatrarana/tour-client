import { PlusCircle, Search } from "lucide-react"
import PlaceActionButton from "./place.create"
import PlaceTable from "./place.table"
import PlaceCreateForm from "./place.form"
import {  useState } from "react"
import { Input } from "../ui/input"
const PlacesHome = () => {
  const [globalFiltering, setFiltering] = useState('')
  
  return (
    <div className="flex flex-col">
    <div className=" flex justify-between items-center mb-2">
      <h1 className="text-center hidden md:block text-xl font-semibold lg:sfont-bold lg:text-2xl">Places</h1>
      <div className="flex gap-x-2">
        <div className="flex items-center pl-2">
          <Search size={25}/>
        <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" type="text" placeholder="Search places ..." value={globalFiltering} onChange={e => setFiltering(e.target.value)}  />
        </div>
        <PlaceActionButton icon={ <PlusCircle/>} title={"Add Place"} action={<PlaceCreateForm/>}/>
      </div>
    </div>
    <div className="scroll-only flex-1 py-2">
      <PlaceTable  globalFiltering={globalFiltering} setFiltering={setFiltering} />
    </div>
    </div>
  )
}

export default PlacesHome