import React, { useState, useEffect } from 'react';
import './mpp_input_text.css';
/**
 * Props pour le composant MppInputText.
 * @interface MppInputTextProps
 * @property {string} placeholder - Texte d'espace réservé.
 * @property {string} value - Valeur contrôlée du champ de saisie.
 * @property {string} [iconUrl] - URL de l'image de l'icône.
 * @property {boolean} [needCounter] - Indique si un compteur de caractères doit être affiché.
 * @property {number} [maxCharacteres] - Nombre maximum de caractères autorisés.
 * @property {ValidationCondition[]} [validationConditions] - Liste des conditions de validation.
 * @property {(value: string, hasError: boolean) => void} onChange - Fonction appelée lors du changement de valeur.
 * @property {(value: string) => void} [onClickIcon] - Fonction appelée lors du clic sur l'icône.
 */
/**
 * Composant de champ de saisie avec validation, icône cliquable et compteur de caractères.
 *
 * @example
 * ```jsx
 * import React, { useState } from 'react';
 * import MppInputText from './component/MppInputText/MppInputText';
 * import pen from './pen.svg';
 *
 * const InputDemo: React.FC = () => {
 *   const [inputDemoIcon, setInputDemoIcon] = useState('');
 *
 *   const handleChangeDemoIcon = (value: string) => {
 *     setInputDemoIcon(value);
 *   };
 *
 *   const handleIconClick = () => {
 *     setInputDemoIcon('');
 *   };
 *
 *   const [inputDemoCounter, setInputDemoCounter] = useState('');
 *
 *   const handleChangeDemoCounter = (value: string) => {
 *     setInputDemoCounter(value);
 *   };
 *
 *   const [inputDemoCondition, setInputDemoCondition] = useState('');
 *   const handleChangeDemoCondition = (value: string, hasError: boolean) => {
 *     if (hasError) {
 *       console.log('Les conditions ne sont pas respectées');
 *     } else {
 *       setInputDemoCondition(value);
 *     }
 *   };
 *
 *   return (
 *     <div style={{ width: '300px' }}>
 *       <MppInputText
 *         placeholder="Exemple de validation"
 *         value={inputDemoCondition}
 *         onChange={handleChangeDemoCondition}
 *         validationConditions={[
 *           { condition: (value) => value.length >= 5, message: 'Le texte doit contenir au moins 5 caractères.' },
 *           { condition: (value) => /^[a-zA-Z]+$/.test(value), message: 'Le texte doit uniquement contenir des lettres.' },
 *         ]}
 *       />
 *       <MppInputText
 *         value={inputDemoIcon}
 *         placeholder="Exemple d'icône"
 *         onChange={handleChangeDemoIcon}
 *         iconUrl={pen}
 *         onClickIcon={handleIconClick}
 *       />
 *       <MppInputText
 *         value={inputDemoCounter}
 *         placeholder="Exemple de compteur"
 *         onChange={handleChangeDemoCounter}
 *         needCounter={true}
 *         maxCharacteres={20}
 *       />
 *     </div>
 *   );
 * };
 *
 * export default InputDemo;
 * ```
 */
const MppInputText = ({ placeholder, value = '', iconUrl = '', needCounter = false, maxCharacteres, validationConditions = [], onChange, onClickIcon }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFirstEntry, setIsFirstEntry] = useState(true);
    const [inputValue, setInputValue] = useState(value);
    const [errorMessages, setErrorMessages] = useState([]);
    useEffect(() => {
        setInputValue(value);
    }, [value]);
    const validateInput = (value) => {
        const errors = validationConditions
            .filter((validation) => !validation.condition(value))
            .map((validation) => validation.message);
        setErrorMessages(errors);
        return errors.length > 0;
    };
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
        setIsFirstEntry(false);
        setIsFocused(false);
        validateInput(inputValue);
    };
    const handleChange = (e) => {
        const newValue = e.target.value;
        const newValueVerify = maxCharacteres ? newValue.slice(0, maxCharacteres) : newValue;
        setInputValue(newValueVerify);
        const hasError = validateInput(newValueVerify);
        onChange(newValueVerify, hasError);
    };
    const handleIconClick = () => {
        if (onClickIcon) {
            onClickIcon(inputValue);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: `mpp_input_container ${isFocused ? 'focused' : ''} ${errorMessages.length > 0 && !isFirstEntry && inputValue ? 'error' : ''}` },
            React.createElement("input", { type: "text", placeholder: placeholder, value: inputValue, onFocus: handleFocus, onBlur: handleBlur, onChange: handleChange, className: "mpp_input" }),
            (isFocused || inputValue) && iconUrl ? (React.createElement("img", { src: iconUrl, className: onClickIcon ? "input_icon_pointer" : "", alt: "iconInput", onClick: handleIconClick })) : needCounter ? (React.createElement("span", { className: `input_counter ${inputValue.length === maxCharacteres ? 'max_characteres' : ''}` }, `${inputValue.length}/${maxCharacteres}`)) : null),
        errorMessages.length > 0 && inputValue && !isFirstEntry && (React.createElement("div", { className: "input_errors" }, errorMessages.map((error, index) => (React.createElement("p", { key: index, className: "input_error" }, error)))))));
};
export default MppInputText;
