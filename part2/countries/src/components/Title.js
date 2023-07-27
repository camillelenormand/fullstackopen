import React from "react";

const Title = ({ label, size }) => {
  // Ensure that the size prop is valid (e.g., "h1", "h2", "h3", etc.)
  const headingSize = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(size) ? size : "h1";

  return React.createElement(headingSize, null, label);
};

export default Title;
