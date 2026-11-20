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
declare const MppButton: React.FC<MppButtonProps>;
export default MppButton;
