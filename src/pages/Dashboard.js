import React, { useEffect, useState } from "react";

import { useAuth } from "../hooks/useAuth";

import { getBarChartData, getDonutChartData } from "../utils/Chart";

import { DashboardLayout } from "../components/DashboardLayout";
import { PortfolioDonutChart } from "../components/PortfolioDonutChart";

import funds from "../mocks/funds.json";
import { PortfolioBarChart } from "../components/PortfolioBarChart";

const Dashboard = () => {
  const { user } = useAuth();

  const [portfolio, setPortfolio] = useState();

  /**
   * Chart data that's been constructed for the portfolio donut chart
   */
  const donutChartData = getDonutChartData(portfolio);

  /**
   * Chart data that's been curated for the portfolio bar chart
   */
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

      <section className="w-full mt-8">
        <div className="w-full flex items-center gap-12">
          <div className="flex flex-col border rounded-md md:w-1/2">
            <div className="p-2 border-b">
              <p className="font-semibold">Your Portfolio</p>
            </div>
            <div className="flex flex-1 justify-center p-4">
              {portfolio && <PortfolioDonutChart data={donutChartData} />}
            </div>
          </div>

          <div className="flex flex-col border rounded-md md:w-1/2">
            <div className="p-2 border-b">
              <p className="font-semibold">Your Investments</p>
            </div>
            <div className="flex flex-1 justify-center p-4">
              {portfolio && <PortfolioBarChart data={barChartData} />}
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
