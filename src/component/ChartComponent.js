import React from "react";
import ReactApexChart from "react-apexcharts";
import "../App.css";

const ChartComponents = (props) => {
  const { candleDataGraph, historygram, signal, macd } = props;
  // console.log(candleDataGraph, signal, macd);

  const chartData = {
    series: [
      {
        name: "candle",
        data: candleDataGraph,
      },
    ],
    options: {
      chart: {
        height: 290,
        type: "candlestick",
        id: "candles",
        toolbar: {
          autoSelected: "pan",
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },

      plotOptions: {
        candlestick: {
          colors: {
            upward: "#3c90EB",
            downward: "#DF7D46",
          },
        },
      },
      xaxis: {
        type: "category",
        tickPlacement: "between",
      },
      yaxis: {
        show: true,
      },
    },

    dataLabels: {
      enabled: false,
    },
    seriesBar: [
      {
        name: "Historygram",
        type: "bar",

        data: historygram,
      },
      {
        name: "Signal",
        type: "line",
        data: signal,
      },
      {
        name: "MACD",
        type: "line",
        data: macd,
      },
    ],
    optionsBar: {
      stroke: {
        show: true,
        width: 1,
      },
      plotOptions: {
        bar: {
          columnWidth: "80%",
          colors: {
            ranges: [
              {
                from: -10,
                to: 0,
                color: "#F15B46",
              },
              {
                from: 0.001,
                to: 10,
                color: "#FEB019",
              },
            ],
          },
        },
      },
      chart: {
        height: 160,

        brush: {
          enabled: true,
          target: "candles",
        },
        selection: {
          enabled: false,
          yaxis: {
            labels: {
              formatter: function (value) {
                return value + "$";
              },
            },
          },
          xaxis: {
            labels: {
              formatter: function (value) {
                return value;
              },
            },
          },
          fill: {
            color: "#ccc",
            opacity: 0.4,
          },
        },
      },
    },
  };

  return (
    <>
      <ReactApexChart
        className="candleStick"
        options={chartData.options}
        series={chartData.series}
        type="candlestick"
        height={350}
      />

      <ReactApexChart
        className="barChart"
        options={chartData.optionsBar}
        type="bar"
        series={chartData.seriesBar}
        height={160}
        width={1250}
      />
    </>
  );
};

export default ChartComponents;
