import React from "react";
import PropTypes from "prop-types";

export const LoadingSpinner = ({ size }) => {
  return (
    <div className="h-full flex flex-grow flex-col items-center justify-center">
      <div
        className={`animate-spin w-[${size}px] h-[${size}px] border border-t border-gray-300 rounded-full`}
        // Tailwind doesn't expose a utility class to apply
        // color to only the top border, so we apply that here using inline styles
        style={{ borderTopColor: "#71717A" }}
      />
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.number,
};

LoadingSpinner.defaultProps = {
  size: 16,
};
