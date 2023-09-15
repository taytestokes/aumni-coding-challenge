import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./providers/AuthProvider";

import { Fallback } from "./components/Fallback";
import { ProtectedRoute } from "./components/ProtectedRoute";

import users from "./mocks/users.json";

/**
 * Using react lazy and suspense, we are code splitting the application on a per route basis.
 * So we will only need to download the JS when that route is rendered.
 */
const Authentication = lazy(() => import("./pages/Authentication"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

/**
 * App is the shell of the application that will handle app wide configuration and routing.
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider users={users}>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<Authentication />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
