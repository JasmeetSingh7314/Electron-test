import { useEffect, useMemo } from "react";
import reactLogo from "../assets/react.svg";

import { useStatistics } from "./useStatistics";
import { Chart } from "./Chart";
import "./App.css";
import { useView } from "./useView";

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

  const activeView = useView();

  const viewData = useMemo(() => {
    switch (activeView) {
      case "CPU":
        return cpuUsages;
      case "RAM":
        return ramUsage;
      case "STORAGE":
        return storageUsage;
    }
  }, [activeView, ramUsage, cpuUsages, storageUsage]);
  // console.log(statistics);
  // console.log(cpuUsages);
  // console.log(cpuUsages);
  return (
    <>
      <div style={{ width: 300 }}>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div style={{ height: 120 }}>
        {/* chart goes here */}
        <h2>{`${activeView} Usage`}</h2>
        <Chart data={viewData} currentView={activeView} maxDataPoints={10} />
      </div>
    </>
  );
}

export default App;
