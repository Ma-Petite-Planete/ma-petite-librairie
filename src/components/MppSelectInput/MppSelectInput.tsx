import React from 'react';
import './mpp_select_input.css';

interface MppSelectInputProps {
  options: Array<{ value: string; prefixIcon?: string }>;
  onChange: (value: string) => void;
  value: string;
}

const MppSelectInput: React.FC<MppSelectInputProps> = () => {
  const [selectedOption, setSelectedOption] = React.useState('');
  return (
    <div className="custom-select">
      <button className="select-button text_body">
        <span>DropDown rempli</span>
        <span className="arrow"></span>
      </button>
      {/* <ul className="select-dropdown hidden text_body">
          <li>GitHub</li>
          <li>Instagram</li>
          <li>Facebook</li>
          <li>LinkedIn</li>
          <li>Twitter</li>
          <li>Reddit</li>
        </ul> */}
    </div>
  );
};

export default MppSelectInput;
