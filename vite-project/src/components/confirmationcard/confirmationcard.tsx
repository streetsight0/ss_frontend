import React from "react";
import "./confirmationcard.css";
import SuccessIcon from "../../assets/Icons/campaignPopup.png"; 

interface ConfirmationCardProps {
  onCancel: () => void;
  onConfirm: () => void;
  alertIcon: string; 
  confirmationText: string; 
  button1:string;
  button2:string;
}

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({ onCancel, onConfirm, confirmationText, button1,button2}) => {
  return (
    <div className="overlay">
      <div className="confirmation-card1" style={{width:"480px",padding:"30px"}}>
        <div className="confirmation-content1">
          <div className="icon-wrapper">
          <img src={SuccessIcon} alt="Success" className="success-icon" /> 
          </div>
          <p className="confirmation-text1">{confirmationText}</p> 
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
