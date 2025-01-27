import React from 'react';
import './mpp_button.css';
import { ButtonType } from './ButtonType';

interface MppButtonProps {
  title: string;
  buttonType: ButtonType;
  type?: 'button' | 'submit' | 'reset';
  onPress?: (() => void) | null;
  style?: React.CSSProperties;
  hoverStyle?: React.CSSProperties;
  activeStyle?: React.CSSProperties;
  isSubmitDisabled?: boolean;
}

/**
 * @interface MppButtonProps
 * @property {string} title - Titre du bouton.
 * @property {ButtonType} buttonType - Enum pour le style.
 * @property {() => void} [onPress] - Fonction à exécuter lorsque le bouton est cliqué.
 * @property {React.CSSProperties} [style] - Style personnalisé.
 * @property {React.CSSProperties} [hoverStyle] - Style au survol.
 * @property {React.CSSProperties} [activeStyle] - Style lors du clic.
 *
 * @example
 *
 * <MppButton
 *   title="Bouton d'action"
 *   onPress={() => console.log('Bouton cliqué!')}
 *   buttonType={ButtonType.primaryLarge}
 * />
 */

const MppButton: React.FC<MppButtonProps> = ({
  title,
  onPress,
  buttonType,
  type = 'button',
  style = {},
  hoverStyle = {},
  activeStyle = {},
  isSubmitDisabled = true,
}) => {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const isDisabled = type === 'submit' ? isSubmitDisabled : onPress === null;

  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(hover && !isDisabled ? hoverStyle : {}),
    ...(active && !isDisabled ? activeStyle : {}),
  };

  return (
    <button
      type={type}
      className={`mpp_button ${
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
