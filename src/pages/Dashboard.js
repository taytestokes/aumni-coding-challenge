import React, { useEffect, useRef, useState } from "react";

import { useAuth } from "../hooks/useAuth";
import { useDimensions } from "../hooks/useDimensions";

import { getBarChartData, getDonutChartData } from "../utils/Chart";

import { DashboardLayout } from "../components/DashboardLayout";
import { PortfolioDonutChart } from "../components/PortfolioDonutChart";
import { PortfolioBarChart } from "../components/PortfolioBarChart";
import { CompanyDrawer } from "../components/CompanyDrawer";

import funds from "../mocks/funds.json";

const Dashboard = () => {
  const { user } = useAuth();

  const [portfolio, setPortfolio] = useState();
  const [activeCompany, setActiveCompany] = useState();

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
          <div className="p-2 border-b bg-gray-50">
            <p className="font-semibold">Your Portfolio</p>
          </div>
          <div className="p-4">
            <div ref={donutChartWrapperRef}>
              {portfolio ? (
                <PortfolioDonutChart
                  data={donutChartData}
                  width={donutChartWidth}
                  onArcClick={(companyId) => {
                    const company = portfolio?.companies.find(
                      (company) => company.id === companyId,
                    );

                    setActiveCompany(company);
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col border rounded-md md:w-1/2">
          <div className="p-2 border-b bg-gray-50">
            <p className="font-semibold">Investment Value Comparison</p>
          </div>

          <div className="p-4">
            <div ref={barChartWrapperRef}>
              {portfolio ? (
                <PortfolioBarChart
                  data={barChartData}
                  width={barChartWidth}
                  onBarClick={(companyId) => {
                    const company = portfolio?.companies.find(
                      (company) => company.id === companyId,
                    );

                    setActiveCompany(company);
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {activeCompany ? (
        <CompanyDrawer
          company={activeCompany}
          onClose={() => setActiveCompany(null)}
        />
      ) : null}
    </DashboardLayout>
  );
};

export default Dashboard;
