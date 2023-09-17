// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

import React from "react";
import PropTypes from "prop-types";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./providers/AuthProvider";

/**
 * Mock user data
 */
import users from "./mocks/users.json";

/**
 * Custom wrapper that will be rendered in the tests and provide all providers
 */
const ProvidersWrapper = ({ authProviderValues, children }) => {
  return (
    <BrowserRouter>
      <AuthProvider users={users} values={authProviderValues}>
        {children}
      </AuthProvider>
    </BrowserRouter>
  );
};

ProvidersWrapper.propTypes = {
  authProviderValues: PropTypes.object,
  children: PropTypes.node.isRequired,
};

ProvidersWrapper.defaultProps = {
  authProviderValues: {},
};

/**
 * A custom render to setup providers. Extends regular
 * render options with provider values to allow injecting
 * different provider state scenarios to test with.
 */
const customRender = (ui, providerValues, options) => {
  return render(
    <ProvidersWrapper authProviderValues={providerValues?.authProviderValues}>
      {ui}
    </ProvidersWrapper>,
    { ...options },
  );
};

/**
 * Re-export all functionality from react testing lib
 */
export * from "@testing-library/react";

/**
 * Override render method with custom render
 */
export { customRender as render };
