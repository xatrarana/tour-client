import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import * as yup from "yup";
import PlaceCategory from "@/constants/PlaceCategoryEnum";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import instance, { cancelTokenSource } from "@/lib/axiosConfig";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import success from '../../assets/success.svg'

const PlaceFormSchema = yup.object().shape({
  title: yup.string().trim().required(),
  description: yup.string().required(),
  location: yup.string().required(),
  longitude: yup
    .number()
    .required()
    .transform((originalValue) => parseFloat(originalValue)) 
    .typeError('Longitude must be a number'), 
  latitude: yup
    .number()
    .required()
    .transform(( originalValue) => parseFloat(originalValue)) 
    .typeError('Latitude must be a number'), 
  wardno: yup.string().required(),
  category: yup.string().oneOf(Object.values(PlaceCategory)).required(),
  images: yup
    .mixed()
    .required("Image is required")
    .test(
      "imageType",
      "Invalid image type",
      (value: any) => {
        if (!value || Object.keys(value).length === 0) return false;
        const fileKeys = Object.keys(value);
        return fileKeys.every((key: string) =>
          ["image/jpeg", "image/png", "image/gif"].includes(value[key].type)
        );
      }
    )
    .test(
      "imageSize",
      "Image must be less than 2MB",
      (value: any) => {
        if (!value || Object.keys(value).length === 0) return false;
        const fileKeys = Object.keys(value);
        return fileKeys.every((key: string) => value[key].size <= 2 * 1024 * 1024); // 2MB in bytes
      }
    ),
  thumbnail: yup
    .mixed()
    .required("Thumbnail is required")
    .test(
      "thumbnailType",
      "Invalid thumbnail type",
      (value: any) => {
        if (!value || value.length === 0) return false;
        return ["image/jpeg", "image/png"].includes(value[0].type);
      }
    )
    .test(
      "thumbnailSize",
      "Thumbnail must be less than 3MB",
      (value: any) => {
        if (!value || value.length === 0) return false;
        return value[0].size <= 3 * 1024 * 1024; // 500KB in bytes
      }
    ),
});

