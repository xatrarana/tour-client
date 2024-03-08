import { useEffect, useState } from "react"
import AddDialog from "./Video.Add"
import VideoTable, { Document } from "./Video.table"
import instance from "@/lib/axiosConfig"
import { Loading } from "@/page"

const VideoHome = () => {
  const [videoData, setVideoData] = useState<Document[] | null>(null)
  const getVideoUrlsData = async () => {
    try {
      const response = await instance.get('/videos', {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '5bdb68c9efa67cf69f3425f908'
        }
      })
      setVideoData(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getVideoUrlsData()
  }, [])
  return (
    <div className="">
      <div className=" flex justify-between items-center mb-2">
        <h1 className="text-center text-xl font-semibold lg:sfont-bold lg:text-2xl">URL Links</h1>
        <div className="flex gap-x-2">
          <AddDialog />
        </div>
      </div>
      <div className="scroll-only p-3">
        {!videoData && <Loading/>}
        {videoData && <VideoTable videoData={videoData} />}
       
      </div>
    </div>
  )
}

export default VideoHome