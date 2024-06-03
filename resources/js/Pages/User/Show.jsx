import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";
// import TasksTable from "../Task/TasksTable";

export default function Show({ auth, user, tasks, queryParams }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight capitalize">
          {`User "${user.name}"`}
        </h2>
      }
    >
      <Head title={`User "${user.name}"`} />
      {/* <pre>{JSON.stringify(user)}</pre> */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100 flex justify-between flex-wrap sm:flex-wrap-reverse">
              <div className="grid gap-12 grid-cols-2 ">
                <div className=" mt-5">
                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">User Id :</div>
                    <div>{user.id}</div>
                  </div>

                  <div className="grid gap-2 grid-cols-2 mt-5 capitalize">
                    <div className="font-bold">User Name :</div>
                    <div>{user.name}</div>
                  </div>
                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Position :</div>
                    <div>{user.position}</div>
                  </div>
                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Email :</div>
                    <div>{user.email}</div>
                  </div>
                  <div className="grid gap-2 grid-cols-2 mt-5">
                    <div className="font-bold">Joining Date :</div>
                    <div>{user.joining_date}</div>
                  </div>
                </div>
                <div className=" mt-5"></div>
              </div>
              <div>
                <img
                  src={user.image_path}
                  alt=""
                  className="w-642 h-64 object-cover rounded-md "
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100 capitalize font-bold text-lg">
              <h1>Tasks assigned to: {user.name}</h1>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
