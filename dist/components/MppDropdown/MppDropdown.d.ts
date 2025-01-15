import React from 'react';
import './mpp_dropdown.css';
interface OptionType {
    prefixIconName?: string;
    label?: string;
    id: string;
    value?: string;
}
interface MppDropDownProps<T> {
    options: Array<T>;
    onChange: (value: T) => void;
    defaultValue: T;
    placeholder: string;
    isDisabled?: boolean;
    textClassname?: string;
}
/**
 * Le composant MppDropDown rend un menu déroulant personnalisable.
 *
 * @template T - Le type des options.
 *
 * @param {MppDropDownProps<T>} props - Les propriétés du composant dropdown.
 * @param {string} props.placeholder - Le texte de l'espace réservé à afficher lorsqu'aucune option n'est sélectionnée.
 * @param {(option: T) => void} props.onChange - La fonction de rappel pour gérer les changements de sélection d'option.
 * @param {T[]} props.options - La liste des options à afficher dans le menu déroulant.
 * @param {boolean} [props.isDisabled] - Indicateur pour désactiver le menu déroulant.
 * @param {T} props.defaultValue - L'option sélectionnée par défaut.
 * @param {string} [props.textClassname='text_body'] - Le nom de la classe CSS pour le texte.
 *
 * @example
 * ```tsx
const ExampleComponent = () => {
  const options = [
    { id: '1', value: 'Option 1', prefixIconName: 'icon1' },
    { id: '2', value: 'Option 2', prefixIconName: 'icon2' },
    { id: '3', value: 'Option 3', prefixIconName: 'icon3' },
  ];

  const handleChange = (selectedOption: OptionType) => {
    console.log('Option sélectionnée:', selectedOption);
  };

  return (
    <MppDropDown
      options={options}
      onChange={handleChange}
      defaultValue={options[0]}
      placeholder="Sélectionnez une option"
    />
  );
};
 * ```
 */
declare const MppDropDown: <T extends OptionType>({ placeholder, onChange, options, isDisabled, defaultValue, textClassname, }: MppDropDownProps<T>) => React.JSX.Element;
export default MppDropDown;
