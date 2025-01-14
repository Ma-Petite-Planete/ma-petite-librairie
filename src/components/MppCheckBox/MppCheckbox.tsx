import React, { useState } from 'react';
import './mpp_checkbox.css';
interface MppCheckboxProps {
  value: string;
  onChange: (value: string) => void;
  checked: boolean;
  htmlfor: string;
}

const MppCheckbox: React.FC<MppCheckboxProps> = ({
  value,
  onChange,
  checked,
  htmlfor,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(checked);
  return (
    <div className="checkbox_container">
      <label className="checkbox_container_label" htmlFor={htmlfor}></label>
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
    </div>
  );
};

export default MppCheckbox;
