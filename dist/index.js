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

var css_248z$5 = "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');\n/* Regular (400), Medium (500), Semi-Bold (600), Bold (700) */\n\n:root {\n  font-family: 'Poppins', sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  line-height: auto;\n  color: var(--dark_blue);\n\n  /* graphique chart mpp scolaire */\n  --error: red;\n  --white: #ffffff;\n  --main_yellow: #f9cf2f;\n  --light_yellow: #f9dc6c;\n  --very_light_yellow: #faf1c8;\n  --main_blue: #5fd3ac;\n  --light_blue: #cfeef4;\n  --dark_blue: #2c2c69;\n  --dark_blue_light: rgb(44, 44, 105, 0.8);\n  --dark_blue_very_light: rgb(44, 44, 105, 0.2);\n  --disable_dark_blue: #9595b4;\n  --tonic_violet: #b42ff5;\n  --pink: #f9c7e9;\n  --pastel_blue: #d0eff5;\n  --pastel_green: #c4e39a;\n  --pastel_violet: #dbd6ff;\n  --pastel_light_pink: #f9c7e9;\n  --pastel_dark_pink: #fab1bd;\n  --pastel_orange: #ffae92;\n  --pastel_dark_violet: #b1c5ff;\n  --pastel_turquoise: #7fd4b3;\n  --anthracite: #333333;\n  --dark_grey: #999999;\n  --medium_grey: #dadada;\n  --light_grey: #f4f4f4;\n  --utility_yellow: #e3ba1a;\n  --utility_green: #21be8b;\n  --green_background: #eefaf7;\n  --shadow_color: #0303841a;\n  --gradient_peps: linear-gradient(to right, #b42ff5, #cfeef4);\n  --gradient_peps_reverse: linear-gradient(to left, #b42ff5, #cfeef4);\n  --standard_border_radius: 8px;\n  --big_border_radius: 20px;\n}\n\np,\nspan {\n  margin: 0;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  background-color: var(--light_grey);\n}\n\n/* handle texte style */\n\n.title_h1 {\n  font-weight: 600;\n  font-size: 24px;\n}\n\n.title_h2 {\n  font-weight: 500;\n  font-size: 20px;\n}\n\n.title_h3 {\n  font-weight: 700;\n  font-size: 18px;\n}\n\n.subtitle {\n  font-weight: 500;\n}\n\n.text_body {\n  font-weight: 400;\n  font-size: 14px;\n}\n\n.text_body_sb {\n  font-weight: 600;\n  font-size: 14px;\n}\n\n.text_small_b {\n  font-weight: 700;\n  font-size: 12px;\n}\n\n.text_small {\n  font-weight: 400;\n  font-size: 12px;\n}\n\n\nli {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n\nul {\n  margin: 0;\n  padding: 0;\n}";
styleInject(css_248z$5);

var css_248z$4 = ".mpp_button {\n  background-color: var(--dark_blue);\n  color: var(--white);\n  border: none;\n  border-radius: var(--standard_border_radius);\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n.mpp_button:hover {\n  background-color: var(--dark_blue_light);\n}\n\n.secondary_type:hover {\n  background-color: var(--dark_blue_very_light);\n}\n\n.mpp_button:disabled {\n  background-color: var(--disable_dark_blue);\n  cursor: not-allowed;\n}\n\n.button_large {\n  padding: 12px 40px;\n}\n\n.button_medium {\n  padding: 8px 32px;\n}\n\n.secondary_type {\n  background-color: var(--white);\n  color: var(--dark_blue);\n  border: 2px solid var(--dark_blue);\n}\n\n.secondary_type:disabled {\n  color: var(--disable_dark_blue);\n  background-color: var(--white);\n  border: 2px solid var(--disable_dark_blue);\n}\n";
styleInject(css_248z$4);

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

