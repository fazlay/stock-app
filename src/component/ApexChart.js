import React from "react";
import ReactApexChart from "apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: [
            [1538856000000, [6593.34, 6600, 6582.63, 6600]],
            [1538856900000, [6595.16, 6604.76, 6590.73, 6593.86]],
          ],
        },
      ],
      options: {
        chart: {
          type: "candlestick",
          height: 290,
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
              upward: "#3C90EB",
              downward: "#DF7D46",
            },
          },
        },
        xaxis: {
          type: "datetime",
        },
      },

      seriesBar: [
        {
          name: "volume",
          data: [1538856000000, 6593.34, 6600, 6582.63, 6600],
        },
      ],
      optionsBar: {
        chart: {
          height: 160,
          type: "bar",
          brush: {
            enabled: true,
            target: "candles",
          },
          selection: {
            enabled: true,
            xaxis: {
              min: new Date("20 Jan 2017").getTime(),
              max: new Date("10 Dec 2017").getTime(),
            },
            fill: {
              color: "#ccc",
              opacity: 0.4,
            },
            stroke: {
              color: "#0D47A1",
            },
          },
        },
        dataLabels: {
          enabled: false,
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
        stroke: {
          width: 0,
        },
        xaxis: {
          type: "datetime",
          axisBorder: {
            offsetX: 13,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
      },
    };
  }

  render() {
    return (
      <div class="chart-box">
        <div id="chart-candlestick">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="candlestick"
            height={290}
          />
        </div>
        <div id="chart-bar">
          <ReactApexChart
            options={this.state.optionsBar}
            series={this.state.seriesBar}
            type="bar"
            height={160}
          />
        </div>
      </div>
    );
  }
}

export default ApexChart;
