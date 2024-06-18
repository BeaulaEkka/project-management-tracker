import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Pagination } from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import { TableHeading } from "@/Components/TableHeading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Index({ auth, users, queryParams = null, success }) {
  

  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("user.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }

    router.get(route("user.index"), queryParams);
  };

  const deleteUser = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    router.delete(route("user.destroy", user.id));
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
  }, [success]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between relative">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Users
          </h2>{" "}
          <Link
            href={route("user.create")}
            className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 font-semibold"
          >
            Add New
          </Link>
        </div>
      }
    >
      <Head title="Users" />
      <div className="py-8 ">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
          <ToastContainer />

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              {/* <pre>{JSON.stringify(users, undefined, 2)}</pre> */}
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-400 uppercase bg-gray-800 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap ">
                      <TableHeading
                        title="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>

                      <th className="px-3 py-3">Image </th>

                      <TableHeading
                        title="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Name
                      </TableHeading>

                      <TableHeading
                        title="email"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Email
                      </TableHeading>

                      <TableHeading
                        title="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Position
                      </TableHeading>
                      <TableHeading
                        title="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Joining Date
                      </TableHeading>

                      <th className="px-3 py-3 text-center">Actions</th>
                    </tr>
                  </thead>

                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 bprder-gray-500">
                    <tr className="text-nowwrap">
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full "
                          defaultValue={queryParams.name}
                          placeholder="User Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>

                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full "
                          defaultValue={queryParams.name}
                          placeholder="User Email"
                          onBlur={(e) =>
                            searchFieldChanged("email", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("email", e)}
                        />
                      </th>

                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.data.map((user) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-400"
                        key={user.id}
                      >
                        <td className="px-3 py-2">{user.id}</td>
                        <td className="px-3 py-2 text-gray-700 dark:text-gray-400 ">
                          <img
                            src={user.image_path}
                            alt={user.name}
                            className=" rounded-full w-full h-full object-cover lg:w-12 lg:h-12"
                          />
                        </td>

                        <td className="px-3 py-2">
                          {" "}
                          <Link
                            href={route("user.show", user.id)}
                            className="hover:underline hover:font-semibold text-gray-300 text-nowrap capitalize text-gray-700 dark:text-gray-400"
                          >
                            {user.name}
                          </Link>
                        </td>

                        <td className="px-3 py-2">{user.email}</td>

                        <td className="px-3 py-2 text-nowrap">
                          {user.position}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {user.joining_date}
                        </td>

                        <td className="px-3 py-2 text-nowrap">
                          <Link
                            href={route("user.edit", user.id)}
                            className="text-emerald-600 dark:text-emerald-500 hover:underline mx-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteUser(user)}
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

              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
