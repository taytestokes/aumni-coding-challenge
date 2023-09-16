import React, { useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

import { currencyFormatter } from "../utils/Format";

export const PortfolioDonutChart = ({ data, height, width, onArcClick }) => {
  const chartRef = useRef();

  const radius = Math.min(width, height) / 2;
  const pie = d3.pie().value((datum) => datum.value);
  const arc = d3.arc().innerRadius(100).outerRadius(radius);
  const pieData = pie(data);
  const totalValue = data?.reduce((acc, datum) => (acc += datum.value), 0);

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
      {/* Slices */}
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {pieData.map((slice) => (
          <path
            key={slice.value}
            aria-hidden={onArcClick ? false : true}
            aria-label={`Select to view details for ${slice.data.name}`}
            role={onArcClick ? "button" : null}
            onClick={() => onArcClick(slice.data.id)}
            onKeyDown={(e) => {
              e.preventDefault();
              if (e.code === "Enter" || e.code === "Space") {
                onArcClick(slice.data.id);
              }
            }}
            d={arc({
              startAngle: slice.startAngle,
              endAngle: slice.endAngle,
            })}
            fill={slice.data.color}
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
          {currencyFormatter.format(totalValue)}
        </tspan>
        <tspan x="0" y="25" className="fill-gray-600">
          Total Value
        </tspan>
      </text>
    </svg>
  );
};

PortfolioDonutChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  onArcClick: PropTypes.func,
};

PortfolioDonutChart.defaultProps = {
  height: 300,
  width: 300,
};
