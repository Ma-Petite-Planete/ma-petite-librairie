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
}

const MppDropDown = <T extends OptionType>({
  placeholder,
  onChange,
  options,
  isDisabled,
  defaultValue,
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
        className={`select_button text_body
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
