import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { commonChartOptions } from "./chartOptions";
import { chartColors } from "components/DashboardUtility/Constants/colorConstants";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

//city progress, demographics diff. color
export const DonutChart = ({
  title,
  labels,
  series,
  height,
  fontColor,
  colorArray,
  vertical,
  horizontal,
}) => {
  const options = {
    animationEnabled: true,
    // ...commonChartOptions,
    interactivityEnabled: false,
    title: {
      text: title,
      ...commonChartOptions.title,
    },
    backgroundColor: "transparent",
    data: [
      {
        indexLabelPlacement: "inside",
        type: "doughnut",
        // innerRadius: "70%", // Increase this value to decrease the thickness
        // radius: "75%",
        startAngle: 60,
        showInLegend: true,
        toolTipContent: "<b>{label}</b>: {y} (#percent%)",
        indexLabelFontColor: "transparent",
        // color: chartColors,
        legendText: "{label}- #percent%",
        dataPoints: series.map((value, index) => ({
          y: value,
          label: labels[index],
          color: colorArray[index],
        })),
      },
    ],
    legend: {
      horizontalAlign: horizontal,
      verticalAlign: vertical,
      fontColor: fontColor,
      ...commonChartOptions.legend,
    },
  };

  return (
    <CanvasJSChart
      options={options}
      containerProps={{
        width: "100%",
        height: height,
      }}
    />
  );
};

