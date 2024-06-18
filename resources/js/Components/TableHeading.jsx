import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import React from "react";

export const TableHeading = ({
  title,
  sortable = true,
  sort_field = null,
  sort_direction = null,
  sortChanged = () => {},
  children,
}) => {
  return (
    <th onClick={(e) => sortChanged(title)}>
      <div className="px-2 py-1 flex items-center justify-between gap-1 cursor-pointer">
        {children}
        {sortable && (
          <div>
            <ChevronUpIcon
              className={
                "w-4 " +
                (sort_field === title && sort_direction === "asc"
                  ? "text-emerald-400"
                  : "")
              }
            />
            <ChevronDownIcon
              className={
                "w-4 -mt-2 " +
                (sort_field === title && sort_direction === "desc"
                  ? "text-emerald-400"
                  : "")
              }
            />
          </div>
        )}
      </div>
    </th>
  );
};
