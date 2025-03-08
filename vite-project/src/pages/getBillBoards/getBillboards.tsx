import React from "react";
import AvailableBillBoards from "../AvailableBillBoards/AvailableBillBoards";
import AllBillBoards from "../AllBillBoards/AllBillBoards";
import "./getbillboard.css";  

const getBillBoards = () => {
  return (
    <div className="billboard-container">
      <h2 className="section-title">All Billboards</h2>
      <AllBillBoards />
      <h2 className="section-title">Available Billboards</h2>
      <AvailableBillBoards />
    </div>
  );
};

export default getBillBoards;
