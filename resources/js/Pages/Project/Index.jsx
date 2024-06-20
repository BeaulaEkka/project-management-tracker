import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Pagination } from "@/Components/Pagination";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { TableHeading } from "@/Components/TableHeading";
import { ProgressBar } from "@/Components/ProgressBar";
import RandomBackground from "@/Components/RandomBackground";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Index({ auth, projects, queryParams = null, success }) {
  const { errors } = usePage().props;

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
  }, [success]);

  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("project.index"), queryParams);
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

    router.get(route("project.index"), queryParams);
  };

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

  const deleteProject = (project) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }
    router.delete(route("project.destroy", project.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between  items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight ">
            Projects
          </h2>{" "}
          <Link
            href={route("project.create")}
            className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 font-semibold"
          >
            Add New
          </Link>
        </div>
      }
    >
      <Head title="Projects" />{" "}
      <div className="py-8 shadow-md">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <ToastContainer />
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto rounded-t-md">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-400 uppercase bg-gray-800  dark:bg-gray-700 dark:text-gray-400 dark:border-b dark:border-gray-500 ">
                    <tr className="text-nowrap ">
                      <TableHeading
                        title="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>

                      <th className="px-2 py-1">Image </th>

                      <TableHeading
                        title="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Name
                      </TableHeading>

                      <TableHeading
                        title="status"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Status
                      </TableHeading>

                      <TableHeading
                        title="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Created on
                      </TableHeading>

                      <TableHeading
                        title="due_date"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Due Date
                      </TableHeading>

                      <TableHeading
                        title="timeline"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        <div className="w-25 ml-4 ">Timeline</div>
                      </TableHeading>

                      <TableHeading
                        title="created_by"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Created By
                      </TableHeading>
                      <th className="px-3 py-3 text-center">Actions</th>
                    </tr>
                  </thead>

                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-200 ">
                    <tr>
                      <th className="px-2 py-2 "></th>
                      <th className="px-2 py-2 "></th>
                      <th className="px-2 py-2 ">
                        <TextInput
                          className="block w-full px-3"
                          defaultValue={queryParams.name}
                          placeholder="Project Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3   ">
                        <SelectInput
                          className="block w-full "
                          defaultValue={queryParams.status}
                          queryParams={queryParams}
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          {" "}
                          <option value="0">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="in_Progress">In Progress</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3 "></th>
                      <th className="px-3 py-3 "></th>
                      <th className="px-3 py-3 "></th>
                      <th className="px-3 py-3 "></th>
                      <th className="px-3 py-3 "></th>
                    </tr>
                  </thead>

                  <tbody>
                    {projects.data.map((project) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                        key={project.id}
                      >
                        <td className="px-3 py-2 text-gray-700 dark:text-gray-400">
                          {project.id}
                        </td>
                        <td className="px-2 py-2 rounded-full w-12 h-12 object-cover">
                          {/* No image needed here */}
                          <RandomBackground
                            project={project}
                            shape="round"
                            width="48px"
                            height="48px"
                          />
                        </td>

                        <td className="px-3 py-2">
                          {" "}
                          <Link
                            href={route("project.show", project.id)}
                            className="hover:underline hover:font-semibold text-gray-700 dark:text-gray-400 text-nowrap"
                          >
                            {project.name}
                          </Link>
                        </td>

                        <td className="px-3 py-2 ">
                          <span
                            className={
                              "px-3 py-1 rounded text-white text-nowrap " +
                              PROJECT_STATUS_CLASS_MAP[project.status]
                            }
                          >
                            {PROJECT_STATUS_TEXT_MAP[project.status] ||
                              "Unknown Status"}
                          </span>
                        </td>

                        <td className="px-3 py-2 text-nowrap text-gray-700 dark:text-gray-400">
                          {project.created_at}
                        </td>
                        <td className="px-3 py-2 text-nowrap text-gray-700 dark:text-gray-400">
                          {project.due_date}
                        </td>

                        {/**timeline */}
                        <td className="px-3 py-2 text-nowrap">
                          <ProgressBar
                            progress={calculateProgress(
                              project.created_at,
                              project.due_date
                            )}
                            status={project.status}
                          />
                        </td>

                        <td className="px-3 py-2 capitalize">
                          <Link
                            href={route("user.show", project.createdBy.id)}
                            className="hover:font-bold hover:underline hover:text-orange-400"
                          >
                            {project.createdBy.name}
                          </Link>
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          <Link
                            href={route("project.edit", project.id)}
                            className="text-emerald-600 dark:text-blue-500 hover:underline mx-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteProject(project)}
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

              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
