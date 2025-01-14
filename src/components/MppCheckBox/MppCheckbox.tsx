import React, { useState } from 'react';
import './mpp_checkbox.css';
interface MppCheckboxProps {
  value: string;
  onChange: (value: string) => void;
  checked: boolean;
}

const MppCheckbox: React.FC<MppCheckboxProps> = ({
  value,
  onChange,
  checked,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(checked);
  return (
    <div className="checkbox_container">
      <div className="checkbox_container_checkbox">
        <label
          className="checkbox_container_label"
          htmlFor={`checkbox_${value}`}
        >
          <input
            className="checkbox_container_input"
            checked={isSelected}
            type="checkbox"
            name="checkbox"
            id={`checkbox_${value}`}
            onChange={() => {
              setIsSelected((param) => !param);
              onChange(value);
            }}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
};

export default MppCheckbox;
