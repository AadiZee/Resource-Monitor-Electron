import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { useStatistics } from "./hooks/useStatistics";
import { Chart } from "./components/Chart";
import Header from "./components/Header";
import SelectOption from "./components/SelectOption";
import { options } from "./lib/options";
import { useStaticData } from "./hooks/useStaticData";

function App() {
  const staticData = useStaticData();
  const statistics = useStatistics(10);
  const [activeView, setActiveView] = useState<View>("CPU");
  const cpuUsages = useMemo(
    () => statistics.map((stat) => stat.cpuUsage),
    [statistics]
  );
  const ramUsages = useMemo(
    () => statistics.map((stat) => stat.ramUsage),
    [statistics]
  );
  const storageUsages = useMemo(
    () => statistics.map((stat) => stat.storageUsage),
    [statistics]
  );

  const activeUsages = useMemo(() => {
    switch (activeView) {
      case "CPU":
        return cpuUsages;
      case "RAM":
        return ramUsages;
      case "STORAGE":
        return storageUsages;
    }
  }, [activeView, cpuUsages, ramUsages, storageUsages]);

  useEffect(() => {
    window.electron.subscribeChangeView((view) => setActiveView(view));
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="main">
        <div>
          {options.map((option) => (
            <SelectOption
              key={option.title}
              title={option.title}
              subTitle={
                option.title === "CPU"
                  ? staticData?.cpuModel ?? ""
                  : option.title === "RAM"
                  ? `${staticData?.totalMemoryGB.toString() ?? ""} GB`
                  : `${staticData?.totalStorage.toString() ?? ""} GB`
              }
              data={
                option.title === "CPU"
                  ? cpuUsages
                  : option.title === "RAM"
                  ? ramUsages
                  : storageUsages
              }
              multiplier={option.multiplier}
              fill={option.fill}
              stroke={option.stroke}
              onClick={() =>
                setActiveView(
                  option.title === "CPU"
                    ? "CPU"
                    : option.title === "RAM"
                    ? "RAM"
                    : "STORAGE"
                )
              }
            />
          ))}
        </div>
        <div className="mainGrid">
          <Chart
            data={activeUsages}
            multiplier={activeView === "CPU" ? 1000 : 100}
            maxDataPoints={10}
            fill={
              activeView === "CPU"
                ? options[0].fill
                : activeView === "RAM"
                ? options[1].fill
                : options[2].fill
            }
            stroke={
              activeView === "CPU"
                ? options[0].stroke
                : activeView === "RAM"
                ? options[1].stroke
                : options[2].stroke
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
