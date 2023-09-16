import { useEffect, useLayoutEffect, useState } from "react";

export const useDimensions = (targetRef) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  /**
   * Gets the height and width of the element with the assigned ref
   */
  const getDimensions = () => ({
    width: targetRef.current ? targetRef.current.offsetWidth : 0,
    height: targetRef.current ? targetRef.current.offsetHeight : 0,
  });

  /**
   * Handles browser widow resize event
   */
  const handleResize = () => setDimensions(getDimensions());

  /**
   * Applies event listener for resize events and uses the handleResize function
   * to handle the resize event.
   */
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Update dimensions after DOM content has been set
   */
  useLayoutEffect(() => {
    handleResize();
  }, []);

  return dimensions;
};
