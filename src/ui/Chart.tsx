import { useMemo } from "react";
import { BaseChart } from "./BaseCharts";

export type ChartProps = {
  data: number[];
  maxDataPoints: number;
  currentView: "CPU" | "RAM" | "STORAGE";
};

export const COLOR_MAP = {
  CPU: {
    stroke: "#5DD4EE",
    fill: "#0A4D5C",
  },
  RAM: {
    stroke: "#E99311",
    fill: "#5F3C07",
  },
  STORAGE: {
    stroke: "#1ACF4D",
    fill: "#0B5B22",
  },
};

export function Chart(props: ChartProps) {
  const theme = useMemo(
    () => COLOR_MAP[props.currentView],
    [props.currentView]
  );
  const preparedData = useMemo(() => {
    const points = props.data.map((point) => ({ value: point * 100 }));
    if (points.length < props.maxDataPoints) {
      return [
        ...points,
        ...Array.from({ length: props.maxDataPoints - points.length }).map(
          () => ({ value: undefined })
        ),
      ];
    }
    return points;
  }, [props.data, props.maxDataPoints]);

  return (
    <BaseChart
      data={preparedData}
      fill={theme.fill}
      stroke={theme.stroke}
    ></BaseChart>
  );
}
