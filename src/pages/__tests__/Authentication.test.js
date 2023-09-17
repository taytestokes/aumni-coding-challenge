import React from "react";
import { render, screen, act } from "../../setupTests";
import userEvent from "@testing-library/user-event";

import Authentication from "../Authentication";

test("Authentication page loads and displays the sign in fields", () => {
  render(<Authentication />);

  expect(screen.getByAltText("Aumni Logo")).toBeInTheDocument();
  expect(
    screen.getByText("Welcome Back! Sign in to get started."),
  ).toBeInTheDocument();
  expect(screen.getByLabelText("Username")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(screen.getByRole("button")).toHaveTextContent("Sign In");
});

test("Should display error messages when form is submitted with invalid input data", () => {
  render(<Authentication />);

  const SignInBtn = screen.getByRole("button");
  const UsernameInput = screen.getByLabelText("Username");
  const PasswordInput = screen.getByLabelText("Password");

  expect(screen.queryByRole("alert")).not.toBeInTheDocument();

  // Clicks with empty input fields
  userEvent.click(SignInBtn);

  expect(screen.getByRole("alert")).toHaveTextContent(
    "Username can't be blank.",
  );

  // Enters username
  userEvent.type(UsernameInput, "testUser");

  // Clicks with empty password field
  userEvent.click(SignInBtn);

  expect(screen.getByRole("alert")).toHaveTextContent(
    "Password can't be blank.",
  );

  // Enters password
  userEvent.type(PasswordInput, "testPass");

  // Clicks with invalid credentials
  userEvent.click(SignInBtn);

  expect(screen.getByRole("alert")).toHaveTextContent(
    "Invalid username, please try again.",
  );
});

test("Should sign in with correct credentials and navigates to dashboard page", () => {
  render(<Authentication />);

  const SignInBtn = screen.getByRole("button");
  const UsernameInput = screen.getByLabelText("Username");
  const PasswordInput = screen.getByLabelText("Password");

  expect(window.location.pathname).toBe("/");

  userEvent.type(UsernameInput, "HansAndSonsVentures");
  userEvent.type(PasswordInput, "Hans123");
  userEvent.click(SignInBtn);

  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(window.location.pathname).toBe("/dashboard");
});
