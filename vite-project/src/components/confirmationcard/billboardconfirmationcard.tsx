import React from "react";
import "./confirmationcard.css";


interface billboardConfirmationCardProps {
  onCancel: () => void;
  onConfirm: () => void;
  alertIcon: string; 
  confirmationText: string; 
  button2:string;
}

const BillboardConfirmationCard: React.FC<billboardConfirmationCardProps> = ({ onConfirm, alertIcon, confirmationText,button2}) => {
  return (
    <div className="overlay">
      <div className="confirmation-card">
        <div className="confirmation-content">
          <div className="icon-wrapper">
            <span className="alert-icon">{alertIcon}</span> 
          </div>
          <p className="confirmation-text1">{confirmationText}</p> 
          <div className="button-group" style={{display:"flex",justifyContent:"center"}}>
            <button style={{padding:"10px 50px"}}className="confirm-button" onClick={onConfirm}>{button2}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillboardConfirmationCard;
