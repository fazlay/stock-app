import React, { useEffect, useState } from "react";
import { MACD } from "technicalindicators";
import ChartComponents from "../component/ChartComponent";
import Select from "react-select";
import "../App.css";
const options = [
  { value: "AAPL", label: "AAPL-APPLE INC" },
  { value: "MSFT", label: "MSFT-Microsoft Corporation" },
  { value: "BAC", label: "BAC-Bank of America Corporation " },
  { value: "AMD", label: "AMD-Advance Micro Device " },
  { value: "TCS", label: "TCS-Tata consultancy S" },
  { value: "NS", label: "NS-Nustar Energy l.p" },
];

const Homepage = () => {
  const [newData, setNewData] = useState({});
  const [candleDataGraph, setCandleDataGraph] = useState([]);
  const [volumeDataGraph, setVolumeDataGraph] = useState([]);
  const [closeValuMcad, setCloseValuMcad] = useState([]);
  const [historygram, setHistorygram] = useState([]);
  const [macd, setMacd] = useState([]);
  const [signal, setSignal] = useState([]);
  const [isDataChanged, setIsdatachanged] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    value: "TCS",
    label: "TCS-Tata consultancy S",
  });

  const finalCandleStick = [];
  const volume = [];
  const closeValue = [];

  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${selectedOption.value}&interval=5min&apikey=QTVKD8VAWG4J36D6`;
  // console.log(apiUrl, selectedOption);
  useEffect(() => {
    fetch(apiUrl).then((res) =>
      res.json().then((data) => {
        console.log(data);
        setNewData(data);
        setIsdatachanged(!isDataChanged);
      })
    );
  }, [selectedOption]);

  // if (Object.keys(newData).length !== 0) {
  //   Object.keys(newData["Time Series (5min)"]).forEach((key) => {
  //     const candleData = [];

  //     Object.keys(newData["Time Series (5min)"][key]).forEach((element) =>
  //       candleData.push(parseFloat(newData["Time Series (5min)"][key][element]))
  //     );

  //     let newVolume = candleData.pop();
  //     closeValue.push(candleData[3]);
  //     volume.push(newVolume);
  //     finalCandleStick.push({
  //       x: key.slice(11, 13),
  //       y: candleData,
  //     });
  //   });
  // }

  // const macdInput = {
  //   values: closeValue,
  //   fastPeriod: 5,
  //   slowPeriod: 8,
  //   signalPeriod: 3,
  //   SimpleMAOscillator: false,
  //   SimpleMASignal: false,
  // };
  // const historygramData = [];
  // const calculatedMacd = [];
  // const signalData = [];
  // const mcadData = MACD.calculate(macdInput);
  // if (mcadData.length !== 0) {
  //   mcadData.map(
  //     (element) => (
  //       historygramData.push(element["histogram"] * 100),
  //       calculatedMacd.push(element["MACD"] * 100),
  //       signalData.push(element["signal"] * 100)
  //     )
  //   );
  // }

  useEffect(() => {
    console.log(" Big Function rendered");
    if (Object.keys(newData).length !== 0) {
      Object.keys(newData["Time Series (5min)"]).forEach((key) => {
        const candleData = [];

        Object.keys(newData["Time Series (5min)"][key]).forEach((element) =>
          candleData.push(
            parseFloat(newData["Time Series (5min)"][key][element])
          )
        );

        let newVolume = candleData.pop();
        closeValue.push(candleData[3]);
        volume.push(newVolume);
        finalCandleStick.push({
          x: key.slice(11, 13),
          y: candleData,
        });
      });
    }

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
          historygramData.push((element["histogram"] * 100).toFixed(2)),
          calculatedMacd.push((element["MACD"] * 100).toFixed(2)),
          signalData.push((element["signal"] * 100).toFixed(2))
        )
      );
    }
    setVolumeDataGraph(volume);
    setCandleDataGraph(finalCandleStick);
    setCloseValuMcad(closeValue);
    setHistorygram(historygramData);
    setMacd(calculatedMacd);
    setSignal(signalData);
  }, [isDataChanged]);

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    console.log(value.value);
    // setSelectedOption;
  };

  return (
    <div>
      <h1 className="title">
        STOCK{" "}
        <span className="chart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-2 w-2"
            fill="none"
            width={40}
            height={70}
            viewBox="0 0 22 8"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
        </span>{" "}
        TODAY
      </h1>
      <div className="drop">
        <div>
          <Select
            className="options"
            defaultValue={selectedOption[1]}
            onChange={handleSelectChange}
            options={options}
          />
        </div>

        <div>
          <h1 className="symbol">{selectedOption.value}</h1>
        </div>
      </div>

      <ChartComponents
        candleDataGraph={candleDataGraph}
        volumeDataGraph={volumeDataGraph}
        historygram={historygram}
        macd={macd}
        signal={signal}
      ></ChartComponents>
    </div>
  );
};

export default Homepage;
