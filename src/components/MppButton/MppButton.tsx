import React from 'react';
import './mpp_button.css';
import { ButtonType } from './ButtonType';

interface MppButtonProps {
  title: string;
  buttonType: ButtonType;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
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
 * @property {React.FC<React.SVGProps<SVGSVGElement>>} [icon] - Icône affichée avant le titre (ex. MppIcons.download).
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
  icon: Icon,
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

  let buttonStyle: string;
  switch (buttonType) {
    case ButtonType.primaryLarge:
      buttonStyle = 'button_large text_body_sb';
      break;
    case ButtonType.primaryMedium:
      buttonStyle = 'button_medium text_body';
      break;
    case ButtonType.primaryMediumRed:
      buttonStyle = 'button_medium text_body primary_red_design';
      break;
    case ButtonType.secondaryLarge:
      buttonStyle = 'secondary_type button_large text_body_sb';
      break;
    case ButtonType.secondaryMedium:
    default:
      buttonStyle = 'secondary_type button_medium text_body';
      break;
    case ButtonType.secondaryMediumRed:
      buttonStyle =
        'secondary_type button_medium text_body secondary_red_design';
      break;
  }

  return (
    <button
      type={type}
      className={`mpp_button ${buttonStyle} ${Icon ? 'mpp_button--with_icon' : ''}`}
      style={combinedStyle}
      onClick={isDisabled ? undefined : (onPress ?? undefined)}
      onMouseEnter={() => !isDisabled && setHover(true)}
      onMouseLeave={() => !isDisabled && setHover(false)}
      onMouseDown={() => !isDisabled && setActive(true)}
      onMouseUp={() => !isDisabled && setActive(false)}
      disabled={isDisabled}
    >
      {Icon && <Icon className="mpp_button_icon" aria-hidden="true" />}
      {title}
    </button>
  );
};

export default MppButton;