var css_248z$3 = ".mpp_input_container {\n  display: flex;\n  margin: 10px 0;\n  gap: 17px;\n  padding: 16px;\n  border: 2px solid var(--medium_grey);\n  border-radius: var(--standard_border_radius);\n}\n\n.mpp_input {\n  border: none;\n  width: 100%;\n  font-size: 16px;\n  outline: none;\n  transition: border-color 0.3s ease;\n  background-color: transparent;\n}\n\n.focused {\n  border-color: var(--dark_blue);\n}\n\n.max_characteres {\n  color: var(--dark_blue) !important;\n}\n\n.error {\n  border-color: var(--error);\n}\n\n.input_error {\n  color: var(--error);\n  font-size: 12px;\n  margin-top: 5px;\n}\n\n.input_counter {\n  color: var(--medium_grey);\n}\n\n.input_icon_pointer {\n  cursor: pointer;\n}\n";
styleInject(css_248z$3);

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
const MppInputText = ({ placeholder, value = '', iconUrl = '', needCounter = false, maxCharacteres, validationConditions = [], onChange, onClickIcon, }) => {
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
        const newValueVerify = maxCharacteres
            ? newValue.slice(0, maxCharacteres)
            : newValue;
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
            (isFocused || inputValue) && iconUrl ? (React.createElement("img", { src: iconUrl, className: onClickIcon ? 'input_icon_pointer' : '', alt: "iconInput", onClick: handleIconClick })) : needCounter ? (React.createElement("span", { className: `input_counter ${inputValue.length === maxCharacteres ? 'max_characteres' : ''}` }, `${inputValue.length}/${maxCharacteres}`)) : null),
        errorMessages.length > 0 && inputValue && !isFirstEntry && (React.createElement("div", { className: "input_errors" }, errorMessages.map((error, index) => (React.createElement("p", { key: index, className: "input_error" }, error)))))));
};

const ScoColors = {
    error: 'var(--error)',
    white: 'var(--white)',
    mainYellow: 'var(--main_yellow)',
    lightYellow: 'var(--light_yellow)',
    veryLightYellow: 'var(--very_light_yellow)',
    mainBlue: 'var(--main_blue)',
    lightBlue: 'var(--light_blue)',
    darkBlue: 'var(--dark_blue)',
    darkBlueLight: 'var(--dark_blue_light)',
    darkBlueVeryLight: 'var(--dark_blue_very_light)',
    disableDarkBlue: 'var(--disable_dark_blue)',
    tonicViolet: 'var(--tonic_violet)',
    pink: 'var(--pink)',
    pastelBlue: 'var(--pastel_blue)',
    pastelGreen: 'var(--pastel_green)',
    pastelViolet: 'var(--pastel_violet)',
    pastelLightPink: 'var(--pastel_light_pink)',
    pastelDarkPink: 'var(--pastel_dark_pink)',
    pastelOrange: 'var(--pastel_orange)',
    pastelDarkViolet: 'var(--pastel_dark_violet)',
    pastelTurquoise: 'var(--pastel_turquoise)',
    anthracite: 'var(--anthracite)',
    darkGrey: 'var(--dark_grey)',
    mediumGrey: 'var(--medium_grey)',
    lightGrey: 'var(--light_grey)',
    utilityYellow: 'var(--utility_yellow)',
    utilityGreen: 'var(--utility_green)',
    greenBackground: 'var(--green_background)',
    gradientPeps: 'var(--gradient_peps)',
    gradientPepsReverse: 'var(--gradient_peps_reverse)',
};

var css_248z$2 = ".ranking_card_background {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  padding: 11px 20px;\n  background-color: var(--white);\n  border-radius: 20px;\n  box-shadow: 0px 4px 20px var(--shadow_color);\n  margin-bottom: 10px;\n}\n\n.ranking_background {\n  border-radius: var(--standard_border_radius);\n  padding: 8px;\n  line-height: 1;\n}\n\n.flex_row {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.content_background {\n  margin-left: 10px;\n}\n\n.sub_point_text {\n  color: var(--dark_grey);\n}\n";
styleInject(css_248z$2);

/**
* @example
*  <MppRankingCard
        title={'Les poulet'}
        subtitle={'Collège Jean Rostand'}
        ranking={4}
        points={'26.2pts'}
        subPointsText={'par élève'}
        pointsColor={ScoColors.mainYellow}
        rankingColorBackground={ScoColors.mainYellow}
      />
*/
const MppRankingCard = ({ title, subtitle, ranking, points, subPointsText, pointsColor, rankingColorBackground, }) => {
    return (React.createElement("div", { className: "ranking_card_background " },
        React.createElement("div", { className: "flex_row" },
            React.createElement("p", { className: "text_body_sb ranking_background", style: { backgroundColor: `${rankingColorBackground}` } }, ranking),
            React.createElement("div", { className: "content_background" },
                React.createElement("p", { className: "text_body_sb" }, title),
                React.createElement("p", { className: "text_small" }, subtitle))),
        React.createElement("div", { className: "points_background" },
            React.createElement("p", { className: "text_body_sb", style: { color: `${pointsColor}` } }, points),
            React.createElement("p", { className: "sub_point_text text_small" }, subPointsText))));
};

