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
 * @property {React.FC<React.SVGProps<SVGSVGElement>>} [icon] - Icône affichée avant le titre (ex. MppIcons.download).
 * @property {'button' | 'submit' | 'reset'} [type='button'] - Type HTML du bouton.
 * @property {(() => void) | null} [onPress] - Fonction à exécuter lorsque le bouton est cliqué. `null` désactive le bouton (hors `type="submit"`).
 * @property {React.CSSProperties} [style] - Style personnalisé.
 * @property {React.CSSProperties} [hoverStyle] - Style au survol, ignoré si le bouton est désactivé.
 * @property {React.CSSProperties} [activeStyle] - Style lors du clic, ignoré si le bouton est désactivé.
 * @property {boolean} [isSubmitDisabled=true] - Désactive le bouton ; pris en compte uniquement avec `type="submit"`.
 *
 * @example
 *
 *
 * @example
 * <MppButton
 *   title="Télécharger le modèle"
 *   icon={MppIcons.download}
 *   onPress={isLoading ? null : handleDownload}
 *   buttonType={ButtonType.secondaryMedium}
 * />
 *
 * @example
 * <MppButton
 *   title="Valider"
 *   type="submit"
 *   isSubmitDisabled={!isFormValid}
 *   buttonType={ButtonType.primaryMedium}
 * />
 */
declare const MppButton: React.FC<MppButtonProps>;
export default MppButton;
