import React, { useEffect } from 'react';
import './mpp_select_input.css';

interface MppSelectInputProps {
  options: Array<{ value: string; prefixIcon?: string }>;
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  isDisabled?: boolean;
}

const MppSelectInput: React.FC<MppSelectInputProps> = ({
  placeholder,
  onChange,
  options,
  isDisabled,
  value,
}) => {
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );
  const [isDropdownVisible, setIsDropdownVisible] =
    React.useState<boolean>(false);

  useEffect(() => {
    if (isDisabled) {
      setSelectedOption(null);
    }
  }, [isDisabled]);

  return (
    <div className={`custom-select ${isDisabled ? 'select-disabled' : ''}`}>
      <button
        disabled={isDisabled}
        onClick={
          !isDisabled ? () => setIsDropdownVisible(!isDropdownVisible) : null
        }
        className={`select-button text_body ${isDropdownVisible ? 'open' : ''}  ${(placeholder && value === '' && !selectedOption) || isDisabled ? 'default' : ''} ${selectedOption ? 'selected' : ''}`}
      >
        <span>
          {selectedOption
            ? selectedOption
            : value
              ? value
              : placeholder
                ? placeholder
                : 'Select an option'}
        </span>
        <span
          className={`${isDropdownVisible ? 'arrow arrow_open' : isDisabled ? 'arrow-disabled arrow' : 'arrow'}`}
        ></span>
      </button>
      <ul className={`select-dropdown ${isDropdownVisible ? '' : 'hidden'}`}>
        {options.map((option, index) => (
          <li
            className="text_body"
            key={index}
            onClick={() => {
              console.log('option', option.value);
              setSelectedOption(option.value);
              setIsDropdownVisible(false);
              onChange(option.value);
            }}
          >
            {option.prefixIcon && <img src={option.prefixIcon} alt="" />}
            {option.value}
            <div className="select-dropdown--divider"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MppSelectInput;
