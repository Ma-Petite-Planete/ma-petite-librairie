import React, { KeyboardEventHandler } from 'react';
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
    onChange?: (value: string, hasError: boolean) => void;
    onClickIcon?: (value: string) => void;
    setHasError?: (hasError: boolean) => void;
    onClickErrorMessage?: string;
    readOnly?: boolean;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}
/**
 * @interface MppInputTextProps
 * @property {string} placeholder - Texte d'indice à afficher dans le champ de saisie.
 * @property {string} value - Valeur actuelle du champ de saisie.
 * @property {React.FC<React.SVGProps<SVGSVGElement>>} [icon] - Composant SVG optionnel à afficher comme icône dans le champ de saisie.
 * @property {boolean} [needCounter=false] - Indique si un compteur de caractères doit être affiché (par défaut : false).
 * @property {number} [maxCharacteres] - Nombre maximum de caractères autorisés dans le champ de saisie.
 * @property {Array<ValidationCondition>} [validationConditions] - Conditions de validation à appliquer au champ de saisie. Chaque condition est un objet contenant une fonction de validation et un message d'erreur.
 * @property {function(string, boolean): void} [onChange] - Fonction de rappel appelée lors du changement de valeur du champ. Fournit la nouvelle valeur et un indicateur d'erreur.
 * @property {function(string): void} [onClickIcon] - Fonction de rappel appelée lorsque l'icône est cliquée.
 * @property {function(boolean): void} [setHasError] - Fonction de rappel pour indiquer si le champ a des erreurs de validation.
 * @property {string} [onClickErrorMessage] - Message d'erreur à afficher lors du clic à l'extérieur du champ de saisie.
 * @property {boolean} [readOnly=false] - Indique si le champ est en lecture seule (par défaut : false).
 * @property {KeyboardEventHandler<HTMLInputElement>} [onKeyDown] - Fonction de rappel appelée lors de l'appui sur une touche du clavier.
 *
 * @example
 * <MppInputText
 *   placeholder="Entrez votre texte ici"
 *   value={inputValue}
 *   onChange={(value, hasError) => {
 *     console.log('Valeur :', value, 'Erreur :', hasError);
 *   }}
 *   validationConditions={[
 *     { condition: (value) => value.length >= 5, message: 'Doit contenir au moins 5 caractères.' },
 *     { condition: (value) => /^[a-zA-Z]+$/.test(value), message: 'Ne doit contenir que des lettres.' },
 *   ]}
 *   needCounter={true}
 *   maxCharacteres={20}
 *   icon={MyIconComponent}
 *   onClickIcon={(value) => {
 *     console.log('Icône cliquée avec la valeur :', value);
 *   }}
 *   readOnly={false}
 * />
 */
declare const MppInputText: React.FC<MppInputTextProps>;
export default MppInputText;
