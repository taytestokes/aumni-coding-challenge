import React, { useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

export const InvestmentPieChart = ({ data, height, width }) => {
  const chartRef = useRef();

  const radius = Math.min(width, height) / 2;
  const pie = d3.pie().value((datum) => datum.value);
  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  const pieData = pie(data);

  return (
    <svg
      role="image"
      data-testid="InvestmentPieChart"
      ref={chartRef}
      height={height}
      width={width}
      preserveAspectRatio="xMinYMin meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {pieData.map((slice) => {
          return (
            <path
              key={slice.value}
              d={arc({
                startAngle: slice.startAngle,
                endAngle: slice.endAngle,
              })}
              fill={slice.data.color}
            />
          );
        })}
      </g>
    </svg>
  );
};

InvestmentPieChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
};

InvestmentPieChart.defaultProps = {
  height: 300,
  width: 300,
};
