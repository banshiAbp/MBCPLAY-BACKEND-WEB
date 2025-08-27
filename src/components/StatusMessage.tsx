import React from "react";
import "../styles/components/status-message.scss";
import { IoMdClose } from "react-icons/io";

interface StatusMessageProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

const StatusMessage: React.FC<StatusMessageProps> = ({
  type,
  message,
  onClose,
}) => {
  if (!message) return null;
  return (
    <div className={`status-message ${type}`}>
      <span className="status-message-text">{message}</span>
      <span className="status-message-close" onClick={onClose} title="Close">
        <IoMdClose size={20} />
      </span>
    </div>
  );
};

export default StatusMessage;
