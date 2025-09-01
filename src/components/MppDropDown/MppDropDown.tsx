import React, { useCallback, useEffect, useRef } from 'react';
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

  const recalcPosition = useCallback(() => {
    if (dropDownRef.current && listRef.current && parentElement) {
      const parentRect = parentElement.getBoundingClientRect();
      const buttonRect = dropDownRef.current.getBoundingClientRect();
      const dropdownHeight = listRef.current.offsetHeight;

      const spaceBelow = parentRect.bottom - buttonRect.bottom;
      setOpenUpward(spaceBelow < dropdownHeight);
    }
  }, [parentElement]);

  const handleToggle = () => {
    if (!isDisabled) {
      recalcPosition();
      setIsDropdownVisible((prev) => !prev);
    }
  };

  useEffect(() => {
    const parentEl = parentElement;
    window.addEventListener('resize', recalcPosition);
    parentEl?.addEventListener('scroll', recalcPosition, { passive: true });

    return () => {
      window.removeEventListener('resize', recalcPosition);
      parentEl?.removeEventListener('scroll', recalcPosition);
    };
  }, [isDropdownVisible, parentElement, recalcPosition]);

  useEffect(() => {
    recalcPosition()
  }, [recalcPosition])

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
      className={`custom_select ${isDisabled ? 'select_disabled' : ''} ${isDropdownVisible ? 'open' : ''}`}
      style={{ width: width }}
    >
      <button
        type="button"
        disabled={isDisabled}
        onClick={handleToggle}
        className={`select_button ${textClassname}
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
      </div>
    </div>
  );
};

export default MppDropDown;
