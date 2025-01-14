import React, { useEffect, useRef } from 'react';
import './mpp_dropdown.css';
import { getIconFromName } from '../../utils/MppIcons';
import useClickOutside from '../../hooks/clickOutside';

interface Option {
  value: string;
  prefixIconName?: string;
  label: string;
}

interface MppDropDownProps {
  options: Array<Option>;
  onChange: (value: Option) => void;
  value: string;
  placeholder: string;
  isDisabled?: boolean;
}

const MppDropDown: React.FC<MppDropDownProps> = ({
  placeholder,
  onChange,
  options,
  isDisabled,
  value,
}) => {
  const [selectedOption, setSelectedOption] = React.useState<Option | null>(
    null
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
          ${(placeholder && value === '' && !selectedOption) || isDisabled ? 'default' : ''}
          ${selectedOption ? 'selected' : ''}`}
      >
        <span className="select_button--selected_value">
          {selectedOption?.prefixIconName && (
            <PrefixIcon
              style={{ width: '14px', height: '14px', margin: '0 2px 0 0' }}
            />
          )}

          {selectedOption?.label
            ? selectedOption?.label
            : value
              ? value
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
                  console.log();
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
                {option.label}
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
