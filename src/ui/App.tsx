import { useMemo, useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { useStatistics } from "./useStatistics";
import { Chart } from "./Chart";
import "./App.css";

function App() {
  // //@ts-ignore
  // window.electron.getStaticData();
  const statistics = useStatistics(10);

  const cpuUsages = useMemo(
    () => statistics.map((stat) => stat.cpuUsage),
    [statistics]
  );

  const ramUsage = useMemo(
    () => statistics.map((stat) => stat.ramUsage),
    [statistics]
  );

  const storageUsage = useMemo(
    () => statistics.map((stat) => stat.storageUsage),
    [statistics]
  );
  // console.log(statistics);
  // console.log(cpuUsages);
  // console.log(cpuUsages);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div style={{ height: 120 }}>
        {/* chart goes here */}
        <h2>CPU Usage:</h2>
        <Chart data={cpuUsages} maxDataPoints={10} />
        <h2>RAM Usage:</h2>
        <Chart data={ramUsage} maxDataPoints={10} />
        <h2>Storage Usage:</h2>
        <Chart data={storageUsage} maxDataPoints={10} />
      </div>
    </>
  );
}

export default App;
