import React, { useRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

import { drawBarPath } from "../utils/Chart";

const CHART_MARGINS = {
  bottom: 3,
  left: 35,
  right: 0,
  top: 0,
};

export const PortfolioBarChart = ({ data, height, width, onBarClick }) => {
  const chartWrapperRef = useRef();
  const chartRef = useRef();
  const xAxisRef = React.useRef();
  const yAxisRef = React.useRef();
  const yGridRef = React.useRef();

  const yValues = data.map((datum) => datum.y);
  const xMaxValue = d3.extent(yValues).pop();
  const xDomain = Object.keys(data).map(Number);

  /**
   * We use 12 here to add a buffer between the max x value so we won't
   * ever overflow the y grid lines
   */
  const yDomain = [0, Math.ceil(xMaxValue / 10) * 12];

  /**
   * Range defines the boundary or range that values should be plotted to
   * in the available space from lowest to highest
   */
  const yRange = [height - CHART_MARGINS.bottom, CHART_MARGINS.top];
  const xRange = [CHART_MARGINS.left, width];

  // Scales
  const xScale = d3
    .scaleBand()
    .domain(xDomain)
    .range(xRange, 0.3)
    .padding(0.25);

  const yScale = d3.scaleLinear().domain(yDomain).range(yRange);

  // Axes
  const xAxis = d3
    .axisBottom(xScale)
    .tickValues("")
    .tickSize(10)
    .tickSizeOuter(0);

  const yAxis = d3
    .axisLeft(yScale)
    .ticks(yValues.length)
    .tickFormat(d3.format(".2s"));

  // Grids
  const yGrid = d3
    .axisLeft(yScale)
    .ticks(yValues.length)
    .tickSize(-width + CHART_MARGINS.right * 1.5)
    .tickFormat("");

  /**
   * Using a layout effect is the easiest way to work with react to use d3
   * to render the axis and grid elements
   */
  useLayoutEffect(() => {
    d3.select(xAxisRef.current).call(xAxis);
    d3.select(yAxisRef.current).call(yAxis);
    d3.select(yGridRef.current).call(yGrid);
  }, [data]);

  return (
    <section ref={chartWrapperRef}>
      <svg
        ref={chartRef}
        data-testid="PortfolioBarChart"
        height={height}
        width={width}
        preserveAspectRatio="xMinYMin meet"
        xmlns="http://www.w3.org/2000/svg"
        className="bar-chart"
      >
        {/* Y Axis Group */}
        <g
          aria-hidden={true}
          className="y-axis"
          data-testid="yAxis"
          ref={yAxisRef}
          transform={`translate(${CHART_MARGINS.left},0)`}
        />
        {/* YGrid Group*/}
        <g
          aria-hidden={true}
          className="y-grid"
          data-testid="yGrid"
          ref={yGridRef}
          transform={`translate(${CHART_MARGINS.left},0)`}
        />
        {/* X Axis Group */}
        <g
          aria-hidden={true}
          className="x-axis"
          data-testid="xAxis"
          ref={xAxisRef}
          transform={`translate(0,${height - CHART_MARGINS.bottom})`}
        />

        {/* Bars */}
        <g>
          {data.map((datum) => {
            const barHeight = height - yScale(datum.y) - CHART_MARGINS.bottom;
            const barWidth = xScale.bandwidth();

            return (
              <path
                key={datum.y + datum.x}
                aria-hidden={onBarClick ? false : true}
                aria-label={`Select to view details for ${datum.name}`}
                role={onBarClick ? "button" : null}
                onClick={() => onBarClick(datum.id)}
                onKeyDown={(e) => {
                  e.preventDefault();
                  if (e.code === "Enter" || e.code === "Space") {
                    onBarClick(datum.id);
                  }
                }}
                fill={datum.brand}
                d={drawBarPath({
                  height: barHeight,
                  radius: 3,
                  width: barWidth,
                  x: xScale(datum.x),
                  y: yScale(datum.y),
                })}
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
                className="bar"
              />
            );
          })}
        </g>
      </svg>
    </section>
  );
};

PortfolioBarChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number,
  onBarClick: PropTypes.func,
  width: PropTypes.number,
};

PortfolioBarChart.defaultProps = {
  ariaLabel: "ReviewsBarChart",
  height: 300,
  width: 600,
};
