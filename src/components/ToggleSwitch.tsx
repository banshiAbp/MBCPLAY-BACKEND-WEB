import React from "react";
import "../styles/components/toggle-switch.scss";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled,
}) => {
  return (
    <label
      className={`custom-toggle-switch${checked ? " checked" : ""}${
        disabled ? " disabled" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="custom-toggle-slider" />
    </label>
  );
};

export default ToggleSwitch;
