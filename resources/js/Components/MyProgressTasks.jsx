import React from "react";

export default function MyProgressTasks({
  myInProgressTasks,
  myCompletedTasks,
  myPendingTasks,
  myCreatedTasks,
}) {
  return (
    <div className="flex gap-4 flex-wrap flex-grow">
      <div className="bg-gradient-to-l from-yellow-200 to-amber-300 flex-grow  h-20 rounded-md py-2 px-4  flex flex-col gap-1 justify-center ">
        <h1 className="font-bold text-2xl"> {myCompletedTasks}</h1>
        <h3 className="text-sm text-gray-800"> My Completed Tasks</h3>
      </div>
      {/**inprogress */}
      <div className="bg-gradient-to-l from-cyan-200 to-cyan-300 h-20 rounded-md py-2 px-4 flex flex-col gap-1 justify-center flex-grow">
        <h1 className="font-bold text-2xl"> {myInProgressTasks}</h1>
        <h3 className="text-sm text-gray-800"> My In-Progress Tasks</h3>
      </div>
      {/**pending tasks 2*/}
      <div className="bg-gradient-to-r from-emerald-300 to-emerald-400  flex-grow  h-20 rounded-md py-2 px-4 flex flex-col gap-1 justify-center">
        <h1 className="font-bold text-2xl"> {myPendingTasks}</h1>
        <h3 className="text-sm  text-gray-800"> My Pending Tasks</h3>
      </div>
      {/**mycreated tasks */}
      <div className="bg-gradient-to-l from-red-400 to-rose-300 flex-grow  h-20 rounded-md py-2 px-4 flex flex-col gap-1 justify-center">
        <h1 className="font-bold text-2xl"> {myCreatedTasks}</h1>
        <h3 className="text-sm text-gray-800"> My Created Tasks</h3>
      </div>
    </div>
  );
}
