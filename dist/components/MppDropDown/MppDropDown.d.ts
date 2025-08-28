import React from 'react';
import './mpp_dropdown.css';
interface MppDropDownProps<T extends object, K extends keyof T> {
    property: K;
    options: Array<T>;
    onChange: (value: T) => void;
    defaultValue: T | null;
    placeholder: string;
    isDisabled?: boolean;
    textClassname?: string;
    needEmojiFont?: boolean;
    isDropDownEmpty?: boolean;
    emptyValue?: React.ReactNode;
    isOptionDisabled?: (option: T) => boolean;
    highlightCurrentOption?: boolean;
    width?: string;
    identifierKey?: keyof T;
    parentElement?: Element | null;
}
interface HighlightedDropDownProps<T extends object, K extends keyof T> extends MppDropDownProps<T, K> {
    highlightCurrentOption: true;
    identifierKey: keyof T;
}
interface NonHighlightedDropDownProps<T extends object, K extends keyof T> extends MppDropDownProps<T, K> {
    highlightCurrentOption?: false | undefined;
    identifierKey?: keyof T;
}
type MppDropDownPropsComplete<T extends object, K extends keyof T> = HighlightedDropDownProps<T, K> | NonHighlightedDropDownProps<T, K>;
/**
 * Le composant MppDropDown rend un menu déroulant personnalisable.
 *
 * @template T - Le type des options.
 * @template K - La clé du type des options.
 *
 * @param {MppDropDownProps<T, K>} props - Les propriétés du composant dropdown.
 * @param {string} props.placeholder - Le texte de l'espace réservé à afficher lorsqu'aucune option n'est sélectionnée.
 * @param {(option: T) => void} props.onChange - La fonction de rappel pour gérer les changements de sélection d'option.
 * @param {T[]} props.options - La liste des options à afficher dans le menu déroulant.
 * @param {boolean} [props.isDisabled] - Indicateur pour désactiver le menu déroulant.
 * @param {T} props.defaultValue - L'option sélectionnée par défaut.
 * @param {string} [props.textClassname=''] - Le nom de la classe CSS pour le texte.
 * @param {K} props.property - La propriété de l'option à afficher dans le menu déroulant.
 * @param {keyof T} [identifierKey] - (Optionnel) La clé unique utilisée pour identifier chaque option lors de la comparaison et de la mise en surbrillance de l'option sélectionnée.
 * Si `highlightCurrentOption` est à `true`, cette propriété est requise pour permettre la comparaison des options via cette clé.
 *
 * @example
 * ```tsx
 * const ExampleComponent = () => {
 *   const options = [
 *     { id: '1', value: 'Option 1' },
 *     { id: '2', value: 'Option 2' },
 *     { id: '3', value: 'Option 3' },
 *   ];
 *
 *   const handleChange = (selectedOption: T) => {
 *     console.log('Option sélectionnée:', selectedOption);
 *   };
 *
 *   return (
 *     <MppDropDown
 *       options={options}
 *       onChange={handleChange}
 *       defaultValue={options[0]}
 *       placeholder="Sélectionnez une option"
 *       property="value"
 *     />
 *   );
 * };
 * ```
 */
declare const MppDropDown: <T extends object, K extends keyof T>({ placeholder, onChange, options, isDisabled, defaultValue, textClassname, property, needEmojiFont, isDropDownEmpty, emptyValue, isOptionDisabled, highlightCurrentOption, width, identifierKey, parentElement, }: MppDropDownPropsComplete<T, K>) => React.JSX.Element;
export default MppDropDown;
