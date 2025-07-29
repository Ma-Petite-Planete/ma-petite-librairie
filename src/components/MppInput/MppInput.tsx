import React, { useState, KeyboardEventHandler, useId } from 'react';
import './mpp_input.css';
import { MppIcons } from '../../utils/MppIcons';

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
const MppInput: React.FC<MppInputTextProps> = ({
  placeholder,
  value = '',
  icon: Icon,
  needCounter = false,
  maxCharacters,
  errorMessage = '',
  readOnly = false,
  onChange,
  onKeyDown,
  onClickIcon,
  isPassword = false,
  autoComplete,
  canClearField = false,
  prefixIcon: PrefixIcon,
  id,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFirstEntry, setIsFirstEntry] = useState(onKeyDown ? false : true);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, maxCharacters || undefined);
    onChange(newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFirstEntry(false);
    setIsFocused(false);
  };

  const handleIconClick = () => {
    if (onClickIcon) {
      onClickIcon(value);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const suffixComponentClassname = 'with_suffix_component';
  const reactId = useId();
  const finalId = id ?? `mpp-input-${reactId}`;

  return (
    <>
      <div
        className={`mpp_input_container ${isFocused && !readOnly ? 'focused' : ''} ${errorMessage.length > 0 && !isFirstEntry && value ? 'error' : ''}`}
      >
        {typeof PrefixIcon === 'object' ? (
          <PrefixIcon className="with_prefix_icon" />
        ) : typeof PrefixIcon === 'string' ? (
          <span className="prefix_icon_text emoji">{PrefixIcon}</span>
        ) : null}
        <input
          id={finalId}
          type={!showPassword && isPassword ? 'password' : 'text'}
          placeholder={placeholder}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`mpp_input ${readOnly ? 'read_only' : ''}`}
          readOnly={readOnly}
          onKeyDown={onKeyDown}
          autoComplete={autoComplete}
        />
        {(isFocused || value) && Icon ? (
          <Icon
            className={`${onClickIcon ? 'input_icon_pointer' : ''} ${suffixComponentClassname} `}
            onClick={handleIconClick}
          />
        ) : isPassword ? (
          <MppIcons.eye
            className={`input_icon_pointer ${showPassword ? 'eye_focus' : 'eye_unfocus'} ${suffixComponentClassname} `}
            onClick={handleShowPassword}
          />
        ) : needCounter ? (
          <span
            className={`input_counter ${value.length === maxCharacters ? 'max_characteres' : ''} ${suffixComponentClassname} `}
          >{`${value.length}/${maxCharacters}`}</span>
        ) : canClearField && value.length > 0 ? (
          <MppIcons.inputClose
            className={`input_icon_pointer ${suffixComponentClassname}`}
            onClick={() => {
              onChange('');
            }}
          />
        ) : null}
      </div>
      <div className="input_errors">
        {errorMessage.length > 0 && value && !isFirstEntry && (
          <p className="input_error">{errorMessage}</p>
        )}
      </div>
    </>
  );
};

export default MppInput;
