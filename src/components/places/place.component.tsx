import CreatePlace from "./place.create"
import PlaceTable from "./place.table"

const PlacesComponent = () => {
  return (
    <>
    <div className=" flex justify-between items-center">
      <h1 className="text-center text-xl font-semibold lg:sfont-bold lg:text-2xl">Places</h1>
      <CreatePlace/>
    </div>
    <div className="overflow-y-scroll w-full h-[74vh]">
      <PlaceTable/>
    </div>
    </>
  )
}

export default PlacesComponent