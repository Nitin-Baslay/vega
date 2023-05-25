import logo from "./logo.svg";
import "./App.css";
import Search from "./components/Search";
import Caption from "./components/Caption";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Search />} />
        <Route path="caption" element={<Caption />} />
      </Routes>
    </div>
  );
}

export default App;
