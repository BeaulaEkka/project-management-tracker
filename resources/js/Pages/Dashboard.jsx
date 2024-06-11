import PieChartComponent from "@/Components/PieChartComponent";
import { TopPerformers } from "@/Components/TopPerformers";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
  auth,
  myPendingTasks,
  myCompletedTasks,
  myInProgressTasks,
  pieData,
  myCreatedTasks,
  activeTasks,
  activeTaskCount,
  topPerformers,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Dashboard
          </h2>
        </div>
      }
    >
      <Head title="Dashboard" />

      <div className="pb-10">
        <div className=" flex justify-between max-w-7xl mx-auto px-10 lg:px-8 py-6 ">
          <div className="text-gray-800 dark:text-gray-200 ">
            <div className="mb-5 capitalize">
              <p className="text-gray-500 text-md">Hello, {auth.user.name}!</p>
            </div>
            <h1 className="font-bold text-xl  text-gray-800 dark:text-gray-400 capitalize">
              You have {myInProgressTasks + myPendingTasks} tasks to do!
            </h1>
          </div>
          <div className=" lg:col-span-2 gap-2 flex">
            <div className="flex flex-col justify-center align-middle ml-8">
              <p className="text-xl font-bold text-gray-800 dark:text-gray-400 capitalize">
                {auth.user.name}
              </p>
              <p className="text-md text-gray-600 dark:text-gray-600">
                {auth.user.position}
              </p>
            </div>
            <div className="flex flex-col justify-center align-middle ml-5">
              {auth.image_url && (
                <img
                  src={auth.image_url}
                  alt="User Profile"
                  className="rounded-full mr-4 w-24 h-24 object-cover ring ring-cyan-500 ring-offset-[4px] ring-offset-gray-900"
                />
              )}
            </div>
          </div>
        </div>
        {/**pie box */}
        <div className="max-w-7xl px-8 mx-auto  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-rows-1 sm:grid-rows-2 lg:grid-rows-2 gap-4 wrap ">
          <div className="bg-white dark:bg-gray-800 relative  overflow-hidden shadow-sm sm:rounded-lg lg:col-span-2 lg:h-[537px]">
            <PieChartComponent data={pieData} />
          </div>

          <div className="flex flex-col gap-4 lg:h-[537px] ">
            <div className="bg-white dark:bg-gray-800 relative  overflow-hidden shadow-sm sm:rounded-lg flex-grow h-full">
              <div className="bg-teal-600 w-1 h-full absolute"></div>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex justify-between text-wrap text-left">
                <div>
                  <p className=" text-lg font-semibold text-teal-300">
                    My Completed Tasks
                  </p>
                  <p className="mt-4 text-gray-300 text-xl font-bold">
                    {myCompletedTasks}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 relative  overflow-hidden shadow-sm sm:rounded-lg flex-grow h-full  ">
              <div className="bg-cyan-400 w-1 h-full absolute"></div>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex justify-between text-wrap text-left">
                <div>
                  <p className=" text-lg font-semibold text-cyan-400">
                    My In-Progress Tasks
                  </p>
                  <p className="mt-4 text-gray-300 text-xl font-bold">
                    {myInProgressTasks}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 relative  overflow-hidden shadow-sm sm:rounded-lg flex-grow h-full  ">
              <div className="bg-rose-400 w-1 h-full absolute"></div>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex justify-between text-wrap text-left">
                <div>
                  <p className=" text-lg font-semibold text-rose-400">
                    My Pending Tasks
                  </p>
                  <p className="mt-4 text-gray-300 text-xl font-bold">
                    {myPendingTasks}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 relative  overflow-hidden shadow-sm sm:rounded-lg flex-grow h-full ">
              <div className="bg-violet-400 w-1 h-full absolute"></div>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex justify-between text-wrap text-left">
                <div>
                  <p className=" text-lg font-semibold text-violet-400">
                    My Created Tasks
                  </p>
                  <p className="mt-4 text-gray-300 text-xl font-bold">
                    {myCreatedTasks}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 relative  overflow-hidden shadow-sm sm:rounded-lg lg:h-[537px] ">
            <TopPerformers topPerformers={topPerformers} />
          </div>

          <div className="bg-white p-6 dark:bg-gray-800 relative overflow-hidden shadow-sm rounded-lg lg:col-span-4 lg:h-[337px]">
            <div className="overflow-auto">
              {activeTaskCount > 0 ? (
                <>
                  <h3 className=" text-gray-500 dark:text-gray-300 text-xl font-semibold flex justify-center mb-2">
                    My Active Tasks
                  </h3>
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                      <tr>
                        <th>ID</th>
                        <th>Project Name</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeTasks.data.map((task) => (
                        <tr key={task.id} className="hover:bg-gray-700/40">
                          <td className="px-3 py-2">{task.id}</td>
                          <td className="px-3 py-2 text-white hover:underline text-nowrap">
                            <Link href={route("project.show", task.project.id)}>
                              {task.project.name}
                            </Link>
                          </td>
                          <td className="px-3 py-2 text-white hover:underline text-nowrap">
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
                          <td className="px-3 py-2 text-nowrap">
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
                        Hurray !! You are all caught up. You have completed all
                        your tasks.
                      </h2>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
