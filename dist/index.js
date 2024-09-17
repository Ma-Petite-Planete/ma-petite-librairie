import React, { useState, useEffect } from 'react';

var yellow_logo_blue_text = "ressources/logo/yellow_logo_blue_text.svg";

var white_logo_white_text = "ressources/logo/white_logo_white_text.svg";

var logo_only_yellow = "ressources/logo/logo_only_yellow.svg";

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$2 = "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'); /* Regular (400), Medium (500), Semi-Bold (600), Bold (700) */\n\n:root {\n  font-family: 'Poppins', sans-serif; \n  font-size: 16px;\n  font-weight: 400; \n  line-height: auto;\n  color : var(--dark_blue);\n\n  /* graphique chart mpp scolaire */\n  --error : red;\n  --white :  #ffffff;\n  --yellow_1 : #F9CF2F;\n  --yellow_2 : #F9DC6C;\n  --yellow_3 : #FAF1C8;\n  --blue_1 : #5FD3AC;\n  --blue_2 : #CFEEF4;\n  --dark_blue: #2c2c69;\n  --dark_blue_light: rgb(44, 44, 105, 0.8);\n  --dark_blue_very_light: rgb(44, 44, 105, 0.2);\n  --disable_dark_blue : #9595b4;\n  --tonic_violet : #B42FF5;\n  --pink : #F9C7E9;\n  --pastel_blue : #D0EFF5;\n  --pastel_green : #C4E39A;\n  --pastel_violet : #DBD6FF;\n  --pastel_light_pink : #F9C7E9;\n  --pastel_dark_pink : #FAB1BD;\n  --pastel_orange : #FFAE92;\n  --pastel_dark_violet : #B1C5FF;\n  --pastel_turquoise : #7FD4B3;\n  --anthracite : #333333;\n  --dark_grey : #999999;\n  --medium_grey : #DADADA;\n  --light_grey : #F4F4F4;\n  --yellow_dark : #E3BA1A;\n  --green_pts : #21BE8B;\n  --green_background : #EEFAF7;\n  --gradient_peps : linear-gradient(to right, #B42FF5, #CFEEF4);\n  --gradient_peps_reverse : linear-gradient(to left, #B42FF5, #CFEEF4);\n  --standard_border_radius : 8px;\n}\n\np, span {\n  margin: 0;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  background-color: var(--light_grey);\n}\n\n/* handle texte style */\n\n.title_h1{\n  font-weight: 600;\n  font-size: 24px;\n}\n\n.title_h2{\n  font-weight: 500;\n  font-size: 20px;\n}\n\n.title_h3{\n  font-weight: 700;\n  font-size: 18px;\n}\n\n.subtitle{\n  font-weight: 500;\n}\n\n.text_body{\n  font-weight: 400;\n  font-size: 14px;\n}\n\n.text_body_sb{\n  font-weight: 600;\n  font-size: 14px;\n}\n\n.text_small_b{\n  font-weight: 700;\n  font-size: 12px;\n}\n\n.text_small{\n  font-size: 12px;\n}\n";
styleInject(css_248z$2);

var css_248z$1 = ".mpp_button {\n    background-color: var(--dark_blue);\n    color: var(--white);\n    border: none;\n    border-radius: var(--standard_border_radius);\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n  }\n  \n  .mpp_button:hover {\n    background-color:  var(--dark_blue_light);\n  }\n\n  .secondary_type:hover{\n    background-color:  var(--dark_blue_very_light);\n  }\n  \n  .mpp_button:disabled {\n    background-color: var(--disable_dark_blue);\n    cursor: not-allowed;\n  }\n\n  .button_large{\n    padding: 12px 40px;\n  }\n\n  .button_medium{\n    padding: 8px 32px;\n  }\n\n  .secondary_type{\n    background-color: var(--white);\n    color: var(--dark_blue);\n    border: 2px solid var(--dark_blue);\n  }\n\n  .secondary_type:disabled{\n    color: var(--disable_dark_blue);\n    background-color: var(--white);\n    border: 2px solid var(--disable_dark_blue)\n  }\n\n  ";
styleInject(css_248z$1);

var ButtonType;
(function (ButtonType) {
    ButtonType[ButtonType["primaryLarge"] = 0] = "primaryLarge";
    ButtonType[ButtonType["primaryMedium"] = 1] = "primaryMedium";
    ButtonType[ButtonType["secondaryLarge"] = 2] = "secondaryLarge";
    ButtonType[ButtonType["secondaryMedium"] = 3] = "secondaryMedium";
})(ButtonType || (ButtonType = {}));

/**
 * @interface MppButtonProps
 * @property {string} title - Titre du bouton.
 * @property {ButtonType} buttonType - enum pour le style
 * @property {void || null} onPress - fonction du bouton
 * @property {React.CSSProperties} style - style pour écraser les standards.
 * @property {React.CSSProperties} hoverStyle - style pour écraser les standards.
 * @property {React.CSSProperties} activeStyle - style pour écraser les standards.
 *
 * @example
 *
 * <MppButton
title="Bouton d'action"
onPress={() => {
  console.log('Bouton cliqué!');
}}
buttonType={ButtonType.primaryLarge}
/>
*/
const MppButton = ({ title, onPress, buttonType, style = {}, hoverStyle = {}, activeStyle = {}, }) => {
    const [hover, setHover] = React.useState(false);
    const [active, setActive] = React.useState(false);
    const isDisabled = onPress === null;
    const combinedStyle = Object.assign(Object.assign(Object.assign({}, style), (hover && !isDisabled ? hoverStyle : {})), (active && !isDisabled ? activeStyle : {}));
    return (React.createElement("button", { className: `mpp_button  ${buttonType === ButtonType.primaryLarge
            ? 'button_large text_body_sb'
            : buttonType === ButtonType.primaryMedium
                ? 'button_medium text_body'
                : buttonType === ButtonType.secondaryLarge
                    ? 'secondary_type button_large text_body_sb'
                    : 'secondary_type button_medium text_body'}`, style: combinedStyle, onClick: !isDisabled ? onPress : undefined, onMouseEnter: () => !isDisabled && setHover(true), onMouseLeave: () => !isDisabled && setHover(false), onMouseDown: () => !isDisabled && setActive(true), onMouseUp: () => !isDisabled && setActive(false), disabled: isDisabled }, title));
};

var css_248z = ".mpp_input_container {\n    display: flex;\n    margin: 10px 0;\n    gap: 17px;\n    padding: 16px;\n    border: 2px solid var(--medium_grey);\n    border-radius: var(--standard_border_radius);\n  }\n  \n  .mpp_input {\n    border: none;\n    width: 100%;\n    font-size: 16px;\n    outline: none;\n    transition: border-color 0.3s ease;\n    background-color: transparent;\n  }\n  \n .focused {\n    border-color: var(--dark_blue);\n  }\n\n  .max_characteres{\n    color: var(--dark_blue) !important;\n  }\n  \n  .error {\n    border-color: var(--error);\n  }\n  \n  .input_error {\n    color: var(--error);\n    font-size: 12px;\n    margin-top: 5px;\n  }\n\n  .input_counter{\n    color: var(--medium_grey);\n  }\n\n.input_icon_pointer{\n  cursor: pointer;\n}\n  \n  ";
styleInject(css_248z);

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

export { ButtonType, MppButton, MppInputText, logo_only_yellow as scoLogoOnly, white_logo_white_text as scoWhiteLogo, yellow_logo_blue_text as scoYellowLogo };
