import React, { useState, useEffect, useRef, useId } from 'react';
import './mpp_text_area_fix_height.css';

/**
 * Composant MppTextAreaFixHeight
 *
 * Ce composant rend une `<textarea>` à hauteur fixe, avec une gestion interne du focus
 * et des changements de valeur. Il conserve son propre état local pour l’affichage et
 * remonte les modifications via un callback `onChange`.
 *
 * @param {string} placeholder
 *   Texte affiché quand la zone est vide.
 * @param {string} value
 *   Valeur contrôlée du textarea. Le composant synchronise son état interne sur cette prop.
 * @param {(value: string) => void} [onChange]
 *   Callback appelé à chaque frappe avec la nouvelle valeur.
 * @param {boolean} [readOnly=false]
 *   Met le textarea en lecture seule si `true`.
 * @param {string} fixHeight
 *   Hauteur CSS (par ex. `"150px"`) appliquée au container pour fixer la taille.
 * @param {string} [id]
 *   Identifiant HTML du textarea. Si non fourni, un ID unique est généré via `useId()`.
 *
 * @example
 * ```tsx
 * const MyForm = () => {
 *   const [text, setText] = useState("");
 *
 *   return (
 *     <MppTextAreaFixHeight
 *       placeholder="Décrivez votre idée…"
 *       value={text}
 *       onChange={setText}
 *       fixHeight="200px"
 *     />
 *   );
 * };
 * ```
 */

interface MppTextAreaFixHeightProps {
  placeholder: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  fixHeight: string;
  id?: string;
}

const MppTextAreaFixHeight: React.FC<MppTextAreaFixHeightProps> = ({
  placeholder,
  value = '',
  onChange,
  readOnly = false,
  fixHeight,
  id,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };
  const reactId = useId();
  const finalId = id ?? `mpp-textarea-${reactId}`;
  return (
    <>
      <div
        className={`mpp_text_area_container ${isFocused && !readOnly ? 'focused' : ''}`}
        style={{ height: fixHeight }}
      >
        <textarea
          id={finalId}
          ref={textAreaRef}
          placeholder={placeholder}
          value={inputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={readOnly ? null : handleChange}
          className={`mpp_text_area ${readOnly ? 'read_only' : ''}`}
          readOnly={readOnly}
        />
      </div>
    </>
  );
};

export default MppTextAreaFixHeight;
