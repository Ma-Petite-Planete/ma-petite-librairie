import React from 'react';
import './mpp_multi_section_button.css';

interface ButtonActions {
  label: string;
  OnClick: () => void;
}

interface MppMultiSectionButtonProps {
  buttons_actions: Array<ButtonActions>;
}

/**
 * @interface MppMultiSectionButtonProps {
 *
 * @example
 *
 *
 */

const MppMultiSectionButton: React.FC<MppMultiSectionButtonProps> = ({
  buttons_actions,
}) => {
  console.log('🚀 ~ buttons_actions:', buttons_actions.length);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <div className="multi_section_button--container">
      {buttons_actions.map((button, index) => (
        <button
          key={index}
          className={`multi_section_button--button text_body_sb ${selectedIndex === index ? 'multi_section_button--selected' : ''}`}
          type="button"
          onClick={() => {
            button.OnClick();
            setSelectedIndex(index);
          }}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default MppMultiSectionButton;
