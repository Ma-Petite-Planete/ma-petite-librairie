import React, { useEffect, useId, useState } from 'react';
import './mpp_toggle_button.css';

interface ToggleButtonPropos {
  value: boolean;
  onChange: (value: boolean) => void;
  id?: string;
  disabled?: boolean;
  isBoxShadow?: boolean;
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

const MppToggleButton: React.FC<ToggleButtonPropos> = ({
  id,
  value,
  onChange,
  disabled = false,
  isBoxShadow = false,
}) => {
  const reactId = useId();
  const finalId = id ?? `mpp-toggle-${reactId}`;
  const [toggleValue, setToggleValue] = useState(value);

  useEffect(() => {
    setToggleValue(value);
  }, [value]);

  return (
    <div className={'toggle_button_container'}>
      <label
        htmlFor={finalId}
        className={`toggle_button ${toggleValue ? 'checked' : ''} ${disabled ? 'disabled_container' : ''} ${isBoxShadow ? 'toggle_box_shadow' : ''}`}
      >
        <input
          onChange={() => {
            const value = !toggleValue;
            setToggleValue(value);
            onChange(value);
          }}
          checked={toggleValue}
          type="checkbox"
          id={finalId}
          disabled={disabled}
        />
        <div className="toggle_button_indicator"></div>
      </label>
    </div>
  );
};

export default MppToggleButton;
