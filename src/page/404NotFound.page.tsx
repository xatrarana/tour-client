const NotFound = () => {
    return (
      <div className="h-screen flex flex-col gap-5 md:gap-3  md:flex-row items-center justify-center">
        <span className=" text-5xl md:text-9xl font-bold"> 404 </span>
        <span className=" h-20 bg-white w-1 mx-10 hidden md:block"></span>
        <div className="">
        <p className="text-md md:text-xl font-semibold">The page you are looking for does not exist.</p>
        </div>
      </div>
    );
  };
  
  export default NotFound;
  