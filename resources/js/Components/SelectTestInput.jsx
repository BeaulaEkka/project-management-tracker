import React, { forwardRef, useRef, useState } from "react";

const SelectTestInput = forwardRef(function SelectTestInput(
  { className = "", children, queryParams, ...props },
  ref
) {
  const input = ref ? ref : useRef();

  const [select, setSelect] = useState(queryParams?.status || "");

  const handleChange = (e) => {
    setSelect(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <select
      {...props}
      className={
        "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
        className
      }
      ref={input}
      value={select}
      onChange={handleChange}
    >
      {children}
      <option value="0">Select Status</option>
      <option value="1">Pending</option>
      <option value="2">Completed</option>
      <option value="3">In Progress</option>
    </select>
  );
});

export default SelectTestInput;
