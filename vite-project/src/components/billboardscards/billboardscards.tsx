import React from "react";
import "./billboardscards.css";

interface BillboardCardProps {
  series: string;
  companyName: string;
  campaignName: string;
  location: string;
  leaseExpiry: string;
  // isActive: boolean;
  // isAvailable: boolean;
}

const BillboardCard: React.FC<BillboardCardProps> = ({
  series,
  companyName,
  campaignName,
  location,
  leaseExpiry,
  // isActive,
}) => {
  // Determine the status text and style based on isActive and isAvailable
  let statusText = "";
  let statusClass = "";

  //  if (isActive) {
  //   statusText = "● Active";
  //   statusClass = "active";
  // } else {
  //   statusText = "● Inactive";
  //   statusClass = "inactive";
  // }

  return (
    <div className={`status ${statusClass}`} id="billboard-card">
      <div className="card-header">
        <p className="card-id">{series}</p>
        <span className={`status ${statusClass}`}>
          {statusText}
        </span>
      </div>
      <h2 className="card-title">{companyName}</h2>
      <div className="card-section campaign-lease-container">
        <div className="campaign-section">
          <p>Current Campaign</p>
          <h3>{campaignName}</h3>
        </div>
        <div className="lease-section">
          <p>Lease expire in</p>
          <h3>{leaseExpiry}</h3>
        </div>
      </div>
      <div className="card-section">
        <p>Location</p>
        <h3>{location}</h3>
      </div>
    </div>
  );
};

export default BillboardCard;
