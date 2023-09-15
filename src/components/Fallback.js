import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export const Fallback = () => {
  return (
    <main className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <LoadingSpinner />
    </main>
  );
};
