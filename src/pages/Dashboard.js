import React, { useEffect, useState } from "react";

import { useAuth } from "../hooks/useAuth";

import { getDonutChartData } from "../utils/Chart";

import { DashboardLayout } from "../components/DashboardLayout";
import { PortfolioDonutChart } from "../components/PortfolioDonutChart";

import funds from "../mocks/funds.json";

const Dashboard = () => {
  const { user } = useAuth();

  const [portfolio, setPortfolio] = useState();

  /**
   * Chart data that's been constructed for the portfolio donut chart
   */
  const donutChartData = getDonutChartData(portfolio);

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

      <section className="mt-8">
        <p className="font-semibold">Your Portfolio</p>
        {portfolio && <PortfolioDonutChart data={donutChartData} />}
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
