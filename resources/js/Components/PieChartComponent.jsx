import React from "react";
import { ResponsivePie } from "@nivo/pie";

const PieChartComponent = ({ data }) => {
  const customTheme = {
    labels: {
      text: {
        fontSize: 16, // Increase font size for labels
      },
    },
    legends: {
      text: {
        fontSize: 16, // Increase font size for legend text
      },
    },
    tooltip: {
      container: {
        fontSize: 16, // Increase font size for tooltips
      },
    },
    axis: {
      ticks: {
        text: {
          fontSize: 16, // Increase font size for axis ticks
        },
      },
    },
  };

  return (
    <div className="h-[550px]">
      <h3 className=" font-bold text-center mt-4 mb-0 text-xl text-gray-500 dark:text-gray-300">
        Total Tasks
      </h3>
      <ResponsivePie
        data={data}
        margin={{ top: 30, right: 50, bottom: 100, left: 50 }}
        innerRadius={0.5}
        padAngle={2}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsTextOffset={5}
        arcLinkLabelsTextColor="gray"
        arcLinkLabelsOffset={18}
        arcLinkLabelsDiagonalLength={0}
        arcLinkLabelsStraightLength={0}
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        colors={{ datum: "data.color" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 5,
            padding: 4,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: 60,
            lineWidth: 5,
            spacing: 8,
          },
        ]}
        fill={[
          {
            match: {
              id: "completed",
            },
            id: "dots",
          },
          {
            match: {
              id: "in_Progress",
            },
            id: "lines",
          },
        ]}
        // legends={[
        //   {
        //     anchor: "bottom",
        //     direction: "row",
        //     justify: false,
        //     translateX: 0,
        //     translateY: 58,
        //     itemsSpacing: 0,
        //     itemWidth: 130,
        //     itemHeight: 98,
        //     itemTextColor: "#999",
        //     itemDirection: "right-to-left",
        //     itemOpacity: 1,
        //     symbolSize: 18,
        //     symbolShape: "circle",
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemTextColor: "gray",
        //         },
        //       },
        //     ],
        //   },
        // ]}
        theme={customTheme}
      />
    </div>
  );
};

export default PieChartComponent;