type TPlaceFormData = yup.InferType<typeof PlaceFormSchema>;
const PlaceCreateForm = () => {
  const [progress, setProgress] = useState(false)
  const [dialog, setDialogBox] = useState(false)
  const {toast} = useToast()
  const { register, handleSubmit ,formState: {errors}} = useForm<TPlaceFormData>({
    resolver: yupResolver(PlaceFormSchema),
  });
  const handleCancel = () => {
    if (cancelTokenSource) {
        cancelTokenSource.cancel('Operation canceled by the user.');
    }
};

  const onSubmit = async (data: TPlaceFormData) => {
    setProgress(true)
    try {
      const formData = new FormData();
      // Append text fields to FormData
      Object.entries(data).forEach(([key, value]) => {
          if (typeof value === 'string' || typeof value === 'number') {
              formData.append(key, value.toString());
          }
      });
      // Append files to FormData
      if (data.thumbnail instanceof FileList) {
          formData.append('thumbnail', data.thumbnail[0]);
      }
      if (data.images instanceof FileList) {
          for (let i = 0; i < data.images.length; i++) {
              formData.append('images', data.images[i]);
          }
      }
      await instance.post('/places/create', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          cancelToken: cancelTokenSource.token
      });
      setProgress(false)
      setDialogBox(true);
      setTimeout(() => {
        setDialogBox(false);
        window.location.reload()
      },1000)
  } catch (error) {
    setProgress(false)
      if (error instanceof AxiosError) {
          toast({variant:'destructive', title: error.response?.data})
      }else if(axios.isCancel(error)){
        toast({variant:'destructive', title:'Request canceled', description:error.message})
      }
  }finally{
    setProgress(false)
  }
  };


 
  return (
    
    <>
   {progress &&  (
    <div className="flex gap-x-3 items-center my-5">
      <progress className="progress w-4/5"></progress>
      <p  onClick={handleCancel} className=" cursor-pointer tracking-wide text-md">
    cancel
  </p>
    </div>
   )}
   {
    !progress && dialog && (<div className="flex gap-x-5 items-center ">
      <img className="h-5 w-5" src={success} alt="success"/>
      <p>Place created successfully.</p>
    </div>)
   }
    {!progress && !dialog && (
      <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      className="max-w-md "
    >
      <div className="mb-2">
        <Label htmlFor="title" className="block font-semibold text-gray-700 dark:text-white mb-2">
          Title
        </Label>
        <Input
          type="text"
          {...register("title")}
          placeholder=""
          id="title"
          className="mt-1 p-2 w-full border rounded-lg"
        />
      </div>

      <div className="mb-2">
        <Label
          htmlFor="description"
          className="block font-semibold text-gray-700 dark:text-white mb-2"
        >
          Description
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder=""
          aria-placeholder=""
          className="mt-1 p-2 w-full border rounded-lg"
        ></Textarea>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-2">
          <Label
            htmlFor="location"
            className="block font-semibold text-gray-700 dark:text-white mb-2"
          >
            Location
          </Label>
          <Input
            type="text"
            id="location"
            {...register("location")}
            placeholder=""
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>

        <div className="mb-2">
          <Label htmlFor="wardno" className="block font-semibold text-gray-700 dark:text-white mb-2">
            Ward no
          </Label>
          <Input
            type="number"
            id="wardno"
            {...register("wardno")}
            placeholder=""
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-2">
          <Label
            htmlFor="latitude"
            className="block font-semibold text-gray-700 dark:text-white mb-2"
          >
            Latitude
          </Label>
          <Input
            type='string'
            id="latitude"
            {...register("latitude")}
            placeholder=""
            className="mt-1 p-2 w-full border rounded-lg"
          />
          <span className="text-red-500 text-xs">{errors && errors.latitude?.message}</span>
        </div>

        <div className="mb-2">
          <Label
            htmlFor="longitude"
            className="block font-semibold text-gray-700 dark:text-white mb-2"
          >
            Longitude
          </Label>
          <Input
            type="string"
            id="longitude"
            {...register("longitude")}
            placeholder=""
            className="mt-1 p-2 w-full border rounded-lg"
          />
          <span className="text-red-500 text-xs">{errors && errors.longitude?.message}</span>
        </div>
      </div>
      <div className="mb-2">
        <Label
          htmlFor="category"
          className="block font-semibold text-gray-700 mb-2 dark:text-white"
        >
          Category
        </Label>
        <select id="category" {...register('category')}  className="mt-1 p-2 w-full border dark:bg-black rounded-lg">
           <option value="">Select category</option>
           {
                Object.values(PlaceCategory).map((category) => (
                <option value={category} key={category}>{category}</option>
                ))
           }
          </select>
      </div>

      <div className="mb-2">
        <Label
          htmlFor="thumbnail"
          className="block font-semibold text-gray-700 dark:text-white mb-2"
        >
          Thumbnail
        </Label>
        <Input
          id="thumbnail"
          type="file"
          accept="image/*"
          {...register("thumbnail")}
          className="file-Input file-Input-bordered w-full "
        />
        <span className="text-red-500 text-xs">{errors && errors.thumbnail?.message}</span>
      </div>
      <div className="mb-2">
        <Label
          htmlFor="images"
          className="block font-semibold text-gray-700 dark:text-white mb-2"
        >
          Images
        </Label>
        <Input
          type="file"
          id="images"
          {...register("images")}
          accept="image/*"
          multiple
          className="file-Input file-Input-bordered w-full "
        />
        <span className="text-red-500 text-xs">{errors && errors.images?.message}</span>
      </div>
      <div className="flex gap-x-1 justify-end mt-3">
        <div className="flex justify-end gap-x-4">
          <Button type="submit" className=" tracking-wide px-7">
            Create
          </Button>
        </div>
      </div>
    </form>
    )}
    </>
  );
};

export default PlaceCreateForm;
