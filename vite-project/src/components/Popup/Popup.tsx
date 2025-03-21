import React from "react";
import "./Popup.css";

interface PopupProps {
  message: string;
  duration?: number; 
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onConfirm, onCancel }) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     onCancel(); 
  //   }, duration);

    return () => clearTimeout(timer); 
  }, [duration, onClose]);

  return (
    <div className="popup-overlay">
      <div className="popup">
        <p>{message}</p>
        <div>
          <button onClick={onConfirm}>Delete</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
