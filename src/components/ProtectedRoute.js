import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

import { paths } from "../constants/Routes";

import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { isAuthed } = useAuth();
  const location = useLocation();

  return isAuthed ? (
    children
  ) : (
    <Navigate to={paths.home} state={{ path: location.pathname }} replace />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
