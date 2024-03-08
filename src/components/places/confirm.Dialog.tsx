import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import instance from "@/lib/axiosConfig"
import { AxiosError } from "axios"
import { Trash2 } from "lucide-react"
import { useToast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"
  
type props = {
    placeId: string | null
}
const AlertDialogContainer: React.FC<props> = ( {placeId}) => {
    const {toast} = useToast()
    const navigate = useNavigate()
    const handleActionDelete = async () => {
        try {
            const response = await instance.delete(`/places/${placeId}/clear`);
            toast({variant: "success", title: response.data.message})
            navigate('/places')
        } catch (error) {
            if(error instanceof AxiosError){
                toast({variant: "destructive", title: error.response?.data.error})
            }
        }
    }
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button variant={'destructive'} className="flex gap-x-2">
          <Trash2 /> Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete 
              place and remove place data from servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleActionDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
export default  AlertDialogContainer