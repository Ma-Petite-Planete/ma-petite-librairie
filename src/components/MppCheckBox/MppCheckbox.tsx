import React, { useEffect, useState } from 'react';
import './mpp_checkbox.css';
interface MppCheckboxProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
  indeterminate?: boolean;
  isTableHeader?: boolean;
  specialClassName?: string;
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
  onChange,
  checked,
  indeterminate = false,
  isTableHeader = false,
  specialClassName = '',
}: MppCheckboxProps): JSX.Element => {
  const [isSelected, setIsSelected] = useState<boolean>(checked ?? false);

  useEffect(() => {
    setIsSelected(checked ?? false);
  }, [checked]);
  return (
    <div className="checkbox_container">
      <div className="checkbox_container_checkbox">
        <label
          className={`
            checkbox_container_label ${isTableHeader ? 'main_checkbox' : 'secondary_checkbox'}  
            ${isTableHeader && indeterminate ? 'indeterminated_checkbox' : ''} `}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              setIsSelected(e.target.checked);
              onChange(e);
            }}
          />
          <span className={`checkmark ${specialClassName}`}></span>
          <span
            className={`checkmark_indeterminate ${specialClassName}`}
            style={{ display: indeterminate ? 'block' : 'none' }}
          ></span>
        </label>
      </div>
    </div>
  );
};

export default MppCheckbox;
