import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { PlusCircle } from "lucide-react"
import PlaceCreateForm from './place.form'


const CreatePlace = () => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className='flex gap-x-2'>
        <PlusCircle/>
        Add Place
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
     <PlaceCreateForm/>
    </DialogContent>
  </Dialog>
  )
}

export default CreatePlace