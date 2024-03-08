import instance from "@/lib/axiosConfig"

export const getVideoUrlsData = async () => {
    try {
        const response = await instance.get('/videos',{
            headers:{
                'Content-Type': 'application/json',
                'x-api-key': '5bdb68c9efa67cf69f3425f908'
            }
        })
        return response.data.data
    } catch (error) {
        console.log(error)
    }
}