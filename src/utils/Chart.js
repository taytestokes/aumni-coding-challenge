/**
 * Derives and sets up the data needed for the portfolio donut chart
 * from the fund's companies data.
 */
export const getDonutChartData = (portfolio) =>
  portfolio?.companies.map((company) => {
    return {
      id: company.id,
      color: company.brand,
      name: company.name,
      value: Math.round(company.ownershipPercentage * company.impliedValue),
    };
  });

/**
 * Derives a dataset from the portfolio data to be used in the bar
 * chart display
 */
export const getBarChartData = (portfolio) =>
  portfolio?.companies.map((company, index) => {
    return {
      id: company.id,
      name: company.name,
      brand: company.brand,
      x: index,
      y: Math.round(company.ownershipPercentage * company.impliedValue),
    };
  });

/**
 * Will calculate and return the path used to draw the
 * bar inside of the bar chart.
 */
export const drawBarPath = ({ height, width, radius, x, y }) =>
  `M${x},${y}h${width - radius}a${radius},${radius} 0 0 1 ${radius},${radius}v${
    height - radius
  }h${-width}v${
    -height + radius
  }a${radius},${radius} 0 0 1 ${radius},${-radius}Z`;
