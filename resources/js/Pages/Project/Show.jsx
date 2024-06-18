import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import TasksTable from "../Task/TasksTable";
import { ProgressBar } from "@/Components/ProgressBar";
import RandomBackground from "@/Components/RandomBackground";

export default function Show({ auth, project, tasks, queryParams, success }) {
  const today = new Date().getTime();
  const startDate = new Date(project.created_at).getTime();
  const dueDate = new Date(project.due_date).getTime();

  let progress = Math.max(
    0,
    Math.min(1, (today - startDate) / (dueDate - startDate))
  );

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Project :  ${project.name}`}
          </h2>
          <Link
            href={route("project.edit", project.id)}
            className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 font-semibold"
          >
            Edit Project
          </Link>
        </div>
      }
    >
      <Head title={`Project "${project.name}"`} />
      {/* <pre>{JSON.stringify(project)}</pre> */}
      <div className="py-8 ">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg ">
            <div className=" p-6 text-gray-900 dark:text-gray-100">
              <div className="text-gray-900 dark:text-gray-100">
                <div className="relative border border-gray-100 shadow-sm rounded-md">
                  <RandomBackground
                    project={project}
                    shape="rectangle"
                    width="100%"
                    height="250px"
                  />
                  <span className="absolute top-[32%] left-1/2 transform -translate-x-1/2 text-4xl px-4 capitalize bg-black/50 rounded-md py-4 text-center font-bold text-white/90">
                    {project.name}
                  </span>
                </div>
              </div>
              <p className=" mt-5">{project.description}</p>
              <div className="grid gap-12 lg:grid-cols-2 sm:grid-cols-1">
                <div className=" mt-5">
                  <div className="grid gap-2 grid-cols-2 mt-5 ">
                    <div className="font-bold">Project Id :</div>
                    <div>{project.id}</div>
                  </div>

                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Project Name :</div>
                    <div>{project.name}</div>
                  </div>

                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Project Status :</div>
                    <div
                      className={
                        "px-3 py-1 rounded text-white font-bold capitalize text-nowwrap " +
                        PROJECT_STATUS_CLASS_MAP[project.status]
                      }
                    >
                      {PROJECT_STATUS_TEXT_MAP[project.status] ||
                        "Unknown Status"}
                    </div>
                  </div>

                  <div className="grid gap-2 grid-cols-2 mt-5 capitalize">
                    <div className="font-bold">Created By :</div>
                    {/* <pre>{JSON.stringify(project)}</pre> */}
                    <div>{project.createdBy.name}</div>
                  </div>
                </div>
                <div className=" mt-5">
                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Due Date :</div>
                    <div>{project.due_date}</div>
                  </div>

                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Created Date :</div>
                    <div>{project.created_at}</div>
                  </div>

                  <div className="grid gap-2 grid-cols-2 mt-5 capitalize">
                    <div className="font-bold">Updated By :</div>
                    <div>{project.updatedBy.name}</div>
                  </div>
                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Timeline:</div>
                    <div className="w-full">
                      <ProgressBar progress={progress} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100 text-lg font-bold mb-6">
              <div className="mb-12 flex justify-between">
                <h1 className="">All Tasks: {project.name}</h1>

                <div>
                  <Link
                    href={route("task.create")}
                    className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 font-semibold"
                  >
                    Add New
                  </Link>
                </div>
              </div>

              <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                hideProjectColumn={true}
                success={success}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
