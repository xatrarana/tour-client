import { Link, useSearchParams } from "react-router-dom"
import NotFound from "@/page/404NotFound.page";
import { Map, Navigation, Pencil, Star } from "lucide-react";
import { useEffect, useState } from "react";
import PlaceActionButton from "./place.create";
import PlaceUpdateForm from "./place.updateForm";
import instance from "@/lib/axiosConfig";
import { AxiosError } from "axios";
import DetailsSkeleton from "./Details.Skeleton";
import AlertDialogContainer from "./confirm.Dialog";
import { TPlaceResponse } from "@/context/DataContext";

const IMAGEWIDTH = '95%'
const PlacesDetails = () => {
  const [searchParams] = useSearchParams();
  const [place, setPlaceData] = useState<TPlaceResponse | null>(null); 
  const [error, setError] = useState({state:false, message:''});
  const [url, setSrcUrl] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleImageLoad = () => setImageLoaded(true);
 
  const itemId = searchParams.get('Iv');

  useEffect(() => {
    async function getPlaceById() {
      try {
        const response = await instance.get<TPlaceResponse,any>(`/places/${itemId}`);
        setPlaceData(response.data.data);
      } catch (error) {
        if(error instanceof AxiosError){
          setError({
            ...error,
            state: true,
            message: error.response?.data.error
          })
        }
        
      }
    }

    if (itemId) {
      getPlaceById();
    } else {
      console.error("No itemId provided in URL search params");
    }
  }, [itemId]);


  return (
    <>
      <div className=" flex flex-col md:flex-row  justify-between items-center">
        <h1 className="text-center text-xl font-semibold lg:sfont-bold lg:text-2xl">Place Details</h1>
        <div className="mt-3 md:mt-0 flex">
        <PlaceActionButton icon={<Pencil />} action={<PlaceUpdateForm  payload={place}/>} title= {"Update Place"} />
          
          <AlertDialogContainer path={`/places/${itemId}/clear`} redirect={'/places'} />
        </div>
      </div>
      
        {!place && !error && <DetailsSkeleton/>}
        {
          error.state && <NotFound height="h-40" message={error.message} />
        }

     {place && (
       <div className=" grid md:grid-cols-2 px-1 md:px-4 py-2">
       <div className="md:px-2">
       {!imageLoaded && ( 
       <div className="h-48 md:h-64 lg:h-80 animate-pulse bg-gray-500 rounded-md"></div>
     )}
         <img className="rounded-md h-48 md:h-64 lg:h-80" style={{
           width:IMAGEWIDTH
         }} src={url ?? place?.thumbnail}
         alt="thumbnail"
         onLoad={handleImageLoad}
         />
         <div className="flex gap-x-5 mt-4 overflow-x-auto scroll-place-details">
 {place && place?.images.map((imageUrl: string, index: number) => (
   <span
   key={index}
   onClick={() => setSrcUrl(imageUrl)}
   className=" cursor-pointer"
   >
      {!imageLoaded && (
       <div className="h-10 animate-pulse bg-gray-500 rounded-md"></div>
     )}
     <img
     style={{
       height: 50,
       width: 70,
       borderRadius: '0.3rem',
       flex: '0 0 auto' 
     }}
     src={imageUrl}
     alt={`Image ${index}`} 
     onLoad={handleImageLoad}
   />
   </span>
 ))}
</div>

       </div>
       <div className="md:pl-5 mt-2">
         <h1 className="text-2xl font-bold tracking-wide">{place?.title}</h1>
         <div className="flex gap-x-2">
           <span className="badge mt-2">{place?.category}</span>
           <span className="badge mt-2">{place?.wardno}</span>
           <span className="badge mt-2 flex items-center justify-center gap-x-1 py-1"> <Star size={17} /> {place?.totalRating}</span>
         </div>
         <div className="mt-2 md:mt-5 text-justify">
           <p>{place?.description}</p>
         </div>
       <div className="grid grid-cols-2 mt-3 place-content-center">
           <span className="flex items-center  justify-center gap-x-2"><Map /><p>{place?.location}</p></span>
           <Link target="_blank" to={`http://www.google.com/maps/place/${place.points.coordinates[0]},${place.points.coordinates[1]}`} className="flex items-center  justify-center gap-x-2"><Navigation /><p>Go to Maps</p></Link>
       </div>
      
       </div>
     </div>
     )}
    </>
  )
}

export default PlacesDetails