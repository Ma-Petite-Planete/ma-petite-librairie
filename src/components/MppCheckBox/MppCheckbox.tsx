import React, { useState } from 'react';
import './mpp_checkbox.css';
interface MppCheckboxProps {
  value: string;
  onChange: (value: string) => void;
  checked: boolean;
  isTableHeader?: boolean;
}

/**
 * Le composant MppCheckbox rend une case à cocher personnalisable avec un style optionnel pour l'en-tête de tableau.
 *
 * @component
 * @param {MppCheckboxProps} props - Les propriétés du composant MppCheckbox.
 * @param {string} props.value - La valeur associée à la case à cocher.
 * @param {function} props.onChange - La fonction de rappel pour gérer les changements d'état de la case à cocher.
 * @param {boolean} props.checked - L'état initial de la case à cocher.
 * @param {boolean} props.isTableHeader - Indicateur pour déterminer si la case à cocher est utilisée dans un en-tête de tableau.
 *
 * @returns {JSX.Element} Le composant MppCheckbox rendu.
 *
 * @example
 * <MppCheckbox
 *   value="exampleValue"
 *   onChange={handleCheckboxChange}
 *   checked={true}
 *   isTableHeader={false}
 * />
 */
const MppCheckbox: React.FC<MppCheckboxProps> = ({
  value,
  onChange,
  checked,
  isTableHeader = false,
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
