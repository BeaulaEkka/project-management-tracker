import React, { useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import { Pagination } from "@/Components/Pagination";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { TableHeading } from "@/Components/TableHeading";
import RandomBackground from "@/Components/RandomBackground";
import { ProgressBar } from "@/Components/ProgressBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function TasksTable({
  tasks,
  success,
  queryParams = null,
  hideProjectColumn = false,
}) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("task.index"), queryParams);
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
    router.get(route("task.index"), queryParams);
  };

  const deleteTask = (task) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    router.delete(route("task.destroy", task.id));
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
    <>
      <ToastContainer />
      <div className="overflow-auto rounded-t-md">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  rounded-top-md ">
          <thead className="text-xs text-gray-400 uppercase bg-gray-800  dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap  ">
              <TableHeading
                title="id"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                ID
              </TableHeading>

              <th className="px-3 py-3">Image </th>
              {!hideProjectColumn && (
                <th className="px-3 py-3">Project Name </th>
              )}

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

              <th className="px-8">TimeLine</th>

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

          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 bprder-gray-500">
            <tr className="text-nowwrap">
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3">
                <TextInput
                  className="w-full Capitalize"
                  defaultValue={queryParams.name}
                  placeholder="Task Name"
                  onBlur={(e) => searchFieldChanged("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                />
              </th>
              <th className="px-3 py-3">
                <SelectInput
                  className="w-full "
                  defaultValue={queryParams.status}
                  queryParams={queryParams}
                  onChange={(e) => searchFieldChanged("status", e.target.value)}
                >
                  {" "}
                  <option value="0">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="in_Progress">In Progress</option>
                </SelectInput>
              </th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              {!hideProjectColumn && <th className="px-3 py-3"></th>}
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {tasks.data.map((task) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={task.id}
              >
                <td className="px-2 py-2 text-gray-700 dark:text-gray-400">
                  {task.id}
                </td>
                <td className="px-1 py-2 ">
                  <RandomBackground
                    project={task}
                    shape="round"
                    width="48px"
                    height="48px"
                  />
                </td>
                {!hideProjectColumn && (
                  <td className="px-2 py-2 capitalize text-gray-700 dark:text-gray-400 text-nowrap">
                    {task.project.name}
                  </td>
                )}{" "}
                <td>
                  <Link
                    href={route("task.show", task.id)}
                    className="hover:underline hover:font-semibold text-gray-300 text-nowrap "
                  >
                    <th className="px-2 py-2 capitalize text-gray-700 dark:text-gray-400">
                      {task.name}
                    </th>
                  </Link>
                </td>
                <td className="px-1 py-2 w-[250px] ">
                  <span
                    className={
                      "px-3 py-1 rounded text-white text-nowrap " +
                      TASK_STATUS_CLASS_MAP[task.status]
                    }
                  >
                    {TASK_STATUS_TEXT_MAP[task.status] || "Unknown Status"}
                  </span>
                </td>
                <td className="px-2 py-2 text-nowrap text-gray-700 dark:text-gray-400 ">
                  {task.created_at}
                </td>
                <td className="px-1 py-2 text-nowrap text-gray-700 dark:text-gray-400">
                  {task.due_date}
                </td>
                <td className="px-2 py-2 text-nowrap">
                  <ProgressBar
                    progress={calculateProgress(task.created_at, task.due_date)}
                    status={task.status}
                  />
                </td>
                <td className="px-3 py-2 capitalize text-gray-700 dark:text-gray-400">
                  {task.createdBy.name}
                </td>
                <td className="px-1 py-2 text-nowrap">
                  <Link
                    href={route("task.edit", task.id)}
                    className="text-emerald-600 dark:text-emerald-500 hover:underline mx-1"
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
      <Pagination links={tasks.meta.links} />
    </>
  );
}
