import React from "react";

export default function MyProgressTasks({
  myInProgressTasks,
  myCompletedTasks,
  myPendingTasks,
  myCreatedTasks
}) {
  return (

      <div className="flex gap-4 flex-wrap">
        <div className="bg-yellow-500/60 flex-grow dark:bg-yellow-300/80 h-20 rounded-md py-2 px-4  flex flex-col gap-1 justify-center ">
          <h1 className="font-bold text-2xl"> {myCompletedTasks}</h1>
          <h3 className="text-sm text-gray-800">
            {" "}
            My Completed Tasks
          </h3>
        </div>
        {/**inprogress */}
        <div className="bg-cyan-500/60  dark:bg-cyan-400/70 h-20 rounded-md py-2 px-4 flex flex-col gap-1 justify-center flex-grow">
          <h1 className="font-bold text-2xl"> {myInProgressTasks}</h1>
          <h3 className="text-sm text-gray-800">
            {" "}
            My In-Progress Tasks
          </h3>
        </div>
        {/**pending tasks 2*/}
        <div className="bg-emerald-500/80 flex-grow dark:bg-emerald-400/70 h-20 rounded-md py-2 px-4 flex flex-col gap-1 justify-center">
          <h1 className="font-bold text-2xl"> {myPendingTasks}</h1>
          <h3 className="text-sm  text-gray-800">
            {" "}
            My Pending Tasks
          </h3>
        </div>
        {/**mycreated tasks */}
        <div className="bg-rose-400/80 flex-grow dark:bg-rose-400/60 h-20 rounded-md py-2 px-4 flex flex-col gap-1 justify-center">
          <h1 className="font-bold text-2xl"> {myCreatedTasks}</h1>
          <h3 className="text-sm text-gray-800">
            {" "}
            My Created Tasks
          </h3>
        </div>
      </div>

  );
}
