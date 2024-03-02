import PlacesDetails from "@/components/places/place.details"
import PlacesWindow from "@/components/windows/Places.window"
import { useEffect } from "react"

const PlacesDetailsPage = () => {
  useEffect(()=> {
    document.title = "Places Details"
  },[])
  return (
    <PlacesWindow>
      <PlacesDetails/>
    </PlacesWindow>
  )
}

export default PlacesDetailsPage