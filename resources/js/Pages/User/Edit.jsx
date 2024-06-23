// import React from "react";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head, Link, useForm } from "@inertiajs/react";
// import InputLabel from "@/Components/InputLabel";
// import TextInput from "@/Components/TextInput";
// import InputError from "@/Components/InputError";
// import TextAreaInput from "@/Components/TextAreaInput";
// import SelectInput from "@/Components/SelectInput";

// export default function Create({ auth, user }) {
//   const { data, setData, post, processing, errors, reset } = useForm({
//     image: "",
//     name: user.name || "",
//     email: user.email || "",
//     password: "",
//     password_confirmation: "",
//     position: user.position || "",
//     joining_date: user.joining_date || "",
//     _method: "PUT",
//   });

//   const onSubmit = (e) => {
//     e.preventDefault();

//     post(route("user.update", user.id));
//   };
//   const darkMode = true;
//   const iconStyles = {
//     // filter: "invert(.2)",
//     .date-class::-webkit-calendar-picker-indicator { filter: invert(1); }
//   };

//   return (
//     <AuthenticatedLayout
//       user={auth.user}
//       header={
//         <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
//           Edit "{user.name}""
//         </h2>
//       }
//     >
//       <Head title="Edit User" />
//       <div className="py-12">
//         <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//           <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
//             <div className="p-6 text-gray-900 dark:text-gray-100">
//               Form Edit
//               <form
//                 action=""
//                 className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
//                 onSubmit={onSubmit}
//               >
//                 {user.image_path && (
//                   <div>
//                     <img src={user.image_path} alt="" className="mb-4 w-52" />
//                   </div>
//                 )}
//                 <div className="mt-4">
//                   <InputLabel htmlFor="user_image_path" value="User Image" />
//                   <TextInput
//                     id="user_image_path"
//                     type="file"
//                     name="image"
//                     // value={data.image}
//                     className="mt-1 block w-full"
//                     onChange={(e) => setData("image", e.target.files[0])}
//                   />
//                   <InputError message={errors.image} className="mt-2" />
//                   {/**-------------------user_name -----------------------*/}
//                   <InputLabel htmlFor="user_name" value="User Name" />
//                   <TextInput
//                     id="user_name"
//                     type="text"
//                     name="name"
//                     value={data.name}
//                     className="mt-1 block w-full"
//                     isFocused={true}
//                     onChange={(e) => setData("name", e.target.value)}
//                   />{" "}
//                   <InputError message={errors.name} className="mt-2" />
//                   {/**-----------------email---------------------- */}
//                   <InputLabel htmlFor="user_email" value="User Email" />
//                   <TextInput
//                     id="user_email"
//                     type="text"
//                     name="email"
//                     value={data.email}
//                     className="mt-1 block w-full"
//                     onChange={(e) => setData("email", e.target.value)}
//                   />{" "}
//                   <InputError message={errors.email} className="mt-2" />
//                   {/* ------------------------password----------------------- */}
//                   <InputLabel htmlFor="user_password" value="Password" />
//                   <TextInput
//                     id="user_password"
//                     type="password"
//                     name="password"
//                     value={data.password}
//                     className="mt-1 block w-full"
//                     onChange={(e) => setData("password", e.target.value)}
//                   />{" "}
//                   <InputError message={errors.password} className="mt-2" />
//                   {/* password confirmation */}
//                   <InputLabel
//                     htmlFor="user_password_confirmation"
//                     value="Confirm Password"
//                   />
//                   <TextInput
//                     id="user_password_confirmation"
//                     type="password"
//                     name="password_confirmation"
//                     value={data.password_confirmation}
//                     className="mt-1 block w-full"
//                     onChange={(e) =>
//                       setData("password_confirmation", e.target.value)
//                     }
//                   />{" "}
//                   <InputError
//                     message={errors.password_confirmation}
//                     className="mt-2"
//                   />
//                   {/* Joining_date */}
//                   <InputLabel
//                     htmlFor="user_joining_date"
//                     value="Joining Date"
//                   />
//                   <div class="relative focus-within:text-blue-500">
//                     <TextInput
//                       id="user_joining_date"
//                       type="date"
//                       name="joining_date"
//                       value={data.joining_date}
//                       className="mt-1 block w-full "
//                       style={iconStyles}
//                       onChange={(e) => setData("joining_date", e.target.value)}
//                     />
//                     {/* Style the calendar icon */}
//                     {/* <svg
//                       class="w-6 h-6 text-gray-800 dark:text-gray-400 absolute right-0 top-0 mt-2 mr-2  pointer-events-none"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         stroke="currentColor"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                         stroke-width="2"
//                         d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
//                       />
//                     </svg> */}
//                   </div>
//                   <InputError message={errors.joining_date} className="mt-2" />
//                   {/* Position */}
//                   <InputLabel htmlFor="position" value="position" />
//                   <TextInput
//                     id="position"
//                     type="text"
//                     name="position"
//                     value={data.position}
//                     className="mt-1 block w-full"
//                     onChange={(e) => setData("position", e.target.value)}
//                   />{" "}
//                   <InputError message={errors.position} className="mt-2" />
//                 </div>
//                 {/*buttons*/}
//                 <div className="mt-4 text-right">
//                   <Link href={route("user.index")}>
//                     <button className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-300 mr-2 ">
//                       Cancel
//                     </button>
//                   </Link>
//                   <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 ">
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AuthenticatedLayout>
//   );
// }

