import React from "react";
import "../styles/components/checkbox.scss";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  disabled = false,
  className = "",
}) => {
  return (
    <label className={`custom-checkbox ${className}`.trim()}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="custom-checkbox-box" />
    </label>
  );
};

export default Checkbox;
