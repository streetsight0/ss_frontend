import React from "react";
import "./Loader.css";
import loader from "../../assets/Streetsight.gif"

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <img src={loader} alt="Loading..." className="loader-gif" />
    </div>
  );
};

export default Loader;
