import React from "react";
import PropTypes from "prop-types";

import { Drawer } from "./Drawer";

export const CompanyDrawer = ({ company, onClose }) => {
  return <Drawer title={company.name} onClose={onClose}></Drawer>;
};

CompanyDrawer.propTypes = {
  company: PropTypes.object,
  onClose: PropTypes.func,
};
