import React from "react";
import "./confirmationcard.css";

interface ConfirmationCardProps {
  onCancel: () => void;
  onConfirm: () => void;
  alertIcon: string; 
  confirmationText: string; 
  button1:string;
  button2:string;
}

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({ onCancel, onConfirm, alertIcon, confirmationText, button1,button2}) => {
  return (
    <div className="overlay">
      <div className="confirmation-card">
        <div className="confirmation-content">
          <div className="icon-wrapper">
            <span className="alert-icon">{alertIcon}</span> 
          </div>
          <p className="confirmation-text">{confirmationText}</p> 
          <div className="button-group">
            <button className="cancel-button" onClick={onCancel}>{button1}</button>
            <button className="confirm-button" onClick={onConfirm}>{button2}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationCard;
