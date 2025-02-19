import { useEffect, useState } from "react";

export function useStatistics(dataPointCount: number) {
  const [value, setValue] = useState<Statistics[]>([]);
  useEffect(() => {
    const unsub = window.electron.subscribeStatistics((stats) =>
      setValue((prev) => {
        const newData = [...prev, stats];
        //Makes sure that the amount of data points remains the same
        if (newData.length > dataPointCount) {
          newData.shift();
        }
        return newData;
      })
    );
    return unsub;
  }, []);

  return value;
}
