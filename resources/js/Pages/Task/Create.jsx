import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";

export default function Create({ auth, projects, users }) {
  const { query } = usePage().props || {};
  console.log("usePage props:", usePage().props); // Debug line

  // Fallback check using window.location.search if query is not found
  const searchParams = new URLSearchParams(window.location.search);
  const fromUserPage =
    query?.fromUserPage === "1" || searchParams.get("fromUserPage") === "1";
  console.log("fromUserPage:", fromUserPage); // Debug line

  const { data, setData, post, processing, errors, reset, success } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
    fromUserPage,
  });
  console.log("success-create task from", success);

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("task.store"), {
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
          Create New Task
        </h2>
      }
    >
      <Head title="Create new Task" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100 ">
              <form
                action=""
                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                onSubmit={onSubmit}
              >
                <div className="mt-4">
                  {/**project */}
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
                  {/**task image_path */}
                  <InputLabel htmlFor="task_image_path" value="Task Image" />
                  <TextInput
                    id="task_image_path"
                    type="file"
                    name="image"
                    // value={data.image}
                    className="mt-1 block w-full border"
                    onChange={(e) => setData("image", e.target.files[0])}
                  />
                  <InputError message={errors.image} className="mt-2" />
                  {/**task_name */}
                  <InputLabel htmlFor="task_name" value="Task Name" />
                  <TextInput
                    id="task_name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                  />{" "}
                  <InputError message={errors.name} className="mt-2" />
                  {/**task_description */}
                  <InputLabel
                    htmlFor="task_description"
                    value="Task Description"
                  />
                  <TextAreaInput
                    id="task_description"
                    type="text"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("description", e.target.value)}
                  />{" "}
                  <InputError message={errors.description} className="mt-2" />
                  {/* task_due_date */}
                  <InputLabel htmlFor="task_due_date" value="Task Deadline" />
                  <div className="relative">
                    <TextInput
                      id="task_due_date"
                      type="Date"
                      name="due_date"
                      value={data.due_date}
                      className="mt-1 block w-full date-input"
                      isFocused={true}
                      onChange={(e) => setData("due_date", e.target.value)}
                    />
                  </div>
                  <InputError message={errors.due_date} className="mt-2" />
                  {/* task_status */}
                  <InputLabel htmlFor="task_status" value="Task Status" />
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
                  {/* task_priority */}
                  <InputLabel htmlFor="priority" value="Task Priority" />
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
                  {/* assigned_user_id */}
                  <InputLabel
                    htmlFor="assigned_user_id"
                    value="Assigned User"
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
                  />{" "}
                  <input
                    type="hidden"
                    name="fromUserPage"
                    value={fromUserPage}
                  />
                </div>

                {/*buttons*/}
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
