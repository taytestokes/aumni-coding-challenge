import React, { useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

import { currencyFormatter } from "../utils/Format";

export const PortfolioDonutChart = ({ data, height, width }) => {
  const chartRef = useRef();

  const radius = Math.min(width, height) / 2;
  const pie = d3.pie();
  const arc = d3.arc().innerRadius(100).outerRadius(radius);
  const pieData = pie(data?.dataPoints);
  const colors = data?.colors.map((color) => color);

  return (
    <svg
      role="image"
      data-testid="DonutChart"
      ref={chartRef}
      height={height}
      width={width}
      preserveAspectRatio="xMinYMin meet"
      xmlns="http://www.w3.org/2000/svg"
      className="donut-chart"
    >
      {/* Slices Group */}
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {pieData.map((slice, index) => (
          <path
            key={slice.value}
            d={arc({
              startAngle: slice.startAngle,
              endAngle: slice.endAngle,
            })}
            fill={colors[index]}
            className="donut-arc"
            onMouseEnter={() => {
              if (chartRef.current) {
                chartRef.current.classList.add("highlighting");
              }
            }}
            onMouseLeave={() => {
              if (chartRef.current) {
                chartRef.current.classList.remove("highlighting");
              }
            }}
          />
        ))}
      </g>

      {/* Portfolio Value Text */}
      <text
        textAnchor="middle"
        transform={`translate(${width / 2}, ${height / 2})`}
      >
        <tspan className="text-xl font-semibold">
          {currencyFormatter.format(data?.totalValue)}
        </tspan>
        <tspan x="0" y="25" className="fill-gray-600">
          Total Value
        </tspan>
      </text>
    </svg>
  );
};

PortfolioDonutChart.propTypes = {
  data: PropTypes.object.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
};

PortfolioDonutChart.defaultProps = {
  height: 300,
  width: 300,
};
