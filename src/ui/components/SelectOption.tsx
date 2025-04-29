import { Chart } from "./Chart";

const SelectOption = ({
  title,
  subTitle,
  data,
  multiplier,
  fill,
  stroke,
  onClick,
}: {
  title: string;
  subTitle: string;
  data: number[];
  multiplier: number;
  fill: string;
  stroke: string;
  onClick: () => void;
}) => {
  return (
    <button className="selectOption" onClick={onClick}>
      <div className="selectOptionTitle">
        <div>{title}</div>
        <div>{subTitle}</div>
      </div>
      <div className="selectOptionChart">
        <Chart
          data={data}
          multiplier={multiplier}
          maxDataPoints={10}
          fill={fill}
          stroke={stroke}
        />
      </div>
    </button>
  );
};

export default SelectOption;
