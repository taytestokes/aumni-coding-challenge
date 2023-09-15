import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/**
 * Using react lazy and suspense, we are code splitting the application on a per route basis.
 * So we will only need to download the JS when that route is rendered.
 */
const Authentication = lazy(() => import("./pages/Authentication"));

/**
 * App is the shell of the application that will handle app wide configuration and routing.
 */
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Authentication />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
