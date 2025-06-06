import React, { useEffect, useRef } from 'react';
import './mpp_dropdown.css';
import useClickOutside from '../../hooks/clickOutside';
import { MppIcons } from '../../utils/MppIcons';

interface MppDropDownProps<T extends object, K extends keyof T> {
  property: K;
  options: Array<T>;
  onChange: (value: T | T[] | undefined) => void;
  defaultValue: T;
  defaultValues?: T[];
  placeholder: string;
  isDisabled?: boolean;
  textClassname?: string;
  needEmojiFont?: boolean;
  isDropDownEmpty?: boolean;
  emptyValue?: React.ReactNode;
  canClearField?: boolean;
  clearValue?: T | T[];
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
 * @param {string} [props.textClassname=''] - Le nom de la classe CSS pour le texte.
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
  defaultValues = [],
  textClassname = '',
  property,
  needEmojiFont = false,
  isDropDownEmpty = false,
  emptyValue,
  canClearField = false,
  clearValue,
}: MppDropDownProps<T, K>) => {
  const [selectedOption, setSelectedOption] = React.useState<T | null>(
    defaultValue
  );
  const [selectedOptions, setSelectedOptions] = React.useState<T[]>(
    defaultValues
  );
  const [isDropdownVisible, setIsDropdownVisible] =
    React.useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const displayedDefaultValue = canClearField
    ? defaultValues.map((value) => (value[property] as string)).join(', ')
    : (defaultValue[property] as string) || '';
  const selectedValue = canClearField
    ? selectedOptions.map((value) => (value[property] as string)).join(', ')
    : selectedOption
      ? (selectedOption[property] as string)
      : '';

  useClickOutside(dropDownRef, () => {
    if (!isDisabled) {
      setIsDropdownVisible(false);
    }
  });

  useEffect(() => {
    if (isDisabled) {
      if (canClearField) {
        setSelectedOptions([]);
      } else {
        setSelectedOption(null);
      }
    }
  }, [isDisabled, canClearField]);

  useEffect(() => {
    if (canClearField) {
      setSelectedOptions(defaultValues);
    } else {
      setSelectedOption(defaultValue);
    }
  }, [defaultValue, defaultValues, canClearField]);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canClearField) {
      const toClear = clearValue as T[] | undefined;
      setSelectedOptions(toClear ?? []);
      onChange(toClear);
    } else {
      const toClear = clearValue as T | undefined;
      setSelectedOption(toClear ?? defaultValue);
      onChange(toClear);
    }
  };

  const toggleOption = (option: T) => {
    if (!canClearField) {
      setSelectedOption(option);
      onChange(option);
      setIsDropdownVisible(false);
      return;
    }
    const exists = selectedOptions.some(
      (selectedOption) => selectedOption[property] === option[property]
    );
    let newSelection: T[];
    if (exists) {
      newSelection = selectedOptions.filter(
        (selectedOption) => selectedOption[property] !== option[property]
      );
    } else {
      newSelection = [...selectedOptions, option];
    }
    setSelectedOptions(newSelection);
    onChange(newSelection);
  };

  return (
    <div
      ref={dropDownRef}
      className={`custom_select ${isDisabled ? 'select_disabled' : ''}`}
    >
      <button
        disabled={isDisabled}
        onClick={
          !isDisabled ? () => setIsDropdownVisible(!isDropdownVisible) : undefined
        }
        className={`select_button ${textClassname}
        ${isDropdownVisible ? 'open' : ''}
        ${(placeholder &&
            displayedDefaultValue === '' &&
            (canClearField
              ? selectedOptions.length === 0
              : !selectedOption)) ||
            isDisabled
            ? 'default'
            : ''
          }
        ${canClearField
            ? selectedOptions.length > 0
              ? 'selected'
              : ''
            : selectedOption
              ? 'selected'
              : ''
          }`}
      >
        <span
          className={`select_button--selected_value ${needEmojiFont ? 'emoji' : ''} ${textClassname}`}
        >
          {selectedValue || placeholder}
        </span>
        <div className="dropdown_icon_wrapper">
          {canClearField && selectedOptions.length > 0 && (
            <span
              className="dropdown_clear_icon"
              onClick={handleClear}
              aria-label="Clear selection"
            >
              <MppIcons.inputClose />
            </span>
          )}
          <span
            className={`${isDropdownVisible
              ? 'arrow arrow--open'
              : isDisabled
                ? 'arrow--disabled arrow'
                : 'arrow'
              }`}
          ></span>
        </div>
      </button>
      {isDropdownVisible && (
        <ul className="select_dropdown">
          {isDropDownEmpty ? (
            <div>{emptyValue}</div>
          ) : (
            options.map((option, index) => {
              const displayedvalue = option[property] as string;
              const isSelected = canClearField
                ? selectedOptions.some((o) => o[property] === option[property])
                : selectedOption
                  ? selectedOption[property] === option[property]
                  : false;
              return (
                <li
                  key={index}
                  tabIndex={0}
                  className={`${needEmojiFont ? 'emoji' : ''}${textClassname}`}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      toggleOption(option);
                      if (!canClearField) setIsDropdownVisible(false);
                    }
                  }}
                  onClick={() => {
                    toggleOption(option);
                  }}
                >
                  <span className={isSelected ? 'selected_item' : ''}>
                    {displayedvalue}
                  </span>
                  <div className="select_dropdown_divider"></div>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );


};

export default MppDropDown;
