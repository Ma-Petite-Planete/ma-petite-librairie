import React, { useEffect, useRef, useState } from 'react';
import './mpp_checkbox.css';
interface MppCheckboxProps {
  value: string;
  onChange: (data: { value: string; checked: boolean }) => void;
  checked?: boolean;
  indeterminate?: boolean;
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
  indeterminate,
  isTableHeader = false,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(checked ?? false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  if (isTableHeader) {
    console.log("indeterminate", indeterminate)
  }

  useEffect(() => {
    setIsSelected(checked ?? false);
  }, [checked]);
  return (
    <div className="checkbox_container">
      <div className="checkbox_container_checkbox">
        <label
          className={`
            checkbox_container_label ${isTableHeader ? 'main_checkbox' : 'secondary_checkbox'}  
            ${isTableHeader && indeterminate ? 'indeterminated_checkbox' : null} `}
          htmlFor={`checkbox_${value}`}
        >
          <input
            ref={inputRef}
            className="checkbox_container_input"
            checked={isSelected}
            type="checkbox"
            name="checkbox"
            id={`checkbox_${value}`}
            onChange={() => {
              setIsSelected((param) => !param);
              onChange({
                value: value,
                checked: !isSelected,

              });
            }}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
};

export default MppCheckbox;
