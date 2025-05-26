import React, { useState, KeyboardEventHandler, useEffect } from 'react';
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
  isResearch?: boolean;
}

/**
 * Le composant MppInput rend un champ de saisie personnalisable avec diverses options :
 * compteur de caractères, icône, affichage conditionnel du mot de passe, champ de recherche, etc.
 *
 * @component
 * @param {MppInputTextProps} props - Les propriétés du composant MppInput.
 * @param {string} props.placeholder - Le texte d'indication affiché lorsque l'input est vide.
 * @param {string} props.value - La valeur actuelle de l'input.
 * @param {React.FC<React.SVGProps<SVGSVGElement>>} [props.icon] - Une icône SVG facultative affichée à droite de l'input.
 * @param {boolean} [props.needCounter=false] - Affiche un compteur de caractères si défini à true.
 * @param {number} [props.maxCharacters] - Le nombre maximum de caractères autorisés dans l'input.
 * @param {Array<ValidationCondition>} [props.validationConditions] - Une liste de conditions de validation personnalisées.
 * @param {(value: string) => void} props.onChange - Fonction appelée lors de la modification de la valeur.
 * @param {(value: string) => void} [props.onClickIcon] - Fonction appelée lors du clic sur l’icône.
 * @param {boolean} [props.readOnly=false] - Rend le champ en lecture seule si défini à true.
 * @param {KeyboardEventHandler<HTMLInputElement>} [props.onKeyDown] - Gestionnaire d'événement pour les touches clavier.
 * @param {boolean} [props.isPassword=false] - Rend le champ de type mot de passe avec possibilité d’afficher/masquer.
 * @param {string} [props.errorMessage] - Message d’erreur affiché sous le champ si présent.
 * @param {string} [props.autoComplete] - Valeur de l’attribut autoComplete pour le champ.
 * @param {boolean} [props.isResearch=false] - Affiche une icône de recherche à gauche et un bouton de suppression à droite si défini à true.
 *
 * @returns {JSX.Element} Le composant MppInput rendu.
 *
 * @example
 * <MppInput
 *   placeholder="Entrez votre email"
 *   value={email}
 *   icon={MppIcons.check}
 *   needCounter
 *   maxCharacters={50}
 *   onChange={setEmail}
 *   isPassword
 * />
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
  isResearch = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFirstEntry, setIsFirstEntry] = useState(onKeyDown ? false : true);
  const [showPassword, setShowPassword] = useState(false);
  const [canClearField, setCanClearField] = useState(false);

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

  useEffect(() => {
    if (isResearch && value.length > 0) {
      setCanClearField(true);
    } else {
      setCanClearField(false);
    }
  }, [value, isResearch]);
  const clearField = () => {
    onChange('');
  };

  return (
    <>
      <div
        className={`mpp_input_container ${isFocused && !readOnly ? 'focused' : ''} ${errorMessage.length > 0 && !isFirstEntry && value ? 'error' : ''}`}
      >
        {isResearch ? <MppIcons.research /> : null}
        <input
          type={!showPassword && isPassword ? 'password' : 'text'}
          placeholder={placeholder}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`mpp_input ${readOnly ? 'read_only' : ''} ${isResearch ? 'with_prefix_icon' : ''}`}
          readOnly={readOnly}
          onKeyDown={onKeyDown}
          autoComplete={autoComplete}
        />
        {(isFocused || value) && Icon ? (
          <Icon
            className={onClickIcon ? 'input_icon_pointer' : ''}
            onClick={handleIconClick}
          />
        ) : isPassword ? (
          <MppIcons.eye
            className={`input_icon_pointer ${showPassword ? 'eye_focus' : 'eye_unfocus'}`}
            onClick={handleShowPassword}
          />
        ) : needCounter ? (
          <span
            className={`input_counter ${value.length === maxCharacters ? 'max_characteres' : ''}`}
          >{`${value.length}/${maxCharacters}`}</span>
        ) : canClearField ? (
          <MppIcons.inputClose
            className={`input_icon_pointer`}
            onClick={clearField}
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
