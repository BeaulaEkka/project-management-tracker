import React from "react";

export const ProgressBar = ({ progress, status }) => {
  const innerBarStyle = {
    width: `${progress * 100}%`,
    height: "inherit",
    borderRadius: "1rem",
    backgroundColor:
      status === "completed"
        ? "gray"
        : progress <= 0.3
        ? "green"
        : progress <= 0.7
        ? "orange"
        : "red",
    transition: "width 0.5s ease-in-out",
  };

  const progressText = `${Math.round(progress * 100)}%`;

  return (
    <div className="w-68 h-5">
      <div className="w-full h-full bg-gray-700 rounded-lg relative">
        <div
          style={innerBarStyle}
          className="px-3 h-full flex justify-center items-center"
        >
          <span className="text-xs italic font-semibold text-white">
            {progressText}
          </span>
        </div>
      </div>
    </div>
  );
};
