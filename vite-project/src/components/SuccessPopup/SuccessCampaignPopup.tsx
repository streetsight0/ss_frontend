import React from "react";
import "./SuccessCampaignPopup.css"; 
import SuccessIcon from "../../assets/Icons/campaignPopup.png"; 

interface CampaignPopupProps {
  campaign?: { campaignName?: string };
  onClose: () => void;
  message?: string;
}

const CampaignPopup: React.FC<CampaignPopupProps> = ({ campaign, message }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <img src={SuccessIcon} alt="Success" className="success-icon" />
        
        <h2>{message || "Campaign Preview"}</h2>
        
        {campaign?.campaignName && (
          <p className="campaign-name">{campaign.campaignName}</p>
        )}
      </div>
    </div>
  );
};

export default CampaignPopup;
