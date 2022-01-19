import React from "react";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";

const ChartComponents = (props) => {
  const { candleDataGraph, volumeDataGraph } = props;
  console.log(candleDataGraph, volumeDataGraph);
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
        legend: {
          title: "dan",
        },
      },
    },

    dataLabels: {
      enabled: false,
    },
    seriesBar: [
      {
        name: "Cash Flow",
        data: volumeDataGraph,
      },
    ],
    optionsBar: {
      stroke: {
        show: false,
      },
      plotOptions: {
        bar: {
          columnWidth: "80%",
          colors: {
            ranges: [
              {
                from: -1000,
                to: 0,
                color: "#F15B46",
              },
              {
                from: 1,
                to: 10000,
                color: "#FEB019",
              },
            ],
          },
        },
      },
      chart: {
        height: 160,
        type: "bar",
        brush: {
          enabled: true,
          target: "candles",
        },
        selection: {
          enabled: true,
          //   xaxis: {
          //     min: new Date('20 Jan 2022').getTime(),
          //     max: new Date('10 Dec 2022').getTime()
          //   },
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
        options={chartData.options}
        series={chartData.series}
        type="candlestick"
        height={350}
      />

      <ReactApexChart
        options={chartData.optionsBar}
        series={chartData.seriesBar}
        type="bar"
        height={160}
      />
    </>
  );
};

export default ChartComponents;
