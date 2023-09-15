/**
 * Derives and sets up the data needed for the portfolio donut chart
 * from the fund's companies data.
 */
export const getDonutChartData = (portfolio) =>
  portfolio?.companies.reduce((acc, company) => {
    const ownedValue = company.ownershipPercentage * company.impliedValue;

    // Total value is the sum of all owned value in every company
    if (!acc["totalValue"]) {
      acc["totalValue"] = ownedValue;
    } else {
      acc["totalValue"] += ownedValue;
    }

    // Save the owned value as individual data points to map to chart
    if (!acc["dataPoints"]) {
      acc["dataPoints"] = [ownedValue];
    } else {
      acc["dataPoints"].push(ownedValue);
    }

    // Save the companies brand to use for the color of the arc that
    // represents the company
    if (!acc["colors"]) {
      acc["colors"] = [company.brand];
    } else {
      acc["colors"].push(company.brand);
    }

    return acc;
  }, {});

/**
 * Derives a dataset from the portfolio data to be used in the bar
 * chart display
 */
export const getBarChartData = (portfolio) =>
  portfolio?.companies.map((company, index) => {
    return {
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
