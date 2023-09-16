import React, { useEffect, useRef, useState } from "react";

import { useAuth } from "../hooks/useAuth";

import { getBarChartData, getDonutChartData } from "../utils/Chart";

import { DashboardLayout } from "../components/DashboardLayout";
import { PortfolioDonutChart } from "../components/PortfolioDonutChart";

import funds from "../mocks/funds.json";
import { PortfolioBarChart } from "../components/PortfolioBarChart";
import { useDimensions } from "../hooks/useDimensions";

const Dashboard = () => {
  const { user } = useAuth();

  const [portfolio, setPortfolio] = useState();

  const donutChartWrapperRef = useRef();
  const barChartWrapperRef = useRef();

  const { width: donutChartWidth } = useDimensions(donutChartWrapperRef);
  const { width: barChartWidth } = useDimensions(barChartWrapperRef);

  const donutChartData = getDonutChartData(portfolio);
  const barChartData = getBarChartData(portfolio);

  /**
   * On the initial mount of the dashboard, we will fetch
   * fund data for the user
   */
  useEffect(() => {
    if (user) {
      const fundData = funds.find((fund) => fund.userId === user.id);
      setPortfolio(fundData);
    }
  }, [user]);

  return (
    <DashboardLayout>
      <section>
        <p className="text-xl font-semibold">Welcome back, {user?.name}</p>
      </section>

      <section className="w-full flex flex-col md:flex-row gap-8 mt-8">
        <div className="flex flex-col border rounded-md md:w-1/2">
          <div className="p-2 border-b">
            <p className="font-semibold">Your Portfolio</p>
          </div>
          <div
            ref={donutChartWrapperRef}
            className="flex flex-1 justify-center p-4"
          >
            {portfolio && (
              <PortfolioDonutChart
                data={donutChartData}
                width={donutChartWidth}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col border rounded-md md:w-1/2">
          <div className="p-2 border-b">
            <p className="font-semibold">Your Investments</p>
          </div>

          <div
            ref={barChartWrapperRef}
            className="flex flex-1 justify-center p-4"
          >
            {portfolio && (
              <PortfolioBarChart data={barChartData} width={barChartWidth} />
            )}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
