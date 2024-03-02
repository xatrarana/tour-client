import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

type PlaceButtonProps = {
  icon: JSX.Element,
  title: string,
  action?: JSX.Element
}

const PlaceActionButton = ({title, icon, action}:PlaceButtonProps) => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className='flex gap-x-2 mr-4'>
        {icon}
        {title}
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
     {action}
    </DialogContent>
  </Dialog>
  )
}

export default PlaceActionButton