import { Link } from "@inertiajs/react";

export default function NavLink({
  active = false,
  className = "",
  children,
  ...props
}) {
  return (
    <Link
      {...props}
      className={
        "inline-flex items-center px-1 pt-1 border-b-4 text-sm  font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
        (active
          ? "border-emerald-400  dark:border-emerald-500 text-emerald-300 dark:text-gray-200 focus:border-emerald-700 "
          : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 ") +
        className
      }
    >
      {children}
    </Link>
  );
}
