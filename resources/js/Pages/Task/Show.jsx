import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants";
import TasksTable from "../Task/TasksTable";

export default function Show({ auth, task, users, queryParams }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {`Task "${task.name}"`}
        </h2>
      }
    >
      <Head title={`Task "${task.name}"`} />
      {/* <pre>{JSON.stringify(task)}</pre> */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div>
                <img
                  src={task.image_path}
                  alt=""
                  className="w-full h-64 object-cover"
                />
              </div>

              <p className=" mt-5">{task.description}</p>
              <div className="grid gap-12 grid-cols-2 ">
                <div className=" mt-5">
                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Task Id :</div>
                    <div>{task.id}</div>
                  </div>

                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Task Name :</div>
                    <div>{task.name}</div>
                  </div>

                  <div className="grid gap-2 grid-cols-2 mt-5">
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
