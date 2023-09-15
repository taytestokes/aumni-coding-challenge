/**
 * Derives and sets up the data needed for the portfolio donut chart
 * from the fund's companies data.
 */
export const getDonutChartData = (fundData) =>
  fundData?.companies.reduce((acc, company) => {
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
