import React, { useEffect, useState } from "react";

import { useAuth } from "../hooks/useAuth";

import { DashboardLayout } from "../components/DashboardLayout";

import funds from "../mocks/funds.json";

const Dashboard = () => {
  const { user } = useAuth();

  const [fundData, setFundData] = useState();

  /**
   * On the initial mount of the dashboard, we will fetch
   * fund data for the user
   */
  useEffect(() => {
    if (user) {
      const fundData = funds.find((fund) => fund.userId === user.id);
      setFundData(fundData);
    }
  }, []);

  return (
    <DashboardLayout>
      {fundData?.companies.map((c) => (
        <p key={c.id}>{c.name}</p>
      ))}
    </DashboardLayout>
  );
};

export default Dashboard;
