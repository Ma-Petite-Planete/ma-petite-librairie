import React, { useEffect, useState } from 'react';
import './mpp_checkbox.css';
interface MppCheckboxProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
  indeterminate?: boolean;
  isTableHeader?: boolean;
  specialClassName?: string;
  label?: string;
  isDisabled?: boolean;
}

/**
 * Le composant MppCheckbox rend une case à cocher personnalisable avec un style optionnel pour l'en-tête de tableau.
 *
 * @component
 * @param {MppCheckboxProps} props - Les propriétés du composant MppCheckbox.
 * @param {function} props.onChange - La fonction de rappel pour gérer les changements d'état de la case à cocher.
 * @param {boolean} props.checked - L'état initial de la case à cocher.
 * @param {boolean} props.isTableHeader - Indicateur pour déterminer si la case à cocher est utilisée dans un en-tête de tableau.
 * @param {string} [props.label] - Texte affiché à droite de la case ; cliquer dessus coche la case.
 * @param {boolean} [props.isDisabled=false] - Désactive la case.
 *
 * @returns {JSX.Element} Le composant MppCheckbox rendu.
 *
 * @example
 * <MppCheckbox
 *   onChange={handleCheckboxChange}
 *   checked={true}
 *   label="Je confirme l'envoi"
 * />
 */
const MppCheckbox: React.FC<MppCheckboxProps> = ({
  onChange,
  checked,
  indeterminate = false,
  isTableHeader = false,
  specialClassName = '',
  label,
  isDisabled = false,
}: MppCheckboxProps): JSX.Element => {
  const [isSelected, setIsSelected] = useState<boolean>(checked ?? false);

  useEffect(() => {
    setIsSelected(checked ?? false);
  }, [checked]);
  return (
    <div
      className={`checkbox_container ${isDisabled ? 'checkbox_container--disabled' : ''}`}
    >
      <div className="checkbox_container_checkbox">
        <label
          onClick={(e) => e.stopPropagation()}
          className={`
            checkbox_container_label ${isTableHeader ? 'main_checkbox' : 'secondary_checkbox'}
            ${isTableHeader && indeterminate ? 'indeterminated_checkbox' : ''} `}
        >
          <input
            onClick={(e) => e.stopPropagation()}
            type="checkbox"
            checked={isSelected}
            disabled={isDisabled}
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
          {label && (
            <span className="checkbox_container_text text_body">{label}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default MppCheckbox;
