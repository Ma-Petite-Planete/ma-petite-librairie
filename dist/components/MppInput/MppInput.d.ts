import React, { KeyboardEventHandler } from 'react';
import './mpp_input.css';
export interface ValidationCondition {
    condition: (value: string) => boolean;
    message: string;
}
interface MppInputTextProps {
    placeholder: string;
    value: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    needCounter?: boolean;
    maxCharacters?: number;
    validationConditions?: Array<ValidationCondition>;
    onChange: (value: string) => void;
    onClickIcon?: (value: string) => void;
    readOnly?: boolean;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    isPassword?: boolean;
    errorMessage?: string;
    autoComplete?: string;
    canClearField?: boolean;
    prefixIcon?: React.FC<React.SVGProps<SVGSVGElement>> | string;
    id?: string;
}
/**
 * Composant d'entrée personnalisée pour les formulaires.
 *
 * Affiche un champ de saisie avec diverses options telles que l'icône, le compteur de caractères,
 * la gestion du mot de passe, la validation, et la possibilité de vider le champ.
 *
 * @param {string} placeholder - Texte affiché lorsque le champ est vide.
 * @param {string} value - Valeur actuelle du champ.
 * @param {React.FC<React.SVGProps<SVGSVGElement>>} [icon] - Icône suffixe à afficher dans le champ.
 * @param {boolean} [needCounter] - Affiche un compteur de caractères si vrai.
 * @param {number} [maxCharacters] - Nombre maximal de caractères autorisés.
 * @param {Array<ValidationCondition>} [validationConditions] - Conditions de validation personnalisées.
 * @param {(value: string) => void} onChange - Callback appelé lors d'un changement de valeur.
 * @param {(value: string) => void} [onClickIcon] - Callback appelé lors d'un clic sur l'icône.
 * @param {boolean} [readOnly] - Rend le champ en lecture seule si vrai.
 * @param {KeyboardEventHandler<HTMLInputElement>} [onKeyDown] - Callback pour la gestion des événements clavier.
 * @param {boolean} [isPassword] - Affiche le champ comme un mot de passe si vrai.
 * @param {string} [errorMessage] - Message d'erreur à afficher.
 * @param {string} [autoComplete] - Attribut autoComplete du champ.
 * @param {boolean} [canClearField] - Affiche une icône pour vider le champ si vrai.
 * @param {React.FC<React.SVGProps<SVGSVGElement>>} [prefixIcon] - Icône préfixe à afficher dans le champ.
 *
 * @example
 * ```tsx
 * <MppInput
 *   placeholder="Votre email"
 *   value={email}
 *   onChange={setEmail}
 *   icon={MailIcon}
 *   needCounter={true}
 *   maxCharacters={50}
 *   errorMessage={emailError}
 *   isPassword={false}
 *   canClearField={true}
 * />
 * ```
 */
declare const MppInput: React.FC<MppInputTextProps>;
export default MppInput;
