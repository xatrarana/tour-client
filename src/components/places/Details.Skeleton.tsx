const DetailsSkeleton = () => {

    return (
        <>
            <div className=" grid md:grid-cols-2 px-1 md:px-4 py-2">
                <div className="md:px-2 flex flex-col gap-y-5">
                    <div className="skeleton w-full h-64"></div>
                   <div className="flex gap-x-4">
                   <div className="skeleton w-16 h-14"></div>
                    <div className="skeleton w-16 h-14"></div>
                   </div>
                </div>
                <div className="md:pl-5 mt-2 ">
                <div className="skeleton h-4 w-32"></div>
                <div className="flex gap-x-2 mt-5">
                    <div className="skeleton h-4 w-7"></div>
                    <div className="skeleton h-4 w-7"></div>
                    <div className="skeleton h-4 w-7"></div>

                </div>
                <div className="mt-2 md:mt-5 text-justify flex flex-col gap-y-3">
                    <div className="skeleton h-2 w-4/6"></div>
                    <div className="skeleton h-2 w-4/6"></div>
                </div>
                <div className="grid grid-cols-2 mt-5 place-content-center">
                    <div className="skeleton h-4 w-16"></div>
                    <div className="skeleton h-4 w-16"></div>
                </div>

            </div>
            </div>
            
        </>
    )
}

export default DetailsSkeleton