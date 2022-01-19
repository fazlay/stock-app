import logo from "./logo.svg";
import "./App.css";
import ApexCharts from "./component/ApexChart";
import ChartComponents from "./component/ChartComponent";
import { useEffect, useState } from "react";

function App() {
  const [newData, setNewData] = useState({});
  const [candleDataGraph, setCandleDataGraph] = useState([]);
  const [volumeDataGraph, setVolumeDataGraph] = useState([]);
  const [isDataChanged, setIsdatachanged] = useState(false);
  useEffect(() => {
    fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=QTVKD8VAWG4J36D6"
    ).then((res) =>
      res.json().then((data) => {
        console.log(data["Time Series (5min)"]);
        setNewData(data);
        setIsdatachanged(true);
      })
    );
  }, []);
  //-----------------------------------------------
  const finalCandleStick = [];
  const volume = [];
  if (Object.keys(newData).length !== 0) {
    Object.keys(newData["Time Series (5min)"]).forEach((key) => {
      const candleData = [];

      Object.keys(newData["Time Series (5min)"][key]).forEach((element) =>
        candleData.push(parseFloat(newData["Time Series (5min)"][key][element]))
      );

      let newVolume = candleData.pop();
      volume.push(newVolume);
      finalCandleStick.push({
        x: key.slice(11, 13),
        y: candleData,
      });
    });

    // console.log(volume);
    // console.log(finalCandleStick);
  }
  useEffect(() => {
    setVolumeDataGraph(volume);
    setCandleDataGraph(finalCandleStick);
    console.log("im inside set function");
  }, [isDataChanged]);

  // if (Object.keys(newData).length !== 0) {
  //   Object.keys(newData["Time Series (5min)"]).forEach((key) => {
  //     console.log(key.slice(10, 20));
  //   });
  // }
  return (
    <div className="App">
      {/* <ApexCharts></ApexCharts> */}
      <ChartComponents
        candleDataGraph={candleDataGraph}
        volumeDataGraph={volumeDataGraph}
      ></ChartComponents>
    </div>
  );
}

export default App;

//https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=QTVKD8VAWG4J36D6
