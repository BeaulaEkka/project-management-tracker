import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import TasksTable from "../Task/TasksTable";
import { ProgressBar } from "@/Components/ProgressBar";

export default function Show({ auth, project, tasks, queryParams, success }) {
  const today = new Date().getTime();
  const startDate = new Date(project.created_at).getTime();
  const dueDate = new Date(project.due_date).getTime();

  let progress = Math.max(
    0,
    Math.min(1, (today - startDate) / (dueDate - startDate))
  );
  console.log("progress:", progress);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {`Project "${project.name}"`}
        </h2>
      }
    >
      <Head title={`Project "${project.name}"`} />
      {/* <pre>{JSON.stringify(project)}</pre> */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div>
                <img
                  src={project.image_path}
                  alt=""
                  className="w-full h-64 object-cover"
                />
              </div>

              <p className=" mt-5">{project.description}</p>
              <div className="grid gap-12 grid-cols-2 ">
                <div className=" mt-5">
                  <div className="grid gap-2 grid-cols-2 mt-5">
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
                        "px-3 py-1 rounded text-white font-bold capitalize " +
                        PROJECT_STATUS_CLASS_MAP[project.status]
                      }
                    >
                      {PROJECT_STATUS_TEXT_MAP[project.status] ||
                        "Unknown Status"}
                    </div>
                  </div>

                  <div className="grid gap-2 grid-cols-2 mt-5">
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

                  <div className="grid gap-2 grid-cols-2 mt-5 ">
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

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100 text-lg font-bold mb-6">
              <h1>{project.name}</h1>

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
