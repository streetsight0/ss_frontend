import React, { useEffect } from "react";
import "./Popup.css";

interface PopupProps {
  message: string;
  duration?: number; 
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer); 
  }, [duration, onClose]);

  return (
    <div className="popup-overlay">
      <div className="popup">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Popup;
