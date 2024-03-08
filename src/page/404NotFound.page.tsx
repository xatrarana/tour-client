import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type NotFoundProps = {
  style?: React.CSSProperties,
  height?: string,
  message?: string
}
const NotFound = ({style, height= 'h-screen', message}: NotFoundProps) => {
  const navigate = useNavigate()
    return (
      <div className="flex flex-col">
      <div style={style} className={`${height} flex flex-col gap-5 md:gap-3  md:flex-row items-center justify-center`}>
        <span className=" text-5xl md:text-9xl font-bold"> 404 </span>
        <span className=" h-20 bg-white w-1 mx-10 hidden md:block"></span>
        <div className=" flex flex-col gap-y-3">
        <p className="text-md md:text-xl font-semibold">{message ?? 'The resource you are looking for does not exist.'}</p>
        <Button onClick={() => navigate(-1)} className="font-semibold">Go Back</Button>
        </div>
      </div>
    
      </div>
    );
  };
  
  export default NotFound;
  