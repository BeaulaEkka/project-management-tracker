import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Link } from "@inertiajs/react";
import React from "react";

export default function MyActiveTasks({ activeTasks, activeTaskCount }) {
  return (
    // <div className=" h-full rounded-md col-span-8">
    <div className="bg-white p-4 dark:bg-gray-800 relative overflow-hidden shadow-sm rounded-lg col-span-8 lg:h-[237px]">
      <div className="overflow-auto col-span-8">
        {activeTaskCount > 0 ? (
          <>
            <h3 className=" text-gray-300 dark:text-gray-300 text-md  font-semibold flex justify-center  bg-gray-800 p-1 rounded-t-md ">
              My Active Tasks
            </h3>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 pb-5">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  border-gray-500">
                <tr className="bg-emerald-400 dark:bg-gray-700">
                  <th className="pl-4 py-1">ID</th>
                  <th className="pl-4">Project Name</th>
                  <th className="pl-4">Name</th>
                  <th className="pl-4">Status</th>
                  <th className="pl-4">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {activeTasks.data.map((task, index) => (
                  <tr
                    key={task.id}
                    className={`hover:bg-emerald-200 hover:dark:bg-gray-700 ${
                      index % 2 === 0
                        ? "bg-emerald-100 dark:bg-gray-700/25"
                        : "bg-emerald-50 dark:bg-gray-800/25"
                    }`}
                  >
                    <td className="px-3 py-2 text-gray-700 dark:text-gray-400">
                      {task.id}
                    </td>
                    <td className="px-3 py-2 text-gray-700 dark:text-gray-400 hover:underline text-nowrap">
                      <Link href={route("project.show", task.project.id)}>
                        {task.project.name}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-gray-700 dark:text-gray-400 hover:underline text-nowrap">
                      <Link href={route("task.show", task.id)}>
                        {task.name}
                      </Link>
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={
                          "px-2 py-1 rounded text-nowrap text-white " +
                          TASK_STATUS_CLASS_MAP[task.status]
                        }
                      >
                        {TASK_STATUS_TEXT_MAP[task.status]}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-nowrap text-gray-700 dark:text-gray-400">
                      {task.due_date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div className=" h-[100%] ">
            <div className="text-gray-500 font-bold text-xl w-full h-full dark:text-gray-400 text-center flex justify-center items-center flex-cols-1">
              <div>
                <h2>
                  Hurray !! You are all caught up. You have completed all your
                  tasks.
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    // </div>
  );
}
