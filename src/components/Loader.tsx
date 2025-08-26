import React from "react";
import "../styles/loader.scss";

const Loader: React.FC<{ visible: boolean }> = ({ visible }) => {
  if (!visible) return null;
  return (
    <div className="loader-overlay">
      <div className="loader-spinner" />
    </div>
  );
};

export default Loader;
