import React from "react";
import { render, screen } from "../../setupTests";
import userEvent from "@testing-library/user-event";

import Dashboard from "../Dashboard";

const mockUser = {
  id: 3,
  name: "Olson Ventures",
  username: "OlsenVentures",
  password: "Olsen123",
};

/**
 * It's important that we create element used for the drawer portal before
 * the test suite to ensure the portal will correctly
 */
beforeAll(() => {
  let portalElement = document.getElementById("drawer");

  if (!portalElement) {
    portalElement = document.createElement("div");
    portalElement.setAttribute("id", "drawer");
    document.body.appendChild(portalElement);
  }
});

test("Dashboard page loads correctly for a user", () => {
  render(<Dashboard />, { authProviderValues: { user: mockUser } });

  const DonutChart = screen.getByTestId("DonutChart");
  const PortfolioBarChart = screen.getByTestId("PortfolioBarChart");

  // Displays welcome message with user name
  expect(
    screen.getByText(`Welcome back, ${mockUser.name}`),
  ).toBeInTheDocument();

  // Displays the donut chart with the total portfolio amount
  expect(DonutChart).toBeInTheDocument();
  expect(screen.getByText("$2,762,400.00")).toBeInTheDocument();

  // Displays Portfolio Bar Chart
  expect(PortfolioBarChart).toBeInTheDocument();
});

test("Donut chart opens company info drawer when the arch is selected", () => {
  render(<Dashboard />, { authProviderValues: { user: mockUser } });

  // Selects the first arc of the donut chart
  const arc = screen
    .getByTestId("DonutChart")
    .getElementsByClassName("donut-arc")[0];

  expect(screen.queryByTestId("drawer")).not.toBeInTheDocument();

  // Select the first arc to open the drawer
  userEvent.click(arc);

  expect(screen.queryByTestId("drawer")).toBeInTheDocument();
});

test("Portfolio bar chart opens company info drawer when the bar is selected", () => {
  render(<Dashboard />, { authProviderValues: { user: mockUser } });

  // Selects the first arc of the donut chart
  const bar = screen
    .getByTestId("PortfolioBarChart")
    .getElementsByClassName("bar")[0];

  expect(screen.queryByTestId("drawer")).not.toBeInTheDocument();

  // Select the first arc to open the drawer
  userEvent.click(bar);

  expect(screen.queryByTestId("drawer")).toBeInTheDocument();
});

test("The company information drawer displays info about the company selected from one of the charts", () => {
  render(<Dashboard />, { authProviderValues: { user: mockUser } });

  // Selects the first arc of the donut chart
  const bar = screen
    .getByTestId("PortfolioBarChart")
    .getElementsByClassName("bar")[0];

  // Select the first arc to open the drawer
  userEvent.click(bar);

  expect(screen.queryByTestId("drawer")).toBeInTheDocument();
  expect(screen.getByTestId("company-logo")).toBeInTheDocument();
  expect(screen.getByTestId("company-title")).toBeInTheDocument();
  expect(screen.getByTestId("founded-date")).toBeInTheDocument();
  expect(screen.getByTestId("company-cost")).toBeInTheDocument();
  expect(screen.getByTestId("company-percent-owned")).toBeInTheDocument();
  expect(screen.getByTestId("company-owned-valued")).toBeInTheDocument();
  expect(screen.getByTestId("InvestmentPieChart")).toBeInTheDocument();
});

test("Should sign user out when logout button is selected", () => {
  render(<Dashboard />, { authProviderValues: { user: mockUser } });

  const SignOutBtn = screen.getByLabelText("Select to sign out");

  userEvent.click(SignOutBtn);

  expect(window.location.pathname).toBe("/");
});
