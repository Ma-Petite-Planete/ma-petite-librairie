import React from 'react';
import './mpp_input_text.css';
export interface ValidationCondition {
    condition: (value: string) => boolean;
    message: string;
}
interface MppInputTextProps {
    placeholder: string;
    value: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    needCounter?: boolean;
    maxCharacteres?: number;
    validationConditions?: Array<ValidationCondition>;
    onChange: (value: string, hasError: boolean) => void;
    onClickIcon?: (value: string) => void;
    setHasError?: (hasError: boolean) => void;
    onClickErrorMessage?: string;
    readOnly?: boolean;
}
/**
 * @interface MppInputTextProps
 * @property {string} placeholder - Texte d'indice à afficher dans le champ de saisie.
 * @property {string} value - Valeur actuelle du champ de saisie.
 * @property {React.FC<React.SVGProps<SVGSVGElement>>} [icon] - Composant SVG optionnel à afficher comme icône.
 * @property {boolean} [needCounter] - Indique si un compteur de caractères doit être affiché (par défaut : false).
 * @property {number} [maxCharacteres] - Nombre maximum de caractères autorisés dans le champ.
 * @property {Array<ValidationCondition>} [validationConditions] - Conditions de validation à appliquer au champ sera vérifié a chque changement dans l'input.
 * @property {function(string, boolean): void} onChange - Fonction de rappel appelée lors du changement de valeur.
 * @property {function(string): void} [onClickIcon] - Fonction de rappel appelée lorsque l'icône est cliquée.
 * @property {function(boolean): void} [setHasError] - Fonction de rappel pour indiquer si le champ a des erreurs.
 * @property {string} [onClickErrorMessage] - Message d'erreur affiché lors d'un clique exterieur.
 *
 * @example
 *
 * <MppInputText
 *   placeholder="Entrez votre texte"
 *   value={inputValue}
 *   onChange={(value, hasError) => {
 *     console.log('Valeur:', value, 'Erreur:', hasError);
 *   }}
 *   validationConditions={[
 *     { condition: value => value.length >= 5, message: 'Doit avoir au moins 5 caractères.' },
 *     { condition: value => /^[a-zA-Z]+$/.test(value), message: 'Ne doit contenir que des lettres.' },
 *   ]}
 *   needCounter
 *   maxCharacteres={20}
 * />
 */
declare const MppInputText: React.FC<MppInputTextProps>;
export default MppInputText;
