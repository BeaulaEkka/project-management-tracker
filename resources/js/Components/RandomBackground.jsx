import React, { useState, useEffect } from "react";

function RandomBackground({
  project,
  shape = "rectangle",
  width = "0",
  height = "0",
}) {
  const [backgroundColor, setBackgroundColor] = useState("transparent");

  useEffect(() => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBackgroundColor(randomColor);
  }, []);

  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width,
    height,
    backgroundColor: project.image_path ? "transparent" : backgroundColor,
    borderRadius: shape === "round" ? "50%" : ".5rem",
    overflow: "hidden",
  };

  const imageStyles = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: ".5rem",
  };

  return (
    <div style={styles}className="border border-gray-200 dark:border-gray-900 shadow-md">
      {project.image_path ? (
        <img src={project.image_path} alt={project.name} style={imageStyles} />
      ) : (
        shape !== "rectangle" && (
          <span className=" text-sm text-white dark:text-gray-600 font-bold">
            {project.name.slice(0, 2).toUpperCase()}
          </span>
        )
      )}
    </div>
  );
}

export default RandomBackground;
