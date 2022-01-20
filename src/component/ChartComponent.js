import React from "react";
import ReactApexChart from "react-apexcharts";
import { macd } from "technicalindicators";

const ChartComponents = (props) => {
  const { candleDataGraph, volumeDataGraph, historygram, signal, macd } = props;
  console.log(historygram, signal, macd);

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
        width: 2,
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
                from: 0.0001,
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
        type="bar"
        series={chartData.seriesBar}
        height={160}
      />
    </>
  );
};

export default ChartComponents;
