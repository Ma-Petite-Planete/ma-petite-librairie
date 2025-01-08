import React from 'react';
import './mpp_select_input.css';

interface MppSelectInputProps {
  options: Array<{ value: string; prefixIcon?: string }>;
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
}

const MppSelectInput: React.FC<MppSelectInputProps> = ({
  placeholder,
  onChange,
  options,
}) => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

  return (
    <div className="custom-select">
      <button
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        className={`select-button text_body ${isDropdownVisible ? 'open' : ''}`}
      >
        <span>{selectedOption ?? placeholder ?? ''}</span>
        <span
          className={`${isDropdownVisible ? 'arrow_open' : 'arrow'}`}
        ></span>
      </button>
      <ul className={`select-dropdown ${isDropdownVisible ? '' : 'hidden'}`}>
        {options.map((option, index) => (
          <li
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MppSelectInput;
