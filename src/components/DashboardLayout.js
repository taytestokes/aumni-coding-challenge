import React from "react";
import PropTypes from "prop-types";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";

import aumniLogo from "../images/logo.png";

import { useAuth } from "../hooks/useAuth";

export const DashboardLayout = ({ children }) => {
  const { signOut } = useAuth();

  return (
    <main className="w-screen min-h-screen flex flex-col bg-gray-100 relative">
      <header className="bg-white border-b">
        <section className="flex items-center justify-between container mx-auto p-4">
          <img alt="Aumni Logo" src={aumniLogo} className="h-[24px]" />
          <button
            aria-label="Select to sign out"
            className="bg-gray-100 p-2 rounded-md border border-gray-200 text-gray-600"
            onClick={signOut}
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
          </button>
        </section>
      </header>
      <section className="container mx-auto flex flex-col flex-grow items-start px-4 py-8">
        {children}
      </section>
    </main>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
