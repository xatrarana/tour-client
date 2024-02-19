import { Calendar, MapPinned, VideoIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const FeaturedWindow = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className='md:mt-2 lg:mt-2'>
        <h1 className='text-2xl font-bold'>Featured</h1>
    </div>
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-7 '>
      {/* Create a Place */}
      <div className="border border-gray-400 rounded-md flex p-4">
        <div className='p-2'>
          <MapPinned size={22}/>
        </div>
        <div className='flex flex-col w-full gap-y-4 p-2'>
        <p>Build your app's space</p>
        <Button className='py-5 px-7' onClick={()=>navigate('/places')}>Manage Places</Button>
        </div>
      </div>

      {/* Manage Events */}
      <div className="border border-gray-400 rounded-md flex p-4">
        <div className='p-2'>
          <Calendar size={22}  />
        </div>
        <div className='flex flex-col w-full gap-y-4 p-2'>
        <p>Organize engaging events</p>
          <Button className='py-5 px-7'>Manage Events</Button>
        </div>
      </div>

      {/* Upload Videos */}
      <div className="border border-gray-400 rounded-md flex p-4">
        <div className='p-2'>
          <VideoIcon size={22}  /> 
        </div>
        <div className='flex flex-col w-full  gap-y-4 p-2'>
        <p>Showcase with video content</p>
          <Button className='py-5 px-7'>Upload Video</Button>
        </div>
      </div>
    </div>
    </>
  );
};

export default FeaturedWindow;
