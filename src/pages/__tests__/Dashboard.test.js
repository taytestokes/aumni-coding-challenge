import React from "react";
import { render, screen, act } from "../../setupTests";
import userEvent from "@testing-library/user-event";

import Dashboard from "../Dashboard";

const mockUser = {
  id: 3,
  name: "Olson Ventures",
  username: "OlsenVentures",
  password: "Olsen123",
};

test("Dashboard page loads and displays header, donut chart, and bar chart", () => {
  render(<Dashboard />, { authProviderValues: { user: mockUser } });

  screen.debug();
});
