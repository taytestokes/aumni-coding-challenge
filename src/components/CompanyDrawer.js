import React, { useRef } from "react";
import PropTypes from "prop-types";

import { useDimensions } from "../hooks/useDimensions";

import {
  formatDate,
  currencyFormatter,
  formatDecimalToPercent,
} from "../utils/Format";
import { getPieChartData } from "../utils/Chart";

import { Drawer } from "./Drawer";
import { InvestmentPieChart } from "./InvestmentPieChart";

export const CompanyDrawer = ({ company, onClose }) => {
  const pieChartWrapperRef = useRef();
  const pieChartData = getPieChartData(company);

  const { width: pieChartWidth } = useDimensions(pieChartWrapperRef);

  const ownedValue = company.ownershipPercentage * company.impliedValue;

  return (
    <Drawer title={company.name} onClose={onClose}>
      <div className="w-full flex justify-center p-4 bg-gray-50 border-b pb-8">
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
                <p className="font-semibold">Owned %</p>
                <p className="text-sm text-gray-600">
                  {formatDecimalToPercent(company.ownershipPercentage)}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">Owned Value</p>
                <p className="text-sm text-gray-600">
                  {currencyFormatter.format(ownedValue)}
                </p>
              </div>
            </div>

            <div className="flex items-center mt-4 gap-3">
              <p className="flex items-center gap-1.5">
                <span
                  className="flex w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor: company.brand,
                  }}
                />
                Owned
              </p>
              <p className="flex items-center gap-1.5">
                <span className="flex w-3 h-3 rounded-sm bg-gray-200" />
                Non-owned
              </p>
            </div>

            <div ref={pieChartWrapperRef} className="mt-8">
              {company ? (
                <InvestmentPieChart
                  data={pieChartData}
                  width={pieChartWidth}
                  height={200}
                />
              ) : null}
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
