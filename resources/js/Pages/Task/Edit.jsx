import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";

export default function Edit({ auth, task, projects, users }) {
  const { query } = usePage().props;
  const searchParams = new URLSearchParams(window.location.search);
  const fromUserPage =
    query?.fromUserPage === "1" || searchParams.get("fromUserPage") === "1";

  const { data, setData, post, processing, errors, reset, success } = useForm({
    name: task.name || "",
    status: task.status || "",
    image: "",
    description: task.description || "",
    due_date: task.due_date || "",
    project_id: task.project_id || "",
    priority: task.priority || "",
    assigned_user_id: task.assigned_user_id || "",
    fromUserPage: fromUserPage ? "1" : "0",
    _method: "PUT",
  });

  const [imagePreview, setImagePreview] = useState(task.image_path || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setData("image", file);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("task.update", task.id), {
      data,
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Edit {task.name}
        </h2>
      }
    >
      <Head title="Edit Task" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100 ">
              <h1 className="px-8">Edit {task.name} Form</h1>
              <form
                action=""
                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                onSubmit={onSubmit}
              >
                {imagePreview && (
                  <div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mb-4 w-52"
                    />
                  </div>
                )}
                <div className="mt-4">
                  <InputLabel htmlFor="task_project_id" value="Project" />
                  <SelectInput
                    name="project_id"
                    value={data.project_id}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("project_id", e.target.value)}
                  >
                    <option value="">Select Project Id</option>
                    {projects &&
                      projects.data.map((project) => (
                        <option value={project.id} key={project.id}>
                          {project.name}
                        </option>
                      ))}
                  </SelectInput>
                  <InputError message={errors.project_id} className="mt-2" />

                  <InputLabel
                    htmlFor="task_image_path"
                    value="Task Image"
                    className="mt-1"
                  />
                  <TextInput
                    id="task_image_path"
                    type="file"
                    name="image"
                    className="mt-1 block w-full"
                    onChange={handleImageChange}
                  />
                  <InputError message={errors.image} className="mt-2" />

                  <InputLabel
                    htmlFor="task_name"
                    value="Task Name"
                    className="mt-1"
                  />
                  <TextInput
                    id="task_name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                  />
                  <InputError message={errors.name} className="mt-2" />

                  <InputLabel
                    htmlFor="task_description"
                    value="Task Description"
                    className="mt-1"
                  />
                  <TextAreaInput
                    id="task_description"
                    type="text"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("description", e.target.value)}
                  />
                  <InputError message={errors.description} className="mt-2" />

                  <InputLabel
                    htmlFor="task_due_date"
                    value="Task Deadline"
                    className="mt-1"
                  />
                  <div className="relative">
                    <TextInput
                      id="task_due_date"
                      type="date"
                      name="due_date"
                      value={data.due_date}
                      className="mt-1 block w-full"
                      isFocused={true}
                      onChange={(e) => setData("due_date", e.target.value)}
                    />
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-gray-500 absolute right-0 top-0 mt-2 mr-2 pointer-events-none"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>
                  </div>
                  <InputError message={errors.due_date} className="mt-2" />

                  <InputLabel
                    htmlFor="task_status"
                    value="Task Status"
                    className="mt-1"
                  />
                  <SelectInput
                    name="status"
                    value={data.status}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("status", e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_Progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </SelectInput>
                  <InputError message={errors.status} className="mt-2" />

                  <InputLabel
                    htmlFor="priority"
                    value="Task Priority"
                    className="mt-1"
                  />
                  <SelectInput
                    name="priority"
                    value={data.priority}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("priority", e.target.value)}
                  >
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </SelectInput>
                  <InputError message={errors.priority} className="mt-2" />

                  <InputLabel
                    htmlFor="assigned_user_id"
                    value="Assigned User"
                    className="mt-1"
                  />
                  <SelectInput
                    name="assigned_user_id"
                    value={data.assigned_user_id}
                    className="mt-1 block w-full"
                    onChange={(e) =>
                      setData("assigned_user_id", e.target.value)
                    }
                  >
                    <option value="">Assign Task</option>
                    {users &&
                      users.data.map((user) => (
                        <option
                          value={user.id}
                          key={user.id}
                          className="capitalize"
                        >
                          {`${user.name} - ${user.position}`}
                        </option>
                      ))}
                  </SelectInput>
                  <InputError
                    message={errors.assigned_user_id}
                    className="mt-2"
                  />
                  <InputError message={errors.project_id} className="mt-2" />

                  <input
                    type="hidden"
                    name="fromUserPage"
                    value={fromUserPage ? "1" : "0"}
                  />
                </div>

                <div className="mt-4 text-right">
                  <Link href={route("task.index")}>
                    <button className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-300 mr-2 ">
                      Cancel
                    </button>
                  </Link>
                  <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 ">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
