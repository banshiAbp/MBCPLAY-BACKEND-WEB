import React from "react";
import "../styles/components/details-popup.scss";

interface DetailsPopupProps {
  open: boolean;
  title: string;
  details: string;
  onClose: () => void;
}

const DetailsPopup: React.FC<DetailsPopupProps> = ({
  open,
  title,
  details,
  onClose,
}) => {
  if (!open) return null;
  return (
    <div className="details-popup-overlay" onClick={onClose}>
      <div className="details-popup-modal" onClick={(e) => e.stopPropagation()}>
        <h4 className="details-popup-title">{title}</h4>
        <div className="details-popup-content">{details}</div>
        <button className="details-popup-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DetailsPopup;
