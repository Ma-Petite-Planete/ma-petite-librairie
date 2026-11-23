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
 * @param {boolean} [props.checked=false] - L'état coché de la case ; la case se resynchronise à chaque changement de cette valeur.
 * @param {boolean} [props.indeterminate=false] - Affiche l'état « partiellement coché », par exemple quand seule une partie des lignes d'un tableau est cochée. Le style dédié n'est appliqué que si `isTableHeader` est vrai.
 * @param {boolean} [props.isTableHeader=false] - Indicateur pour déterminer si la case à cocher est utilisée dans un en-tête de tableau.
 * @param {string} [props.specialClassName=''] - Classe CSS ajoutée aux marques de la case (coche et état partiel).
 * @param {string} [props.label] - Texte affiché à droite de la case ; cliquer dessus coche la case.
 * @param {boolean} [props.isDisabled=false] - Désactive la case.
 *
 * @returns {JSX.Element} Le composant MppCheckbox rendu.
 *
 * @example
 * <MppCheckbox
 *   onChange={handleCheckboxChange}
 *   checked={isConfirmed}
 *   label="Je confirme l'envoi"
 *   isDisabled={isSending}
 * />
 *
 * @example
 * <MppCheckbox
 *   onChange={handleSelectAll}
 *   checked={areAllRowsSelected}
 *   indeterminate={areSomeRowsSelected}
 *   isTableHeader={true}
 * />
 */
declare const MppCheckbox: React.FC<MppCheckboxProps>;
export default MppCheckbox;
