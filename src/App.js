import "./App.css";
import { MACD } from "technicalindicators";
import ChartComponents from "./component/ChartComponent";
import { useEffect, useState } from "react";

function App() {
  const [newData, setNewData] = useState({});
  const [candleDataGraph, setCandleDataGraph] = useState([]);
  const [volumeDataGraph, setVolumeDataGraph] = useState([]);
  const [closeValuMcad, setCloseValuMcad] = useState([]);
  const [historygram, setHistorygram] = useState([]);
  const [macd, setMacd] = useState([]);
  const [signal, setSignal] = useState([]);
  const [isDataChanged, setIsdatachanged] = useState(false);
  useEffect(() => {
    fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=QTVKD8VAWG4J36D6"
    ).then((res) =>
      res.json().then((data) => {
        console.log(data);
        setNewData(data);
        setIsdatachanged(true);
      })
    );
  }, []);
  //-----------------------------------------------
  const finalCandleStick = [];
  const volume = [];
  const closeValue = [];
  if (Object.keys(newData).length !== 0) {
    Object.keys(newData["Time Series (5min)"]).forEach((key) => {
      const candleData = [];

      Object.keys(newData["Time Series (5min)"][key]).forEach((element) =>
        candleData.push(parseFloat(newData["Time Series (5min)"][key][element]))
      );

      let newVolume = candleData.pop();
      closeValue.push(candleData[3]);
      volume.push(newVolume);
      finalCandleStick.push({
        x: key.slice(11, 13),
        y: candleData,
      });
    });

    // console.log(volume);
    // console.log(finalCandleStick);
    // console.log("This is close Value", closeValue);
  }

  // const average = (array) => array.reduce((a, b) => a + b, 0) / array.length;
  // console.log("This is 12 days avarage", average(closeValue.slice(0, 12)));
  // console.log("This is 26 days avarage", average(closeValue.slice(0, 26)));

  const macdInput = {
    values: closeValue,
    fastPeriod: 5,
    slowPeriod: 8,
    signalPeriod: 3,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  };
  const historygramData = [];
  const calculatedMacd = [];
  const signalData = [];
  const mcadData = MACD.calculate(macdInput);
  if (mcadData.length !== 0) {
    mcadData.map(
      (element) => (
        historygramData.push(element["histogram"] * 100),
        calculatedMacd.push(element["MACD"] * 100),
        signalData.push(element["signal"] * 100)
      )
    );
  }

  // if (Object.keys(newData).length !== 0) {
  //   Object.keys(newData["Time Series (5min)"]).forEach((key) => {
  //     console.log(key.slice(10, 20));
  //   });
  // }

  useEffect(() => {
    setVolumeDataGraph(volume);
    setCandleDataGraph(finalCandleStick);
    setCloseValuMcad(closeValue);
    setHistorygram(historygramData);
    setMacd(calculatedMacd);
    setSignal(signalData);
  }, [isDataChanged]);
  return (
    <div className="App">
      <ChartComponents
        candleDataGraph={candleDataGraph}
        volumeDataGraph={volumeDataGraph}
        historygram={historygram}
        macd={macd}
        signal={signal}
      ></ChartComponents>
    </div>
  );
}

export default App;

//https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=QTVKD8VAWG4J36D6
