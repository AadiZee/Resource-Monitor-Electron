import { useMemo } from "react";
import BaseChart from "./BaseChart";

export type ChartProps = {
  data: number[];
  multiplier: number;
  maxDataPoints: number;
  fill: string;
  stroke: string;
};

export function Chart(props: ChartProps) {
  const preparedData = useMemo(() => {
    const points = props.data.map((point) => ({
      value: point * props.multiplier,
    }));

    return [
      ...points,
      ...Array.from({ length: props.maxDataPoints - points.length }).map(
        () => ({ value: undefined })
      ),
    ];
  }, [props.data, props.maxDataPoints, props.multiplier]);
  return (
    <BaseChart fill={props.fill} stroke={props.stroke} data={preparedData} />
  );
}
