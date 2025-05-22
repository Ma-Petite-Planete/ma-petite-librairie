import React from 'react';
import './mpp_increment_input.css';
interface MppIncrementInputProps {
    value: number;
    onChange: (newValue: number) => void;
    maxIncrement: number;
}
/**
 * Le composant MppIncrementInput fournit un contrôle numérique avec boutons d’incrémentation et décrmentation,
 * ainsi qu’un champ pour saisir la valeur manuellement.
 *
 * @param {MppIncrementInputProps} props - Les propriétés du composant.
 * @param {number} props.value - La valeur actuelle affichée et contrôlée par le composant.
 * @param {(newValue: number) => void} props.onChange - Fonction de rappel invoquée avec la nouvelle valeur
 *        dès qu’elle change (via les boutons ou la saisie manuelle).
 * @param {number} props.maxIncrement - La valeur maximale autorisée (le bouton + et la saisie sont clampés entre 0 et maxIncrement).
 *
 * @example
 * ```tsx
 * import React, { useState } from 'react';
 * import { MppIncrementInput } from './MppIncrementInput';
 *
 * const ExampleComponent = () => {
 *   const [quantity, setQuantity] = useState(0);
 *
 *   return (
 *     <MppIncrementInput
 *       value={quantity}
 *       onChange={setQuantity}
 *       maxIncrement={100}
 *     />
 *   );
 * };
 * ```
 */
export declare const MppIncrementInput: React.FC<MppIncrementInputProps>;
export {};
