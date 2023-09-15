import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ redirectTo, children }) => {
  const { isAuthed } = useAuth();
  const location = useLocation();

  return isAuthed ? (
    children
  ) : (
    <Navigate to={redirectTo} state={{ path: location.pathname }} replace />
  );
};

ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string,
  children: PropTypes.node,
};
