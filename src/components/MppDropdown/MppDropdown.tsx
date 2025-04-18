import React, { useEffect, useRef } from 'react';
import './mpp_dropdown.css';
import useClickOutside from '../../hooks/clickOutside';

interface MppDropDownProps<T extends object, K extends keyof T> {
  property: K;
  options: Array<T>;
  onChange: (value: T) => void;
  defaultValue: T;
  placeholder: string;
  isDisabled?: boolean;
  textClassname?: string;
  needEmojiFont?: boolean;
}

/**
 * Le composant MppDropDown rend un menu déroulant personnalisable.
 *
 * @template T - Le type des options.
 * @template K - La clé du type des options.
 *
 * @param {MppDropDownProps<T, K>} props - Les propriétés du composant dropdown.
 * @param {string} props.placeholder - Le texte de l'espace réservé à afficher lorsqu'aucune option n'est sélectionnée.
 * @param {(option: T) => void} props.onChange - La fonction de rappel pour gérer les changements de sélection d'option.
 * @param {T[]} props.options - La liste des options à afficher dans le menu déroulant.
 * @param {boolean} [props.isDisabled] - Indicateur pour désactiver le menu déroulant.
 * @param {T} props.defaultValue - L'option sélectionnée par défaut.
 * @param {string} [props.textClassname='text_body'] - Le nom de la classe CSS pour le texte.
 * @param {K} props.property - La propriété de l'option à afficher dans le menu déroulant.
 *
 * @example
 * ```tsx
 * const ExampleComponent = () => {
 *   const options = [
 *     { id: '1', value: 'Option 1' },
 *     { id: '2', value: 'Option 2' },
 *     { id: '3', value: 'Option 3' },
 *   ];
 *
 *   const handleChange = (selectedOption: T) => {
 *     console.log('Option sélectionnée:', selectedOption);
 *   };
 *
 *   return (
 *     <MppDropDown
 *       options={options}
 *       onChange={handleChange}
 *       defaultValue={options[0]}
 *       placeholder="Sélectionnez une option"
 *       property="value"
 *     />
 *   );
 * };
 * ```
 */

const MppDropDown = <T extends object, K extends keyof T>({
  placeholder,
  onChange,
  options,
  isDisabled,
  defaultValue,
  textClassname = 'text_body',
  property,
  needEmojiFont = false,
}: MppDropDownProps<T, K>) => {
  const [selectedOption, setSelectedOption] = React.useState<T | null>(
    defaultValue
  );
  const [isDropdownVisible, setIsDropdownVisible] =
    React.useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const displayedDefaultValue = defaultValue[property] as string;
  const selectedValue = selectedOption[property] as string;

  useClickOutside(dropDownRef, () => {
    if (!isDisabled) {
      setIsDropdownVisible(false);
    }
  });
  useEffect(() => {
    if (isDisabled) {
      setSelectedOption(null);
    }
  }, [isDisabled]);

  return (
    <div
      ref={dropDownRef}
      className={`custom_select ${isDisabled ? 'select_disabled' : ''}`}
    >
      <button
        disabled={isDisabled}
        onClick={
          !isDisabled ? () => setIsDropdownVisible(!isDropdownVisible) : null
        }
        className={` select_button ${textClassname}
          ${isDropdownVisible ? 'open' : ''}
          ${(placeholder && displayedDefaultValue === '' && !selectedOption) || isDisabled ? 'default' : ''}
          ${selectedOption ? 'selected' : ''}`}
      >
        <span
          className={`select_button--selected_value ${needEmojiFont ? 'emoji' : ''}`}
        >
          {selectedValue
            ? selectedValue
            : displayedDefaultValue
              ? displayedDefaultValue
              : placeholder}
        </span>
        <span
          className={`${isDropdownVisible ? 'arrow arrow--open' : isDisabled ? 'arrow--disabled arrow' : 'arrow'}`}
        ></span>
      </button>
      {isDropdownVisible && (
        <ul className="select_dropdown">
          {options.map((option, index) => {
            const displayedvalue = option[property] as string;
            return (
              <li
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    setSelectedOption(option);
                    setIsDropdownVisible(false);
                    onChange(option);
                  }
                }}
                tabIndex={0}
                className={needEmojiFont ? 'emoji' : ''}
                key={index}
                onClick={() => {
                  setSelectedOption(option);
                  setIsDropdownVisible(false);
                  onChange(option);
                }}
              >
                {displayedvalue}
                <div className="select_dropdown_divider"></div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MppDropDown;
