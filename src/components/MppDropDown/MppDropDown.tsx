import React, { useEffect, useRef } from 'react';
import './mpp_dropdown.css';
import useClickOutside from '../../hooks/clickOutside';

interface MppDropDownProps<T extends object, K extends keyof T> {
  property: K;
  options: Array<T>;
  onChange: (value: T) => void;
  defaultValue: T | null;
  placeholder: string;
  isDisabled?: boolean;
  textClassname?: string;
  needEmojiFont?: boolean;
  isDropDownEmpty?: boolean;
  emptyValue?: React.ReactNode;
  isOptionDisabled?: (option: T) => boolean;
  highlightCurrentOption?: boolean;
  width?: string;
  identifierKey?: keyof T;
  parentElement?: Element | null;
}

interface HighlightedDropDownProps<T extends object, K extends keyof T>
  extends MppDropDownProps<T, K> {
  highlightCurrentOption: true;
  identifierKey: keyof T;
}

interface NonHighlightedDropDownProps<T extends object, K extends keyof T>
  extends MppDropDownProps<T, K> {
  highlightCurrentOption?: false | undefined;
  identifierKey?: keyof T;
}

type MppDropDownPropsComplete<T extends object, K extends keyof T> =
  | HighlightedDropDownProps<T, K>
  | NonHighlightedDropDownProps<T, K>;

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
 * @param {keyof T} [identifierKey] - (Optionnel) La clé unique utilisée pour identifier chaque option lors de la comparaison et de la mise en surbrillance de l'option sélectionnée.
 * Si `highlightCurrentOption` est à `true`, cette propriété est requise pour permettre la comparaison des options via cette clé.
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
  textClassname = '',
  property,
  needEmojiFont = false,
  isDropDownEmpty = false,
  emptyValue,
  isOptionDisabled,
  highlightCurrentOption,
  width,
  identifierKey,
  parentElement,
}: MppDropDownPropsComplete<T, K>) => {
  const [selectedOption, setSelectedOption] = React.useState<T | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] =
    React.useState<boolean>(false);
  const [openUpward, setOpenUpward] = React.useState(false);

  const dropDownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue, options]);

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

  const recalcPosition = () => {
    if (dropDownRef.current && listRef.current && parentElement) {
      const parentRect = parentElement.getBoundingClientRect();
      const buttonRect = dropDownRef.current.getBoundingClientRect();
      const dropdownHeight = listRef.current.offsetHeight || 200; // fallback estimé

      const spaceBelow = parentRect.bottom - buttonRect.bottom;
      setOpenUpward(spaceBelow < dropdownHeight);
    }
  };

  const handleToggle = () => {
    if (!isDisabled) {
      // 🔹 calcule la position AVANT d'ouvrir
      recalcPosition();
      setIsDropdownVisible((prev) => !prev);
    }
  };

  useEffect(() => {
    recalcPosition();
  });

  useEffect(() => {
    if (isDropdownVisible) {
      recalcPosition();

      const parentEl = parentElement;
      window.addEventListener('resize', recalcPosition);
      parentEl?.addEventListener('scroll', recalcPosition, { passive: true });

      return () => {
        window.removeEventListener('resize', recalcPosition);
        parentEl?.removeEventListener('scroll', recalcPosition);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDropdownVisible, parentElement]);

  const isOptionSelected = (option: T) => {
    const selectedId = selectedOption?.[identifierKey];
    const defaultId = defaultValue?.[identifierKey];
    const optionId = option[identifierKey];
    return selectedId === optionId || (!selectedId && defaultId === optionId);
  };

  const displayedDefaultValue = defaultValue
    ? (defaultValue[property] as string)
    : null;

  const displaySelectedValue = selectedOption
    ? (selectedOption[property] as string)
    : null;

  return (
    <div
      ref={dropDownRef}
      className={`custom_select ${isDisabled ? 'select_disabled' : ''}`}
      style={{ width: width }}
    >
      <button
        type="button"
        disabled={isDisabled}
        onClick={handleToggle}
        className={`select_button ${textClassname}
    ${isDropdownVisible ? 'open' : ''}
    ${(placeholder && !displayedDefaultValue && !selectedOption) || isDisabled ? 'default' : ''}
    ${selectedOption ? 'selected' : ''}`}
      >
        <span
          className={`select_button--selected_value ${needEmojiFont ? 'emoji' : ''} ${textClassname}`}
        >
          {displaySelectedValue
            ? displaySelectedValue
            : displayedDefaultValue
              ? displayedDefaultValue
              : placeholder}
        </span>
        <span
          className={`${isDropdownVisible ? 'arrow arrow--open' : isDisabled ? 'arrow--disabled arrow' : 'arrow'}`}
        ></span>
      </button>
      <div
        className={`dropdown_ul_container ${openUpward ? 'open-up' : 'open-down'}`}
        ref={listRef}
      >
        {isDropdownVisible && (
          <ul className="select_dropdown ">
            {isDropDownEmpty ? (
              <div>{emptyValue}</div>
            ) : (
              options.map((option, index) => {
                const displayedValueInDropdown = option[property] as string;
                const isDisabledOption = isOptionDisabled?.(option) ?? false;
                return (
                  <li
                    key={index}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !isDisabledOption) {
                        setSelectedOption(option);
                        setIsDropdownVisible(false);
                        onChange(option);
                      }
                    }}
                    tabIndex={0}
                    className={`${needEmojiFont ? 'emoji' : ''}${textClassname}
                    ${isDisabledOption ? 'option_disabled' : ''}
                    ${
                      highlightCurrentOption && isOptionSelected(option)
                        ? 'text_body_sb'
                        : ''
                    }`}
                    onClick={() => {
                      if (!isDisabledOption) {
                        setSelectedOption(option);
                        setIsDropdownVisible(false);
                        onChange(option);
                      }
                    }}
                    aria-disabled={isDisabledOption}
                  >
                    {displayedValueInDropdown}
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MppDropDown;