import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import "../../../css/custom.css"; // Import your custom CSS

export default function Create({ auth, user }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    image: "",
    name: user.name || "",
    email: user.email || "",
    password: "",
    password_confirmation: "",
    position: user.position || "",
    joining_date: user.joining_date || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("user.update", user.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Edit : {user.name}
        </h2>
      }
    >
      <Head title="Edit User" />
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h1 className="px-8 font-bold">Form Edit</h1>
              <form
                action=""
                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                onSubmit={onSubmit}
              >
                {user.image_path && (
                  <div>
                    <img
                      src={user.image_path}
                      alt=""
                      className="mb-4 w-52 shadow-md  rounded-md ring-gray-200 "
                    />
                  </div>
                )}
                <div className="mt-4">
                  <InputLabel htmlFor="user_image_path" value="User Image" />
                  <TextInput
                    id="user_image_path"
                    type="file"
                    name="image"
                    className="mt-1 block w-full border dark:border-gray-700 dark:bg-gray-900 p-1"
                    onChange={(e) => setData("image", e.target.files[0])}
                  />
                  <InputError message={errors.image} className="mt-2" />
                  <InputLabel htmlFor="user_name" value="User Name" />
                  <TextInput
                    id="user_name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full dark:border-gray-700 dark:bg-gray-900"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                  />
                  <InputError message={errors.name} className="mt-2" />
                  <InputLabel htmlFor="user_email" value="User Email" />
                  <TextInput
                    id="user_email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full dark:border-gray-700 dark:bg-gray-900"
                    onChange={(e) => setData("email", e.target.value)}
                  />
                  <InputError message={errors.email} className="mt-2" />
                  <InputLabel htmlFor="user_password" value="Password" />
                  <TextInput
                    id="user_password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full dark:border-gray-700 dark:bg-gray-900"
                    onChange={(e) => setData("password", e.target.value)}
                  />
                  <InputError message={errors.password} className="mt-2" />
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
                  />
                  <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                  />
                  <InputLabel
                    htmlFor="user_joining_date"
                    value="Joining Date"
                  />

                  <TextInput
                    id="user_joining_date"
                    type="date"
                    name="joining_date"
                    value={data.joining_date}
                    className="mt-1 block w-full date-input dark:border-gray-700 dark:bg-gray-900"
                    onChange={(e) => setData("joining_date", e.target.value)}
                  />

                  <InputError message={errors.joining_date} className="mt-2" />
                  <InputLabel htmlFor="position" value="Position" />
                  <TextInput
                    id="position"
                    type="text"
                    name="position"
                    value={data.position}
                    className="mt-1 block w-full dark:border-gray-700 dark:bg-gray-900"
                    onChange={(e) => setData("position", e.target.value)}
                  />
                  <InputError message={errors.position} className="mt-2" />
                </div>
                <div className="mt-4 text-right">
                  <Link href={route("user.index")}>
                    <button className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-300 mr-2">
                      Cancel
                    </button>
                  </Link>
                  <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
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
