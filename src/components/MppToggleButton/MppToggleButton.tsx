import React, { useId, useState } from 'react';
import './mpp_toggle_button.css';

interface ToggleButtonPropos {
  value: boolean;
  onChange: (value: boolean) => void;
}

/**
 * Le composant MppToggleButton rend un bouton bascule personnalisable.
 *
 * @component
 * @param {ToggleButtonProps} props - Les propriétés du composant MppToggleButton.
 * @param {boolean} props.value - L'état initial du bouton bascule.
 * @param {function} props.onChange - La fonction de rappel pour gérer les changements d'état du bouton bascule.
 *
 * @returns {JSX.Element} Le composant MppToggleButton rendu.
 *
 * @example
 * <MppToggleButton
 *   value={true}
 *   onChange={(newValue) => console.log(newValue)}
 * />
 */

const MppToggleButton: React.FC<ToggleButtonPropos> = ({ value, onChange }) => {
  const [toggleValue, setToggleValue] = useState(value);
  const id = useId();

  return (
    <div className="toggle_button_container">
      <label
        htmlFor={id}
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
          id={id}
        />
        <div className="toggle_button_indicator"></div>
      </label>
    </div>
  );
};

export default MppToggleButton;
