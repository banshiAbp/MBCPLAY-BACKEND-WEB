import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import "../styles/components/form-element-toggle-switch.scss";

interface FormElementToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

const FormElementToggleSwitch: React.FC<FormElementToggleSwitchProps> = ({
  label,
  checked,
  onChange,
  className = "",
  disabled = false,
}) => {
  return (
    <div className={`form-element-toggle-switch ${className}`}>
      <div className="form-element-toggle-switch-label">{label}</div>
      <div className="form-element-toggle-switch-container">
        <span className="form-element-toggle-switch-text">
          {checked ? "Active" : "In Active"}
        </span>
        <ToggleSwitch checked={checked} onChange={onChange} disabled={disabled} />
      </div>
    </div>
  );
};

export default FormElementToggleSwitch;