var goldTrophee = "ressources/logo/coupe_or.svg";

var silverTrophee = "ressources/logo/coupe_argent.svg";

var bronzeTrophee = "ressources/logo/coupe_bronze.svg";

var css_248z$1 = ".podium_step__container {\n  display: inline-block;\n  text-align: center;\n  width: 100%;\n}\n\n.podium_step__img {\n  width: 3.75rem;\n  margin-bottom: 1rem;\n}\n\n.podium_step__list {\n  color: var(--white);\n  margin-bottom: 0.3rem;\n}\n\n.podium_step__list--subtitle {\n  margin-bottom: 0.2rem;\n}\n\nul.podium_step__list > li:nth-child(1),\nul.podium_step__list > li:nth-child(3) {\n  margin-bottom: 0.3rem;\n}\n\n.podium_step_number__container {\n  border-top-left-radius: var(--standard_border_radius);\n  border-top-right-radius: var(--standard_border_radius);\n  padding-top: 0.4rem;\n  width: auto;\n  background-color: var(--white);\n}\n\n.podium_step_number__number {\n  padding: 0.1rem 0.5rem;\n  border-radius: var(--standard_border_radius);\n}\n";
styleInject(css_248z$1);

const MppPodiumStep = ({ title, subtitle, subtitleBold, pointsNumber, typeOfPlayer, color, ranking, }) => {
    return (React.createElement("div", { className: "podium_step__container" },
        React.createElement("div", { className: "podium_step__content" },
            React.createElement("img", { src: ranking == 1
                    ? goldTrophee
                    : ranking == 2
                        ? silverTrophee
                        : bronzeTrophee, alt: "icone de coupe", className: "podium_step__img" }),
            React.createElement("ul", { className: "podium_step__list" },
                React.createElement("li", { className: "podium_step__list--title title_h3" }, title),
                subtitle ? (React.createElement("li", { className: "podium_step__list--subtitle text_small" }, subtitle)) : null,
                subtitleBold ? (React.createElement("li", { className: "podium_step__list--subtitle_bold text_small_b" }, subtitleBold)) : null,
                React.createElement("li", { style: { color: `${color}` }, className: "podium_step__list--type text_small_b" },
                    pointsNumber,
                    " pts",
                    React.createElement("span", { className: "text_small" },
                        "/",
                        typeOfPlayer)))),
        React.createElement("div", { className: "podium_step_number__container", style: {
                height: `${ranking == 1 ? '4.6em' : ranking == 2 ? '3.4em' : '2.1em'}`,
            } },
            React.createElement("span", { className: "podium_step_number__number text_body_sb", style: { backgroundColor: `${color}` } }, ranking))));
};

var css_248z = ".podium__container {\n  padding: 1.625rem 0.3rem 1.5rem 0.3rem;\n  display: flex;\n  align-items: flex-end;\n  max-width: 625px;\n  min-width: 361px;\n  background-color: var(--dark_blue_light);\n  border-radius: var(--big_border_radius);\n}\n\n.podium_step__container:nth-child(2) {\n  order: 1;\n}\n\n.podium_step__container:nth-child(1) {\n  margin: 0 0.3rem;\n  order: 2;\n}\n\n.podium_step__container:nth-child(3) {\n  order: 3;\n}\n\n@media (min-width: 896px) {\n  .podium__container {\n    padding: 4.5rem 6rem 2.5rem 6rem;\n  }\n}\n";
styleInject(css_248z);

const MppPodium = ({ rankedElements, typeOfPlayers, color, }) => {
    return (React.createElement("div", { className: "podium__container" }, rankedElements.map(({ name, points, ranking, city, structure }) => (React.createElement(MppPodiumStep, { subtitle: structure, subtitleBold: city, key: ranking, title: name, pointsNumber: points, typeOfPlayer: typeOfPlayers, color: color, ranking: ranking })))));
};

export { ButtonType, MppButton, MppInputText, MppPodium, MppRankingCard, ScoColors, logo_only_yellow as scoLogoOnly, white_logo_white_text as scoWhiteLogo, yellow_logo_blue_text as scoYellowLogo };
