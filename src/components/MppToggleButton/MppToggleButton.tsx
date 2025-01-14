import React, { useState } from 'react';
import './mpp_toggle_button.css';

interface ToggleButtonPropos {
  value: boolean;
  onChange: (value: boolean) => void;
}

const MppToggleButton: React.FC<ToggleButtonPropos> = ({ value, onChange }) => {
  const [toggleValue, setToggleValue] = useState(value);

  return (
    <div className="toggle_button_container">
      <label
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            const value = !toggleValue;
            setToggleValue(value);
            onChange(value);
          }
        }}
        tabIndex={0}
        htmlFor="toggle"
        className={`toggle_button ${toggleValue ? 'checked' : ''}`}
      >
        <input
          onChange={() => {
            const value = !toggleValue;
            setToggleValue(value);
            onChange(value);
          }}
          checked={toggleValue}
          type="checkbox"
          id="toggle"
        />
        <div className="toggle_button_indicator"></div>
      </label>
    </div>
  );
};

export default MppToggleButton;
