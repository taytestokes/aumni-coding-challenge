import React, { useState, useRef, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import FocusTrap from "focus-trap-react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export const Drawer = ({ onClose, title, children }) => {
  const [isActive, setIsActive] = useState(false);

  const portalNode = document.querySelector("#drawer");

  const drawerRef = useRef();
  const hasBeenAnimatedRef = useRef(false);

  const setDrawerInactive = () => {
    setIsActive(false);
  };

  useLayoutEffect(() => {
    // Sets drawer to active state aftter the initial render to trigger the transition
    // effects for the drawer
    setIsActive(true);
    // Prevent the body from underneath the overlay from scrolling
    // if the content exceeds the viewport height
    document.querySelector("body").style.overflow = "hidden";
    return () => {
      document.querySelector("body").style.overflow = null;
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 bottom-0 right-0 z-10"
      data-testid="drawer"
    >
      <div
        className={`fixed top-0 left-0 bottom-0 right-0 z-20 bg-gray-800 ${
          isActive ? "opacity-75" : "opacity-0"
        } transform transition-opacity duration-200 ease-linear`}
      />
      <FocusTrap
        active={isActive}
        focusTrapOptions={{
          clickOutsideDeactivates: () => hasBeenAnimatedRef.current,
          onDeactivate: setDrawerInactive,
        }}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 z-30 transform transition-transform duration-200 ease-linear ${
            isActive ? "translate-x-0" : "translate-x-full"
          }  w-full sm:w-2/3 lg:w-1/3`}
          onTransitionEnd={(e) => {
            if (e.target === drawerRef.current) {
              // Trigger onClose callback when the transition to
              // close the drawer ends
              if (!isActive) {
                onClose();
              }
              // Sets the ref to true to then allow outside
              // click events from the focus trapped drawer
              // after the animation has completed
              hasBeenAnimatedRef.current = true;
            }
          }}
          ref={drawerRef}
          role="presentation"
        >
          <div className="w-full bg-white flex p-4 border-b">
            <button
              aria-label="Select to close the drawer"
              className="p-2 rounded-md border text-gray-600"
              onClick={setDrawerInactive}
            >
              <ArrowLeftIcon className="w-4 h-4" />
            </button>
            <h2 className="mx-auto font-bold text-gray-900">{title}</h2>
          </div>

          <div className="box-border h-full bg-gray-100 p-4 pb-4 overflow-y-auto">
            {children}
          </div>
        </div>
      </FocusTrap>
    </div>,
    portalNode,
  );
};

Drawer.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.title,
  children: PropTypes.node,
};
