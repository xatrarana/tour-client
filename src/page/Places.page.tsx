import PlacesHome from "@/components/places/place.home"
import PlacesWindow from "@/components/windows/Places.window"
import { useEffect } from "react"

const PlacesPage = () => {
  useEffect(()=> {
    document.title = "Places"
  },[])
  return (
    <PlacesWindow>
      <PlacesHome/>
    </PlacesWindow>
  )
}

export default PlacesPage