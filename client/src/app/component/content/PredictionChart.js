import React from "react";
// import Plot from 'react-plotlyjs';
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-basic";
const PlotlyComponent = createPlotlyComponent(Plotly);

const PredictionChart = ({ years, values, companyName, country, type }) => {
  // Function to format numbers into billions or millions
  const formatValue = (val) => {
    if (val >= 1e9) {
      return `$${(val / 1e9).toFixed(2)}B`; // Convert to billions
    } else if (val >= 1e6) {
      return `$${(val / 1e6).toFixed(2)}M`; // Convert to millions
    } else {
      return `$${val.toFixed(2)}`; // Keep as is for smaller values
    }
  };


  let data = [
    {
      x: years,
      y: values,
      mode: "lines+markers",
      name: `${
        type === "stock"
          ? "Stock Price"
          : type === "market"
          ? "Market Share"
          : type === "revenue"
          ? "Rebemue"
          : "Expense"
      } (in USD)`,
      line: {
        color: "purple",
        width: 3,
        shape: "spline",
        smoothing: 1.3,
      },
      marker: {
        symbol: "circle",
        size: 10,
        color: "purple",
        line: {
          width: 2,
          color: "DarkSlateGrey",
        },
      },
      hovertemplate: `<b>Year:</b> %{x}<br><b>${
        type === "stock"
          ? "Stock Price"
          : type === "market"
          ? "Market Share"
          : type === "revenue"
          ? "Revenue"
          : "Expense"
      }:</b> %{customdata}<extra></extra>`,
      customdata: type === "market" ? values : values.map(formatValue),
    },
  ];

  let layout = {
    title: {
      text: `${
        type === "stock"
          ? "Stock Price"
          : type === "market"
          ? "Market Share"
          : type === "revenue"
          ? "Revenue"
          : "Expense"
      } for ${companyName} in ${country} (2015-2025)`,
      x: 0.5,
      xanchor: "center",
      font: {
        size: 20,
        color: "black",
        family: "Verdana",
      },
    },
    xaxis: {
      title: {
        text: "Year",
        font: {
          size: 15,
          color: "black",
          family: "Verdana",
        },
      },
      showgrid: true,
      gridwidth: 1,
      gridcolor: "LightGray",
      tickmode: "linear",
      dtick: 1,
      zeroline: false,
    },
    yaxis: {
      title: {
        text: "Value",
        font: {
          size: 15,
          color: "black",
          family: "Verdana",
        },
      },
      showgrid: true,
      gridwidth: 1,
      gridcolor: "LightGray",
      zeroline: false,
    },
    width: 600,
    height: 400,
    plot_bgcolor: "rgba(240, 240, 240, 1)",
    paper_bgcolor: "rgba(255, 255, 255, 1)",
    hovermode: "x",
    legend: {
      title: {
        text: "Legend",
        font: {
          size: 13,
          color: "black",
          family: "Verdana",
        },
      },
      orientation: "h",
      yanchor: "bottom",
      y: 1.02,
      xanchor: "right",
      x: 1,
    },
    annotations: [
      {
        x: years[years.length - 2],
        y: values[values.length - 2],
        text: "Most Recent Value",
        showarrow: true,
        arrowhead: 2,
        ax: 0,
        ay: -40,
        font: { size: 12, color: "black" },
        arrowcolor: "black",
        arrowsize: 1.5,
      },
      {
        x: years[years.length - 1],
        y: values[values.length - 1],
        text: "Predicted Value",
        showarrow: true,
        arrowhead: 2,
        ax: 0,
        ay: -40,
        font: { size: 12, color: "red" },
        arrowcolor: "red",
        arrowsize: 1.5,
      },
    ],
  };

  return <PlotlyComponent data={data} layout={layout} />;
};

export default PredictionChart;
