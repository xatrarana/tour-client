import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

import * as yup from 'yup'
import { useToast } from "../ui/use-toast"
import { useEffect, useState } from "react"
import axios, { isAxiosError } from "axios"
import instance, { cancelTokenSource } from "@/lib/axiosConfig"
const URL_REGEX = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

const VideoFormSchema = yup.object({
    title: yup.string().trim().required("Title is required."),
    url: yup.string().matches(URL_REGEX, 'Enter a Valid url.')
})


type TVideoFormSchema = yup.InferType<typeof VideoFormSchema>;


export default function AddDialog() {
    const [progress, setProgress] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<TVideoFormSchema>({
        resolver: yupResolver(VideoFormSchema)
    })
    const { toast } = useToast()
    const onSubmit = async (data: TVideoFormSchema) => {
        setProgress(true)
        try {
            const response = await instance.post('/videos/upload/link', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '5bdb68c9efa67cf69f3425f908'
                },
                cancelToken: cancelTokenSource.token
            })
            toast({ variant: 'success', title: response.data.message })
            setProgress(false);
            setTimeout(() => window.location.reload(), 500)
        } catch (error) {
            setProgress(false)
            if (isAxiosError(error)) {
                toast({ variant: 'destructive', title: error.response?.data.error })
            }else if(axios.isCancel(error)){
                toast({variant:'destructive', title:'Request canceled', description:error.message})
              }
        }finally{
            setProgress(false)
        }
    };
    useEffect(() => {
        document.title = "Uploads Links"
        const errorMessage = `${errors.title?.message || ''} ${errors.url?.message || ''}`.trim();

        if (errorMessage) {
            toast({ variant: "destructive", title: "Invalid Action", description: errorMessage });
        }
    }, [errors.title, errors.url]);
    const handleCancel = () => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel('Operation canceled by the user.');
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Upload Video URL</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Video Url</DialogTitle>
                    <DialogDescription>
                        Upload the video url. Click upload when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                    <div className="flex flex-col mt-2 gap-y-4">
                        <Label htmlFor="title">Title</Label>
                        <Input {...register('title')} id="title" type="text" disabled={progress} />
                    </div>
                    <div className="flex flex-col mt-2 gap-y-4">
                        <Label htmlFor="url">Video Link</Label>
                        <Input {...register('url')} id="url" type="string" disabled={progress} />
                    </div>

                   { !progress && (
                     <Button type="submit" className="mt-2">
                     Upload
                 </Button>
                   )}
                    {
                        progress && (
                            <div className="flex gap-x-3 items-center my-5">
                        <progress className="progress w-4/5"></progress>
                        <p onClick={handleCancel} className=" cursor-pointer tracking-wide text-md">
                            cancel
                        </p>
                    </div>
                        )
                    }
                </form>
            </DialogContent>

        </Dialog>
    )
}
