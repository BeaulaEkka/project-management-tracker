import { Link, usePage } from "@inertiajs/react";

export default function Guest({ children }) {
  const { desktop7 } = usePage().props;
  return (
    <div className="min-h-screen w-full flex items-center justify-center  sm:pt-0 bg-gradient-to-tr from-gray-900 to-emerald-600">
      <div className="bg-white lg:w-[850px] w-[80%] md:w-[60%]  shadow-md overflow-hidden rounded-lg  flex gap-4 flex-wrap justify-between">
        <div className="flex items-center justify-center self-center bg-cover lg:w-[45%] md:w-[60%]  mx-auto">
          <Link href="/">
            <div className="w-full flex  flex-col justify-center items-center  self-center flex-grow">
              <img
                src={desktop7}
                alt="login page image"
                className="self-center"
              />
              <p className=" mt-2 text-emerald-700 md:text-lg text-md font-black px-8 text-center">
                Laravel Project Management Tracker
              </p>
            </div>
          </Link>
        </div>

        <div className="lg:w-[50%] w-[100%]  mt-6 px-6 py-4 bg-white   overflow-hidden  ">
          <h1 className=" text-emerald-600 font-black text-4xl mb-2 ml-4 ">
            Welcome
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
}
