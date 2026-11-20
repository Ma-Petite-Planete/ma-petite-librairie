import React from 'react';
import './mpp_checkbox.css';
interface MppCheckboxProps {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    checked?: boolean;
    indeterminate?: boolean;
    isTableHeader?: boolean;
    specialClassName?: string;
    label?: string;
    isDisabled?: boolean;
}
/**
 * Le composant MppCheckbox rend une case à cocher personnalisable avec un style optionnel pour l'en-tête de tableau.
 *
 * @component
 * @param {MppCheckboxProps} props - Les propriétés du composant MppCheckbox.
 * @param {function} props.onChange - La fonction de rappel pour gérer les changements d'état de la case à cocher.
 * @param {boolean} props.checked - L'état initial de la case à cocher.
 * @param {boolean} props.isTableHeader - Indicateur pour déterminer si la case à cocher est utilisée dans un en-tête de tableau.
 * @param {string} [props.label] - Texte affiché à droite de la case ; cliquer dessus coche la case.
 * @param {boolean} [props.isDisabled=false] - Désactive la case.
 *
 * @returns {JSX.Element} Le composant MppCheckbox rendu.
 *
 * @example
 * <MppCheckbox
 *   onChange={handleCheckboxChange}
 *   checked={true}
 *   label="Je confirme l'envoi"
 * />
 */
declare const MppCheckbox: React.FC<MppCheckboxProps>;
export default MppCheckbox;
