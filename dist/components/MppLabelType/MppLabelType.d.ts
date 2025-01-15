import React from 'react';
import './mpp_label_type.css';
export declare enum labelType {
    grey = "grey_label",
    orange = "orange_label",
    green = "green_label"
}
interface MppLabelType {
    value: string;
    labelType: labelType;
}
/**
 * Le composant MppLabelType rend une étiquette avec un type et une valeur spécifiques.
 *
 * @component
 * @param {MppLabelType} props - Les propriétés du composant MppLabelType.
 * @param {string} props.value - La valeur à afficher à l'intérieur de l'étiquette.
 * @param {labelType} props.labelType - Le type de l'étiquette qui détermine la classe CSS à appliquer.
 *
 * @returns {JSX.Element} Le composant MppLabelType rendu.
 *
 * @example
 * <MppLabelType
 *   value="Exemple de valeur"
 *   labelType={labelType.grey}
 * />
 */
declare const MppLabelType: React.FC<MppLabelType>;
export default MppLabelType;
