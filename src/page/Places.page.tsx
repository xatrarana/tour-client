import PlacesWindow from "@/components/windows/Places.window"
import { useEffect } from "react"

const PlacesPage = () => {
  useEffect(()=> {
    document.title = "Places"
  },[])
  return (
    <PlacesWindow/>
  )
}

export default PlacesPage