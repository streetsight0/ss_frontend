import React from "react";
import "./ConfirmationCard.css";

interface ConfirmationCardProps {
  onCancel: () => void;
  onConfirm: () => void;
  alertIcon: string; // New prop for the alert icon
}

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({ onCancel, onConfirm, alertIcon }) => {
  return (
    <div className="overlay">
      <div className="confirmation-card">
        <div className="confirmation-content">
          <div className="icon-wrapper">
            <span className="alert-icon">{alertIcon}</span> {/* Display the user-selected icon */}
          </div>
          <p className="confirmation-text">Are you sure you want to cancel adding new billboard?</p>
          <div className="button-group">
            <button className="cancel-button" onClick={onCancel}>Cancel</button>
            <button className="confirm-button" onClick={onConfirm}>Add it!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationCard;
