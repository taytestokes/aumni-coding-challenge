import React from "react";
import PropTypes from "prop-types";

import {
  formatDate,
  currencyFormatter,
  formatPercentage,
} from "../utils/Format";

import { Drawer } from "./Drawer";

export const CompanyDrawer = ({ company, onClose }) => {
  console.log({ company });
  return (
    <Drawer title={company.name} onClose={onClose}>
      <div
        className="w-full flex justify-center p-4"
        // Need to set the background through style attribute
        // because tailwind won't let us use dynmaic color values
        style={{ backgroundColor: company.brand }}
      >
        <div className="flex border bg-white p-6 rounded-md ">
          <img alt={`${company.name} logo`} src={company.logo} width={50} />
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 bg-white p-4">
        <div className="w-full flex flex-col border rounded-md">
          <div className="p-2 border-b bg-gray-50">
            <p className="font-semibold">Company Information</p>
          </div>
          <div className="p-4">
            <p className="text-xl font-semibold">{company.name}</p>
            <p className="text-sm text-gray-600">
              Founded: {formatDate(company.founded)}
            </p>

            <div className="flex justify-between">
              <div>
                <p className="font-semibold mt-4">Total Cost</p>
                <p className="text-sm text-gray-600">
                  {currencyFormatter.format(company.cost)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold mt-4">Market Value</p>
                <p className="text-sm text-gray-600">
                  {currencyFormatter.format(company.impliedValue)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col border rounded-md">
          <div className="p-2 border-b bg-gray-50">
            <p className="font-semibold">Investment Information</p>
          </div>
          <div className="p-4">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">Owned Percentage</p>
                <p className="text-sm text-gray-600">
                  {formatPercentage(company.ownershipPercentage)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Owned Value</p>
                <p className="text-sm text-gray-600">
                  {currencyFormatter.format(
                    company.ownershipPercentage * company.impliedValue,
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

CompanyDrawer.propTypes = {
  company: PropTypes.object,
  onClose: PropTypes.func,
};
