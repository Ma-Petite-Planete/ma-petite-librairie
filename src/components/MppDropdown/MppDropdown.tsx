import React, { useEffect, useRef } from 'react';
import './mpp_dropdown.css';
import { getIconFromName } from '../../utils/MppIcons';
import useClickOutside from '../../hooks/clickOutside';

interface OptionType {
  prefixIconName?: string;
  label?: string;
  id: string;
  value?: string;
}

interface MppDropDownProps<T> {
  options: Array<T>;
  onChange: (value: T) => void;
  defaultValue: T;
  placeholder: string;
  isDisabled?: boolean;
  textClassname?: string;
}

/**
 * Le composant MppDropDown rend un menu déroulant personnalisable.
 *
 * @template T - Le type des options.
 *
 * @param {MppDropDownProps<T>} props - Les propriétés du composant dropdown.
 * @param {string} props.placeholder - Le texte de l'espace réservé à afficher lorsqu'aucune option n'est sélectionnée.
 * @param {(option: T) => void} props.onChange - La fonction de rappel pour gérer les changements de sélection d'option.
 * @param {T[]} props.options - La liste des options à afficher dans le menu déroulant.
 * @param {boolean} [props.isDisabled] - Indicateur pour désactiver le menu déroulant.
 * @param {T} props.defaultValue - L'option sélectionnée par défaut.
 * @param {string} [props.textClassname='text_body'] - Le nom de la classe CSS pour le texte.
 *
 * @example
 * ```tsx
const ExampleComponent = () => {
  const options = [
    { id: '1', value: 'Option 1', prefixIconName: 'icon1' },
    { id: '2', value: 'Option 2', prefixIconName: 'icon2' },
    { id: '3', value: 'Option 3', prefixIconName: 'icon3' },
  ];

  const handleChange = (selectedOption: OptionType) => {
    console.log('Option sélectionnée:', selectedOption);
  };

  return (
    <MppDropDown
      options={options}
      onChange={handleChange}
      defaultValue={options[0]}
      placeholder="Sélectionnez une option"
    />
  );
};
 * ```
 */

const MppDropDown = <T extends OptionType>({
  placeholder,
  onChange,
  options,
  isDisabled,
  defaultValue,
  textClassname = 'text_body',
}: MppDropDownProps<T>) => {
  const [selectedOption, setSelectedOption] = React.useState<T | null>(
    defaultValue
  );
  const [isDropdownVisible, setIsDropdownVisible] =
    React.useState<boolean>(false);
  const PrefixIcon = getIconFromName(selectedOption?.prefixIconName);
  const dropDownRef = useRef<HTMLDivElement>(null);
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
        className={`select_button ${textClassname}
          ${isDropdownVisible ? 'open' : ''}
          ${(placeholder && defaultValue.value === '' && !selectedOption) || isDisabled ? 'default' : ''}
          ${selectedOption ? 'selected' : ''}`}
      >
        <span className="select_button--selected_value">
          {(selectedOption?.prefixIconName ||
            selectedOption?.prefixIconName) && (
            <PrefixIcon
              style={{ width: '14px', height: '14px', margin: '0 2px 0 0' }}
            />
          )}

          {selectedOption?.value
            ? selectedOption?.value
            : defaultValue.value
              ? defaultValue.value
              : placeholder}
        </span>
        <span
          className={`${isDropdownVisible ? 'arrow arrow--open' : isDisabled ? 'arrow--disabled arrow' : 'arrow'}`}
        ></span>
      </button>
      {isDropdownVisible && (
        <ul className="select_dropdown">
          {options.map((option, index) => {
            const OptionPrefixIcon = getIconFromName(option.prefixIconName);
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
                className="text_body"
                key={index}
                onClick={() => {
                  setSelectedOption(option);
                  setIsDropdownVisible(false);
                  onChange(option);
                }}
              >
                {option.prefixIconName && (
                  <OptionPrefixIcon
                    style={{
                      width: '14px',
                      height: '14px',
                      margin: '0 2px 0 0',
                    }}
                  />
                )}
                {option.value}
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
