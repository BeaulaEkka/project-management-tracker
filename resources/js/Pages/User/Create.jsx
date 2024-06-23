import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function Create({ auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    image: "",
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    position: "",
    joining_date: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("user.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Create New User
        </h2>
      }
    >
      <Head title="Create new User" />
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100 ">
              <form
                action=""
                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                onSubmit={onSubmit}
              >
                <div className="mt-4">
                  <InputLabel htmlFor="user_image_path" value="User Image" />
                  <TextInput
                    id="user_image_path"
                    type="file"
                    name="image"
                    // value={data.image}
                    className="mt-1 block w-full border dark:border-gray-700 p-1 dark:bg-gray-900"
                    onChange={(e) => setData("image", e.target.files[0])}
                  />
                  <InputError message={errors.image} className="mt-2" />
                  {/**-------------------user_name -----------------------*/}
                  <InputLabel htmlFor="user_name" value="User Name" />
                  <TextInput
                    id="user_name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full dark:border-gray-700 dark:bg-gray-900"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                  />{" "}
                  <InputError message={errors.name} className="mt-2" />
                  {/**-----------------email---------------------- */}
                  <InputLabel htmlFor="user_email" value="User Email" />
                  <TextInput
                    id="user_email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full dark:border-gray-700 dark:bg-gray-900"
                    onChange={(e) => setData("email", e.target.value)}
                  />{" "}
                  <InputError message={errors.email} className="mt-2" />
                  {/* ------------------------password----------------------- */}
                  <InputLabel htmlFor="user_password" value="Password" />
                  <TextInput
                    id="user_password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full dark:border-gray-700 dark:bg-gray-900"
                    onChange={(e) => setData("password", e.target.value)}
                  />{" "}
                  <InputError message={errors.password} className="mt-2" />
                  {/* password confirmation */}
                  <InputLabel
                    htmlFor="user_password_confirmation"
                    value="Confirm Password"
                  />
                  <TextInput
                    id="user_password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full dark:border-gray-700 dark:bg-gray-900"
                    onChange={(e) =>
                      setData("password_confirmation", e.target.value)
                    }
                  />{" "}
                  <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                  />
                  {/* Joining_date */}
                  <InputLabel
                    htmlFor="user_joining_date"
                    value="Joining Date"
                  />
                  <div className="relative">
                    <TextInput
                      id="user_joining_date"
                      type="date"
                      name="joining_date"
                      value={data.joining_date}
                      className="mt-1 block w-full date-input dark:border-gray-700 dark:bg-gray-900"
                      onChange={(e) => setData("joining_date", e.target.value)}
                    />{" "}
                    {/* Style the calendar icon */}
                  </div>
                  <InputError message={errors.joining_date} className="mt-2" />
                  {/* Position */}
                  <InputLabel htmlFor="user_position" value="Position" />
                  <TextInput
                    id="user_position"
                    type="text"
                    name="position"
                    value={data.position}
                    className="mt-1 block w-full h-10 dark:border-gray-700 dark:bg-gray-900"
                    onChange={(e) => setData("position", e.target.value)}
                  />{" "}
                  <InputError message={errors.position} className="mt-2" />
                </div>
                {/*buttons*/}
                <div className="mt-4 text-right">
                  <Link href={route("user.index")}>
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