//employment, transport
export const Doughnut = ({
  title,
  labels,
  series,
  height,
  bgColor,
  showNo,
  colorArray,
}) => {
  const totalValue = series.reduce((acc, value) => acc + value, 0);

  const options = {
    ...commonChartOptions,
    animationEnabled: true,
    interactivityEnabled: false,
    title: {
      ...commonChartOptions.title,
      text: title,
    },
    labels: labels,
    backgroundColor: bgColor,
    data: [
      {
        type: "doughnut",
        startAngle: 120,
        toolTipContent: "<b>{label}</b>: {y} (#percent%)",
        showInLegend: false,
        indexLabelPlacement: "inside",
        indexLabelFontSize: 0,
        dataPoints: series.map((value, index) => ({
          y: value,
          label: labels[index],
          legendText: labels[index],
          color: colorArray[index],
        })),
      },
    ],
    // legend: {
    //   horizontalAlign: horizontal,
    //   verticalAlign: vertical,
    //   fontColor: fontColor,
    //   ...commonChartOptions.legend,
    // },
    subtitles: showNo
      ? [
          {
            text: `${totalValue}`,
            verticalAlign: "center",
            fontSize: 14,
            dockInsidePlotArea: true,
            ...commonChartOptions.legend,
          },
        ]
      : [],
  };

  return (
    <div className="flex align-items-center w-full">
      <div className="flex w-full">
        <CanvasJSChart
          options={options}
          containerProps={{ height: height, width: "100%", bgColor: bgColor }}
        />
      </div>

      {/* Custom Legends */}
      <div className="flex flex-column gap-2">
        {series.map((value, index) => (
          <div
            key={index}
            className="flex gap-2 justify-content-between"
            style={{ width: "100%" }}
          >
            <div className="flex align-items-center">
              <div
                className="mr-2 border-circle"
                style={{
                  width: "0.6rem",
                  height: "0.6rem",
                  backgroundColor: colorArray[index % colorArray.length],
                }}
              ></div>
              <span className="card-text text-sm">{labels[index]}</span>
            </div>
            <div className="font-semibold">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

//used nowhere currently
export const BarChart = ({
  title,
  categories,
  series,
  height,
  xtitle,
  ytitle,
  dataPointWidth,
}) => {
  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        interactivityEnabled: false,
        title: {
          text: title,
          ...commonChartOptions.title,
        },
        axisX: {
          ...commonChartOptions.axisX,
        },
        axisY: {
          title: ytitle,
          gridThickness: 0,
          labelFontSize: 0,
          tickLength: 0,
          lineThickness: 0,
        },
        dataPointWidth: dataPointWidth,
        backgroundColor: "transparent",
        data: [
          {
            type: "bar",
            showInLegend: false,
            dataPoints: series.map((value, index) => ({
              ...commonChartOptions.data,
              y: value,
              label: categories[index],
              indexLabel: `{y}`,
              //color: chartColors[index % chartColors.length],
              color: chartColors[index + (4 % chartColors.length)],
            })),
          },
        ],
      }}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

//community, culture, healthcare
export const GroupedBarChart = ({
  title,
  dataSeries,
  labels,
  height,
  xtitle,
  ytitle,
  dataPointWidth,
}) => {
  const options = {
    animationEnabled: true,
    title: {
      text: title,
      ...commonChartOptions.title,
    },
    backgroundColor: "transparent",
    axisX: {
      title: xtitle,
      gridThickness: 0,
      labelFontSize: 10,
      labelFontFamily: "Montserrat",
      labelFontWeight: 500,
      lineThickness: 0.5,
    },
    axisY: {
      title: ytitle,
      gridThickness: 0,
      labelFontSize: 0,
      tickLength: 0,
      lineThickness: 0,
    },
    legend: {
      ...commonChartOptions.legend,
      horizontalAlign: "left",
    },
    toolTip: {
      shared: true, // Enable shared tooltip
      //   content: function (e) {
      //     // Create custom tooltip content
      //     const year = e.entries[0].dataPoint.label;
      //     const domestic = e.entries[0].dataPoint.y;
      //     const international = e.entries[1].dataPoint.y;
      //     return `Year: ${year}<br/>Domestic Tourists: ${domestic}<br/>International Tourists: ${international}`;
      //   },
      // },
      content: function (e) {
        // Dynamically generate the tooltip content
        let content = `Year: ${e.entries[0].dataPoint.label}<br/>`; // Get year from the first dataPoint label
        e.entries.forEach((entry) => {
          const category = entry.dataSeries.name; // Get the category (domestic/international or any other)
          const value = entry.dataPoint.y; // Get the value for this category
          content += `${category}: ${value}<br/>`; // Add category and value dynamically
        });
        return content; // Return the dynamically generated content
      },
    },
    interactivityEnabled: false,
    dataPointWidth: dataPointWidth,
    data: dataSeries.map((data, index) => {
      return {
        type: "bar",
        name: data.name,
        color: chartColors[index + (4 % chartColors.length)],
        showInLegend: true,
        indexLabel: "{y}",
        indexLabelPlacement: "outside",
        indexLabelFontColor: commonChartOptions.indexLabelOptions.fontColor, // Use common options
        indexLabelFontSize: commonChartOptions.indexLabelOptions.fontSize, // Use common options
        indexLabelFontFamily: commonChartOptions.indexLabelOptions.fontFamily, // Use common options
        indexLabelFontWeight: commonChartOptions.indexLabelOptions.fontWeight, // Use common options
        dataPoints: data.data?.map((val, index) => ({
          label: labels[index],
          y: val,
        })),
      };
    }),
  };

  return (
    <CanvasJSChart
      options={options}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

//waste
export const StackedBarChart = ({
  title,
  categories,
  series,
  height,
  labels,
}) => {
  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        title: {
          text: title,
          ...commonChartOptions.title,
        },
        backgroundColor: "transparent",
        axisY: {
          ...commonChartOptions.axisY,
        },
        axisX: {
          labelFontSize: 10,
          labelFontFamily: "Montserrat",
        },
        legend: {
          ...commonChartOptions.legend,
          horizontalAlign: "left",
        },
        dataPointWidth: 16,
        data: categories.map((category, index) => ({
          type: "stackedBar",
          name: category,
          showInLegend: true,
          color: chartColors[index + (4 % chartColors.length)],
          indexLabel: "{y}",
          indexLabelPlacement: "inside",
          indexLabelFontColor: "#fff",
          indexLabelFontSize: commonChartOptions.indexLabelOptions.fontSize, // Use common options
          indexLabelFontFamily: commonChartOptions.indexLabelOptions.fontFamily, // Use common options
          indexLabelFontWeight: commonChartOptions.indexLabelOptions.fontWeight, // Use common options
          dataPoints: labels.map((year, i) => ({
            label: year,
            y: series[index][i],
          })),
        })),
      }}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

//for land distribution
export const ModifiedBarChart = ({
  title,
  categories,
  series,
  height,
  xtitle,
  ytitle,
}) => {
  const data = []; // Array to hold data series

  // Create a data series for each category
  series.forEach((dataPoints, index) => {
    dataPoints.forEach((value, i) => {
      data.push({
        type: "bar",
        name: `${categories[index]}: ${value}`, // Unique name for the legend
        legendText: `${categories[index]}: ${value}`, // Unique text for the legend
        y: value,
        color: chartColors[index % chartColors.length], // Assign color to each bar
        indexLabel: `${categories[index]}: ${value}`, // Display category with its value
        indexLabelFontSize: 10,
        indexLabelPlacement: "outside", // Position the value outside the bar
        indexLabelFontFamily: "Montserrat",
        cornerRadius: 30,
      });
    });
  });

  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        title: {
          text: title,
          ...commonChartOptions.title,
        },
        backgroundColor: "transparent",
        dataPointWidth: 20,
        axisX: {
          gridThickness: 0,
          tickLength: 0,
          lineThickness: 0,
          labelFormatter: function () {
            return " ";
          },
        },
        axisY: {
          title: ytitle,
          gridThickness: 0.25,
          labelFontSize: 8, // Hide labels by setting font size to 0
          labelFontFamily: "Montserrat",
          lineThickness: 0.5, // Hide the X-axis line
          tickLength: 0, // Remove ticks on the X-axis
        },
        data: series.map((data, index) => ({
          showInLegend: false,
          type: "bar",
          name: categories[index],
          dataPoints: data.map((value, i) => ({
            legendText: `${categories[index]}: ${value}`,
            y: value,
            label: categories[i],
            indexLabel: `${categories[i]}: {y}`, // Include categories in indexLabel
            indexLabelFontSize: 10, // Font size for the value
            indexLabelPlacement: "outside", // Position the value outside the bar
            indexLabelFontFamily: "Montserrat",
            //indexLabelFontWeight: "400",
            color: chartColors[i % chartColors.length], // Assign color to each bar
            //cornerRadius: 30,
          })),
          color: chartColors[index % chartColors.length],
        })),
        legend: {
          horizontalAlign: "center",
          verticalAlign: "bottom",
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: 10,
          fontColor: "#737474",
        },
      }}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

//community-ngo
export const ColumnChart = ({
  title,
  categories,
  series,
  height,
  xtitle,
  ytitle,
  dataPointWidth,
}) => {
  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        interactivityEnabled: false,
        title: {
          text: title,
          ...commonChartOptions.title,
        },
        dataPointWidth: dataPointWidth,
        axisX: {
          title: xtitle,
          ...commonChartOptions.axisX,
        },
        axisY: {
          title: ytitle,
          gridThickness: 0,
          labelFontSize: 0,
          tickLength: 0,
          lineThickness: 0,
          labelFormatter: function () {
            return " ";
          },
        },
        legend: {
          ...commonChartOptions.legend,
        },
        backgroundColor: "transparent",
        data: [
          {
            type: "column",
            showInLegend: false,
            dataPoints: series.map((value, index) => ({
              y: value,
              label: categories[index],
              indexLabel: `{y}`,
              indexLabelPlacement: "outside",
              indexLabelFontColor:
                commonChartOptions.indexLabelOptions.fontColor, // Use common options
              indexLabelFontSize: commonChartOptions.indexLabelOptions.fontSize, // Use common options
              indexLabelFontFamily:
                commonChartOptions.indexLabelOptions.fontFamily, // Use common options
              indexLabelFontWeight:
                commonChartOptions.indexLabelOptions.fontWeight, // Use common options
              // color: chartColors[index % chartColors.length],
              color: chartColors[index + (4 % chartColors.length)],
            })),
          },
        ],
      }}
      containerProps={{
        height: height,
        width: "100%",
        style: {
          width: "100%",
          height: `${height}px`,
          transform: "scale(1)",
          transformOrigin: "0 0",
        },
      }}
    />
  );
};

//with custom legends, used nowhere currently
export const ModifiedColumnChart = ({
  title,
  categories,
  series,
  height,
  labelFontSize,
}) => {
  return (
    <div className="flex flex-column align-items-center justify-content-between w-full">
      <div className="flex w-full">
        <CanvasJSChart
          options={{
            animationEnabled: true,
            interactivityEnabled: false,
            title: {
              text: title,
              ...commonChartOptions.title,
            },
            axisX: {
              // title: xtitle,
              gridThickness: 0,
              labelFontSize: 0,
              labelFontFamily: "Montserrat",
              tickLength: 0,
              lineThickness: 0,
              interval: 1,
            },
            axisY: {
              // title: ytitle,
              gridThickness: 0,
              labelFontSize: 0,
              tickLength: 0,
              lineThickness: 0,
              labelFormatter: function () {
                return " ";
              },
            },
            backgroundColor: "transparent",
            dataPointWidth: 50,
            // data: categories.map((category, index) => ({
            //   type: "column",
            //   showInLegend: true,
            //   legendText: category, // Show the category in the legend
            //   dataPoints: [
            //     {
            //       y: series[index],
            //       label: category,
            //       indexLabel: `{y}`,
            //       indexLabelFontSize: 10,
            //       indexLabelPlacement: "outside",
            //       indexLabelFontFamily: "Montserrat",
            //       color: chartColors[index + (4 % chartColors.length)],
            //     },
            //   ],
            //   dataPointWidth: 40,
            //   color: chartColors[index + (4 % chartColors.length)],
            // })),
            data: [
              {
                type: "column",
                showInLegend: false,
                dataPoints: series.map((value, index) => ({
                  y: value,
                  label: categories[index],
                  // legendText: categories[index],
                  indexLabel: `{y}`,
                  indexLabelFontSize: 10,
                  indexLabelPlacement: "outside",
                  indexLabelFontFamily: "Montserrat",
                  // color: chartColors[index % chartColors.length],
                  color: chartColors[index + (4 % chartColors.length)],
                })),
              },
            ],
          }}
          containerProps={{ height: height, width: "100%" }}
        />
      </div>
      {/* Custom Legends */}
      <div className="flex gap-2 justify-content-start w-full">
        {series.map((value, index) => (
          <div key={index} className="flex align-items-center">
            <div
              className="mr-1 border-circle"
              style={{
                width: "0.5rem",
                height: "0.5rem",
                backgroundColor: chartColors[index + (4 % chartColors.length)],
              }}
            ></div>
            <span className="text-xs text-left">{categories[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

//healthcare, employment, education
export const GroupedColumnChart = ({
  title,
  dataSeries,
  labels,
  dataPointWidth,
  height,
  fontSize,
}) => {
  // const chartColors = ["#98C6CF", "#1F8297", "#166c7d", "#e9f3f5"];
  // console.log(dataSeries);
  const options = {
    animationEnabled: true,
    interactivityEnabled: false,
    title: {
      text: title,
      ...commonChartOptions.title,
    },
    backgroundColor: "transparent",
    axisY: {
      gridThickness: 0,
      labelFontSize: 0,
      lineThickness: 0.2,
      tickLength: 0,
    },
    axisX: {
      // interval: 1,
      gridThickness: 0,
      labelFontSize: fontSize,
      labelFontFamily: "Montserrat",
      // labelMaxWidth: 100,
      // labelWrap: true,
      tickLength: 0,
      lineThickness: 0,
      // labelFormatter: function () {
      //   return " ";
      // },
    },

    toolTip: {
      shared: true,
      cornerRadius: 4,
    },
    legend: {
      horizontalAlign: "left",
      // verticalAlign: "bottom",
      ...commonChartOptions.legend,
      fontColor: "#737474",
    },
    dataPointWidth: dataPointWidth,
    data: dataSeries.map((data, index) => {
      // console.log(data);
      return {
        type: "column",
        name: data.name,
        color: chartColors[index + (4 % chartColors.length)],
        showInLegend: true,
        indexLabel: "{y}",
        indexLabelPlacement: "outside",
        indexLabelFontColor: commonChartOptions.indexLabelOptions.fontColor, // Use common options
        indexLabelFontSize: commonChartOptions.indexLabelOptions.fontSize, // Use common options
        indexLabelFontFamily: commonChartOptions.indexLabelOptions.fontFamily, // Use common options
        indexLabelFontWeight: commonChartOptions.indexLabelOptions.fontWeight, // Use common options
        dataPoints: data.data?.map((val, index) => ({
          label: labels[index],
          y: val,
        })),
      };
    }),
  };

  return (
    <CanvasJSChart
      options={options}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

//used nowhere currently
export const StackedColumnChart = ({
  title,
  categories,
  series,
  height,
  labels,
}) => {
  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        title: {
          text: title,
          ...commonChartOptions.title,
        },
        backgroundColor: "transparent",
        axisY: {
          ...commonChartOptions.axisY,
        },
        axisX: {
          ...commonChartOptions.axisX,
        },
        legend: {
          ...commonChartOptions.legend,
        },
        data: categories.map((category, index) => ({
          type: "stackedColumn",
          name: category,
          showInLegend: true,
          color: chartColors[index % chartColors.length],
          dataPoints: labels.map((year, i) => ({
            label: year,
            y: series[i][index],
          })),
        })),
      }}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

//cultural sites
export const CombinationChart = ({
  title,
  categories,
  totalSites,
  maintainedSites,
  height,
}) => {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        title: {
          text: title,
          ...commonChartOptions.title,
        },
        backgroundColor: "transparent",
        axisX: {
          ...commonChartOptions.axisX,
        },
        axisY: {
          gridThickness: 0,
          labelFontSize: 0,
          lineThickness: 0,
          tickLength: 0,
          labelFormatter: function () {
            return " ";
          },
        },
        toolTip: {
          shared: true,
        },
        legend: {
          ...commonChartOptions.legend,
          horizontalAlign: "left",
        },
        data: [
          {
            type: "column",
            name: "Total Cultural Sites",
            showInLegend: true,
            color: "#4D7479",
            dataPoints: totalSites.map((value, i) => ({
              y: value,
              label: categories[i],
              indexLabel: `{y}`,
              indexLabelPlacement: "outside",
              indexLabelFontColor:
                commonChartOptions.indexLabelOptions.fontColor, // Use common options
              indexLabelFontSize: commonChartOptions.indexLabelOptions.fontSize, // Use common options
              indexLabelFontFamily:
                commonChartOptions.indexLabelOptions.fontFamily, // Use common options
              indexLabelFontWeight:
                commonChartOptions.indexLabelOptions.fontWeight, // Use common options
            })),
          },
          {
            type: "line",
            name: "Maintained Sites",
            showInLegend: true,
            lineThickness: 2,
            markerType: "circle",
            color: "#F7A47A",
            dataPoints: maintainedSites.map((value, i) => ({
              y: value,
              label: categories[i],
              indexLabel: `{y}`,
              indexLabelPlacement: "outside",
              indexLabelFontSize: commonChartOptions.indexLabelOptions.fontSize, // Use common options
              indexLabelFontFamily:
                commonChartOptions.indexLabelOptions.fontFamily, // Use common options
              indexLabelFontWeight:
                commonChartOptions.indexLabelOptions.fontWeight, // Use common options
              indexLabelFontColor: "white",
            })),
          },
        ],
      }}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

//used nowhere currently
export const ParetoChart = ({
  title,
  categories,
  data,
  height,
  width,
  xtitle,
  ytitle,
}) => {
  const [lineDataPoints, setLineDataPoints] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lineDataPoints.length >= categories.length) {
        setLineDataPoints([]);
      } else {
        const nextIndex = lineDataPoints.length;
        setLineDataPoints((prevPoints) => [
          ...prevPoints,
          { label: categories[nextIndex], y: data[nextIndex] },
        ]);
      }
    }, 300); // Adjust the interval time to control the animation speed

    return () => clearInterval(interval);
  }, [categories, data, lineDataPoints]);

  const chartData = categories.map((category, index) => ({
    label: category,
    y: data[index],
  }));

  const options = {
    height: height,
    width: width,
    animationEnabled: true,
    title: {
      text: title,
      ...commonChartOptions.title,
    },
    axisX: {
      title: xtitle,
      gridThickness: 0,
    },
    axisY: {
      title: ytitle,
      gridThickness: 0,
    },
    backgroundColor: "transparent",
    data: [
      {
        type: "column",
        // name: "Score",
        showInLegend: true,
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        indexLabelFontColor: commonChartOptions.indexLabelOptions.fontColor, // Use common options
        indexLabelFontSize: commonChartOptions.indexLabelOptions.fontSize, // Use common options
        indexLabelFontFamily: commonChartOptions.indexLabelOptions.fontFamily, // Use common options
        indexLabelFontWeight: commonChartOptions.indexLabelOptions.fontWeight, // Use common options
        dataPoints: chartData,
        color: chartColors[2],
      },
      {
        type: "line",
        name: "Trend",
        showInLegend: true,
        indexLabelPlacement: "outside",
        indexLabelFontColor: commonChartOptions.indexLabelOptions.fontColor, // Use common options
        indexLabelFontSize: commonChartOptions.indexLabelOptions.fontSize, // Use common options
        indexLabelFontFamily: commonChartOptions.indexLabelOptions.fontFamily, // Use common options
        indexLabelFontWeight: commonChartOptions.indexLabelOptions.fontWeight, // Use common options,
        dataPoints: lineDataPoints,
        color: chartColors[4],
      },
    ],
  };

  return (
    <div className="esg-chart z-index-low">
      <CanvasJSChart options={options} />
    </div>
  );
};

//culture, education, transport
export const LineChart = ({
  title,
  categories,
  data,
  xtitle,
  ytitle,
  height,
}) => {
  const options = {
    animationEnabled: true,
    title: {
      text: title,
      ...commonChartOptions.title,
    },
    backgroundColor: "transparent",
    axisX: {
      title: xtitle,
      labelFontSize: 10,
      interval: 1,
      labelFontFamily: "Montserrat",
      lineThickness: 0.5,
    },
    axisY: {
      title: ytitle,
      labelFontSize: 0,
      gridThickness: 0.5,
      gridDashType: "dash",
      tickLength: 0,
      lineThickness: 0,
      labelFormatter: function () {
        return " ";
      },
    },

    data: data.map((series, index) => ({
      type: "line",
      name: categories[index],
      showInLegend: false,
      markerType: "circle",
      markerSize: 5,
      dataPoints: data.map((value, i) => ({
        y: value,
        label: categories[i], // Assuming categories array represents labels on the X-axis
        indexLabel: `{y}`,
        indexLabelPlacement: "outside",
        indexLabelFontColor: commonChartOptions.indexLabelOptions.fontColor, // Use common options
        indexLabelFontSize: commonChartOptions.indexLabelOptions.fontSize, // Use common options
        indexLabelFontFamily: commonChartOptions.indexLabelOptions.fontFamily, // Use common options
        indexLabelFontWeight: commonChartOptions.indexLabelOptions.fontWeight, // Use common options
      })),
      color: "#1F8297",
    })),
  };

  return (
    <CanvasJSChart
      options={options}
      containerProps={{
        height: height,
        width: "100%",
        style: {
          width: "100%",
          height: `${height}px`,
          transform: "scale(1)",
          transformOrigin: "0 0",
        },
      }}
    />
  );
};

//healthcare- chronic disease
export const ModifiedLineChart = ({
  title,
  categories,
  data,
  labels,
  series,
  xtitle,
  ytitle,
  height,
}) => {
  const options = {
    animationEnabled: true,
    title: {
      text: title,
      ...commonChartOptions.title,
    },
    backgroundColor: "transparent",
    axisX: {
      interval: 1,
      title: xtitle,
      labelFontSize: 10,
      labelFontFamily: "Montserrat",
    },
    axisY: {
      title: ytitle,
      labelFontSize: 10,
      gridThickness: 0,
      labelFontFamily: "Montserrat",
    },
    legend: {
      horizontalAlign: "right",
      verticalAlign: "center",
      ...commonChartOptions.legend,
      fontColor: "#737474",
    },
    data: categories.map((category, index) => ({
      type: "line",
      name: category, // Each disease is a separate line
      showInLegend: true,
      markerType: "circle",
      markerSize: 5,
      dataPoints: labels.map((label, labelIndex) => ({
        y: series[labelIndex][index], // Value for the disease in the year
        label: label, // Year as label
      })),
      color: chartColors[index % chartColors.length], // Cycles through chartColors array
    })),
  };

  return (
    <CanvasJSChart
      options={options}
      containerProps={{
        height: height,
        width: "100%",
        style: {
          width: "100%",
          height: `${height}px`,
          transform: "scale(1)",
          transformOrigin: "0 0",
        },
      }}
    />
  );
};

//water, employment
export const PieChartRow = ({
  title,
  categories,
  series,
  height,
  fontSize,
}) => {
  const total = series.reduce((acc, value) => acc + value, 0);

  return (
    <div className="flex align-items-center w-full">
      <div className="flex w-full">
        <CanvasJSChart
          options={{
            animationEnabled: true,
            interactivityEnabled: false,
            title: {
              text: title,
              ...commonChartOptions.title,
            },
            backgroundColor: "transparent",
            data: [
              {
                type: "pie",
                startAngle: 280,
                toolTipContent: "<b>{label}</b>: {y}",
                showInLegend: false,
                indexLabelFontFamily: "Montserrat",
                indexLabelFontSize: fontSize,
                indexLabelPlacement: "inside",
                indexLabel: "#percent%",
                indexLabelFontColor: "white",
                dataPoints: series.map((value, index) => ({
                  y: value,
                  label: categories[index],
                  // color: chartColors[index % chartColors.length], // Use modulus for consistent color assignment
                  color: chartColors[index + (4 % chartColors.length)],
                  percent: ((value / total) * 100).toFixed(2), // Corrected percentage calculation
                })),
              },
            ],
          }}
          containerProps={{ height: height, width: "100%" }}
        />
      </div>

      {/* Custom Legends */}
      <div className="flex flex-column gap-1">
        {series.map((value, index) => (
          <div
            key={index}
            className="flex gap-2 justify-content-between"
            style={{ width: "100%" }}
          >
            <div className="flex align-items-center">
              <div
                className="mr-2 border-circle"
                style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  backgroundColor:
                    chartColors[index + (4 % chartColors.length)], // Ensure consistent color usage here as well
                }}
              ></div>
              <span className="card-text text-sm">{categories[index]}</span>
            </div>
            <div className="font-semibold">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

//nature, society
export const PieChart = ({ title, categories, series, height, fontSize }) => {
  const total = series.reduce((acc, value) => acc + value, 0);

  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        interactivityEnabled: false,
        title: {
          text: title,
          ...commonChartOptions.title,
        },
        backgroundColor: "transparent",
        legend: {
          ...commonChartOptions.legend,
          horizontalAlign: "right",
          verticalAlign: "center",
        },
        data: [
          {
            type: "pie",
            startAngle: 280,
            toolTipContent: "<b>{label}</b>: {y}",
            showInLegend: true,
            legendText: "{label}",
            indexLabelFontFamily: "Montserrat",
            indexLabelFontSize: fontSize,
            indexLabelPlacement: "inside",
            indexLabel: "#percent%",
            indexLabelFontColor: "white",
            dataPoints: series.map((value, index) => ({
              y: value,
              label: categories[index],
              // color: chartColors[index % chartColors.length], // Use modulus for consistent color assignment
              color: chartColors[index + (4 % chartColors.length)],
              percent: ((value / total) * 100).toFixed(2), // Corrected percentage calculation
            })),
          },
        ],
      }}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

//healthcare, waste
export const PieChartColumn = ({
  title,
  categories,
  series,
  height,
  fontSize,
}) => {
  const total = series.reduce((acc, value) => acc + value, 0);

  return (
    <div className="flex flex-column align-items-center w-full">
      <div className="flex w-full">
        <CanvasJSChart
          options={{
            animationEnabled: true,
            interactivityEnabled: false,
            title: {
              text: title,
              ...commonChartOptions.title,
            },
            backgroundColor: "transparent",
            data: [
              {
                type: "pie",
                startAngle: 280,
                toolTipContent: "<b>{label}</b>: {y}",
                showInLegend: false,
                indexLabelFontFamily: "Montserrat",
                indexLabelFontSize: fontSize,
                indexLabelPlacement: "inside",
                indexLabel: "#percent%",
                indexLabelFontColor: "white",
                dataPoints: series.map((value, index) => ({
                  y: value,
                  label: categories[index],
                  // color: chartColors[index % chartColors.length], // Use modulus for consistent color assignment
                  color: chartColors[index + (4 % chartColors.length)],
                  percent: ((value / total) * 100).toFixed(2), // Corrected percentage calculation
                })),
              },
            ],
          }}
          containerProps={{ height: height, width: "100%" }}
        />
      </div>

      {/* Custom Legends */}
      <div className="flex flex-wrap">
        {series.map((value, index) => (
          <div
            key={index}
            className="flex justify-content-between"
            style={{ width: "80%" }}
          >
            <div className="flex align-items-center">
              <div
                className="mr-2 border-circle"
                style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  backgroundColor:
                    chartColors[index + (4 % chartColors.length)], // Ensure consistent color usage here as well
                }}
              ></div>
              <span className="card-text text-xs">{categories[index]}</span>
            </div>
            <div className="font-semibold text-sm">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

//land distribution
export const ModifiedPieChart = ({ title, categories, series, height }) => {
  const total = series.reduce((acc, value) => acc + value, 0);
  return (
    <div className="flex flex-column align-items-center justify-content-around w-full">
      <div className="flex w-full">
        <CanvasJSChart
          options={{
            animationEnabled: true,
            interactivityEnabled: false,
            title: {
              text: title,
              ...commonChartOptions.title,
              padding: { bottom: 40 },
            },
            backgroundColor: "transparent",
            legend: {
              enabled: false, // Disable default legend
            },
            data: [
              {
                type: "pie",
                startAngle: 90,
                toolTipContent: "<b>{label}</b>: #percent%",
                showInLegend: false, // Disable showInLegend since we're using custom legends
                radius: 180,
                indexLabel: "{y} ha", // Show label and value
                indexLabelFontSize: 14,
                indexLabelPlacement: "outside",
                indexLabelFontFamily: "Montserrat",
                indexLabelFontWeight: 500,
                dataPoints: series.map((value, index) => ({
                  y: value,
                  label: categories[index],
                  color: chartColors[index % chartColors.length],
                  percent: ((value / total) * 100).toFixed(2),
                })),
              },
            ],
          }}
          containerProps={{ height: height, width: "100%" }}
        />
      </div>

      {/* Custom Legends */}
      <div className="flex flex-wrap">
        {series.map((value, index) => (
          <div
            key={index}
            className="flex align-items-center mb-1"
            style={{ width: "50%" }}
          >
            <div
              className="mr-2"
              style={{
                width: "0.7rem",
                height: "0.7rem",
                backgroundColor: chartColors[index % chartColors.length],
              }}
            ></div>
            <span className="text-lg">{categories[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

//used nowhere currently
export const GaugeChart = ({ title, gaugeValue, maxValue, height, color }) => {
  const createGaugeOptions = () => {
    // Calculation for the unoccupied (remaining) value
    const unoccupied = {
      y: maxValue - gaugeValue,
      color: "#e9f3f5", // Color for the unoccupied portion
      toolTipContent: null, // Disable tooltip for this section
      highlightEnabled: false,
      click: function () {
        unoccupied.exploded = true; // Explode effect on click
      },
    };

    // The filled portion of the gauge
    const data = {
      y: gaugeValue,
      color: color, // Default color for the gauge
      click: function () {
        data.exploded = true; // Explode effect on click
      },
    };

    return {
      animationEnabled: true,
      title: {
        text: title,
        fontSize: 10,
        fontFamily: "Montserrat",
        fontWeight: 500,
      },
      backgroundColor: "transparent",
      subtitles: [
        {
          text: `${gaugeValue}`, // Display the gauge value in the center
          verticalAlign: "center",
          horizontalAlign: "center",
          fontSize: 10,
          fontFamily: "Montserrat",
          fontWeight: 600,
          fontColor: "#00403c",
        },
      ],
      data: [
        {
          type: "doughnut",
          startAngle: 0, // Half-circle effect
          endAngle: 180,
          radius: "200%", // Adjust the radius to make the gauge bigger
          innerRadius: "80%", // Adjust the inner radius to control the thickness of the gauge
          dataPoints: [
            { y: maxValue, color: "transparent", toolTipContent: null }, // Full background (transparent)
            data, // Filled section
            unoccupied, // Empty section
          ],
        },
      ],
    };
  };

  return (
    <CanvasJSChart
      options={createGaugeOptions()} // Pass the dynamically created gauge options
      containerProps={{ height: height, width: "100%" }} // Adjust height and width of the chart
    />
  );
};
