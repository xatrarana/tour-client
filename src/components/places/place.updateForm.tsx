import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import * as yup from "yup";
import PlaceCategory from "@/constants/PlaceCategoryEnum";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { TPlace } from "@/mockdata";

const PlaceFormSchema = yup.object().shape({
  title: yup.string().trim().required(),
  description: yup.string().required(),
  location: yup.string().required(),
  longitude: yup
    .number()
    .required()
    .transform((value, originalValue) => parseFloat(originalValue)) 
    .typeError('Longitude must be a number'), 
  latitude: yup
    .number()
    .required()
    .transform((value, originalValue) => parseFloat(originalValue)) 
    .typeError('Latitude must be a number'), 
  wardno: yup.string().required(),
  category: yup.string().oneOf(Object.values(PlaceCategory)).required(),
  
});

type TPlaceFormData = yup.InferType<typeof PlaceFormSchema>;

type TPayload = {
    payload: TPlace
}
const PlaceUpdateForm = ({payload}: TPayload) => {
  const { register, handleSubmit ,formState: {errors}} = useForm<TPlaceFormData>({
    resolver: yupResolver(PlaceFormSchema),
    defaultValues:{
        title: payload.title,
        description: payload.description,
        category:payload.category,
        location: payload.location,
        wardno: payload.wardno,
        longitude: payload.points.coordinates[1],
        latitude: payload.points.coordinates[0],
    }
    
  });

  const onSubmit = (data: TPlaceFormData) => {
    console.log(data);
  };


 
  return (
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
          rows={7}
          aria-placeholder="description"
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
            type="string"
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

      <div className="flex gap-x-1 justify-end mt-3">
        <div className="flex justify-end">
          <Button type="submit" className=" tracking-wide px-7">
            update
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PlaceUpdateForm;
