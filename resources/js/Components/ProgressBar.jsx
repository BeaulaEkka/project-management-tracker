import React from "react";

export const ProgressBar = ({ progress }) => {
  const innerBarStyle = {
    width: `${progress * 100}%`,
    height: "inherit",
    borderRadius: "1rem",
    backgroundColor:
      progress <= 0.3 ? "green" : progress <= 0.7 ? "orange" : "red",
    transition: "width 0.5s ease-in-out",
  };
  const progressText = `${Math.round(progress * 100)}%`;

  return (
    <div className="w-68 h-5">
      <div className="w-full h-full bg-gray-700 rounded-lg">
        <div style={innerBarStyle} className="px-2 ">
          <span className="text-sm flex justify-end italic font-bold">
            {progressText}
          </span>
        </div>
      </div>
    </div>
  );
};
