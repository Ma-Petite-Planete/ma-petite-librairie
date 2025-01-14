import React, { useState } from 'react';
import './mpp_checkbox.css';
interface MppCheckboxProps {
  value: string;
  onChange: (value: string) => void;
  checked: boolean;
  isTableHeader: boolean;
}

const MppCheckbox: React.FC<MppCheckboxProps> = ({
  value,
  onChange,
  checked,
  isTableHeader,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(checked);
  return (
    <div className="checkbox_container">
      <div className="checkbox_container_checkbox">
        <label
          className={`checkbox_container_label ${isTableHeader ? 'main_checkbox' : 'secondary_checkbox'}`}
          htmlFor={`checkbox_${value}`}
        >
          <input
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setIsSelected((param) => !param);
                onChange(value);
              }
            }}
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
