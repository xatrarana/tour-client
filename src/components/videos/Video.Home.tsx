import AddDialog from "./Video.Add"
import VideoTable from "./Video.table"

const VideoHome = () => {
  return (
    <div className="flex flex-col">
      <div className=" flex justify-between items-center mb-2">
        <h1 className="text-center text-xl font-semibold lg:sfont-bold lg:text-2xl">URL Links</h1>
        <div className="flex gap-x-2">
          <AddDialog />
        </div>
      </div>
      <div className="scroll-only flex-1 py-2">
         <VideoTable/> 
      </div>
    </div>
  )
}

export default VideoHome