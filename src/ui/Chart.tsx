import { useMemo } from "react";
import { BaseChart } from "./BaseCharts";

export type ChartProps = {
  data: number[];
  maxDataPoints: number;
};


export function Chart(props: ChartProps) {
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
      fill={"#095B7D"}
      stroke={"#01B3F3"}
    ></BaseChart>
  );
}
