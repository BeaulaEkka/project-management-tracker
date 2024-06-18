import React from "react";

export const TopPerformers = ({ topPerformers }) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const currentMonthIndex = new Date().getMonth();
  const currentMonthName = monthNames[currentMonthIndex];
  const currentYear = currentDate.getFullYear();

  return (
    <div className="p-2">
      <h3 className=" font-bold text-center  text-md text-gray-500 dark:text-gray-300 py-2 ">
        Top Performers - {currentMonthName} {currentYear}
      </h3>
      <div className="flex flex-wrap lg:h-[325px] ">
        {topPerformers.map((performer) => (
          <div
            key={performer.id}
            className="dark:bg-gray-900/50 bg-gray-100  flex flex-wrap items-center rounded-lg my-2 mx-2 shadow-sm flex-grow "
          >
            <div className="px-4 py-2 flex gap-2 items-center flex-grow justify-between ">
              <div className="flex justify-center items-center w-[71px] h-[71px]  ">
                <img
                  src={performer.image_url}
                  alt={performer.user_name}
                  className="rounded-full object-cover  ring-2 ring-cyan-400 ring-offset-[3px] dark:ring-offset-gray-800 "
                />
              </div>
              <div className="flex flex-col  text-gray-800 dark:text-gray-200 w-full gap-1 text-sm ml-4">
                <div className="flex flex-wrap">
                  <div className="capitalize text-lg font-bold  ">
                    {performer.user_name}
                  </div>
                </div>

                <div className="flex text-sm  text-gray-800 dark:text-gray-200">
                  <div className="font-bold  ">Total Tasks:</div>
                  <div className="ml-2 ">{performer.total_completed_tasks}</div>
                </div>
              </div>
              <div className="text-emerald-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
