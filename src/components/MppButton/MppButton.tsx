import React from 'react';
import './mpp_button.css';
import { ButtonType } from './ButtonType';

interface MppButtonProps {
  title: string;
  buttonType: ButtonType;
  onPress: (() => void) | null;  // onPress est maintenant obligatoire mais peut être null
  style?: React.CSSProperties;
  hoverStyle?: React.CSSProperties;
  activeStyle?: React.CSSProperties;
}

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

  // Détermine si le bouton doit être désactivé
  const isDisabled = onPress === null;

  // Combine les styles
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
