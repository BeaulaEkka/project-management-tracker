import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants";
import RandomBackground from "@/Components/RandomBackground";

export default function Show({ auth, task, users, queryParams, success }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight capitalize">
            {`Task: ${task.name}`}
          </h2>
          <Link
            href={route("task.edit", task.id)}
            className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 font-semibold text-nowrap"
          >
            Edit Task
          </Link>
        </div>
      }
    >
      <Head title={`Task "${task.name}"`} />
      {/* <pre>{JSON.stringify(task)}</pre> */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="relative">
                <RandomBackground
                  project={task}
                  shape="rectangle"
                  width="100%"
                  height="250px"
                />
                <span className="absolute top-[40%] left-1/2 transform -translate-x-1/2 lg:text-4xl text-lg px-4 capitalize  bg-black/50 rounded-md py-4 text-center font-bold">
                  {task.name}
                </span>
              </div>

              <p className=" mt-5">{task.description}</p>
              <div className="grid gap-8 lg:grid-cols-2 grid-cols-1 ">
                <div className=" mt-5">
                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Task Id :</div>
                    <div>{task.id}</div>
                  </div>

                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Task Name :</div>
                    <div>{task.name}</div>
                  </div>

                  <div className="grid gap-2 grid-cols-2 mt-5 text-nowrap">
                    <div className="font-bold">Task Status :</div>
                    <div
                      className={
                        "px-3 py-1 rounded text-white font-bold capitalize " +
                        TASK_STATUS_CLASS_MAP[task.status]
                      }
                    >
                      {TASK_STATUS_TEXT_MAP[task.status] || "Unknown Status"}
                    </div>
                  </div>
                  {/**priority */}
                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Task Priority :</div>
                    <div
                      className={
                        "px-3 py-1 rounded text-white font-bold capitalize " +
                        TASK_PRIORITY_CLASS_MAP[task.priority]
                      }
                    >
                      {TASK_PRIORITY_TEXT_MAP[task.priority] ||
                        "Unknown Status"}
                    </div>
                  </div>
                  {/**createdby */}
                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Created By :</div>
                    <div className="capitalize">
                      <Link
                        href={route("user.show", task.updatedBy.id)}
                        className="hover:font-bold hover:underline hover:text-orange-400"
                      >
                        {task.createdBy.name}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className=" mt-5">
                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Project :</div>
                    <div className="hover:font-bold hover:underline hover:text-orange-400">
                      <Link href={route("project.show", task.project.id)}>
                        {task.project.name}
                      </Link>{" "}
                    </div>
                  </div>

                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Due Date :</div>
                    <div>{task.due_date}</div>
                  </div>

                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Created Date :</div>
                    <div>{task.created_at}</div>
                  </div>

                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Updated By :</div>
                    <div className="capitalize">
                      <Link
                        href={route("user.show", task.updatedBy.id)}
                        className="hover:font-bold hover:underline hover:text-orange-400"
                      >
                        {task.updatedBy.name}{" "}
                      </Link>
                    </div>
                  </div>

                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Assigned To :</div>
                    <div className="capitalize">
                      <Link
                        href={route("user.show", task.assignedUser.id)}
                        className="hover:font-bold hover:underline hover:text-orange-400"
                      >
                        {task.assignedUser.name}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
