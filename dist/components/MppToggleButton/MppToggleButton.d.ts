import React from 'react';
import './mpp_toggle_button.css';
interface ToggleButtonPropos {
    value: boolean;
    onChange: (value: boolean) => void;
    id?: string;
    disabled?: boolean;
    isBoxShadow?: boolean;
}
/**
 * Le composant MppToggleButton rend un bouton bascule personnalisable.
 *
 * @component
 * @param {ToggleButtonProps} props - Les propriétés du composant MppToggleButton.
 * @param {boolean} props.value - L'état initial du bouton bascule.
 * @param {function} props.onChange - La fonction de rappel pour gérer les changements d'état du bouton bascule.
 *
 * @returns {JSX.Element} Le composant MppToggleButton rendu.
 *
 * @example
 * <MppToggleButton
 *   value={true}
 *   onChange={(newValue) => console.log(newValue)}
 * />
 */
declare const MppToggleButton: React.FC<ToggleButtonPropos>;
export default MppToggleButton;
