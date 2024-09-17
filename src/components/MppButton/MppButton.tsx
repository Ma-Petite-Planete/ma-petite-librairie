import React from 'react';
import './mpp_button.css';
import { ButtonType } from './ButtonType';

interface MppButtonProps {
  title: string;
  buttonType: ButtonType;
  onPress: (() => void) | null;
  style?: React.CSSProperties;
  hoverStyle?: React.CSSProperties;
  activeStyle?: React.CSSProperties;
}

/** 
 * @interface MppButtonProps
 * @property {string} title - Titre du bouton.
 * @property {ButtonType} buttonType - enum pour le style
 * @property {void || null} onPress - fonction du bouton
 * @property {React.CSSProperties} style - style pour écraser les standards.
 * @property {React.CSSProperties} hoverStyle - style pour écraser les standards.
 * @property {React.CSSProperties} activeStyle - style pour écraser les standards.
 * 
 * @example
 * 
 * <MppButton
title="Bouton d'action"
onPress={() => {
  console.log('Bouton cliqué!');
}}
buttonType={ButtonType.primaryLarge}
/>
*/

const MppButton: React.FC<MppButtonProps> = ({
  title,
  onPress,
  buttonType,
  style = {},
  hoverStyle = {},
  activeStyle = {},
}) => {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const isDisabled = onPress === null;

  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(hover && !isDisabled ? hoverStyle : {}),
    ...(active && !isDisabled ? activeStyle : {}),
  };

  return (
    <button
      className={`mpp_button  ${
        buttonType === ButtonType.primaryLarge
          ? 'button_large text_body_sb'
          : buttonType === ButtonType.primaryMedium
            ? 'button_medium text_body'
            : buttonType === ButtonType.secondaryLarge
              ? 'secondary_type button_large text_body_sb'
              : 'secondary_type button_medium text_body'
      }`}
      style={combinedStyle}
      onClick={!isDisabled ? onPress : undefined}
      onMouseEnter={() => !isDisabled && setHover(true)}
      onMouseLeave={() => !isDisabled && setHover(false)}
      onMouseDown={() => !isDisabled && setActive(true)}
      onMouseUp={() => !isDisabled && setActive(false)}
      disabled={isDisabled}
    >
      {title}
    </button>
  );
};

export default MppButton;
