import "./App.css";
import Footer from "./component/Footer";
import Homepage from "./Page/HomePage";

function App() {
  return (
    <div className="App">
      <Homepage></Homepage>
      <Footer></Footer>
    </div>
  );
}

export default App;

//https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=QTVKD8VAWG4J36D6
