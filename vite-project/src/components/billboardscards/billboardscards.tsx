import React from "react";
import "./billboardscards.css";

interface BillboardCardProps {
  series: string;
  companyName: string;
  campaignName: string;
  location: string;
  leaseExpiry: string;
  status?: string;
  // isActive: boolean;
  // isAvailable: boolean;
}

const BillboardCard: React.FC<BillboardCardProps> = ({
  series,
  companyName,
  campaignName,
  location,
  leaseExpiry,
  status
}) => {
  

  return (
    <div className="status" id="billboard-card">
      <div className="card-header">
      <p className="card-id">
          {series}  {status && (
            <div className={`status-badge ${status.toLowerCase()}`}>
              <span className="status-circle"></span>
              <span className="status-text">{status}</span>
            </div>
          )}
        </p>
        <h2 className="card-title">{companyName}</h2>
      </div>
    
      <div className="card-section campaign-lease-container">
        <div className="campaign-section">
          <p>Current Campaign</p>
          <h3 >{campaignName}</h3>
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
