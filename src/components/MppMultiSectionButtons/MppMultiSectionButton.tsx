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
  console.log("🚀 ~ buttons_actions:", buttons_actions.length)


  return (
    <div className="multi_section_button--container">
      {buttons_actions.map((button, index) => (
        <button
          key={index}
          className={`multi_section_button--button text_body_sb`}
          type="button"
          onClick={button.OnClick}
        >
          {button.label}
        </button>
      ))}
    </div>
  );

};

export default MppMultiSectionButton;
