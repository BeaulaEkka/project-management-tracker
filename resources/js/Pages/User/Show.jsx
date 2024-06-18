import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants";
import { ProgressBar } from "@/Components/ProgressBar";
import { ToastContainer, toast } from "react-toastify";

export default function Show({
  auth,
  user,
  queryParams,
  tasks,
  success,
  error,
}) {
  const calculateProgress = (createdAt, dueDate) => {
    const today = new Date().getTime();
    const startDate = new Date(createdAt).getTime();
    const endDate = new Date(dueDate).getTime();

    let progress = Math.max(
      0,
      Math.min(1, (today - startDate) / (endDate - startDate))
    );
    return progress;
  };

  const deleteTask = (task) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    router.delete(route("task.destroy", task.id));
  };

  const notify = () => toast("success");

  useEffect(() => {
    if (success) {
      {
        notify;
      }
      toast.success(success);
    }
  }, [success]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight capitalize">
          {`User: ${user.name}`}
        </h2>
      }
    >
      <Head title={`User "${user.name}"`} />

      <div className="py-8 ">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <ToastContainer />

          <div className="bg-white  dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg ">
            <div className="w-full p-6  text-gray-900 dark:text-gray-100  ">
              <div className="flex gap-5 flex-wrap-reverse justify-between ">
                <div>
                  <div className="grid gap-2 md:grid-cols-2 grid-cols-1 mt-5">
                    <div className="font-bold">User Id :</div>
                    <div>{user.id}</div>
                  </div>

                  <div className="grid gap-2 mt-5 capitalize md:grid-cols-2 grid-cols-1">
                    <div className="font-bold">User Name :</div>
                    <div>{user.name}</div>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2 grid-cols-1 mt-5">
                    <div className="font-bold">Position :</div>
                    <div>{user.position}</div>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2 grid-cols-1 mt-5">
                    <div className="font-bold">Email :</div>
                    <div>{user.email}</div>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2 grid-cols-1 mt-5">
                    <div className="font-bold">Joining Date :</div>
                    <div>{user.joining_date}</div>
                  </div>
                </div>
                <div>
                  <img
                    src={user.image_path}
                    alt={user.name}
                    className="w-64 h-64 object-cover rounded-md "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="flex justify-between px-6 pt-4">
              <h3 className=" text-gray-900 dark:text-gray-100 font-bold text-xl capitalize">
                Tasks Assigned to {user.name}
              </h3>
              <Link
                href={route("task.create", { fromUserPage: true })}
                className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 font-semibold"
              >
                Add New
              </Link>
            </div>

            <div className="p-4 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto rounded-t-md">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-800 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap ">
                      <th className="px-3 py-3">ID</th>
                      <th className="px-3 py-3">Project Name</th>
                      <th className="px-3 py-3 "> Task Name</th>
                      <th className="px-3 py-3 ">Status</th>
                      <th className="px-3 py-3 ">Created On</th>
                      <th className="px-3 py-3 ">Due Date</th>
                      <th className="px-3 py-3 ">Priority</th>
                      <th className="px-3 py-3 ">Timeline</th>
                      <th className="px-3 py-3 ">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.data.map((task) => (
                      <tr
                        key={task.id}
                        className="text-nowwrap hover:bg-emerald-100 dark:hover:bg-slate-600
                        transition-colors duration-300 bg-white border-b dark:bg-gray-800  dark:border-gray-700
                        "
                      >
                        <td className="px-3 py-3 text-gray-600 dark:text-gray-300 ">
                          {task.id}
                        </td>
                        <td className="px-3 py-3 ">
                          <Link
                            href={route("project.show", task.project.id)}
                            className="hover:underline hover:font-semibold text-gray-600 dark:text-gray-300 text-nowrap"
                          >
                            {task.project.name}
                          </Link>
                        </td>
                        <td className="px-3 py-3 capitalize">
                          <Link
                            href={route("task.show", task.id)}
                            className="hover:underline hover:font-semibold text-gray-600 dark:text-gray-300 text-nowrap"
                          >
                            {task.name}
                          </Link>
                        </td>

                        <td className="px-3 py-2 text-nowrap">
                          <span
                            className={
                              "px-2 py-1 rounded text-nowrap text-white " +
                              TASK_STATUS_CLASS_MAP[task.status]
                            }
                          >
                            {TASK_STATUS_TEXT_MAP[task.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-nowrap text-gray-600 dark:text-gray-300">
                          {task.created_at}
                        </td>
                        <td className="px-3 py-2 text-nowrap text-gray-600 dark:text-gray-300">
                          {task.due_date}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          <span
                            className={
                              "px-2 py-1 rounded text-nowrap text-white " +
                              TASK_PRIORITY_CLASS_MAP[task.priority]
                            }
                          >
                            {TASK_PRIORITY_TEXT_MAP[task.priority]}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          <ProgressBar
                            progress={calculateProgress(
                              task.created_at,
                              task.due_date
                            )}
                            status={task.status}
                          />
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          <Link
                            href={`${route(
                              "task.edit",
                              task.id
                            )}?fromUserPage=1`}
                            className="text-blue-600 dark:text-blue-500 hover:underline mx-1"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={(e) => deleteTask(task)}
                            className="text-red-600 dark:text-red-500 hover:underline mx-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
