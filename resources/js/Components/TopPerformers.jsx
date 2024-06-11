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
    <div className="p-4">
      <h3 className=" font-bold text-center  text-xl text-gray-500 dark:text-gray-300">
        Top Performers - {currentMonthName} {currentYear}
      </h3>

      {topPerformers.map((performer) => (
        <div
          key={performer.id}
          className="bg-gray-900/50 flex justify-center items-center   rounded-lg my-4 mx-auto "
        >
          <div className=" px-4 py-2 flex gap-5 items-center h-full flex-grow">
            <div className="flex justify-center items-center py-4">
              <img
                src={performer.image_url}
                alt={performer.user_name}
                className="rounded-full  object-cover w-[72px] h-[72px] ring ring-teal-500 ring-offset-[4px] ring-offset-gray-800"
              />
            </div>
            <div className="flex flex-col  text-gray-800 dark:text-gray-200 w-[60%] gap-1 ">
              <div className="flex ">
                <div className="font-bold text-sm">Name: </div>
                <div className="ml-2 text-sm capitalize">
                  {performer.user_name}
                </div>
              </div>
              <div className="flex ">
                <div className="font-bold text-sm text-gray-500">
                  Completed Tasks:
                </div>
                <div className="ml-2 text-sm">
                  {performer.total_completed_tasks}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
