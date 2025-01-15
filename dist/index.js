import * as React from 'react';
import React__default, { useState, useEffect, useCallback, useRef } from 'react';

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
    const [hover, setHover] = React__default.useState(false);
    const [active, setActive] = React__default.useState(false);
    const isDisabled = onPress === null;
    const combinedStyle = Object.assign(Object.assign(Object.assign({}, style), (hover && !isDisabled ? hoverStyle : {})), (active && !isDisabled ? activeStyle : {}));
    return (React__default.createElement("button", { className: `mpp_button  ${buttonType === ButtonType.primaryLarge
            ? 'button_large text_body_sb'
            : buttonType === ButtonType.primaryMedium
                ? 'button_medium text_body'
                : buttonType === ButtonType.secondaryLarge
                    ? 'secondary_type button_large text_body_sb'
                    : 'secondary_type button_medium text_body'}`, style: combinedStyle, onClick: !isDisabled ? onPress : undefined, onMouseEnter: () => !isDisabled && setHover(true), onMouseLeave: () => !isDisabled && setHover(false), onMouseDown: () => !isDisabled && setActive(true), onMouseUp: () => !isDisabled && setActive(false), disabled: isDisabled }, title));
};

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
const MppInputText = ({ placeholder, value = '', icon: Icon, needCounter = false, maxCharacteres, validationConditions = [], onChange, onClickIcon, setHasError, onClickErrorMessage, readOnly = false, onKeyDown, }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFirstEntry, setIsFirstEntry] = useState(onKeyDown ? false : true);
    const [inputValue, setInputValue] = useState(value);
    const [errorMessages, setErrorMessages] = useState([]);
    useEffect(() => {
        setInputValue(value);
    }, [value]);
    const validateInput = useCallback((value) => {
        const errors = validationConditions
            .filter((validation) => !validation.condition(value))
            .map((validation) => validation.message);
        if (onClickErrorMessage) {
            errors.push(onClickErrorMessage);
        }
        setErrorMessages(errors);
        if (setHasError)
            setHasError(errors.length > 0);
        return errors.length > 0;
    }, [validationConditions, onClickErrorMessage, setHasError]);
    useEffect(() => {
        if (onClickErrorMessage) {
            validateInput(inputValue);
        }
    }, [onClickErrorMessage, inputValue, validateInput]);
    const handleFocus = () => {
        setIsFocused(true);
    };
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
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement("div", { className: `mpp_input_container ${isFocused && !readOnly ? 'focused' : ''} ${errorMessages.length > 0 && !isFirstEntry && inputValue ? 'error' : ''}` },
            React__default.createElement("input", { type: "text", placeholder: placeholder, value: inputValue, onFocus: handleFocus, onBlur: handleBlur, onChange: readOnly ? null : handleChange, className: `mpp_input ${readOnly ? 'read_only' : ''}`, readOnly: readOnly, onKeyDown: onKeyDown }),
            (isFocused || inputValue) && Icon ? (React__default.createElement(Icon, { className: onClickIcon ? 'input_icon_pointer' : '', onClick: handleIconClick })) : needCounter ? (React__default.createElement("span", { className: `input_counter ${inputValue.length === maxCharacteres ? 'max_characteres' : ''}` }, `${inputValue.length}/${maxCharacteres}`)) : null),
        React__default.createElement("div", { className: "input_errors" }, errorMessages.length > 0 &&
            inputValue &&
            !isFirstEntry &&
            errorMessages.map((error, index) => (React__default.createElement("p", { key: index, className: "input_error" }, error))))));
};

const ScoColors = {
    error: 'var(--error)',
    white: 'var(--white)',
    whiteTransparent: 'var(--white_transparent)',
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

var _path$v;
function _extends$B() { return _extends$B = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$B.apply(null, arguments); }
var SvgPen = function SvgPen(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$B({
    xmlns: "http://www.w3.org/2000/svg",
    width: 18,
    height: 18,
    fill: "currentColor"
  }, props), _path$v || (_path$v = /*#__PURE__*/React.createElement("path", {
    d: "M-.003 14.251v3.75h3.75l11.06-11.06-3.75-3.75zm17.71-10.21a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"
  })));
};

var _path$u, _path2$d;
function _extends$A() { return _extends$A = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$A.apply(null, arguments); }
var SvgLogo = function SvgLogo(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$A({
    xmlns: "http://www.w3.org/2000/svg",
    width: 30,
    height: 30,
    fill: "none"
  }, props), _path$u || (_path$u = /*#__PURE__*/React.createElement("path", {
    fill: "#2C2C69",
    d: "M15 3a12 12 0 1 0 0 24 12 12 0 0 0 0-24m0 21.884A9.883 9.883 0 1 1 24.884 15 9.894 9.894 0 0 1 15 24.884"
  })), _path2$d || (_path2$d = /*#__PURE__*/React.createElement("path", {
    fill: "#2C2C69",
    d: "M19.929 10.315a2.678 2.678 0 1 0 0 5.356 2.678 2.678 0 0 0 0-5.356m.721 2.623a1.011 1.011 0 1 1 0-2.023 1.011 1.011 0 0 1 0 2.023M9.382 12.997a2.679 2.679 0 1 0 0 5.358 2.679 2.679 0 0 0 0-5.358m.721 2.623a1.01 1.01 0 1 1 0-2.022 1.01 1.01 0 0 1 0 2.022"
  })));
};

var _path$t;
function _extends$z() { return _extends$z = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$z.apply(null, arguments); }
var SvgGraph = function SvgGraph(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$z({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 21,
    fill: "currentColor"
  }, props), _path$t || (_path$t = /*#__PURE__*/React.createElement("path", {
    d: "M2.292 18.273a.607.607 0 0 1-.625-.625v-8.75a.607.607 0 0 1 .625-.625h2.916a.607.607 0 0 1 .625.625v8.75a.607.607 0 0 1-.625.625zm6.25 0a.607.607 0 0 1-.625-.625V3.898a.607.607 0 0 1 .625-.625h2.916a.607.607 0 0 1 .625.625v13.75a.607.607 0 0 1-.625.625zm6.25 0a.607.607 0 0 1-.625-.625v-7.083a.607.607 0 0 1 .625-.625h2.916a.607.607 0 0 1 .625.625v7.083a.607.607 0 0 1-.625.625z"
  })));
};

var _path$s;
function _extends$y() { return _extends$y = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$y.apply(null, arguments); }
var SvgHelp = function SvgHelp(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$y({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 21,
    fill: "currentColor"
  }, props), _path$s || (_path$s = /*#__PURE__*/React.createElement("path", {
    d: "M10.083 15.628q.334 0 .563-.23a.76.76 0 0 0 .23-.562.77.77 0 0 0-.23-.562.77.77 0 0 0-.563-.23.77.77 0 0 0-.562.23.77.77 0 0 0-.23.562q0 .333.23.563.23.228.562.229m-.02-8.604q.708 0 1.145.385t.438.99q0 .416-.25.823t-.813.885q-.54.48-.864 1.01-.323.532-.323.97 0 .228.177.364a.65.65 0 0 0 .406.135.56.56 0 0 0 .417-.167.75.75 0 0 0 .208-.416q.063-.417.282-.74t.677-.698q.624-.52.906-1.041.28-.521.281-1.167 0-1.104-.719-1.77-.718-.668-1.906-.668-.792 0-1.458.313a2.8 2.8 0 0 0-1.104.917.64.64 0 0 0-.136.468q.031.24.198.365a.57.57 0 0 0 .49.104.73.73 0 0 0 .427-.292q.271-.375.656-.572.385-.198.865-.198M10 19.107a8.4 8.4 0 0 1-3.27-.635 8.1 8.1 0 0 1-2.647-1.76 8.3 8.3 0 0 1-1.77-2.647q-.646-1.52-.646-3.291a8.3 8.3 0 0 1 .646-3.271 8.3 8.3 0 0 1 1.77-2.646 8.3 8.3 0 0 1 2.646-1.77A8.3 8.3 0 0 1 10 2.44q1.73 0 3.25.646a8.3 8.3 0 0 1 2.646 1.771 8.4 8.4 0 0 1 1.781 2.646 8.2 8.2 0 0 1 .656 3.27q0 1.771-.656 3.292a8.4 8.4 0 0 1-1.781 2.646 8.1 8.1 0 0 1-2.646 1.76 8.35 8.35 0 0 1-3.25.636"
  })));
};

var _path$r;
function _extends$x() { return _extends$x = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$x.apply(null, arguments); }
var SvgMap = function SvgMap(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$x({
    xmlns: "http://www.w3.org/2000/svg",
    width: 18,
    height: 19,
    fill: "currentColor"
  }, props), _path$r || (_path$r = /*#__PURE__*/React.createElement("path", {
    d: "m17.5.773-.16.03L12 2.873l-6-2.1-5.64 1.9c-.21.07-.36.25-.36.48v15.12c0 .28.22.5.5.5l.16-.03L6 16.673l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V1.273c0-.28-.22-.5-.5-.5M7 3.243l4 1.4v11.66l-4-1.4zm-5 .99 3-1.01v11.7l-3 1.16zm14 11.08-3 1.01V4.633l3-1.16z"
  })));
};

var _g$6, _defs$4;
function _extends$w() { return _extends$w = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$w.apply(null, arguments); }
var SvgRessources = function SvgRessources(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$w({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 21,
    fill: "currentColor"
  }, props), _g$6 || (_g$6 = /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#ressources_svg__a)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15.833 16.607H4.167V4.94H10V3.273H4.167c-.925 0-1.667.75-1.667 1.667v11.667c0 .916.742 1.666 1.667 1.666h11.666c.917 0 1.667-.75 1.667-1.666v-5.834h-1.667zM11.667 3.273V4.94h2.991l-8.191 8.192 1.175 1.175 8.191-8.192v2.992H17.5V3.273z"
  }))), _defs$4 || (_defs$4 = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "ressources_svg__a"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 .773h20v20H0z"
  })))));
};

var _path$q, _path2$c;
function _extends$v() { return _extends$v = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$v.apply(null, arguments); }
var SvgTrophee = function SvgTrophee(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$v({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 21,
    fill: "none"
  }, props), _path$q || (_path$q = /*#__PURE__*/React.createElement("path", {
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M5.333 4.107v4.591c0 3.308 2.058 6.05 4.632 6.075a3.8 3.8 0 0 0 1.796-.443 4.8 4.8 0 0 0 1.526-1.298 6.3 6.3 0 0 0 1.021-1.952 7.5 7.5 0 0 0 .359-2.307V4.107a.77.77 0 0 0-.152-.472.47.47 0 0 0-.367-.195H5.852c-.138 0-.27.07-.367.195a.77.77 0 0 0-.152.472M7.708 18.273h4.584M10 15.148v3.125M14.667 10.107h.624c.542 0 1.061-.241 1.444-.67.383-.428.598-1.01.598-1.616V6.678a.6.6 0 0 0-.15-.404.49.49 0 0 0-.36-.167H14.78"
  })), _path2$c || (_path2$c = /*#__PURE__*/React.createElement("path", {
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M5.333 10.107h-.639c-.538 0-1.053-.241-1.434-.67a2.44 2.44 0 0 1-.593-1.616V6.678a.6.6 0 0 1 .148-.404.48.48 0 0 1 .359-.167H5.2"
  })));
};

var _path$p, _path2$b, _path3$8, _path4$2, _path5$2, _path6$1, _path7$1, _path8$1, _path9$1;
function _extends$u() { return _extends$u = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$u.apply(null, arguments); }
var SvgCoupeOr = function SvgCoupeOr(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$u({
    xmlns: "http://www.w3.org/2000/svg",
    width: 62,
    height: 60,
    fill: "none"
  }, props), _path$p || (_path$p = /*#__PURE__*/React.createElement("path", {
    fill: "#FFD121",
    d: "M32.752 45.887h-3.504v12.348h3.504z"
  })), _path2$b || (_path2$b = /*#__PURE__*/React.createElement("path", {
    fill: "#FFD121",
    d: "M23.126 56.472a1.764 1.764 0 1 0 0 3.528h15.748a1.764 1.764 0 1 0 0-3.528z"
  })), _path3$8 || (_path3$8 = /*#__PURE__*/React.createElement("path", {
    fill: "#FFF7CA",
    stroke: "#FFD121",
    strokeWidth: 4,
    d: "M3 11.94a2 2 0 0 1 2-2h52a2 2 0 0 1 2 2v4c0 5.522-4.477 10-10 10H13c-5.523 0-10-4.478-10-10z"
  })), _path4$2 || (_path4$2 = /*#__PURE__*/React.createElement("path", {
    fill: "#FFF7CA",
    stroke: "#FFD121",
    strokeWidth: 4,
    d: "M11.667 3.654c0-.913.74-1.654 1.654-1.654h35.358c.913 0 1.654.74 1.654 1.654V28c0 10.678-8.656 19.333-19.333 19.333-10.678 0-19.333-8.655-19.333-19.333z"
  })), _path5$2 || (_path5$2 = /*#__PURE__*/React.createElement("path", {
    fill: "#FFF1A8",
    stroke: "#FFD121",
    strokeWidth: 3,
    d: "M41.234 20.82c0 5.8-4.701 10.5-10.5 10.5s-10.5-4.7-10.5-10.5 4.7-10.5 10.5-10.5 10.5 4.701 10.5 10.5Z"
  })), _path6$1 || (_path6$1 = /*#__PURE__*/React.createElement("path", {
    fill: "#FFD121",
    d: "M25.667 24a2.667 2.667 0 1 0 0-5.334 2.667 2.667 0 0 0 0 5.333"
  })), _path7$1 || (_path7$1 = /*#__PURE__*/React.createElement("path", {
    fill: "#FDEFA6",
    d: "M26.534 21.332a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
  })), _path8$1 || (_path8$1 = /*#__PURE__*/React.createElement("path", {
    fill: "#FFD121",
    d: "M35.667 21.333a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333"
  })), _path9$1 || (_path9$1 = /*#__PURE__*/React.createElement("path", {
    fill: "#FDEFA6",
    d: "M36.534 18.666a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
  })));
};

var _g$5, _defs$3;
function _extends$t() { return _extends$t = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$t.apply(null, arguments); }
var SvgCoupeArgent = function SvgCoupeArgent(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$t({
    xmlns: "http://www.w3.org/2000/svg",
    width: 61,
    height: 60,
    fill: "none"
  }, props), _g$5 || (_g$5 = /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#coupe_argent_svg__a)"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#FFEF9D",
    stroke: "#FFD121",
    strokeWidth: 3,
    d: "M40.734 20.82c0 5.8-4.701 10.5-10.5 10.5s-10.5-4.7-10.5-10.5 4.7-10.5 10.5-10.5 10.5 4.701 10.5 10.5Z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FFD121",
    d: "M25.167 24a2.667 2.667 0 1 0 0-5.334 2.667 2.667 0 0 0 0 5.333"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FDEFA6",
    d: "M26.034 21.332a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FFD121",
    d: "M35.167 21.333a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FDEFA6",
    d: "M36.034 18.666a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#999",
    stroke: "#999",
    d: "M31.752 46.387h-2.504v11.348h2.504z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#999",
    stroke: "#999",
    d: "M22.626 56.972a1.264 1.264 0 0 0 0 2.528h15.748a1.264 1.264 0 1 0 0-2.528z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#F4F4F4",
    stroke: "#999",
    strokeWidth: 4,
    d: "M2.5 11.94a2 2 0 0 1 2-2h52a2 2 0 0 1 2 2v4c0 5.522-4.477 10-10 10h-36c-5.523 0-10-4.478-10-10z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#F4F4F4",
    stroke: "#999",
    strokeWidth: 4,
    d: "M11.167 3.654c0-.913.74-1.654 1.654-1.654h35.358c.913 0 1.654.74 1.654 1.654V28c0 10.678-8.656 19.333-19.333 19.333-10.678 0-19.333-8.655-19.333-19.333z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#DADADA",
    stroke: "#999",
    strokeWidth: 3,
    d: "M40.734 20.82c0 5.8-4.701 10.5-10.5 10.5s-10.5-4.7-10.5-10.5 4.7-10.5 10.5-10.5 10.5 4.701 10.5 10.5Z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#999",
    d: "M25.167 24a2.667 2.667 0 1 0 0-5.334 2.667 2.667 0 0 0 0 5.333"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#F4F4F4",
    d: "M26.034 21.332a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#999",
    d: "M35.167 21.333a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#F4F4F4",
    d: "M36.034 18.666a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
  }))), _defs$3 || (_defs$3 = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "coupe_argent_svg__a"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M0 0h61v60H0z"
  })))));
};

var _g$4, _defs$2;
function _extends$s() { return _extends$s = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$s.apply(null, arguments); }
var SvgCoupeBronze = function SvgCoupeBronze(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$s({
    xmlns: "http://www.w3.org/2000/svg",
    width: 61,
    height: 60,
    fill: "none"
  }, props), _g$4 || (_g$4 = /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#coupe_bronze_svg__a)"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#FFEF9D",
    stroke: "#FFD121",
    strokeWidth: 3,
    d: "M40.734 20.82c0 5.8-4.701 10.5-10.5 10.5s-10.5-4.7-10.5-10.5 4.7-10.5 10.5-10.5 10.5 4.701 10.5 10.5Z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FFD121",
    d: "M25.167 24a2.667 2.667 0 1 0 0-5.334 2.667 2.667 0 0 0 0 5.333"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FDEFA6",
    d: "M26.034 21.332a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FFD121",
    d: "M35.167 21.333a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FDEFA6",
    d: "M36.034 18.666a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#E3AC5A",
    stroke: "#E3AC5A",
    d: "M31.752 46.387h-2.504v11.348h2.504z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#E3AC5A",
    stroke: "#E3AC5A",
    d: "M22.626 56.972a1.264 1.264 0 0 0 0 2.528h15.748a1.264 1.264 0 1 0 0-2.528z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FAEDDA",
    stroke: "#E3AC5A",
    strokeWidth: 4,
    d: "M2.5 11.94a2 2 0 0 1 2-2h52a2 2 0 0 1 2 2v4c0 5.522-4.477 10-10 10h-36c-5.523 0-10-4.478-10-10z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FAEDDA",
    stroke: "#E3AC5A",
    strokeWidth: 4,
    d: "M11.167 3.654c0-.913.74-1.654 1.654-1.654h35.358c.913 0 1.654.74 1.654 1.654V28c0 10.678-8.656 19.333-19.333 19.333-10.678 0-19.333-8.655-19.333-19.333z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#F3DDBD",
    stroke: "#E3AC5A",
    strokeWidth: 3,
    d: "M40.734 20.82c0 5.8-4.701 10.5-10.5 10.5s-10.5-4.7-10.5-10.5 4.7-10.5 10.5-10.5 10.5 4.701 10.5 10.5Z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#E3AC5A",
    d: "M25.167 24a2.667 2.667 0 1 0 0-5.334 2.667 2.667 0 0 0 0 5.333"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#F3DDBD",
    d: "M26.034 21.332a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#E3AC5A",
    d: "M35.167 21.333a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#F3DDBD",
    d: "M36.034 18.666a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
  }))), _defs$2 || (_defs$2 = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "coupe_bronze_svg__a"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M.5 0h60v60H.5z"
  })))));
};

var _path$o, _g$3;
function _extends$r() { return _extends$r = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$r.apply(null, arguments); }
var SvgHistory = function SvgHistory(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$r({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    fill: "currentColor",
    stroke: "current"
  }, props), /*#__PURE__*/React.createElement("mask", {
    id: "history_svg__a",
    width: 24,
    height: 24,
    x: 0,
    y: 0,
    maskUnits: "userSpaceOnUse",
    style: {
      maskType: "alpha"
    }
  }, _path$o || (_path$o = /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z"
  }))), _g$3 || (_g$3 = /*#__PURE__*/React.createElement("g", {
    mask: "url(#history_svg__a)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 21q-3.15 0-5.575-1.913Q4 17.176 3.275 14.2a.74.74 0 0 1 .15-.687.97.97 0 0 1 .675-.363q.4-.05.725.15t.45.6q.6 2.25 2.475 3.675T12 19q2.925 0 4.962-2.038T19 12t-2.038-4.962T12 5a6.75 6.75 0 0 0-3.225.8A7.4 7.4 0 0 0 6.25 8H8q.424 0 .713.287Q9 8.576 9 9q0 .424-.287.713A.97.97 0 0 1 8 10H4a.97.97 0 0 1-.712-.287A.97.97 0 0 1 3 9V5q0-.424.288-.713A.97.97 0 0 1 4 4q.424 0 .713.287Q5 4.576 5 5v1.35a8.7 8.7 0 0 1 3.113-2.475A8.9 8.9 0 0 1 12 3q1.874 0 3.512.712a9.2 9.2 0 0 1 2.85 1.926 9.2 9.2 0 0 1 1.926 2.85A8.7 8.7 0 0 1 21 12q0 1.874-.712 3.512a9.2 9.2 0 0 1-1.925 2.85 9.2 9.2 0 0 1-2.85 1.926A8.7 8.7 0 0 1 12 21Zm1-9.4 2.5 2.5a.95.95 0 0 1 .275.7.95.95 0 0 1-.275.7.95.95 0 0 1-.7.275.95.95 0 0 1-.7-.275l-2.8-2.8a1 1 0 0 1-.225-.337 1 1 0 0 1-.075-.388V8q0-.424.287-.713A.97.97 0 0 1 12 7q.424 0 .713.287Q13 7.576 13 8z"
  }))));
};

var _path$n;
function _extends$q() { return _extends$q = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$q.apply(null, arguments); }
var SvgLogout = function SvgLogout(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$q({
    xmlns: "http://www.w3.org/2000/svg",
    width: 18,
    height: 18,
    fill: "none"
  }, props), _path$n || (_path$n = /*#__PURE__*/React.createElement("path", {
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M12.235 6.047 15.188 9l-2.953 2.953M7.313 9h7.872M7.313 15.188H3.375a.56.56 0 0 1-.562-.563V3.375a.563.563 0 0 1 .562-.562h3.938"
  })));
};

var _path$m;
function _extends$p() { return _extends$p = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$p.apply(null, arguments); }
var SvgBurgerMenu = function SvgBurgerMenu(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$p({
    xmlns: "http://www.w3.org/2000/svg",
    width: 28,
    height: 23,
    fill: "none"
  }, props), _path$m || (_path$m = /*#__PURE__*/React.createElement("path", {
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeWidth: 3,
    d: "M1.5 11.5h25M1.5 1.5h25M1.5 21.5h25"
  })));
};

var _g$2, _defs$1;
function _extends$o() { return _extends$o = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$o.apply(null, arguments); }
var SvgTraining = function SvgTraining(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$o({
    xmlns: "http://www.w3.org/2000/svg",
    width: 36,
    height: 36,
    fill: "none"
  }, props), _g$2 || (_g$2 = /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#training_svg__a)"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#FFAE92",
    fillRule: "evenodd",
    d: "M4.875 4.875h22.604v3.646h-1.458V6.333H6.333v16.771h15.595v1.459H4.875zm21.875 9.48a2.188 2.188 0 1 0 0-4.376 2.188 2.188 0 0 0 0 4.375m1.48 1.465c.948 0 1.698.426 2.188 1.083.46.617.653 1.379.697 2.082a5.5 5.5 0 0 1-.29 2.13c-.218.634-.588 1.29-1.158 1.74v7.176a1.093 1.093 0 0 1-2.173.18l-.94-5.648h-.218l-1.063 5.67a1.094 1.094 0 0 1-2.169-.202V19.628q-.22.334-.431.67l-.057.09-.015.023-.004.007a1.09 1.09 0 0 1-.929.515h-3.645a1.094 1.094 0 1 1 0-2.187h3.045c.177-.274.41-.63.656-.987.255-.373.537-.767.787-1.077.122-.15.259-.308.396-.437.067-.064.16-.146.274-.219.2-.132.435-.204.675-.206z",
    clipRule: "evenodd"
  }))), _defs$1 || (_defs$1 = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "training_svg__a"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M.5.5h35v35H.5z"
  })))));
};

var _path$l, _path2$a, _path3$7;
function _extends$n() { return _extends$n = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$n.apply(null, arguments); }
var SvgUsers = function SvgUsers(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$n({
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 32,
    fill: "none"
  }, props), _path$l || (_path$l = /*#__PURE__*/React.createElement("path", {
    stroke: "#F9CF2F",
    strokeMiterlimit: 10,
    strokeWidth: 3,
    d: "M11 20a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"
  })), _path2$a || (_path2$a = /*#__PURE__*/React.createElement("path", {
    stroke: "#F9CF2F",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 3,
    d: "M19.429 7.241A6.5 6.5 0 1 1 21.192 20M2 24.675a11.002 11.002 0 0 1 18-.001"
  })), _path3$7 || (_path3$7 = /*#__PURE__*/React.createElement("path", {
    stroke: "#F9CF2F",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 3,
    d: "M21.179 20a10.99 10.99 0 0 1 9 4.674"
  })));
};

var _path$k, _path2$9;
function _extends$m() { return _extends$m = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$m.apply(null, arguments); }
var SvgTarget = function SvgTarget(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$m({
    xmlns: "http://www.w3.org/2000/svg",
    width: 36,
    height: 36,
    fill: "none"
  }, props), _path$k || (_path$k = /*#__PURE__*/React.createElement("path", {
    stroke: "#C4E39A",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 3,
    d: "M18 18 31.5 4.5M27.545 8.455a13.487 13.487 0 1 0 2.64 3.726"
  })), _path2$9 || (_path2$9 = /*#__PURE__*/React.createElement("path", {
    stroke: "#C4E39A",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 3,
    d: "M22.773 13.227a6.75 6.75 0 1 0 1.966 4.387"
  })));
};

var _g$1, _defs;
function _extends$l() { return _extends$l = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$l.apply(null, arguments); }
var SvgChart = function SvgChart(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$l({
    xmlns: "http://www.w3.org/2000/svg",
    width: 34,
    height: 34,
    fill: "#B1C5FF"
  }, props), _g$1 || (_g$1 = /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#chart_svg__a)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9.284 13.313h.274c1.053 0 1.915.862 1.915 1.916v9.579a1.92 1.92 0 0 1-1.915 1.916h-.274a1.92 1.92 0 0 1-1.916-1.916v-9.579c0-1.054.862-1.916 1.916-1.916m7.663-5.747c1.054 0 1.916.862 1.916 1.916v15.326a1.92 1.92 0 0 1-1.916 1.916 1.92 1.92 0 0 1-1.916-1.916V9.482c0-1.054.862-1.916 1.916-1.916m7.663 10.947c1.054 0 1.916.862 1.916 1.916v4.379a1.92 1.92 0 0 1-1.916 1.916 1.92 1.92 0 0 1-1.916-1.916v-4.38c0-1.053.862-1.915 1.916-1.915"
  }))), _defs || (_defs = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "chart_svg__a"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M.526.724h32.842v32.842H.526z"
  })))));
};

var _path$j;
function _extends$k() { return _extends$k = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$k.apply(null, arguments); }
var SvgSchool = function SvgSchool(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$k({
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 34,
    fill: "none"
  }, props), _path$j || (_path$j = /*#__PURE__*/React.createElement("path", {
    fill: "#F9C7E9",
    d: "M16.005 19.892a4.04 4.04 0 0 0 4.032-4.033 4.04 4.04 0 0 0-4.032-4.033 4.04 4.04 0 0 0-4.033 4.033 4.037 4.037 0 0 0 4.033 4.033m0-5.699c.918 0 1.665.747 1.665 1.666s-.747 1.666-1.666 1.666a1.67 1.67 0 0 1-1.665-1.666c0-.919.747-1.666 1.665-1.666m15.99 4.473a1.2 1.2 0 0 0-.073-.364c-.01-.027-.016-.054-.028-.079l-.015-.044-2.28-4.558c-.201-.401-.61-.654-1.06-.654h-3.38a1.18 1.18 0 0 0-.49-.919l-7.484-5.345v-.487H21.7c.654 0 1.184-.53 1.184-1.183v-3.42C22.884.96 22.354.43 21.7.43h-5.698c-.654 0-1.184.53-1.184 1.184v5.09l-7.483 5.344a1.18 1.18 0 0 0-.491.919h-3.38c-.449 0-.859.253-1.06.654l-2.28 4.558c-.007.015-.009.03-.015.044q-.015.039-.026.079-.068.177-.074.364c0 .014-.009.028-.009.043v13.677c0 .654.53 1.183 1.184 1.183h29.633c.653 0 1.183-.53 1.183-1.183V18.709c0-.015-.007-.029-.009-.043zm-3.09-1.141h-3.738v-2.191h2.643l1.097 2.19zM20.518 3.848h-3.332V2.796h3.332zM4.198 15.334h2.644v2.19H3.104l1.096-2.19zm-1.827 4.558h4.471v11.31h-4.47zm6.838-1.184V13.62l6.795-4.854L22.8 13.62v17.582h-2.192v-7.934c0-.654-.53-1.184-1.184-1.184h-6.838c-.654 0-1.183.53-1.183 1.184V31.2H9.209V18.707zm4.56 12.494v-6.75h4.471v6.75zm15.868 0h-4.47v-11.31h4.47zM5.79 22.127v3.42a1.183 1.183 0 1 1-2.367 0v-3.42a1.183 1.183 0 1 1 2.367 0m20.428 3.42v-3.42a1.183 1.183 0 1 1 2.367 0v3.42a1.183 1.183 0 1 1-2.367 0"
  })));
};

var _path$i;
function _extends$j() { return _extends$j = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$j.apply(null, arguments); }
var SvgCloud = function SvgCloud(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$j({
    xmlns: "http://www.w3.org/2000/svg",
    width: 40,
    height: 20,
    fill: "none"
  }, props), _path$i || (_path$i = /*#__PURE__*/React.createElement("path", {
    fill: "#FFAE92",
    d: "M32.231 20H6.204C2.784 20 0 17.263 0 13.9s2.784-6.099 6.204-6.099a6.2 6.2 0 0 1 2.404.478C9.443 3.56 13.643 0 18.602 0c4.085 0 7.71 2.377 9.31 6.007a7.83 7.83 0 0 1 4.318-1.298c4.285 0 7.77 3.43 7.77 7.646C40.002 16.57 36.515 20 32.231 20M6.204 9.172c-2.625 0-4.762 2.121-4.762 4.728s2.137 4.728 4.762 4.728H32.23c3.49 0 6.33-2.816 6.33-6.274 0-3.46-2.839-6.274-6.33-6.274-1.53 0-3.009.553-4.166 1.56a.75.75 0 0 1-.674.157.71.71 0 0 1-.5-.46C25.72 3.768 22.39 1.37 18.601 1.37c-4.562 0-8.375 3.534-8.682 8.043a.69.69 0 0 1-.402.572.75.75 0 0 1-.722-.05 4.76 4.76 0 0 0-2.592-.764"
  })));
};

var _path$h, _path2$8;
function _extends$i() { return _extends$i = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$i.apply(null, arguments); }
var SvgDrops = function SvgDrops(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$i({
    xmlns: "http://www.w3.org/2000/svg",
    width: 26,
    height: 34,
    fill: "none"
  }, props), _path$h || (_path$h = /*#__PURE__*/React.createElement("path", {
    fill: "#F9CF2F",
    fillRule: "evenodd",
    d: "M3.374 17.613a9.57 9.57 0 0 0-2.244 6.17c0 5.303 4.306 9.609 9.609 9.609s9.609-4.306 9.609-9.61c0-2.348-.844-4.5-2.244-6.169l-6.057-7.345a1.698 1.698 0 0 0-2.617 0zm.868.724 6.062-7.348a.56.56 0 0 1 .435-.206c.17 0 .33.075.435.206l6.062 7.348a8.44 8.44 0 0 1 1.982 5.446 8.48 8.48 0 0 1-8.48 8.478 8.48 8.48 0 0 1-8.478-8.478c0-2.073.745-3.972 1.982-5.446",
    clipRule: "evenodd"
  })), _path2$8 || (_path2$8 = /*#__PURE__*/React.createElement("path", {
    fill: "#F9CF2F",
    fillRule: "evenodd",
    d: "M10.739 28.87a5.09 5.09 0 0 1-5.087-5.088.565.565 0 1 0-1.13 0A6.22 6.22 0 0 0 10.738 30a.565.565 0 1 0 0-1.13M7.382 5.977l-1.958-3.39a1.695 1.695 0 0 0-2.936 0L.531 5.977a3.96 3.96 0 0 0 3.425 5.937 3.96 3.96 0 0 0 3.426-5.937m-.978.566L4.445 3.152a.563.563 0 0 0-.978 0L1.51 6.543a2.827 2.827 0 1 0 4.895 0M15.724 5.837q-.006.009-.014.018a5.654 5.654 0 0 0 4.638 8.884 5.654 5.654 0 0 0 4.637-8.884l-3.26-4.54a1.698 1.698 0 0 0-2.755 0zm.919.66 3.246-4.522a.564.564 0 0 1 .918 0l3.253 4.53a4.524 4.524 0 0 1-3.712 7.103 4.524 4.524 0 0 1-3.71-7.106z",
    clipRule: "evenodd"
  })));
};

var _path$g, _path2$7;
function _extends$h() { return _extends$h = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$h.apply(null, arguments); }
var SvgTrash = function SvgTrash(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$h({
    xmlns: "http://www.w3.org/2000/svg",
    width: 22,
    height: 30,
    fill: "none"
  }, props), _path$g || (_path$g = /*#__PURE__*/React.createElement("path", {
    fill: "#5FD3AC",
    d: "M22 5.26a1.42 1.42 0 0 0-1.42-1.42h-4.907V1.787A1.774 1.774 0 0 0 13.9.012H8.101a1.774 1.774 0 0 0-1.774 1.774v2.055H1.42A1.42 1.42 0 0 0 0 5.26v2.2a1.42 1.42 0 0 0 1.42 1.418h.755v17.56a3.55 3.55 0 0 0 3.549 3.55h10.552a3.55 3.55 0 0 0 3.549-3.55V8.88h.755A1.42 1.42 0 0 0 22 7.46zM7.746 1.786a.355.355 0 0 1 .355-.354H13.9a.355.355 0 0 1 .355.354v2.055H7.746zM18.391 26.44a2.13 2.13 0 0 1-2.129 2.129H5.72a2.13 2.13 0 0 1-2.129-2.13V8.88h14.814zm2.19-18.98H1.42v-2.2h19.16z"
  })), _path2$7 || (_path2$7 = /*#__PURE__*/React.createElement("path", {
    fill: "#5FD3AC",
    d: "M11 25.644a.71.71 0 0 0 .71-.71V12.907a.71.71 0 0 0-1.42 0v12.029a.71.71 0 0 0 .71.71M14.903 25.644a.71.71 0 0 0 .71-.71V12.907a.71.71 0 0 0-1.42 0v12.029a.71.71 0 0 0 .71.71M7.097 25.644a.71.71 0 0 0 .71-.71V12.907a.71.71 0 0 0-1.42 0v12.029a.71.71 0 0 0 .71.71"
  })));
};

var _path$f;
function _extends$g() { return _extends$g = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$g.apply(null, arguments); }
var SvgOpenBook = function SvgOpenBook(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$g({
    xmlns: "http://www.w3.org/2000/svg",
    width: 30,
    height: 24,
    fill: "none"
  }, props), _path$f || (_path$f = /*#__PURE__*/React.createElement("path", {
    fill: "#2C2C69",
    d: "M18.08 6.853a.4.4 0 0 1-.028-.312.41.41 0 0 1 .205-.24 17.7 17.7 0 0 1 4.59-1.606.42.42 0 0 1 .317.059.406.406 0 0 1 .117.57.42.42 0 0 1-.269.173 16.8 16.8 0 0 0-4.37 1.53.42.42 0 0 1-.562-.174M6.986 5.497c1.522.308 2.992.823 4.37 1.53a.42.42 0 0 0 .562-.174.405.405 0 0 0-.177-.55A17.6 17.6 0 0 0 7.15 4.695a.42.42 0 0 0-.317.058.406.406 0 0 0 .152.743m0 4.312c1.522.307 2.992.821 4.37 1.529a.42.42 0 0 0 .562-.174.407.407 0 0 0-.177-.552A17.7 17.7 0 0 0 7.15 9.006a.417.417 0 0 0-.491.32.41.41 0 0 0 .326.482zm11.463 1.576a.4.4 0 0 0 .191-.046 16.8 16.8 0 0 1 4.372-1.53.41.41 0 0 0 .325-.481.417.417 0 0 0-.49-.321 17.7 17.7 0 0 0-4.59 1.606.408.408 0 0 0 .192.774zM6.984 14.122c1.524.306 2.994.82 4.371 1.53q.09.046.192.046a.408.408 0 0 0 .192-.774 17.7 17.7 0 0 0-4.59-1.606.409.409 0 1 0-.166.802zm15.864-.803a17.7 17.7 0 0 0-4.59 1.606.41.41 0 0 0-.215.462.414.414 0 0 0 .407.312.4.4 0 0 0 .192-.046 16.8 16.8 0 0 1 4.37-1.53.41.41 0 0 0 .327-.483.416.416 0 0 0-.491-.32m7.134 10.39-.01.028-.003.007v.002l-.025.05-.006.01a.3.3 0 0 1-.032.043l-.003.003v.001l-.037.036-.01.009-.001.001-.041.032h-.005a.3.3 0 0 1-.045.026l-.009.004a.3.3 0 0 1-.051.019H29.7q-.025.008-.05.011l-.014.003v-.001a.3.3 0 0 1-.05.004h-.005l-.042-.001h-.009a.1.1 0 0 1-.03-.005l-.023-.005-.017-.005-.028-.01-.009-.003-.006-.003c-3.193-1.26-8.047-1.975-14.42-2.117-6.372.142-11.225.857-14.422 2.12l-.005.003-.01.003q-.012.005-.027.009v.001l-.018.004-.02.006L.465 24H.456L.416 24H.41l-.05-.003-.015-.003a.3.3 0 0 1-.05-.011H.295a.3.3 0 0 1-.052-.019l-.01-.004q-.023-.011-.044-.025l-.004-.003-.043-.031-.011-.01H.13a.3.3 0 0 1-.035-.038L.09 23.85l-.03-.043-.006-.01a.3.3 0 0 1-.027-.05l-.002-.008q-.007-.015-.01-.029l-.005-.014-.006-.024.002-.002-.003-.021L0 23.63c-.002-.006 0-.02 0-.028V3.688a.4.4 0 0 1 .12-.29.42.42 0 0 1 .293-.121c.496 0 .999.022 1.5.057V2.23c0-.108.044-.212.123-.29a.42.42 0 0 1 .294-.119c.42 0 .841.018 1.263.046V.41A.417.417 0 0 1 4.01 0C7.86.01 11.65 1.393 15 4.006 18.348 1.392 22.139.01 25.985 0c.23 0 .417.183.417.41v1.46c.42-.03.844-.045 1.261-.047v-.001a.42.42 0 0 1 .295.12c.079.077.123.18.123.29v1.104a21 21 0 0 1 1.5-.058.42.42 0 0 1 .296.118c.08.078.123.181.123.29V23.63c0 .01 0 .011-.003.017v.002l-.003.02q0 .013-.006.024-.002.011-.006.016m-1.9-19.553v16.23a.4.4 0 0 1-.161.323.42.42 0 0 1-.359.073 19.07 19.07 0 0 0-10.471.318c5.122.228 9.176.865 12.075 1.9V4.1q-.542.013-1.084.055m-1.68-1.468v14.629a.41.41 0 0 1-.415.41 16.43 16.43 0 0 0-8.283 2.34 19.9 19.9 0 0 1 9.545-.202V2.646q-.423.011-.847.042M25.57.826c-3.553.105-7.051 1.449-10.154 3.902l-.001 15.869c3.123-2.317 6.608-3.584 10.153-3.681zm-21.14 0-.002 16.088c3.545.1 7.03 1.366 10.153 3.681l.002-15.868C11.478 2.275 7.98.93 4.428.826zM2.748 19.865c3.15-.71 6.43-.639 9.544.203a16.4 16.4 0 0 0-8.283-2.341.413.413 0 0 1-.415-.41V2.687c-.28-.02-.562-.037-.846-.042zM.83 4.1v18.897c2.9-1.034 6.953-1.67 12.076-1.9v.002a19.07 19.07 0 0 0-10.472-.318.42.42 0 0 1-.359-.073.4.4 0 0 1-.16-.324V4.155q-.542-.04-1.085-.054"
  })));
};

var _path$e, _path2$6, _path3$6;
function _extends$f() { return _extends$f = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$f.apply(null, arguments); }
var SvgInfo = function SvgInfo(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$f({
    xmlns: "http://www.w3.org/2000/svg",
    width: 30,
    height: 30,
    fill: "none"
  }, props), _path$e || (_path$e = /*#__PURE__*/React.createElement("path", {
    stroke: "#fff",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M15 26.25c6.213 0 11.25-5.037 11.25-11.25S21.213 3.75 15 3.75 3.75 8.787 3.75 15 8.787 26.25 15 26.25"
  })), _path2$6 || (_path2$6 = /*#__PURE__*/React.createElement("path", {
    stroke: "#fff",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M14.063 14.063H15v6.562h.938"
  })), _path3$6 || (_path3$6 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M15 11.25a1.406 1.406 0 1 0 0-2.812 1.406 1.406 0 0 0 0 2.812"
  })));
};

var _circle, _path$d;
function _extends$e() { return _extends$e = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$e.apply(null, arguments); }
var SvgCopy = function SvgCopy(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$e({
    xmlns: "http://www.w3.org/2000/svg",
    width: 36,
    height: 36,
    fill: "none"
  }, props), _circle || (_circle = /*#__PURE__*/React.createElement("circle", {
    cx: 18,
    cy: 18,
    r: 18,
    fill: "#2C2C69"
  })), _path$d || (_path$d = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M21 24v1.25a.75.75 0 0 1-.75.75h-8.5a.75.75 0 0 1-.75-.75v-11.5a.75.75 0 0 1 .75-.75H14v9.25c0 .965.785 1.75 1.75 1.75zm0-10.75V10h-5.25a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75V14h-3.25a.75.75 0 0 1-.75-.75m3.78-.97-2.06-2.06a.75.75 0 0 0-.53-.22H22v3h3v-.19a.75.75 0 0 0-.22-.53"
  })));
};

var _path$c;
function _extends$d() { return _extends$d = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$d.apply(null, arguments); }
var SvgRemove = function SvgRemove(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$d({
    xmlns: "http://www.w3.org/2000/svg",
    width: 36,
    height: 36,
    fill: "none"
  }, props), _path$c || (_path$c = /*#__PURE__*/React.createElement("path", {
    fill: "#2C2C69",
    d: "M18 0C8.046 0 0 8.046 0 18s8.046 18 18 18 18-8.046 18-18S27.954 0 18 0m0 32.4c-7.938 0-14.4-6.462-14.4-14.4S10.062 3.6 18 3.6 32.4 10.062 32.4 18 25.938 32.4 18 32.4M24.462 9 18 15.462 11.538 9 9 11.538 15.462 18 9 24.462 11.538 27 18 20.538 24.462 27 27 24.462 20.538 18 27 11.538z"
  })));
};

var _path$b, _path2$5, _path3$5;
function _extends$c() { return _extends$c = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$c.apply(null, arguments); }
var SvgFlagFr = function SvgFlagFr(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$c({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 640 480"
  }, props), _path$b || (_path$b = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M0 0h640v480H0z"
  })), _path2$5 || (_path2$5 = /*#__PURE__*/React.createElement("path", {
    fill: "#000091",
    d: "M0 0h213.3v480H0z"
  })), _path3$5 || (_path3$5 = /*#__PURE__*/React.createElement("path", {
    fill: "#e1000f",
    d: "M426.7 0H640v480H426.7z"
  })));
};

var _path$a, _path2$4, _path3$4, _path4$1, _path5$1;
function _extends$b() { return _extends$b = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$b.apply(null, arguments); }
var SvgFlagEn = function SvgFlagEn(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$b({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 640 480"
  }, props), _path$a || (_path$a = /*#__PURE__*/React.createElement("path", {
    fill: "#012169",
    d: "M0 0h640v480H0z"
  })), _path2$4 || (_path2$4 = /*#__PURE__*/React.createElement("path", {
    fill: "#FFF",
    d: "m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"
  })), _path3$4 || (_path3$4 = /*#__PURE__*/React.createElement("path", {
    fill: "#C8102E",
    d: "m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"
  })), _path4$1 || (_path4$1 = /*#__PURE__*/React.createElement("path", {
    fill: "#FFF",
    d: "M241 0v480h160V0zM0 160v160h640V160z"
  })), _path5$1 || (_path5$1 = /*#__PURE__*/React.createElement("path", {
    fill: "#C8102E",
    d: "M0 193v96h640v-96zM273 0v480h96V0z"
  })));
};

var _path$9, _path2$3, _path3$3, _path4, _path5, _path6, _path7, _path8, _path9, _path10, _path11, _path12, _path13, _path14, _path15, _path16, _path17, _path18, _path19, _path20, _path21, _path22, _path23, _path24, _path25, _path26, _path27, _path28, _path29, _path30, _path31, _path32, _path33, _path34, _path35, _path36, _path37, _path38, _path39, _path40, _path41, _path42, _path43, _path44, _path45, _path46, _path47, _path48, _path49, _path50, _path51, _path52, _path53, _path54, _path55, _path56, _path57, _path58, _path59, _path60, _path61, _path62, _path63, _path64, _path65, _path66, _path67, _path68, _path69, _path70, _path71, _path72, _path73, _path74, _path75, _path76, _path77, _path78, _path79, _path80, _path81, _path82, _path83, _path84, _path85, _path86, _path87, _path88, _path89, _path90, _path91, _path92, _path93, _path94, _path95, _path96, _path97, _path98, _path99, _path100, _path101, _path102, _path103, _path104, _path105, _path106, _path107, _path108, _path109, _path110, _path111, _path112, _path113, _path114, _path115, _path116, _path117, _path118, _path119, _path120, _path121, _path122, _path123, _path124, _path125, _path126, _path127, _path128, _path129, _path130, _path131, _path132, _path133, _path134, _path135, _path136, _path137, _path138, _path139, _path140, _path141, _path142, _path143, _path144, _path145, _path146, _path147, _path148, _path149, _path150, _path151, _path152, _path153, _path154, _path155, _path156, _path157, _path158, _path159, _path160, _path161, _path162, _path163, _path164, _path165, _path166, _path167, _path168, _path169, _path170, _path171, _path172, _path173, _path174, _path175, _path176, _path177, _path178, _path179, _path180, _path181, _path182, _path183, _path184, _path185, _path186, _path187, _path188, _path189, _path190, _path191, _path192, _path193, _path194, _path195, _path196, _path197, _path198, _path199, _path200, _path201, _path202, _path203, _path204, _path205, _path206, _path207, _path208, _path209, _path210, _path211, _path212, _path213, _path214, _path215, _path216, _path217, _path218, _path219, _path220, _path221, _path222, _path223, _path224, _path225, _path226, _path227, _path228, _path229, _path230, _path231, _path232, _path233, _path234, _path235, _path236, _path237, _path238, _path239, _path240, _path241, _path242, _path243, _path244, _path245, _path246, _path247, _path248, _path249, _path250, _path251, _path252, _path253, _path254, _path255, _path256, _path257, _path258, _path259, _path260, _path261, _path262, _path263, _path264, _path265, _path266, _path267, _path268, _path269, _path270, _path271, _path272, _path273, _path274, _path275, _path276, _path277, _path278, _path279, _path280, _path281, _path282, _path283, _path284, _path285, _path286, _path287, _path288, _path289, _path290, _path291, _path292, _path293, _path294, _path295, _path296, _path297, _path298, _path299, _path300, _path301, _path302, _path303, _path304, _path305, _path306, _path307, _path308, _path309, _path310, _path311, _path312, _path313, _path314, _path315, _path316, _path317, _path318, _path319, _path320, _path321, _path322, _path323, _path324, _path325, _path326, _path327, _path328, _path329, _path330, _path331, _path332, _path333, _path334, _path335, _path336, _path337, _path338, _path339, _path340, _path341, _path342, _path343, _path344, _path345, _path346, _path347, _path348, _path349, _path350, _path351, _path352, _path353, _path354, _path355, _path356, _path357, _path358, _path359, _path360, _path361, _path362, _path363, _path364, _path365, _path366, _path367, _path368, _path369, _path370, _path371, _path372, _path373, _path374, _path375, _path376, _path377, _path378, _path379, _path380, _path381, _path382, _path383, _path384, _path385, _path386, _path387, _path388, _path389, _path390, _path391, _path392, _path393, _path394, _path395, _path396, _path397, _path398, _path399, _path400, _path401, _path402, _path403, _path404, _path405, _path406, _path407, _path408, _path409, _path410, _path411, _path412, _path413, _path414, _path415, _path416, _path417, _path418, _path419, _path420, _path421, _path422, _path423, _path424, _path425, _path426, _path427, _path428, _path429, _path430, _path431, _path432, _path433, _path434, _path435, _path436, _path437, _path438, _path439, _path440, _path441, _path442, _path443, _path444, _path445, _path446, _path447, _path448, _path449, _path450, _path451, _path452, _path453, _path454, _path455, _path456, _path457, _path458, _path459, _path460, _path461, _path462, _path463, _path464, _path465, _path466, _path467, _path468, _path469, _path470, _path471, _path472, _path473, _path474, _path475, _path476, _path477, _path478, _path479, _path480, _path481, _path482, _path483, _path484, _path485, _path486, _path487, _path488, _path489, _path490, _path491, _path492, _path493, _path494, _path495, _path496, _path497, _path498, _path499, _path500, _path501, _path502, _path503, _path504, _path505, _path506, _path507, _path508, _path509, _path510, _path511, _path512, _path513, _path514, _path515, _path516, _path517, _path518, _path519, _path520, _path521, _path522, _path523, _path524, _path525, _path526, _path527, _path528, _path529, _path530, _path531, _path532, _path533, _path534, _path535, _path536, _path537, _path538, _path539, _path540, _path541, _path542;
function _extends$a() { return _extends$a = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$a.apply(null, arguments); }
var SvgFlagEs = function SvgFlagEs(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$a({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 640 480"
  }, props), _path$9 || (_path$9 = /*#__PURE__*/React.createElement("path", {
    fill: "#AA151B",
    d: "M0 0h640v480H0z"
  })), _path2$3 || (_path2$3 = /*#__PURE__*/React.createElement("path", {
    fill: "#F1BF00",
    d: "M0 120h640v240H0z"
  })), _path3$3 || (_path3$3 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "m127.3 213.3-.8-.1-1-1-.7-.4-.6-.8s-.7-1.1-.4-2 .9-1.2 1.4-1.5a12 12 0 0 1 1.5-.5l1-.4 1.3-.3.5-.3c.2 0 .7 0 1-.2l1-.2 1.6.1h4.8c.4 0 1.2.3 1.4.4a35 35 0 0 0 2 .7c.5.1 1.6.3 2.2.6.5.3.9.7 1.1 1l.5 1v1.1l-.5.8-.6 1-.8.6s-.5.5-1 .4c-.4 0-4.8-.8-7.6-.8s-7.3.9-7.3.9"
  })), _path4 || (_path4 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 0.3,
    d: "m127.3 213.3-.8-.1-1-1-.7-.4-.6-.8s-.7-1.1-.4-2 .9-1.2 1.4-1.5a12 12 0 0 1 1.5-.5l1-.4 1.3-.3.5-.3c.2 0 .7 0 1-.2l1-.2 1.6.1h4.8c.4 0 1.2.3 1.4.4a35 35 0 0 0 2 .7c.5.1 1.6.3 2.2.6.5.3.9.7 1.1 1l.5 1v1.1l-.5.8-.6 1-.8.6s-.5.5-1 .4c-.4 0-4.8-.8-7.6-.8s-7.3.9-7.3.9z"
  })), _path5 || (_path5 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M133.3 207c0-1.3.6-2.3 1.3-2.3.8 0 1.4 1 1.4 2.4 0 1.3-.6 2.4-1.4 2.4s-1.3-1.1-1.3-2.5"
  })), _path6 || (_path6 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M133.3 207c0-1.3.6-2.3 1.3-2.3.8 0 1.4 1 1.4 2.4 0 1.3-.6 2.4-1.4 2.4s-1.3-1.1-1.3-2.5z"
  })), _path7 || (_path7 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M134 207c0-1.2.3-2.1.7-2.1.3 0 .6 1 .6 2.1 0 1.3-.3 2.2-.6 2.2-.4 0-.6-1-.6-2.2"
  })), _path8 || (_path8 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M134 207c0-1.2.3-2.1.7-2.1.3 0 .6 1 .6 2.1 0 1.3-.3 2.2-.6 2.2-.4 0-.6-1-.6-2.2z"
  })), _path9 || (_path9 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M133.8 204.5c0-.4.4-.8.8-.8s1 .4 1 .8c0 .5-.5.9-1 .9s-.8-.4-.8-.9"
  })), _path10 || (_path10 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M135.3 204.2v.6h-1.4v-.6h.5V203h-.7v-.6h.7v-.5h.5v.5h.6v.6h-.6v1.2z"
  })), _path11 || (_path11 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M135.3 204.2v.6h-1.4v-.6h.5V203h-.7v-.6h.7v-.5h.5v.5h.6v.6h-.6v1.2h.4"
  })), _path12 || (_path12 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M135.9 204.2v.6h-2.5v-.6h1V203h-.7v-.6h.7v-.5h.5v.5h.6v.6h-.6v1.2z"
  })), _path13 || (_path13 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M135.9 204.2v.6h-2.5v-.6h1V203h-.7v-.6h.7v-.5h.5v.5h.6v.6h-.6v1.2h1"
  })), _path14 || (_path14 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M134.9 203.7c.4.1.6.4.6.8 0 .5-.4.9-.8.9s-1-.4-1-.9c0-.4.3-.7.7-.8"
  })), _path15 || (_path15 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M134.7 213.2H130v-1.1l-.3-1.2-.2-1.5c-1.3-1.7-2.5-2.8-2.9-2.5.1-.3.2-.6.5-.7 1.1-.7 3.5 1 5.2 3.6l.5.7h3.8l.4-.7c1.8-2.7 4.1-4.3 5.2-3.6.3.1.4.4.5.7-.4-.3-1.6.8-2.9 2.5l-.2 1.5-.2 1.2-.1 1.1z"
  })), _path16 || (_path16 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M134.7 213.2H130v-1.1l-.3-1.2-.2-1.5c-1.3-1.7-2.5-2.8-2.9-2.5.1-.3.2-.6.5-.7 1.1-.7 3.5 1 5.2 3.6l.5.7h3.8l.4-.7c1.8-2.7 4.1-4.3 5.2-3.6.3.1.4.4.5.7-.4-.3-1.6.8-2.9 2.5l-.2 1.5-.2 1.2-.1 1.1z"
  })), _path17 || (_path17 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M126.8 206.8c1-.5 3 1.1 4.6 3.6m11-3.6c-.8-.5-2.8 1.1-4.5 3.6"
  })), _path18 || (_path18 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m127.8 215.3-.5-1a27.3 27.3 0 0 1 14.7 0l-.5.8a6 6 0 0 0-.3.8 22.9 22.9 0 0 0-6.6-.8c-2.6 0-5.2.3-6.5.8z"
  })), _path19 || (_path19 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m127.8 215.3-.5-1a27.3 27.3 0 0 1 14.7 0l-.5.8a6 6 0 0 0-.3.8 22.9 22.9 0 0 0-6.6-.8c-2.6 0-5.2.3-6.5.8l-.3-.6"
  })), _path20 || (_path20 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M134.6 217.7c2.4 0 5-.4 5.9-.6.6-.2 1-.5 1-.8 0-.2-.2-.3-.4-.4-1.4-.5-4-.8-6.5-.8s-5 .3-6.4.8c-.2 0-.3.2-.4.3 0 .4.3.7 1 .9 1 .2 3.5.6 5.8.6"
  })), _path21 || (_path21 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M134.6 217.7c2.4 0 5-.4 5.9-.6.6-.2 1-.5 1-.8 0-.2-.2-.3-.4-.4-1.4-.5-4-.8-6.5-.8s-5 .3-6.4.8c-.2 0-.3.2-.4.3 0 .4.3.7 1 .9 1 .2 3.5.6 5.8.6z"
  })), _path22 || (_path22 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m142.1 213.2-.5-.5s-.6.3-1.3.2c-.6 0-.9-1-.9-1s-.7.7-1.3.7c-.7 0-1-.6-1-.6s-.7.5-1.3.4c-.6 0-1.2-.8-1.2-.8s-.6.8-1.2.8c-.6.1-1-.5-1-.5s-.4.6-1.1.7-1.4-.6-1.4-.6-.5.7-1 1c-.5 0-1.2-.4-1.2-.4l-.2.5-.3.1.2.5a27 27 0 0 1 7.2-.9c3 0 5.5.4 7.4 1z"
  })), _path23 || (_path23 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m142.1 213.2-.5-.5s-.6.3-1.3.2c-.6 0-.9-1-.9-1s-.7.7-1.3.7c-.7 0-1-.6-1-.6s-.7.5-1.3.4c-.6 0-1.2-.8-1.2-.8s-.6.8-1.2.8c-.6.1-1-.5-1-.5s-.4.6-1.1.7-1.4-.6-1.4-.6-.5.7-1 1c-.5 0-1.2-.4-1.2-.4l-.2.5-.3.1.2.5a27 27 0 0 1 7.2-.9c3 0 5.5.4 7.4 1z"
  })), _path24 || (_path24 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M134.7 210.7h.2a1 1 0 0 0 0 .4c0 .6.4 1 1 1a1 1 0 0 0 1-.7l.2-.3v.4c.1.5.6.8 1.1.8.6 0 1-.4 1-1v-.1l.4-.4.2.5a.9.9 0 0 0-.1.4 1 1 0 0 0 1 1c.4 0 .7-.2.9-.5l.2-.2v.3c0 .3.1.6.4.7 0 0 .4 0 1-.4l.7-.7v.4s-.5.8-1 1c-.2.2-.5.4-.8.3-.3 0-.6-.3-.7-.6-.2.2-.4.2-.7.2-.6 0-1.2-.3-1.4-.8-.3.3-.7.5-1.1.5a1.6 1.6 0 0 1-1.2-.6 1.6 1.6 0 0 1-1 .4 1.6 1.6 0 0 1-1.3-.6 1.6 1.6 0 0 1-2.4.2 1.6 1.6 0 0 1-1.2.6 1.5 1.5 0 0 1-1.1-.5c-.2.5-.8.8-1.4.8-.2 0-.5 0-.7-.2-.1.3-.4.6-.7.6s-.6 0-.9-.2l-1-1 .1-.5.8.7c.5.4.9.4.9.4.3 0 .4-.4.4-.7v-.3l.2.2c.2.3.5.5.9.5a1 1 0 0 0 1-1 .9.9 0 0 0 0-.4v-.5l.4.4a1 1 0 0 0 0 .1c0 .6.5 1 1 1 .6 0 1-.3 1.1-.9v-.3l.2.3c.2.4.6.7 1 .7.7 0 1.1-.4 1.1-1a1 1 0 0 0 0-.3h.3"
  })), _path25 || (_path25 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M134.7 210.7h.2a1 1 0 0 0 0 .4c0 .6.4 1 1 1a1 1 0 0 0 1-.7l.2-.3v.4c.1.5.6.8 1.1.8.6 0 1-.4 1-1v-.1l.4-.4.2.5a.9.9 0 0 0-.1.4 1 1 0 0 0 1 1c.4 0 .7-.2.9-.5l.2-.2v.3c0 .3.1.6.4.7 0 0 .4 0 1-.4l.7-.7v.4s-.5.8-1 1c-.2.2-.5.4-.8.3-.3 0-.6-.3-.7-.6-.2.2-.4.2-.7.2-.6 0-1.2-.3-1.4-.8-.3.3-.7.5-1.1.5a1.6 1.6 0 0 1-1.2-.6 1.6 1.6 0 0 1-1 .4 1.6 1.6 0 0 1-1.3-.6 1.6 1.6 0 0 1-2.4.2 1.6 1.6 0 0 1-1.2.6 1.5 1.5 0 0 1-1.1-.5c-.2.5-.8.8-1.4.8-.2 0-.5 0-.7-.2-.1.3-.4.6-.7.6s-.6 0-.9-.2l-1-1 .1-.5.8.7c.5.4.9.4.9.4.3 0 .4-.4.4-.7v-.3l.2.2c.2.3.5.5.9.5a1 1 0 0 0 1-1 .9.9 0 0 0 0-.4v-.5l.4.4a1 1 0 0 0 0 .1c0 .6.5 1 1 1 .6 0 1-.3 1.1-.9v-.3l.2.3c.2.4.6.7 1 .7.7 0 1.1-.4 1.1-1a1 1 0 0 0 0-.3h.3z"
  })), _path26 || (_path26 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M134.6 213.3c-2.9 0-5.5.4-7.3 1l-.3-.2.1-.3a27 27 0 0 1 7.5-1c3 0 5.7.4 7.6 1 0 0 .2.2.1.3l-.3.2a27.3 27.3 0 0 0-7.4-1"
  })), _path27 || (_path27 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 0.3,
    d: "M134.6 213.3c-2.9 0-5.5.4-7.3 1l-.3-.2.1-.3a27 27 0 0 1 7.5-1c3 0 5.7.4 7.6 1 0 0 .2.2.1.3l-.3.2a27.3 27.3 0 0 0-7.4-1z"
  })), _path28 || (_path28 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M131.8 214.4c0-.3.2-.4.5-.4a.4.4 0 0 1 .4.4c0 .2-.2.4-.4.4a.4.4 0 0 1-.5-.4"
  })), _path29 || (_path29 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M131.8 214.4c0-.3.2-.4.5-.4a.4.4 0 0 1 .4.4c0 .2-.2.4-.4.4a.4.4 0 0 1-.5-.4z"
  })), _path30 || (_path30 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M134.7 214.5h-1c-.1 0-.3 0-.3-.3l.3-.3h2a.3.3 0 0 1 .2.3.3.3 0 0 1-.3.3h-1"
  })), _path31 || (_path31 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M134.7 214.5h-1c-.1 0-.3 0-.3-.3l.3-.3h2a.3.3 0 0 1 .2.3.3.3 0 0 1-.3.3h-1"
  })), _path32 || (_path32 = /*#__PURE__*/React.createElement("path", {
    fill: "#058e6e",
    d: "M130 214.9h-.7c-.1 0-.3 0-.3-.2a.3.3 0 0 1 .2-.3l.7-.1.7-.1c.2 0 .3 0 .4.2a.3.3 0 0 1-.3.4z"
  })), _path33 || (_path33 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M130 214.9h-.7c-.1 0-.3 0-.3-.2a.3.3 0 0 1 .2-.3l.7-.1.7-.1c.2 0 .3 0 .4.2a.3.3 0 0 1-.3.4h-.7"
  })), _path34 || (_path34 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "m127.3 215.3.3-.4h.7l-.4.6z"
  })), _path35 || (_path35 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m127.3 215.3.3-.4h.7l-.4.6-.6-.2"
  })), _path36 || (_path36 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M136.6 214.4c0-.3.2-.4.4-.4a.4.4 0 0 1 .5.4.4.4 0 0 1-.5.4.4.4 0 0 1-.4-.4"
  })), _path37 || (_path37 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M136.6 214.4c0-.3.2-.4.4-.4a.4.4 0 0 1 .5.4.4.4 0 0 1-.5.4.4.4 0 0 1-.4-.4z"
  })), _path38 || (_path38 = /*#__PURE__*/React.createElement("path", {
    fill: "#058e6e",
    d: "M139.3 214.9h.6a.3.3 0 0 0 .4-.2.3.3 0 0 0-.3-.3l-.6-.1-.7-.1c-.2 0-.3 0-.4.2 0 .2.1.3.3.4z"
  })), _path39 || (_path39 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M139.3 214.9h.6a.3.3 0 0 0 .4-.2.3.3 0 0 0-.3-.3l-.6-.1-.7-.1c-.2 0-.3 0-.4.2 0 .2.1.3.3.4h.7"
  })), _path40 || (_path40 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "m142 215.4-.3-.5h-.7l.3.6z"
  })), _path41 || (_path41 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m142 215.4-.3-.5h-.7l.3.6.6-.1"
  })), _path42 || (_path42 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M134.6 217.1a25 25 0 0 1-6-.6 25.5 25.5 0 0 1 12.1 0c-1.6.4-3.7.6-6 .6"
  })), _path43 || (_path43 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 0.3,
    d: "M134.6 217.1a25 25 0 0 1-6-.6 25.5 25.5 0 0 1 12.1 0c-1.6.4-3.7.6-6 .6z"
  })), _path44 || (_path44 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m142 212-.1-.3c-.2 0-.3 0-.4.2 0 .2 0 .4.2.4 0 0 .2 0 .3-.3"
  })), _path45 || (_path45 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m142 212-.1-.3c-.2 0-.3 0-.4.2 0 .2 0 .4.2.4 0 0 .2 0 .3-.3z"
  })), _path46 || (_path46 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M137.3 211.2c0-.2 0-.4-.2-.4 0 0-.2.1-.2.3s0 .4.2.4l.3-.3"
  })), _path47 || (_path47 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M137.3 211.2c0-.2 0-.4-.2-.4 0 0-.2.1-.2.3s0 .4.2.4l.3-.3z"
  })), _path48 || (_path48 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m132 211.2.1-.4q.3 0 .3.3c0 .2 0 .4-.2.4z"
  })), _path49 || (_path49 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m132 211.2.1-.4q.3 0 .3.3c0 .2 0 .4-.2.4z"
  })), _path50 || (_path50 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m127.3 212 .1-.3c.2 0 .3 0 .4.2 0 .2 0 .4-.2.4 0 0-.2 0-.3-.3"
  })), _path51 || (_path51 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m127.3 212 .1-.3c.2 0 .3 0 .4.2 0 .2 0 .4-.2.4 0 0-.2 0-.3-.3z"
  })), _path52 || (_path52 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m134.6 208.5-.8.5.6 1.3.2.1.2-.1.7-1.3z"
  })), _path53 || (_path53 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m134.6 208.5-.8.5.6 1.3.2.1.2-.1.7-1.3-.9-.5"
  })), _path54 || (_path54 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m132.8 210.5.4.5 1.3-.4.1-.2-.1-.2-1.3-.3z"
  })), _path55 || (_path55 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m132.8 210.5.4.5 1.3-.4.1-.2-.1-.2-1.3-.3-.4.6"
  })), _path56 || (_path56 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m136.4 210.5-.3.5-1.3-.4-.2-.2.2-.2 1.3-.3z"
  })), _path57 || (_path57 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m136.4 210.5-.3.5-1.3-.4-.2-.2.2-.2 1.3-.3.3.6"
  })), _path58 || (_path58 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m129.3 209-.7.7.9 1 .2.1.1-.1.3-1.3z"
  })), _path59 || (_path59 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m129.3 209-.7.7.9 1 .2.1.1-.1.3-1.3-.8-.3"
  })), _path60 || (_path60 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m128 211.2.4.5 1.2-.6v-.2l-.1-.2-1.3-.1-.3.6"
  })), _path61 || (_path61 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m128 211.2.4.5 1.2-.6v-.2l-.1-.2-1.3-.1-.3.6"
  })), _path62 || (_path62 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m131.5 210.5-.3.6H130l-.2-.2.1-.3 1.2-.6z"
  })), _path63 || (_path63 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m131.5 210.5-.3.6H130l-.2-.2.1-.3 1.2-.6.5.5"
  })), _path64 || (_path64 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M126.6 211.4v.6l-1.4.2-.2-.1v-.2l1-.9z"
  })), _path65 || (_path65 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M126.6 211.4v.6l-1.4.2-.2-.1v-.2l1-.9.6.4"
  })), _path66 || (_path66 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M129.2 210.9c0-.3.2-.5.5-.5s.5.2.5.5a.5.5 0 0 1-.5.4.5.5 0 0 1-.5-.4"
  })), _path67 || (_path67 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M129.2 210.9c0-.3.2-.5.5-.5s.5.2.5.5a.5.5 0 0 1-.5.4.5.5 0 0 1-.5-.4z"
  })), _path68 || (_path68 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m140 209 .7.7-.9 1-.2.1-.1-.1-.3-1.3z"
  })), _path69 || (_path69 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m140 209 .7.7-.9 1-.2.1-.1-.1-.3-1.3.8-.3"
  })), _path70 || (_path70 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m141.4 211.2-.5.5-1.2-.6v-.2l.1-.2 1.3-.1z"
  })), _path71 || (_path71 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m141.4 211.2-.5.5-1.2-.6v-.2l.1-.2 1.3-.1.3.6"
  })), _path72 || (_path72 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m137.8 210.5.3.6h1.3l.2-.2-.1-.3-1.2-.6z"
  })), _path73 || (_path73 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m137.8 210.5.3.6h1.3l.2-.2-.1-.3-1.2-.6-.5.5"
  })), _path74 || (_path74 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m142.5 211.4.1.6 1.3.2.2-.1v-.2l-1-.9z"
  })), _path75 || (_path75 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m142.5 211.4.1.6 1.3.2.2-.1v-.2l-1-.9-.6.4"
  })), _path76 || (_path76 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M134.2 210.4a.5.5 0 0 1 .4-.4c.3 0 .5.2.5.4a.5.5 0 0 1-.5.5.5.5 0 0 1-.4-.5"
  })), _path77 || (_path77 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M134.2 210.4a.5.5 0 0 1 .4-.4c.3 0 .5.2.5.4a.5.5 0 0 1-.5.5.5.5 0 0 1-.4-.5z"
  })), _path78 || (_path78 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M139.1 210.9c0-.3.3-.5.5-.5a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.4.5.5 0 0 1-.5-.4"
  })), _path79 || (_path79 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M139.1 210.9c0-.3.3-.5.5-.5a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.4.5.5 0 0 1-.5-.4z"
  })), _path80 || (_path80 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m124.8 212.2-.6-.7c-.2-.2-.7-.3-.7-.3 0-.1.3-.3.6-.3a.5.5 0 0 1 .4.2v-.2s.3 0 .4.3v1"
  })), _path81 || (_path81 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m124.8 212.2-.6-.7c-.2-.2-.7-.3-.7-.3 0-.1.3-.3.6-.3a.5.5 0 0 1 .4.2v-.2s.3 0 .4.3v1z"
  })), _path82 || (_path82 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M124.8 212c.1-.2.4-.2.5 0 .2.1.3.3.2.5l-.5-.1c-.2-.1-.3-.4-.2-.5"
  })), _path83 || (_path83 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M124.8 212c.1-.2.4-.2.5 0 .2.1.3.3.2.5l-.5-.1c-.2-.1-.3-.4-.2-.5z"
  })), _path84 || (_path84 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m144.3 212.2.6-.7c.2-.2.7-.3.7-.3 0-.1-.3-.3-.6-.3a.6.6 0 0 0-.4.2v-.2s-.3 0-.4.3v.7z"
  })), _path85 || (_path85 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m144.3 212.2.6-.7c.2-.2.7-.3.7-.3 0-.1-.3-.3-.6-.3a.6.6 0 0 0-.4.2v-.2s-.3 0-.4.3v.7z"
  })), _path86 || (_path86 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M144.3 212c0-.2-.3-.2-.5 0-.2.1-.2.3-.1.5l.5-.1c.2-.1.2-.4.1-.5"
  })), _path87 || (_path87 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M144.3 212c0-.2-.3-.2-.5 0-.2.1-.2.3-.1.5l.5-.1c.2-.1.2-.4.1-.5z"
  })), _path88 || (_path88 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M124 223h21.4v-5.5H124z"
  })), _path89 || (_path89 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M124 223h21.4v-5.5H124z"
  })), _path90 || (_path90 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M126.2 226.8a1 1 0 0 1 .4 0h16.5a1.4 1.4 0 0 1-1-1.2c0-.6.5-1.1 1-1.3a1.7 1.7 0 0 1-.4 0h-16a1.4 1.4 0 0 1-.5 0c.6.2 1 .7 1 1.3a1.3 1.3 0 0 1-1 1.2"
  })), _path91 || (_path91 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 0.4,
    d: "M126.2 226.8a1 1 0 0 1 .4 0h16.5a1.4 1.4 0 0 1-1-1.2c0-.6.5-1.1 1-1.3a1.7 1.7 0 0 1-.4 0h-16a1.4 1.4 0 0 1-.5 0c.6.2 1 .7 1 1.3a1.3 1.3 0 0 1-1 1.2z"
  })), _path92 || (_path92 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M126.6 226.8h16c.6 0 1 .3 1 .7s-.4.8-1 .8h-16c-.5 0-1-.4-1-.8s.5-.8 1-.8"
  })), _path93 || (_path93 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M126.6 226.8h16c.6 0 1 .3 1 .7s-.4.8-1 .8h-16c-.5 0-1-.4-1-.8s.5-.8 1-.8z"
  })), _path94 || (_path94 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M126.6 223h16c.6 0 1 .4 1 .7 0 .4-.4.6-1 .6h-16c-.5 0-1-.2-1-.6 0-.3.5-.6 1-.6"
  })), _path95 || (_path95 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M126.6 223h16c.6 0 1 .4 1 .7 0 .4-.4.6-1 .6h-16c-.5 0-1-.2-1-.6 0-.3.5-.6 1-.6z"
  })), _path96 || (_path96 = /*#__PURE__*/React.createElement("path", {
    fill: "#005bbf",
    d: "M149.6 317.4c-1.4 0-2.8-.3-3.7-.8a8.4 8.4 0 0 0-3.8-.8c-1.4 0-2.7.3-3.7.8a8.3 8.3 0 0 1-3.8.8c-1.5 0-2.8-.3-3.7-.8a8.4 8.4 0 0 0-3.7-.8 8 8 0 0 0-3.7.8 8.3 8.3 0 0 1-3.8.8v2.4c1.5 0 2.8-.4 3.8-.9a8.2 8.2 0 0 1 3.7-.8c1.4 0 2.7.3 3.7.8s2.2.9 3.7.9a8.4 8.4 0 0 0 3.8-.9c1-.5 2.3-.8 3.7-.8 1.5 0 2.8.3 3.8.8s2.2.9 3.7.9z"
  })), _path97 || (_path97 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M149.6 317.4c-1.4 0-2.8-.3-3.7-.8a8.4 8.4 0 0 0-3.8-.8c-1.4 0-2.7.3-3.7.8a8.3 8.3 0 0 1-3.8.8c-1.5 0-2.8-.3-3.7-.8a8.4 8.4 0 0 0-3.7-.8 8 8 0 0 0-3.7.8 8.3 8.3 0 0 1-3.8.8v2.4c1.5 0 2.8-.4 3.8-.9a8.2 8.2 0 0 1 3.7-.8c1.4 0 2.7.3 3.7.8s2.2.9 3.7.9a8.4 8.4 0 0 0 3.8-.9c1-.5 2.3-.8 3.7-.8 1.5 0 2.8.3 3.8.8s2.2.9 3.7.9z"
  })), _path98 || (_path98 = /*#__PURE__*/React.createElement("path", {
    fill: "#ccc",
    d: "M149.6 319.8a8 8 0 0 1-3.7-.9 8.3 8.3 0 0 0-3.8-.8c-1.4 0-2.7.3-3.7.8s-2.3.9-3.8.9-2.8-.4-3.7-.9a8.4 8.4 0 0 0-3.7-.8 8.2 8.2 0 0 0-3.7.8c-1 .5-2.3.9-3.8.9v2.3c1.5 0 2.8-.4 3.8-.9a8.1 8.1 0 0 1 3.7-.7c1.4 0 2.7.2 3.7.7a8.3 8.3 0 0 0 7.5 0 8.5 8.5 0 0 1 7.5.1 8.1 8.1 0 0 0 3.7.8z"
  })), _path99 || (_path99 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M149.6 319.8a8 8 0 0 1-3.7-.9 8.3 8.3 0 0 0-3.8-.8c-1.4 0-2.7.3-3.7.8s-2.3.9-3.8.9-2.8-.4-3.7-.9a8.4 8.4 0 0 0-3.7-.8 8.2 8.2 0 0 0-3.7.8c-1 .5-2.3.9-3.8.9v2.3c1.5 0 2.8-.4 3.8-.9a8.1 8.1 0 0 1 3.7-.7c1.4 0 2.7.2 3.7.7a8.3 8.3 0 0 0 7.5 0 8.5 8.5 0 0 1 7.5.1 8.1 8.1 0 0 0 3.7.8v-2.3"
  })), _path100 || (_path100 = /*#__PURE__*/React.createElement("path", {
    fill: "#005bbf",
    d: "M149.6 322a7 7 0 0 1-3.7-.8 8.3 8.3 0 0 0-3.8-.7c-1.4 0-2.7.2-3.7.7-1 .6-2.3.9-3.8.9s-2.8-.4-3.7-.9a8.4 8.4 0 0 0-3.7-.8 8 8 0 0 0-3.7.8c-1 .5-2.3.9-3.8.9v2.3c1.5 0 2.8-.3 3.8-.9a10.2 10.2 0 0 1 7.4 0 7 7 0 0 0 3.7.9 8.4 8.4 0 0 0 3.8-.8c1-.5 2.3-.8 3.7-.8 1.5 0 2.8.3 3.8.8s2.2.8 3.7.8z"
  })), _path101 || (_path101 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M149.6 322a7 7 0 0 1-3.7-.8 8.3 8.3 0 0 0-3.8-.7c-1.4 0-2.7.2-3.7.7-1 .6-2.3.9-3.8.9s-2.8-.4-3.7-.9a8.4 8.4 0 0 0-3.7-.8 8 8 0 0 0-3.7.8c-1 .5-2.3.9-3.8.9v2.3c1.5 0 2.8-.3 3.8-.9a10.2 10.2 0 0 1 7.4 0 7 7 0 0 0 3.7.9 8.4 8.4 0 0 0 3.8-.8c1-.5 2.3-.8 3.7-.8 1.5 0 2.8.3 3.8.8s2.2.8 3.7.8V322"
  })), _path102 || (_path102 = /*#__PURE__*/React.createElement("path", {
    fill: "#ccc",
    d: "M149.6 326.7a8 8 0 0 1-3.7-.8c-1-.5-2.3-.8-3.7-.8a8.4 8.4 0 0 0-3.8.8c-1 .5-2.3.8-3.8.8a7 7 0 0 1-3.7-.9 8.4 8.4 0 0 0-3.7-.7c-1.4 0-2.7.3-3.7.8s-2.3.8-3.8.8v-2.3a8.3 8.3 0 0 0 3.8-.9 10.2 10.2 0 0 1 7.4 0 8 8 0 0 0 3.7.9 8.4 8.4 0 0 0 3.8-.8c1-.5 2.3-.8 3.8-.8 1.4 0 2.7.3 3.7.8s2.3.8 3.7.8z"
  })), _path103 || (_path103 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M149.6 326.7a8 8 0 0 1-3.7-.8c-1-.5-2.3-.8-3.7-.8a8.4 8.4 0 0 0-3.8.8c-1 .5-2.3.8-3.8.8a7 7 0 0 1-3.7-.9 8.4 8.4 0 0 0-3.7-.7c-1.4 0-2.7.3-3.7.8s-2.3.8-3.8.8v-2.3a8.3 8.3 0 0 0 3.8-.9 10.2 10.2 0 0 1 7.4 0 8 8 0 0 0 3.7.9 8.4 8.4 0 0 0 3.8-.8c1-.5 2.3-.8 3.8-.8 1.4 0 2.7.3 3.7.8s2.3.8 3.7.8v2.3"
  })), _path104 || (_path104 = /*#__PURE__*/React.createElement("path", {
    fill: "#005bbf",
    d: "M149.6 329a8.1 8.1 0 0 1-3.7-.8c-1-.5-2.3-.8-3.7-.8a8.4 8.4 0 0 0-3.8.8c-1 .5-2.3.8-3.8.8a7 7 0 0 1-3.7-.9 8.4 8.4 0 0 0-3.7-.7c-1.4 0-2.7.3-3.7.8s-2.3.8-3.8.8v-2.3a8.3 8.3 0 0 0 3.8-.8c1-.5 2.3-.8 3.7-.8s2.7.3 3.7.7a8.4 8.4 0 0 0 7.5 0c1-.4 2.3-.7 3.8-.7 1.4 0 2.7.3 3.7.8s2.2.8 3.7.8z"
  })), _path105 || (_path105 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M149.6 329a8.1 8.1 0 0 1-3.7-.8c-1-.5-2.3-.8-3.7-.8a8.4 8.4 0 0 0-3.8.8c-1 .5-2.3.8-3.8.8a7 7 0 0 1-3.7-.9 8.4 8.4 0 0 0-3.7-.7c-1.4 0-2.7.3-3.7.8s-2.3.8-3.8.8v-2.3a8.3 8.3 0 0 0 3.8-.8c1-.5 2.3-.8 3.7-.8s2.7.3 3.7.7a8.4 8.4 0 0 0 7.5 0c1-.4 2.3-.7 3.8-.7 1.4 0 2.7.3 3.7.8s2.2.8 3.7.8z"
  })), _path106 || (_path106 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m126.2 308 .2.5c0 1.5-1.3 2.6-2.7 2.6h22a2.7 2.7 0 0 1-2.7-2.6v-.5a1.3 1.3 0 0 1-.3 0h-16a1.4 1.4 0 0 1-.5 0"
  })), _path107 || (_path107 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 0.4,
    d: "m126.2 308 .2.5c0 1.5-1.3 2.6-2.7 2.6h22a2.7 2.7 0 0 1-2.7-2.6v-.5a1.3 1.3 0 0 1-.3 0h-16a1.4 1.4 0 0 1-.5 0z"
  })), _path108 || (_path108 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M126.6 306.5h16c.6 0 1 .3 1 .8 0 .4-.4.7-1 .7h-16c-.5 0-1-.3-1-.8 0-.4.5-.7 1-.7"
  })), _path109 || (_path109 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M126.6 306.5h16c.6 0 1 .3 1 .8 0 .4-.4.7-1 .7h-16c-.5 0-1-.3-1-.8 0-.4.5-.7 1-.7z"
  })), _path110 || (_path110 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M123.7 316.7h22V311h-22z"
  })), _path111 || (_path111 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M123.7 316.7h22V311h-22z"
  })), _path112 || (_path112 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M122 286.7c-2.2 1.2-3.7 2.5-3.4 3.2 0 .6.8 1 1.8 1.6 1.5 1.1 2.5 3 1.7 4a5.5 5.5 0 0 0-.1-8.8"
  })), _path113 || (_path113 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M122 286.7c-2.2 1.2-3.7 2.5-3.4 3.2 0 .6.8 1 1.8 1.6 1.5 1.1 2.5 3 1.7 4a5.5 5.5 0 0 0-.1-8.8z"
  })), _path114 || (_path114 = /*#__PURE__*/React.createElement("path", {
    fill: "#ccc",
    d: "M126.8 305.6h15.6V229h-15.6v76.5z"
  })), _path115 || (_path115 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M138 229.2v76.3m1.7-76.3v76.3m-12.9 0h15.6v-76.4h-15.6v76.5z"
  })), _path116 || (_path116 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M158.4 257.7a49.6 49.6 0 0 0-23.3-2c-9.4 1.6-16.5 5.3-15.9 8.4v.2l-3.5-8.2c-.6-3.3 7.2-7.5 17.6-9.2a43 43 0 0 1 9.2-.7c6.6 0 12.4.8 15.8 2.1v9.4"
  })), _path117 || (_path117 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 0.4,
    d: "M158.4 257.7a49.6 49.6 0 0 0-23.3-2c-9.4 1.6-16.5 5.3-15.9 8.4v.2l-3.5-8.2c-.6-3.3 7.2-7.5 17.6-9.2a43 43 0 0 1 9.2-.7c6.6 0 12.4.8 15.8 2.1v9.4"
  })), _path118 || (_path118 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M126.8 267.3c-4.3-.3-7.3-1.4-7.6-3.2-.3-1.5 1.2-3 3.8-4.5 1.2.1 2.5.3 3.8.3z"
  })), _path119 || (_path119 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M126.8 267.3c-4.3-.3-7.3-1.4-7.6-3.2-.3-1.5 1.2-3 3.8-4.5 1.2.1 2.5.3 3.8.3v7.4"
  })), _path120 || (_path120 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M142.5 261.5c2.7.4 4.7 1 5.7 1.9l.1.2c.5 1-1.9 3-5.9 5.4v-7.5"
  })), _path121 || (_path121 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M142.5 261.5c2.7.4 4.7 1 5.7 1.9l.1.2c.5 1-1.9 3-5.9 5.4v-7.5"
  })), _path122 || (_path122 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M117.1 282c-.4-1.2 3.8-3.6 9.8-5.8l7.8-3.2c8.3-3.7 14.4-7.9 13.6-9.4v-.2c.4.4 1 8 1 8 .8 1.3-4.8 5.5-12.4 9.1-2.5 1.2-7.6 3-10 4-4.4 1.4-8.7 4.3-8.3 5.3l-1.5-7.7"
  })), _path123 || (_path123 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 0.4,
    d: "M117.1 282c-.4-1.2 3.8-3.6 9.8-5.8l7.8-3.2c8.3-3.7 14.4-7.9 13.6-9.4v-.2c.4.4 1 8 1 8 .8 1.3-4.8 5.5-12.4 9.1-2.5 1.2-7.6 3-10 4-4.4 1.4-8.7 4.3-8.3 5.3l-1.5-7.7z"
  })), _path124 || (_path124 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M125.8 254c1.9-.6 3.1-1.5 2.5-3-.4-1-1.4-1-2.8-.6l-2.6 1 2.3 5.8.8-.3.8-.3zm-1.2-2.7.7-.3c.5-.2 1.2.1 1.4.8.2.5.2 1-.5 1.5a4.4 4.4 0 0 1-.6.3zm7.3-2.5-.9.3h-.8l1.3 6.1 4.3-.8-.2-.4v-.4l-2.5.6zm8.4 5.2c.8-2.2 1.7-4.3 2.7-6.4a5.3 5.3 0 0 1-1 0 55 55 0 0 1-1.8 4.6l-2.4-4.3-1 .1h-1a131 131 0 0 1 3.5 6zm8.8-4.7.4-.9a3.4 3.4 0 0 0-1.7-.6c-1.7-.1-2.7.6-2.8 1.7-.2 2.1 3.2 2 3 3.4 0 .6-.7.9-1.4.8-.8 0-1.4-.5-1.4-1.2h-.3a7.3 7.3 0 0 1-.4 1.1 4 4 0 0 0 1.8.6c1.7.2 3-.5 3.2-1.7.2-2-3.3-2.1-3.1-3.4 0-.5.4-.8 1.3-.7.7 0 1 .4 1.2.9z"
  })), _path125 || (_path125 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M277.9 211.6s-.7.8-1.3.9c-.5 0-1.1-.5-1.1-.5s-.5.5-1 .6c-.6.1-1.4-.6-1.4-.6l-1 1c-.6 0-1.1-.3-1.1-.3s-.3.4-.7.6h-.4l-.6-.4-.7-.7-.5-.3-.4-1v-.5c-.1-.6.8-1.4 2.2-1.7a3.9 3.9 0 0 1 2 0c.5-.5 1.7-.8 3-.8s2.4.3 3 .7a5.5 5.5 0 0 1 2.9-.7c1.3 0 2.5.3 3 .8.5-.2 1.2-.2 2 0 1.4.3 2.3 1 2.2 1.7v.5l-.4 1-.6.3-.6.7-.6.3s-.3.2-.4 0c-.4-.1-.7-.5-.7-.5s-.6.4-1 .2c-.5-.2-1-1-1-1s-.9.8-1.4.7c-.6-.1-1-.6-1-.6s-.7.6-1.2.5-1.2-.9-1.2-.9"
  })), _path126 || (_path126 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M277.9 211.6s-.7.8-1.3.9c-.5 0-1.1-.5-1.1-.5s-.5.5-1 .6c-.6.1-1.4-.6-1.4-.6l-1 1c-.6 0-1.1-.3-1.1-.3s-.3.4-.7.6h-.4l-.6-.4-.7-.7-.5-.3-.4-1v-.5c-.1-.6.8-1.4 2.2-1.7a3.9 3.9 0 0 1 2 0c.5-.5 1.7-.8 3-.8s2.4.3 3 .7a5.5 5.5 0 0 1 2.9-.7c1.3 0 2.5.3 3 .8.5-.2 1.2-.2 2 0 1.4.3 2.3 1 2.2 1.7v.5l-.4 1-.6.3-.6.7-.6.3s-.3.2-.4 0c-.4-.1-.7-.5-.7-.5s-.6.4-1 .2c-.5-.2-1-1-1-1s-.9.8-1.4.7c-.6-.1-1-.6-1-.6s-.7.6-1.2.5-1.2-.9-1.2-.9z"
  })), _path127 || (_path127 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M276.5 207.6c0-1 .6-2 1.3-2 .8 0 1.3 1 1.3 2s-.5 1.8-1.3 1.8c-.7 0-1.3-.8-1.3-1.9"
  })), _path128 || (_path128 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M276.5 207.6c0-1 .6-2 1.3-2 .8 0 1.3 1 1.3 2s-.5 1.8-1.3 1.8c-.7 0-1.3-.8-1.3-1.9z"
  })), _path129 || (_path129 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M277.3 207.6c0-1 .2-1.8.5-1.8.4 0 .7.8.7 1.8s-.3 1.7-.6 1.7c-.4 0-.6-.8-.6-1.8"
  })), _path130 || (_path130 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M277.3 207.6c0-1 .2-1.8.5-1.8.4 0 .7.8.7 1.8s-.3 1.7-.6 1.7c-.4 0-.6-.8-.6-1.8z"
  })), _path131 || (_path131 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M271 215.3a4.5 4.5 0 0 0-.5-1 27.4 27.4 0 0 1 14.8 0l-.6.8a5 5 0 0 0-.3.8 22.9 22.9 0 0 0-6.6-.8c-2.6 0-5.2.3-6.6.8z"
  })), _path132 || (_path132 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M271 215.3a4.5 4.5 0 0 0-.5-1 27.4 27.4 0 0 1 14.8 0l-.6.8a5 5 0 0 0-.3.8 22.9 22.9 0 0 0-6.6-.8c-2.6 0-5.2.3-6.6.8l-.2-.6"
  })), _path133 || (_path133 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M277.8 217.7c2.4 0 5-.4 5.9-.6.6-.2 1-.5 1-.8 0-.2-.2-.3-.4-.4a24 24 0 0 0-6.5-.8c-2.5 0-5 .3-6.4.8-.2 0-.3.2-.4.3 0 .4.3.7 1 .9 1 .2 3.5.6 5.8.6"
  })), _path134 || (_path134 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M277.8 217.7c2.4 0 5-.4 5.9-.6.6-.2 1-.5 1-.8 0-.2-.2-.3-.4-.4a24 24 0 0 0-6.5-.8c-2.5 0-5 .3-6.4.8-.2 0-.3.2-.4.3 0 .4.3.7 1 .9 1 .2 3.5.6 5.8.6z"
  })), _path135 || (_path135 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M283.5 208.4c0-.2.2-.4.4-.4s.5.2.5.4-.2.4-.5.4a.4.4 0 0 1-.4-.4"
  })), _path136 || (_path136 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.2,
    d: "M283.5 208.4c0-.2.2-.4.4-.4s.5.2.5.4-.2.4-.5.4a.4.4 0 0 1-.4-.4zm-.2-1.4a.4.4 0 0 1 .4-.4c.2 0 .4.1.4.4s-.2.4-.4.4a.4.4 0 0 1-.4-.4zm-1.1-1c0-.2.2-.3.4-.3s.4.1.4.4c0 .2-.2.4-.4.4a.4.4 0 0 1-.4-.5zm-1.4-.4c0-.2.2-.4.4-.4.3 0 .5.2.5.4s-.2.4-.4.4-.5-.2-.5-.4zm-1.4 0c0-.2.2-.3.5-.3s.4.1.4.4c0 .2-.2.4-.4.4a.4.4 0 0 1-.5-.4z"
  })), _path137 || (_path137 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinecap: "round",
    strokeWidth: 0.3,
    d: "m287.8 211.2.2-1a2.7 2.7 0 0 0-2.7-2.8c-.5 0-1 .1-1.3.3"
  })), _path138 || (_path138 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m283 209.2.2-.8c0-1.1-1.1-2-2.5-2-.6 0-1.2.2-1.6.4"
  })), _path139 || (_path139 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.2,
    d: "M288.2 210c0-.3.2-.5.4-.5s.4.2.4.4c0 .3-.2.4-.4.4s-.4-.1-.4-.4zm-.2-1.6c0-.2.2-.4.4-.4a.4.4 0 0 1 .5.4c0 .2-.2.4-.4.4-.3 0-.5-.2-.5-.4zm-1-1.1a.4.4 0 0 1 .5-.4c.2 0 .4.1.4.4a.4.4 0 0 1-.4.4.4.4 0 0 1-.5-.4zm-1.3-.7c0-.2.2-.4.5-.4s.4.2.4.4c0 .3-.2.5-.4.5a.4.4 0 0 1-.5-.5zm-1.4.1c0-.2.2-.4.5-.4s.4.2.4.4-.2.4-.4.4-.5-.2-.5-.4z"
  })), _path140 || (_path140 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m285.3 213.2-.5-.5s-.6.3-1.3.2c-.6 0-.9-1-.9-1s-.7.7-1.3.7c-.7 0-1-.6-1-.6s-.7.5-1.3.4c-.6 0-1.2-.8-1.2-.8s-.6.8-1.2.8c-.6.1-1-.5-1-.5s-.3.6-1.1.7-1.4-.6-1.4-.6-.4.7-1 1c-.5 0-1.2-.4-1.2-.4l-.1.5-.3.1.1.5a27 27 0 0 1 7.3-.9c2.8 0 5.4.4 7.3 1l.2-.6"
  })), _path141 || (_path141 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m285.3 213.2-.5-.5s-.6.3-1.3.2c-.6 0-.9-1-.9-1s-.7.7-1.3.7c-.7 0-1-.6-1-.6s-.7.5-1.3.4c-.6 0-1.2-.8-1.2-.8s-.6.8-1.2.8c-.6.1-1-.5-1-.5s-.3.6-1.1.7-1.4-.6-1.4-.6-.4.7-1 1c-.5 0-1.2-.4-1.2-.4l-.1.5-.3.1.1.5a27 27 0 0 1 7.3-.9c2.8 0 5.4.4 7.3 1l.2-.6z"
  })), _path142 || (_path142 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M271.3 208.4c0-.2.2-.4.4-.4s.4.2.4.4a.4.4 0 0 1-.4.4.4.4 0 0 1-.4-.4"
  })), _path143 || (_path143 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.2,
    d: "M271.3 208.4c0-.2.2-.4.4-.4s.4.2.4.4a.4.4 0 0 1-.4.4.4.4 0 0 1-.4-.4zm.2-1.4c0-.3.2-.4.4-.4s.5.1.5.4-.2.4-.5.4a.4.4 0 0 1-.4-.4zm1-1c0-.2.3-.3.5-.3s.5.1.5.4c0 .2-.2.4-.5.4a.4.4 0 0 1-.4-.5zm1.4-.4c0-.2.2-.4.5-.4s.4.2.4.4-.2.4-.4.4-.5-.2-.5-.4zm1.4 0c0-.2.2-.3.5-.3.2 0 .4.1.4.4 0 .2-.2.4-.4.4a.4.4 0 0 1-.5-.4z"
  })), _path144 || (_path144 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinecap: "round",
    strokeWidth: 0.3,
    d: "M267.8 211.2a2.8 2.8 0 0 1-.2-1 2.7 2.7 0 0 1 2.7-2.8c.5 0 1 .1 1.4.3"
  })), _path145 || (_path145 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M272.7 209.2a1.7 1.7 0 0 1-.3-.8c0-1 1.2-2 2.6-2a3 3 0 0 1 1.5.4"
  })), _path146 || (_path146 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.2,
    d: "M266.6 210c0-.3.2-.5.4-.5.3 0 .4.2.4.4a.4.4 0 0 1-.4.4c-.2 0-.4-.1-.4-.4zm.1-1.6c0-.2.3-.4.5-.4s.4.2.4.4-.2.4-.4.4-.4-.2-.4-.4zm1-1.1c0-.3.2-.4.5-.4a.4.4 0 0 1 .4.4.4.4 0 0 1-.4.4.4.4 0 0 1-.5-.4zm1.3-.7c0-.2.2-.4.5-.4.2 0 .4.2.4.4 0 .3-.2.5-.4.5a.4.4 0 0 1-.5-.5zm1.4.1c0-.2.2-.4.5-.4a.4.4 0 0 1 .4.4.4.4 0 0 1-.4.4c-.3 0-.5-.2-.5-.4z"
  })), _path147 || (_path147 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M277.9 210.7h.2a1 1 0 0 0 0 .4c0 .6.5 1 1 1a1 1 0 0 0 1-.7l.2-.3v.4c.1.5.6.8 1.1.8.6 0 1-.4 1-1a1 1 0 0 0 0-.1l.4-.4.2.5a1 1 0 0 0-.1.4 1 1 0 0 0 1 1c.4 0 .7-.2.9-.5l.2-.2v.3c0 .3.1.6.4.7 0 0 .4 0 1-.4s.7-.7.7-.7v.4s-.5.8-1 1c-.2.2-.5.4-.8.3-.3 0-.6-.3-.7-.6a1.5 1.5 0 0 1-.7.2c-.6 0-1.2-.3-1.4-.8a1.5 1.5 0 0 1-1.1.5c-.5 0-1-.2-1.2-.6a1.5 1.5 0 0 1-1 .4c-.6 0-1-.2-1.4-.6-.2.4-.7.6-1.2.6-.4 0-.8-.1-1-.4a1.6 1.6 0 0 1-1.3.6c-.4 0-.8-.2-1.1-.5-.2.5-.8.8-1.4.8-.2 0-.5 0-.7-.2-.1.3-.4.6-.7.6s-.6 0-.9-.2a4.2 4.2 0 0 1-1-1l.1-.5.8.7c.5.4.9.4.9.4.3 0 .4-.4.4-.7v-.3l.2.2c.2.3.5.5.9.5a1 1 0 0 0 1-1 1 1 0 0 0 0-.4v-.5l.4.4v.1c0 .6.5 1 1 1 .6 0 1-.3 1.1-.9v-.3l.2.3c.2.4.6.7 1 .7.6 0 1.1-.4 1.1-1a1 1 0 0 0 0-.3h.2"
  })), _path148 || (_path148 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M277.9 210.7h.2a1 1 0 0 0 0 .4c0 .6.5 1 1 1a1 1 0 0 0 1-.7l.2-.3v.4c.1.5.6.8 1.1.8.6 0 1-.4 1-1a1 1 0 0 0 0-.1l.4-.4.2.5a1 1 0 0 0-.1.4 1 1 0 0 0 1 1c.4 0 .7-.2.9-.5l.2-.2v.3c0 .3.1.6.4.7 0 0 .4 0 1-.4s.7-.7.7-.7v.4s-.5.8-1 1c-.2.2-.5.4-.8.3-.3 0-.6-.3-.7-.6a1.5 1.5 0 0 1-.7.2c-.6 0-1.2-.3-1.4-.8a1.5 1.5 0 0 1-1.1.5c-.5 0-1-.2-1.2-.6a1.5 1.5 0 0 1-1 .4c-.6 0-1-.2-1.4-.6-.2.4-.7.6-1.2.6-.4 0-.8-.1-1-.4a1.6 1.6 0 0 1-1.3.6c-.4 0-.8-.2-1.1-.5-.2.5-.8.8-1.4.8-.2 0-.5 0-.7-.2-.1.3-.4.6-.7.6s-.6 0-.9-.2a4.2 4.2 0 0 1-1-1l.1-.5.8.7c.5.4.9.4.9.4.3 0 .4-.4.4-.7v-.3l.2.2c.2.3.5.5.9.5a1 1 0 0 0 1-1 1 1 0 0 0 0-.4v-.5l.4.4v.1c0 .6.5 1 1 1 .6 0 1-.3 1.1-.9v-.3l.2.3c.2.4.6.7 1 .7.6 0 1.1-.4 1.1-1a1 1 0 0 0 0-.3h.2z"
  })), _path149 || (_path149 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M277.8 213.3c-2.9 0-5.5.4-7.3 1l-.3-.2.1-.3c2-.6 4.6-1 7.5-1 3 0 5.7.4 7.6 1 0 0 .2.2.1.3l-.3.2a27 27 0 0 0-7.4-1"
  })), _path150 || (_path150 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M277.8 213.3c-2.9 0-5.5.4-7.3 1l-.3-.2.1-.3c2-.6 4.6-1 7.5-1 3 0 5.7.4 7.6 1 0 0 .2.2.1.3l-.3.2a27 27 0 0 0-7.4-1z"
  })), _path151 || (_path151 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M275 214.4c0-.3.2-.4.5-.4a.4.4 0 0 1 .4.4.4.4 0 0 1-.4.4c-.3 0-.5-.2-.5-.4"
  })), _path152 || (_path152 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M275 214.4c0-.3.2-.4.5-.4a.4.4 0 0 1 .4.4.4.4 0 0 1-.4.4c-.3 0-.5-.2-.5-.4z"
  })), _path153 || (_path153 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M277.9 214.5h-1c-.1 0-.3 0-.3-.3l.3-.3h2a.3.3 0 0 1 .2.3.3.3 0 0 1-.3.3h-1"
  })), _path154 || (_path154 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M277.9 214.5h-1c-.1 0-.3 0-.3-.3l.3-.3h2a.3.3 0 0 1 .2.3.3.3 0 0 1-.3.3h-1"
  })), _path155 || (_path155 = /*#__PURE__*/React.createElement("path", {
    fill: "#058e6e",
    d: "M273.2 214.9h-.6a.3.3 0 0 1-.4-.2.3.3 0 0 1 .3-.3l.6-.1.7-.1c.2 0 .3 0 .4.2a.3.3 0 0 1-.3.4z"
  })), _path156 || (_path156 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M273.2 214.9h-.6a.3.3 0 0 1-.4-.2.3.3 0 0 1 .3-.3l.6-.1.7-.1c.2 0 .3 0 .4.2a.3.3 0 0 1-.3.4h-.7"
  })), _path157 || (_path157 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "m270.5 215.3.3-.4h.7l-.4.6z"
  })), _path158 || (_path158 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m270.5 215.3.3-.4h.7l-.4.6-.6-.2"
  })), _path159 || (_path159 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M279.8 214.4c0-.3.2-.4.4-.4.3 0 .5.1.5.4 0 .2-.2.4-.5.4a.4.4 0 0 1-.4-.4"
  })), _path160 || (_path160 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M279.8 214.4c0-.3.2-.4.4-.4.3 0 .5.1.5.4 0 .2-.2.4-.5.4a.4.4 0 0 1-.4-.4z"
  })), _path161 || (_path161 = /*#__PURE__*/React.createElement("path", {
    fill: "#058e6e",
    d: "M282.5 214.9h.7a.3.3 0 0 0 .3-.2.3.3 0 0 0-.2-.3l-.7-.1-.7-.1c-.2 0-.3 0-.4.2 0 .2.1.3.3.4z"
  })), _path162 || (_path162 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M282.5 214.9h.7a.3.3 0 0 0 .3-.2.3.3 0 0 0-.2-.3l-.7-.1-.7-.1c-.2 0-.3 0-.4.2 0 .2.1.3.3.4h.7"
  })), _path163 || (_path163 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "m285.1 215.4-.2-.5h-.7l.3.6z"
  })), _path164 || (_path164 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m285.1 215.4-.2-.5h-.7l.3.6.6-.1"
  })), _path165 || (_path165 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M277.8 217.1a25 25 0 0 1-6-.6 25.4 25.4 0 0 1 6-.7c2.4 0 4.5.3 6.1.7-1.6.4-3.7.6-6 .6"
  })), _path166 || (_path166 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 0.3,
    d: "M277.8 217.1a25 25 0 0 1-6-.6 25.4 25.4 0 0 1 6-.7c2.4 0 4.5.3 6.1.7-1.6.4-3.7.6-6 .6z"
  })), _path167 || (_path167 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m285.2 212-.1-.3c-.2 0-.3 0-.4.2l.1.4c.2 0 .3 0 .4-.3"
  })), _path168 || (_path168 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m285.2 212-.1-.3c-.2 0-.3 0-.4.2l.1.4c.2 0 .3 0 .4-.3z"
  })), _path169 || (_path169 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M280.6 211.2c0-.2-.1-.4-.3-.4 0 0-.2.1-.2.3s0 .4.2.4z"
  })), _path170 || (_path170 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M280.6 211.2c0-.2-.1-.4-.3-.4 0 0-.2.1-.2.3s0 .4.2.4z"
  })), _path171 || (_path171 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M275.2 211.2c0-.2 0-.4.2-.4l.3.3-.2.4c-.2 0-.3-.2-.3-.3"
  })), _path172 || (_path172 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M275.2 211.2c0-.2 0-.4.2-.4l.3.3-.2.4c-.2 0-.3-.2-.3-.3z"
  })), _path173 || (_path173 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m270.5 212 .1-.3c.2 0 .3 0 .4.2l-.1.4c-.2 0-.3 0-.4-.3"
  })), _path174 || (_path174 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m270.5 212 .1-.3c.2 0 .3 0 .4.2l-.1.4c-.2 0-.3 0-.4-.3z"
  })), _path175 || (_path175 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m277.8 208.5-.8.5.6 1.3.2.1.3-.1.6-1.3z"
  })), _path176 || (_path176 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m277.8 208.5-.8.5.6 1.3.2.1.3-.1.6-1.3-.9-.5"
  })), _path177 || (_path177 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m276 210.5.4.5 1.3-.4.1-.2-.1-.2-1.3-.3z"
  })), _path178 || (_path178 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m276 210.5.4.5 1.3-.4.1-.2-.1-.2-1.3-.3-.4.6"
  })), _path179 || (_path179 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m279.6 210.5-.3.5-1.3-.4-.1-.2v-.2l1.4-.3z"
  })), _path180 || (_path180 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m279.6 210.5-.3.5-1.3-.4-.1-.2v-.2l1.4-.3.4.6"
  })), _path181 || (_path181 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m272.5 209-.7.7.9 1 .2.1.2-.1.2-1.3z"
  })), _path182 || (_path182 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m272.5 209-.7.7.9 1 .2.1.2-.1.2-1.3-.8-.3"
  })), _path183 || (_path183 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m271.1 211.2.5.5 1.2-.6v-.2l-.1-.2-1.3-.1z"
  })), _path184 || (_path184 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m271.1 211.2.5.5 1.2-.6v-.2l-.1-.2-1.3-.1-.3.6"
  })), _path185 || (_path185 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m274.7 210.5-.3.6h-1.3l-.2-.2.1-.3 1.2-.6z"
  })), _path186 || (_path186 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m274.7 210.5-.3.6h-1.3l-.2-.2.1-.3 1.2-.6.5.5"
  })), _path187 || (_path187 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M269.8 211.4v.6l-1.4.2-.2-.1v-.2l1-.9z"
  })), _path188 || (_path188 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M269.8 211.4v.6l-1.4.2-.2-.1v-.2l1-.9.6.4"
  })), _path189 || (_path189 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M272.4 210.9c0-.3.2-.5.5-.5a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.4.5.5 0 0 1-.5-.4"
  })), _path190 || (_path190 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M272.4 210.9c0-.3.2-.5.5-.5a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.4.5.5 0 0 1-.5-.4z"
  })), _path191 || (_path191 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m283.2 209 .7.7-.9 1-.2.1-.1-.1-.3-1.3z"
  })), _path192 || (_path192 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m283.2 209 .7.7-.9 1-.2.1-.1-.1-.3-1.3.8-.3"
  })), _path193 || (_path193 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m284.6 211.2-.5.5-1.2-.6v-.2l.1-.2 1.3-.1z"
  })), _path194 || (_path194 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m284.6 211.2-.5.5-1.2-.6v-.2l.1-.2 1.3-.1.3.6"
  })), _path195 || (_path195 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m281 210.5.3.6h1.3l.2-.2-.1-.3-1.2-.6z"
  })), _path196 || (_path196 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m281 210.5.3.6h1.3l.2-.2-.1-.3-1.2-.6-.5.5"
  })), _path197 || (_path197 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M285.7 211.4v.6l1.4.2.2-.1v-.2l-1-.9z"
  })), _path198 || (_path198 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M285.7 211.4v.6l1.4.2.2-.1v-.2l-1-.9-.6.4"
  })), _path199 || (_path199 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M277.4 210.4c0-.2.2-.4.5-.4.2 0 .4.2.4.4 0 .3-.2.5-.4.5a.5.5 0 0 1-.5-.5"
  })), _path200 || (_path200 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M277.4 210.4c0-.2.2-.4.5-.4.2 0 .4.2.4.4 0 .3-.2.5-.4.5a.5.5 0 0 1-.5-.5z"
  })), _path201 || (_path201 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M282.3 210.9c0-.3.3-.5.5-.5.3 0 .5.2.5.5s-.2.4-.5.4a.5.5 0 0 1-.5-.4"
  })), _path202 || (_path202 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M282.3 210.9c0-.3.3-.5.5-.5.3 0 .5.2.5.5s-.2.4-.5.4a.5.5 0 0 1-.5-.4z"
  })), _path203 || (_path203 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M277 205.4c0-.5.4-.8.8-.8s1 .3 1 .8-.5.8-1 .8a.9.9 0 0 1-.8-.8"
  })), _path204 || (_path204 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M278.5 205.1v.6H277v-.6h.4v-1.3h-.5v-.5h.5v-.6h.6v.6h.6v.6h-.6v1.2h.4"
  })), _path205 || (_path205 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M278.5 205.1v.6H277v-.6h.4v-1.3h-.5v-.5h.5v-.6h.6v.6h.6v.6h-.6v1.2h.4z"
  })), _path206 || (_path206 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M279 205.1v.6h-2.4v-.6h1v-1.3h-.7v-.5h.6v-.6h.6v.6h.6v.6h-.6v1.2h1"
  })), _path207 || (_path207 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M278.1 204.6c.4 0 .6.4.6.8 0 .5-.4.8-.9.8a.9.9 0 0 1-.8-.8c0-.4.2-.7.6-.8"
  })), _path208 || (_path208 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m268 212.2-.6-.7a2.3 2.3 0 0 0-.7-.3c0-.1.3-.3.6-.3.2 0 .3 0 .4.2v-.2s.3 0 .4.3z"
  })), _path209 || (_path209 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m268 212.2-.6-.7a2.3 2.3 0 0 0-.7-.3c0-.1.3-.3.6-.3.2 0 .3 0 .4.2v-.2s.3 0 .4.3z"
  })), _path210 || (_path210 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M268 212c.1-.2.4-.2.5 0 .2.1.3.3.1.5l-.5-.1c-.1-.1-.2-.4 0-.5"
  })), _path211 || (_path211 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M268 212c.1-.2.4-.2.5 0 .2.1.3.3.1.5l-.5-.1c-.1-.1-.2-.4 0-.5z"
  })), _path212 || (_path212 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m287.5 212.2.6-.7c.2-.2.7-.3.7-.3 0-.1-.3-.3-.6-.3a.6.6 0 0 0-.4.2v-.2s-.3 0-.4.3v.7z"
  })), _path213 || (_path213 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m287.5 212.2.6-.7c.2-.2.7-.3.7-.3 0-.1-.3-.3-.6-.3a.6.6 0 0 0-.4.2v-.2s-.3 0-.4.3v.7z"
  })), _path214 || (_path214 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M287.5 212c-.1-.2-.3-.2-.5 0-.2.1-.2.3-.1.5l.5-.1c.2-.1.2-.4.1-.5"
  })), _path215 || (_path215 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M287.5 212c-.1-.2-.3-.2-.5 0-.2.1-.2.3-.1.5l.5-.1c.2-.1.2-.4.1-.5z"
  })), _path216 || (_path216 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M267.2 223h21.4v-5.5h-21.4z"
  })), _path217 || (_path217 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M267.2 223h21.4v-5.5h-21.4z"
  })), _path218 || (_path218 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M286.3 226.8a1 1 0 0 0-.4 0h-16.5c.6-.2 1-.7 1-1.2 0-.6-.4-1.1-1-1.3h17-.1c-.6.2-1 .7-1 1.3 0 .5.4 1 1 1.2"
  })), _path219 || (_path219 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 0.4,
    d: "M286.3 226.8a1 1 0 0 0-.4 0h-16.5c.6-.2 1-.7 1-1.2 0-.6-.4-1.1-1-1.3h17-.1c-.6.2-1 .7-1 1.3 0 .5.4 1 1 1.2z"
  })), _path220 || (_path220 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M269.9 226.8h16c.6 0 1 .3 1 .7s-.4.8-1 .8h-16c-.6 0-1-.4-1-.8s.5-.8 1-.8"
  })), _path221 || (_path221 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M269.9 226.8h16c.6 0 1 .3 1 .7s-.4.8-1 .8h-16c-.6 0-1-.4-1-.8s.5-.8 1-.8z"
  })), _path222 || (_path222 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M269.9 223h16c.6 0 1 .4 1 .7 0 .4-.4.6-1 .6h-16c-.6 0-1-.2-1-.6 0-.3.4-.6 1-.6"
  })), _path223 || (_path223 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M269.9 223h16c.6 0 1 .4 1 .7 0 .4-.4.6-1 .6h-16c-.6 0-1-.2-1-.6 0-.3.4-.6 1-.6z"
  })), _path224 || (_path224 = /*#__PURE__*/React.createElement("path", {
    fill: "#005bbf",
    d: "M263 317.4c1.4 0 2.7-.3 3.7-.8a8.4 8.4 0 0 1 3.7-.8c1.4 0 2.8.3 3.8.8s2.3.8 3.7.8c1.5 0 2.8-.3 3.8-.8a8.4 8.4 0 0 1 3.6-.8 8 8 0 0 1 3.7.8c1 .5 2.4.8 3.8.8v2.4a8.3 8.3 0 0 1-3.8-.9 8.2 8.2 0 0 0-3.7-.8c-1.4 0-2.7.3-3.6.8-1 .5-2.3.9-3.8.9a8 8 0 0 1-3.7-.9 8.4 8.4 0 0 0-3.8-.8 8.3 8.3 0 0 0-3.7.8c-1 .5-2.3.9-3.8.9v-2.4"
  })), _path225 || (_path225 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M263 317.4c1.4 0 2.7-.3 3.7-.8a8.4 8.4 0 0 1 3.7-.8c1.4 0 2.8.3 3.8.8s2.3.8 3.7.8c1.5 0 2.8-.3 3.8-.8a8.4 8.4 0 0 1 3.6-.8 8 8 0 0 1 3.7.8c1 .5 2.4.8 3.8.8v2.4a8.3 8.3 0 0 1-3.8-.9 8.2 8.2 0 0 0-3.7-.8c-1.4 0-2.7.3-3.6.8-1 .5-2.3.9-3.8.9a8 8 0 0 1-3.7-.9 8.4 8.4 0 0 0-3.8-.8 8.3 8.3 0 0 0-3.7.8c-1 .5-2.3.9-3.8.9v-2.4z"
  })), _path226 || (_path226 = /*#__PURE__*/React.createElement("path", {
    fill: "#ccc",
    d: "M263 319.8c1.4 0 2.7-.4 3.7-.9s2.3-.8 3.7-.8 2.8.3 3.8.8 2.3.9 3.7.9a8.2 8.2 0 0 0 3.8-.9 8.4 8.4 0 0 1 3.6-.8c1.5 0 2.8.3 3.7.8 1 .5 2.4.9 3.8.9v2.3a8.3 8.3 0 0 1-3.8-.9 8.1 8.1 0 0 0-3.7-.7c-1.4 0-2.7.2-3.6.7-1 .5-2.3.9-3.8.9a7 7 0 0 1-3.7-.9c-1-.4-2.3-.7-3.8-.7a8.3 8.3 0 0 0-3.7.7 8.1 8.1 0 0 1-3.8.9v-2.3"
  })), _path227 || (_path227 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M263 319.8c1.4 0 2.7-.4 3.7-.9s2.3-.8 3.7-.8 2.8.3 3.8.8 2.3.9 3.7.9a8.2 8.2 0 0 0 3.8-.9 8.4 8.4 0 0 1 3.6-.8c1.5 0 2.8.3 3.7.8 1 .5 2.4.9 3.8.9v2.3a8.3 8.3 0 0 1-3.8-.9 8.1 8.1 0 0 0-3.7-.7c-1.4 0-2.7.2-3.6.7-1 .5-2.3.9-3.8.9a7 7 0 0 1-3.7-.9c-1-.4-2.3-.7-3.8-.7a8.3 8.3 0 0 0-3.7.7 8.1 8.1 0 0 1-3.8.9v-2.3"
  })), _path228 || (_path228 = /*#__PURE__*/React.createElement("path", {
    fill: "#005bbf",
    d: "M263 322c1.4 0 2.7-.2 3.7-.8 1-.4 2.3-.7 3.7-.7s2.8.2 3.8.7 2.3.9 3.7.9a8.2 8.2 0 0 0 3.8-.9 8.4 8.4 0 0 1 3.6-.8 8 8 0 0 1 3.7.8c1 .5 2.4.9 3.8.9v2.3a8.3 8.3 0 0 1-3.8-.9 8.2 8.2 0 0 0-3.7-.7c-1.4 0-2.7.3-3.6.7-1 .6-2.3.9-3.8.9-1.4 0-2.8-.3-3.7-.8a8.4 8.4 0 0 0-3.8-.8 8.3 8.3 0 0 0-3.7.8c-1 .5-2.3.8-3.8.8V322"
  })), _path229 || (_path229 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M263 322c1.4 0 2.7-.2 3.7-.8 1-.4 2.3-.7 3.7-.7s2.8.2 3.8.7 2.3.9 3.7.9a8.2 8.2 0 0 0 3.8-.9 8.4 8.4 0 0 1 3.6-.8 8 8 0 0 1 3.7.8c1 .5 2.4.9 3.8.9v2.3a8.3 8.3 0 0 1-3.8-.9 8.2 8.2 0 0 0-3.7-.7c-1.4 0-2.7.3-3.6.7-1 .6-2.3.9-3.8.9-1.4 0-2.8-.3-3.7-.8a8.4 8.4 0 0 0-3.8-.8 8.3 8.3 0 0 0-3.7.8c-1 .5-2.3.8-3.8.8V322"
  })), _path230 || (_path230 = /*#__PURE__*/React.createElement("path", {
    fill: "#ccc",
    d: "M263 326.7a8 8 0 0 0 3.7-.8c1-.5 2.3-.8 3.7-.8s2.8.3 3.8.8 2.3.8 3.7.8c1.5 0 2.8-.3 3.8-.9a8.4 8.4 0 0 1 3.6-.7c1.5 0 2.8.3 3.7.8a8.3 8.3 0 0 0 3.8.8v-2.3a8.3 8.3 0 0 1-3.8-.9 8.2 8.2 0 0 0-3.7-.7c-1.4 0-2.7.3-3.6.7-1 .5-2.3.9-3.8.9-1.4 0-2.8-.3-3.7-.8a8.4 8.4 0 0 0-3.8-.8 8.3 8.3 0 0 0-3.7.8c-1 .5-2.3.8-3.8.8v2.3"
  })), _path231 || (_path231 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M263 326.7a8 8 0 0 0 3.7-.8c1-.5 2.3-.8 3.7-.8s2.8.3 3.8.8 2.3.8 3.7.8c1.5 0 2.8-.3 3.8-.9a8.4 8.4 0 0 1 3.6-.7c1.5 0 2.8.3 3.7.8a8.3 8.3 0 0 0 3.8.8v-2.3a8.3 8.3 0 0 1-3.8-.9 8.2 8.2 0 0 0-3.7-.7c-1.4 0-2.7.3-3.6.7-1 .5-2.3.9-3.8.9-1.4 0-2.8-.3-3.7-.8a8.4 8.4 0 0 0-3.8-.8 8.3 8.3 0 0 0-3.7.8c-1 .5-2.3.8-3.8.8v2.3"
  })), _path232 || (_path232 = /*#__PURE__*/React.createElement("path", {
    fill: "#005bbf",
    d: "M263 329a8.1 8.1 0 0 0 3.7-.8c1-.5 2.3-.8 3.7-.8s2.8.3 3.8.8 2.3.8 3.7.8a8.2 8.2 0 0 0 3.8-.9 8.4 8.4 0 0 1 3.6-.7c1.5 0 2.8.3 3.7.8 1 .5 2.4.8 3.8.8v-2.3a8.3 8.3 0 0 1-3.8-.8 8.2 8.2 0 0 0-3.7-.8 8.4 8.4 0 0 0-3.6.7 8.2 8.2 0 0 1-3.8.9c-1.4 0-2.8-.3-3.7-.8-1-.5-2.3-.8-3.8-.8-1.4 0-2.7.3-3.7.8s-2.3.8-3.8.8v2.3"
  })), _path233 || (_path233 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M263 329a8.1 8.1 0 0 0 3.7-.8c1-.5 2.3-.8 3.7-.8s2.8.3 3.8.8 2.3.8 3.7.8a8.2 8.2 0 0 0 3.8-.9 8.4 8.4 0 0 1 3.6-.7c1.5 0 2.8.3 3.7.8 1 .5 2.4.8 3.8.8v-2.3a8.3 8.3 0 0 1-3.8-.8 8.2 8.2 0 0 0-3.7-.8 8.4 8.4 0 0 0-3.6.7 8.2 8.2 0 0 1-3.8.9c-1.4 0-2.8-.3-3.7-.8-1-.5-2.3-.8-3.8-.8-1.4 0-2.7.3-3.7.8s-2.3.8-3.8.8v2.3z"
  })), _path234 || (_path234 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m286.3 308-.1.5c0 1.5 1.2 2.6 2.7 2.6h-22c1.5 0 2.7-1.2 2.7-2.6l-.1-.5z"
  })), _path235 || (_path235 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 0.4,
    d: "m286.3 308-.1.5c0 1.5 1.2 2.6 2.7 2.6h-22c1.5 0 2.7-1.2 2.7-2.6l-.1-.5z"
  })), _path236 || (_path236 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M269.9 306.5h16c.6 0 1 .3 1 .8 0 .4-.4.7-1 .7h-16c-.6 0-1-.3-1-.8 0-.4.5-.7 1-.7"
  })), _path237 || (_path237 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M269.9 306.5h16c.6 0 1 .3 1 .8 0 .4-.4.7-1 .7h-16c-.6 0-1-.3-1-.8 0-.4.5-.7 1-.7z"
  })), _path238 || (_path238 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M266.9 316.7h22V311h-22z"
  })), _path239 || (_path239 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M266.9 316.7h22V311h-22z"
  })), _path240 || (_path240 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M290.6 286.7c2.1 1.2 3.6 2.5 3.4 3.2-.1.6-.8 1-1.8 1.6-1.6 1.1-2.5 3-1.8 4a5.5 5.5 0 0 1 .2-8.8"
  })), _path241 || (_path241 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M290.6 286.7c2.1 1.2 3.6 2.5 3.4 3.2-.1.6-.8 1-1.8 1.6-1.6 1.1-2.5 3-1.8 4a5.5 5.5 0 0 1 .2-8.8z"
  })), _path242 || (_path242 = /*#__PURE__*/React.createElement("path", {
    fill: "#ccc",
    d: "M270.1 305.6h15.6V229h-15.6v76.5z"
  })), _path243 || (_path243 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M281.4 229.1v76.3m1.8-76.3v76.3m-13 .2h15.5V229h-15.6v76.5z"
  })), _path244 || (_path244 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M254.2 257.7a49.6 49.6 0 0 1 23.3-2c9.3 1.6 16.4 5.3 15.9 8.4v.2l3.5-8.2c.6-3.3-7.3-7.5-17.6-9.2a53.5 53.5 0 0 0-9.2-.7c-6.7 0-12.4.8-15.9 2.1z"
  })), _path245 || (_path245 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 0.4,
    d: "M254.2 257.7a49.6 49.6 0 0 1 23.3-2c9.3 1.6 16.4 5.3 15.9 8.4v.2l3.5-8.2c.6-3.3-7.3-7.5-17.6-9.2a53.5 53.5 0 0 0-9.2-.7c-6.7 0-12.4.8-15.9 2.1v9.4"
  })), _path246 || (_path246 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M285.7 267.3c4.4-.3 7.3-1.4 7.7-3.2.2-1.5-1.2-3-3.8-4.5-1.2.1-2.5.3-3.9.3z"
  })), _path247 || (_path247 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M285.7 267.3c4.4-.3 7.3-1.4 7.7-3.2.2-1.5-1.2-3-3.8-4.5-1.2.1-2.5.3-3.9.3v7.4"
  })), _path248 || (_path248 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M270 261.5a13 13 0 0 0-5.7 1.9v.2c-.5 1 1.8 3 5.8 5.4v-7.5"
  })), _path249 || (_path249 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M270 261.5a13 13 0 0 0-5.7 1.9v.2c-.5 1 1.8 3 5.8 5.4v-7.5"
  })), _path250 || (_path250 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M295.4 282c.4-1.2-3.8-3.6-9.7-5.8-2.8-1-5-2-7.8-3.2-8.3-3.7-14.4-7.9-13.6-9.4v-.2c-.4.4-1 8-1 8-.8 1.3 4.8 5.5 12.4 9.1 2.4 1.2 7.6 3 10 4 4.3 1.4 8.7 4.3 8.3 5.3l1.4-7.7"
  })), _path251 || (_path251 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 0.4,
    d: "M295.4 282c.4-1.2-3.8-3.6-9.7-5.8-2.8-1-5-2-7.8-3.2-8.3-3.7-14.4-7.9-13.6-9.4v-.2c-.4.4-1 8-1 8-.8 1.3 4.8 5.5 12.4 9.1 2.4 1.2 7.6 3 10 4 4.3 1.4 8.7 4.3 8.3 5.3l1.4-7.7z"
  })), _path252 || (_path252 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M263.9 254.4c.6-2.3 1.4-4.4 2.1-6.6h-.5a5 5 0 0 1-.5.1 53 53 0 0 1-1.4 4.8c-1-1.4-2-2.7-2.7-4.1l-1 .2h-1a131 131 0 0 1 4 5.7h.5zm6-6.6h-1a8 8 0 0 1-.8 0v6.2h4.2v-.7h-2.6zm6.8 1 2 .3v-.7l-5.8-.5v.8a19 19 0 0 1 2 0l-.4 5.6h1.6l.5-5.4m2.4 6c.3 0 .5 0 .8.2l.8.2.7-2.9.6 1.2.8 2.1 1 .2c.4 0 .7.2 1 .3l-.3-.7c-.4-1-1-1.9-1.3-2.9 1 0 1.9-.3 2.1-1.2.1-.6 0-1-.7-1.5-.4-.3-1.2-.4-1.7-.5l-2.4-.5zm3-5.2c.7.2 1.5.3 1.5 1v.5c-.3.9-1 1.2-2 .9zm8 7-.2 2 .8.5.9.5.5-7a3.4 3.4 0 0 1-.7-.3l-6.1 3.8.5.3.4.2 1.7-1.2 2.3 1.3zm-1.7-1.5 2-1.4-.2 2.3z"
  })), _path253 || (_path253 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.1,
    d: "M182.2 192.4c0-1 1-2 2-2s2.2 1 2.2 2c0 1.1-1 2-2.1 2a2 2 0 0 1-2.1-2z"
  })), _path254 || (_path254 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M205.7 175.4c6.3 0 12 1 15.7 2.4a31.7 31.7 0 0 0 14.6 2.3c2.7 0 6.5.8 10.3 2.4a27.3 27.3 0 0 1 7.4 4.7l-1.5 1.4-.4 3.8-4.1 4.7-2 1.8-5 3.9-2.5.2-.7 2.1-31.6-3.7-31.7 3.7-.8-2.1-2.5-.2-4.9-4-2-1.7-4.1-4.7-.5-3.8-1.5-1.4a27.6 27.6 0 0 1 7.5-4.7 26 26 0 0 1 10.2-2.4c2 .2 4.2.1 6.6-.2a30 30 0 0 0 8-2c3.7-1.5 9-2.5 15.5-2.5z"
  })), _path255 || (_path255 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M206.2 217.1c-11.8 0-22.4-1.4-29.9-3.6a1.1 1.1 0 0 1-.8-1.2c0-.5.3-1 .8-1.2a109 109 0 0 1 29.9-3.6c11.7 0 22.3 1.4 29.8 3.6a1.3 1.3 0 0 1 0 2.4c-7.5 2.2-18 3.6-29.8 3.6"
  })), _path256 || (_path256 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M206.1 215.6c-10.6 0-20.2-1.2-27.5-3.1 7.3-2 16.9-3 27.5-3.1a115 115 0 0 1 27.6 3c-7.3 2-17 3.2-27.6 3.2"
  })), _path257 || (_path257 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.1,
    d: "M206.9 215.7v-6.3m-1.7 6.3v-6.3"
  })), _path258 || (_path258 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.2,
    d: "M203.6 215.7v-6.3m-1.6 6.3v-6.3"
  })), _path259 || (_path259 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M200.6 215.7v-6.3m-2.8 5.9v-5.7m1.3 5.8v-6m-3.8 5.6v-5.2m1.3 5.4v-5.6"
  })), _path260 || (_path260 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M192 214.8V210m1 4.7V210m1.2 5v-5m-3.4 4.7v-4.5"
  })), _path261 || (_path261 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.5,
    d: "M189.7 214.5v-4.2m-1.2 4.1v-4"
  })), _path262 || (_path262 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.6,
    d: "M186 214v-3m1.3 3.2v-3.5m-2.5 3.1V211"
  })), _path263 || (_path263 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.7,
    d: "M183.7 213.6v-2.3m-1.3 2v-1.8m-1.2 1.6v-1.3"
  })), _path264 || (_path264 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.9,
    d: "M179.8 212.8v-.7"
  })), _path265 || (_path265 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.1,
    d: "M213.7 215.3v-5.8m-2.9 6v-6.1m-2.1 6.2v-6.3"
  })), _path266 || (_path266 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M206 207.4a108 108 0 0 0-30 3.9c.6-.3.5-1-.3-3-1-2.5-2.4-2.4-2.4-2.4 8.3-2.5 20-4 32.8-4a123 123 0 0 1 33 4s-1.5-.1-2.5 2.3c-.8 2-.8 2.8-.2 3-7.5-2.2-18.4-3.7-30.3-3.7"
  })), _path267 || (_path267 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M206.1 201.9c-12.9 0-24.5 1.5-32.8 4a1 1 0 0 1-1.3-.6 1 1 0 0 1 .7-1.3 121 121 0 0 1 33.4-4.2c13.2 0 25.2 1.7 33.5 4.2.6.2.9.8.7 1.3s-.8.8-1.3.6c-8.4-2.5-20-4-32.9-4"
  })), _path268 || (_path268 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 0.4,
    d: "M206.1 215.6c-10.6 0-20.2-1.2-27.5-3.1 7.3-2 16.9-3 27.5-3.1a115 115 0 0 1 27.6 3c-7.3 2-17 3.2-27.6 3.2z"
  })), _path269 || (_path269 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M197 204.8c0-.5.4-1 1-1 .5 0 1 .5 1 1s-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path270 || (_path270 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M206.1 205.6H203a1 1 0 0 1 0-2h6.4c.5 0 1 .5 1 1s-.5 1-1 1h-3.2"
  })), _path271 || (_path271 = /*#__PURE__*/React.createElement("path", {
    fill: "#058e6e",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "m190.3 206.5-2.3.2c-.6.1-1-.3-1.2-.8a1 1 0 0 1 1-1.1l2.2-.3 2.4-.3c.5 0 1 .3 1.1.9.1.5-.3 1-.9 1l-2.3.4"
  })), _path272 || (_path272 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M181 206.7c0-.6.5-1 1.1-1s1 .4 1 1c0 .5-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path273 || (_path273 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "m174 208.5 1.2-1.6 3.3.4-2.6 2-1.8-.8"
  })), _path274 || (_path274 = /*#__PURE__*/React.createElement("path", {
    fill: "#058e6e",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "m222 206.5 2.3.2c.5.1 1-.3 1.1-.8a1 1 0 0 0-.9-1.1l-2.2-.3-2.4-.3a1 1 0 0 0-1.1.9c-.1.5.3 1 .9 1l2.3.4"
  })), _path275 || (_path275 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M213.3 204.8c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1m15.8 1.9c0-.6.5-1 1-1 .6 0 1.1.4 1.1 1 0 .5-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path276 || (_path276 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "m238.2 208.5-1.1-1.6-3.3.4 2.6 2 1.8-.8"
  })), _path277 || (_path277 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M177.3 212.8c7.4-2.1 17.6-3.4 28.8-3.4 11.3 0 21.4 1.3 28.9 3.4"
  })), _path278 || (_path278 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m182.3 183.8 1.4 1 2-3.2a7.4 7.4 0 0 1-3.6-7.2c.2-4.1 5.2-7.6 11.7-7.6 3.3 0 6.3 1 8.5 2.4 0-.6 0-1.2.2-1.8a17.4 17.4 0 0 0-8.7-2.1c-7.4 0-13.2 4.1-13.5 9.1a8.9 8.9 0 0 0 3 7.6z"
  })), _path279 || (_path279 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "m182.3 183.8 1.4 1 2-3.2a7.4 7.4 0 0 1-3.6-7.2c.2-4.1 5.2-7.6 11.7-7.6 3.3 0 6.3 1 8.5 2.4 0-.6 0-1.2.2-1.8a17.4 17.4 0 0 0-8.7-2.1c-7.4 0-13.2 4.1-13.5 9.1a8.9 8.9 0 0 0 3 7.6l-1 1.8"
  })), _path280 || (_path280 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M182.4 183.8a9.3 9.3 0 0 1-4-7.3c0-3.2 2-6.1 5.3-8a8.5 8.5 0 0 0-3.4 6.8 8.9 8.9 0 0 0 3 6.7z"
  })), _path281 || (_path281 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M182.4 183.8a9.3 9.3 0 0 1-4-7.3c0-3.2 2-6.1 5.3-8a8.5 8.5 0 0 0-3.4 6.8 8.9 8.9 0 0 0 3 6.7l-.9 1.8"
  })), _path282 || (_path282 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M160.1 187.1a8.8 8.8 0 0 1-2.3-5.9c0-1.3.3-2.6 1-3.8 2-4.2 8.4-7.2 16-7.2 2 0 4 .2 5.9.6l-1 1.4a25.5 25.5 0 0 0-4.9-.4c-7 0-12.8 2.7-14.5 6.3a7 7 0 0 0-.7 3.1 7.3 7.3 0 0 0 2.7 5.6l-2.6 4.1-1.3-1z"
  })), _path283 || (_path283 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M160.1 187.1a8.8 8.8 0 0 1-2.3-5.9c0-1.3.3-2.6 1-3.8 2-4.2 8.4-7.2 16-7.2 2 0 4 .2 5.9.6l-1 1.4a25.5 25.5 0 0 0-4.9-.4c-7 0-12.8 2.7-14.5 6.3a7 7 0 0 0-.7 3.1 7.3 7.3 0 0 0 2.7 5.6l-2.6 4.1-1.3-1z"
  })), _path284 || (_path284 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M162.7 173.3a10.5 10.5 0 0 0-4 4.1 8.6 8.6 0 0 0-.9 3.8c0 2.3.9 4.3 2.3 5.9l-1.5 2.5a10.4 10.4 0 0 1-2.3-6.5c0-4 2.5-7.5 6.4-9.8"
  })), _path285 || (_path285 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M162.7 173.3a10.5 10.5 0 0 0-4 4.1 8.6 8.6 0 0 0-.9 3.8c0 2.3.9 4.3 2.3 5.9l-1.5 2.5a10.4 10.4 0 0 1-2.3-6.5c0-4 2.5-7.5 6.4-9.8z"
  })), _path286 || (_path286 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M206 164.4c1.7 0 3.2 1.1 3.5 2.6.3 1.4.4 2.9.4 4.5v1.1c.1 3.3.6 6.3 1.3 8.1l-5.2 5-5.2-5c.7-1.8 1.2-4.8 1.3-8.1v-1.1c0-1.6.2-3.1.4-4.5.3-1.5 1.8-2.6 3.5-2.6"
  })), _path287 || (_path287 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M206 164.4c1.7 0 3.2 1.1 3.5 2.6.3 1.4.4 2.9.4 4.5v1.1c.1 3.3.6 6.3 1.3 8.1l-5.2 5-5.2-5c.7-1.8 1.2-4.8 1.3-8.1v-1.1c0-1.6.2-3.1.4-4.5.3-1.5 1.8-2.6 3.5-2.6z"
  })), _path288 || (_path288 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M206 166c1 0 1.7.6 1.8 1.4.2 1.2.4 2.6.4 4.2v1c.1 3.2.6 6 1.2 7.7l-3.4 3.2-3.4-3.2c.7-1.7 1.1-4.5 1.2-7.7v-1a28 28 0 0 1 .4-4.2 2 2 0 0 1 1.8-1.4"
  })), _path289 || (_path289 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M206 166c1 0 1.7.6 1.8 1.4.2 1.2.4 2.6.4 4.2v1c.1 3.2.6 6 1.2 7.7l-3.4 3.2-3.4-3.2c.7-1.7 1.1-4.5 1.2-7.7v-1a28 28 0 0 1 .4-4.2 2 2 0 0 1 1.8-1.4z"
  })), _path290 || (_path290 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m229.7 183.8-1.3 1-2-3.2a7.4 7.4 0 0 0 3.6-6.3 7 7 0 0 0 0-.9c-.2-4.1-5.3-7.6-11.7-7.6a15 15 0 0 0-8.5 2.4 23 23 0 0 0-.2-1.8 17.4 17.4 0 0 1 8.7-2.1c7.4 0 13.2 4.1 13.4 9.1a8.9 8.9 0 0 1-3 7.6z"
  })), _path291 || (_path291 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "m229.7 183.8-1.3 1-2-3.2a7.4 7.4 0 0 0 3.6-6.3 7 7 0 0 0 0-.9c-.2-4.1-5.3-7.6-11.7-7.6a15 15 0 0 0-8.5 2.4 23 23 0 0 0-.2-1.8 17.4 17.4 0 0 1 8.7-2.1c7.4 0 13.2 4.1 13.4 9.1a8.9 8.9 0 0 1-3 7.6l1 1.8"
  })), _path292 || (_path292 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M229.6 183.8a9.1 9.1 0 0 0 4.1-7.3c0-3.2-2.1-6.1-5.3-8a8.5 8.5 0 0 1 3.4 6.8 8.9 8.9 0 0 1-3.2 6.7z"
  })), _path293 || (_path293 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M229.6 183.8a9.1 9.1 0 0 0 4.1-7.3c0-3.2-2.1-6.1-5.3-8a8.5 8.5 0 0 1 3.4 6.8 8.9 8.9 0 0 1-3.2 6.7l1 1.8"
  })), _path294 || (_path294 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M252 187.1a8.8 8.8 0 0 0 2.2-5.9 8.7 8.7 0 0 0-.9-3.8c-2-4.2-8.4-7.2-16-7.2a29 29 0 0 0-6 .6l1 1.4a25.4 25.4 0 0 1 5-.4c7 0 12.8 2.7 14.4 6.3.5 1 .7 2 .7 3.1a7.3 7.3 0 0 1-2.6 5.6l2.5 4.1 1.3-1z"
  })), _path295 || (_path295 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M252 187.1a8.8 8.8 0 0 0 2.2-5.9 8.7 8.7 0 0 0-.9-3.8c-2-4.2-8.4-7.2-16-7.2a29 29 0 0 0-6 .6l1 1.4a25.4 25.4 0 0 1 5-.4c7 0 12.8 2.7 14.4 6.3.5 1 .7 2 .7 3.1a7.3 7.3 0 0 1-2.6 5.6l2.5 4.1 1.3-1z"
  })), _path296 || (_path296 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M249.3 173.3a10.6 10.6 0 0 1 4 4.1 8.7 8.7 0 0 1 .9 3.8 8.8 8.8 0 0 1-2.3 5.9l1.6 2.5a10.4 10.4 0 0 0 2.3-6.5c0-4-2.6-7.5-6.5-9.8"
  })), _path297 || (_path297 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M249.3 173.3a10.6 10.6 0 0 1 4 4.1 8.7 8.7 0 0 1 .9 3.8 8.8 8.8 0 0 1-2.3 5.9l1.6 2.5a10.4 10.4 0 0 0 2.3-6.5c0-4-2.6-7.5-6.5-9.8z"
  })), _path298 || (_path298 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M204.2 181.4c0-1 .8-1.8 1.8-1.8s1.9.8 1.9 1.8-.9 1.7-1.9 1.7a1.8 1.8 0 0 1-1.8-1.7"
  })), _path299 || (_path299 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M204.2 181.4c0-1 .8-1.8 1.8-1.8s1.9.8 1.9 1.8-.9 1.7-1.9 1.7a1.8 1.8 0 0 1-1.8-1.7z"
  })), _path300 || (_path300 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M204.2 178c0-1 .8-1.8 1.8-1.8s1.9.8 1.9 1.8-.9 1.7-1.9 1.7a1.8 1.8 0 0 1-1.8-1.7m.4-3.7c0-.7.6-1.3 1.4-1.3s1.5.6 1.5 1.3c0 .8-.7 1.4-1.5 1.4s-1.4-.6-1.4-1.4m.4-3.3c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1m.2-2.8c0-.5.4-.8.8-.8.5 0 .9.3.9.8 0 .4-.4.8-.9.8a.8.8 0 0 1-.8-.8"
  })), _path301 || (_path301 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "m206.2 191.8 1.2.2a4.6 4.6 0 0 0 4.5 6 4.7 4.7 0 0 0 4.4-3c.1 0 .5-1.7.7-1.7s.1 1.8.2 1.7c.3 2.3 2.4 3.8 4.7 3.8a4.6 4.6 0 0 0 4.7-5l1.5-1.5.7 2a4 4 0 0 0-.4 1.9 4.4 4.4 0 0 0 4.5 4.2c1.6 0 3-.7 3.8-1.9l.9-1.2v1.5c0 1.5.6 2.8 2 3 0 0 1.7.1 4-1.6 2.1-1.7 3.3-3.1 3.3-3.1l.2 1.7s-1.8 2.8-3.8 4c-1 .6-2.7 1.3-4 1-1.4-.2-2.4-1.3-3-2.6a6.7 6.7 0 0 1-3.3 1 6.5 6.5 0 0 1-6.1-3.7 7 7 0 0 1-10.4-.3 7 7 0 0 1-4.6 1.8 6.9 6.9 0 0 1-5.7-3 6.9 6.9 0 0 1-5.7 3 7 7 0 0 1-4.7-1.8 7 7 0 0 1-10.4.3 6.5 6.5 0 0 1-6 3.7 6.7 6.7 0 0 1-3.4-1c-.6 1.3-1.5 2.4-3 2.7-1.2.2-2.9-.5-4-1.1-2-1.2-3.8-4-3.8-4l.2-1.7s1.2 1.4 3.4 3.1c2.2 1.8 3.9 1.6 3.9 1.6 1.4-.2 2-1.5 2-3v-1.5l1 1.2a4.6 4.6 0 0 0 3.7 2c2.5 0 4.5-2 4.5-4.3a4 4 0 0 0-.4-2l.8-1.9 1.5 1.5a4.4 4.4 0 0 0 0 .6c0 2.4 2 4.4 4.6 4.4 2.4 0 4.4-1.5 4.7-3.8 0 0 0-1.6.2-1.7.2 0 .6 1.7.7 1.6a4.7 4.7 0 0 0 4.5 3.1 4.6 4.6 0 0 0 4.5-6l1.2-.2"
  })), _path302 || (_path302 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M238.6 197.7c.3-.8 0-1.6-.6-1.8-.5-.2-1.2.3-1.5 1.1s0 1.6.6 1.8c.5.2 1.2-.3 1.5-1.1m-20.5-4c0-.8-.3-1.6-1-1.6-.5-.1-1 .5-1.2 1.4-.1.8.3 1.5.9 1.6.6 0 1.2-.6 1.3-1.4m-23.9 0c0-.8.4-1.6 1-1.6.6-.1 1.1.5 1.2 1.4.1.8-.3 1.5-.9 1.6-.6 0-1.1-.6-1.2-1.4m-20.6 4c-.2-.8 0-1.6.6-1.8s1.2.3 1.5 1.1 0 1.6-.5 1.8c-.6.2-1.3-.3-1.6-1.1"
  })), _path303 || (_path303 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M182.7 184a5.1 5.1 0 0 1 2.2 2.9s0-.3.6-.6 1-.3 1-.3l-.1 1.3-.3 2.2a7.4 7.4 0 0 1-.7 1.6 1.9 1.9 0 0 0-1.5-.4 1.8 1.8 0 0 0-1.2.9s-.7-.6-1.2-1.3l-1.1-2-.7-1.1s.5-.2 1.1 0c.6 0 .8.2.8.2a4.9 4.9 0 0 1 1-3.4m.4 9.8a1.8 1.8 0 0 1-.6-1c0-.5 0-.9.3-1.2 0 0-.9-.5-1.8-.7-.7-.2-2-.2-2.3-.2h-1l.2.5c.2.5.5.7.5.7a5 5 0 0 0-3 2 5.3 5.3 0 0 0 3.5 1l-.2.8v.6l1-.4c.3-.1 1.5-.5 2-1 .8-.4 1.5-1.1 1.5-1.1m2.7-.5a1.6 1.6 0 0 0 .2-1.1 1.7 1.7 0 0 0-.6-1l1.4-1.3a10 10 0 0 1 2-.9l1.1-.4v.6a6 6 0 0 1-.2.8 5 5 0 0 1 3.4 1 5 5 0 0 1-2.9 2 6.4 6.4 0 0 0 .7 1.2h-1c-.4 0-1.6 0-2.3-.2a11 11 0 0 1-1.8-.7"
  })), _path304 || (_path304 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M182.2 192.4c0-1 1-2 2-2s2.2 1 2.2 2c0 1.1-1 2-2.1 2a2 2 0 0 1-2.1-2"
  })), _path305 || (_path305 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M206.1 180.8a5.7 5.7 0 0 1 1.9 3.7s.2-.3.9-.5c.7-.3 1.2-.2 1.2-.2l-.5 1.4-.8 2.4a8.2 8.2 0 0 1-1 1.7 2.1 2.1 0 0 0-1.7-.7c-.6 0-1.2.3-1.6.7 0 0-.6-.7-1-1.7l-.8-2.4-.5-1.4 1.2.2c.7.2.9.5.9.5 0-1.4.8-2.8 1.8-3.7"
  })), _path306 || (_path306 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M204.6 191.8a2 2 0 0 1-.5-1.2c0-.5.1-1 .4-1.3 0 0-.8-.7-1.8-1-.7-.4-2-.7-2.5-.7l-1.2-.2.2.6.4.9a5.9 5.9 0 0 0-3.7 1.7c1 .9 2.3 1.6 3.7 1.6l-.4 1-.2.6 1.2-.2c.4-.1 1.8-.4 2.5-.7 1-.4 1.9-1 1.9-1m3 0a1.9 1.9 0 0 0 .1-2.6s.9-.7 1.8-1a8 8 0 0 1 2.5-.7l1.2-.3-.1.7-.4.9c1.4 0 2.7.8 3.6 1.7a5.9 5.9 0 0 1-3.6 1.6 7 7 0 0 0 .5 1.6l-1.2-.2-2.5-.7c-1-.4-1.8-1-1.8-1m22-8a5.2 5.2 0 0 0-2.2 3l-.7-.6c-.6-.3-1-.3-1-.3l.2 1.3c0 .3 0 1.3.3 2.2.2 1 .6 1.6.6 1.6a2 2 0 0 1 1.5-.4c.6.1 1 .5 1.3.9l1.1-1.3c.6-.8 1-1.7 1.1-2l.7-1.1s-.4-.2-1 0c-.7 0-1 .2-1 .2a4.9 4.9 0 0 0-1-3.4m-.3 9.8c.3-.3.5-.6.6-1a1.6 1.6 0 0 0-.2-1.2s.8-.5 1.7-.7c.7-.2 2-.2 2.3-.2h1.1l-.3.5a6 6 0 0 1-.4.7 5 5 0 0 1 2.9 2 5.3 5.3 0 0 1-3.5 1l.2.8v.6l-1-.4c-.3-.1-1.4-.5-2-1-.8-.4-1.4-1.1-1.4-1.1m-2.8-.5a1.7 1.7 0 0 1-.2-1.1c0-.5.3-.8.6-1 0 0-.6-.8-1.4-1.3-.6-.4-1.7-.8-2-.9l-1-.4v.6c0 .5.2.8.2.8a5.2 5.2 0 0 0-3.5 1c.7.9 1.7 1.7 3 2 0 0-.3.2-.5.7l-.3.5h1c.4 0 1.7 0 2.3-.2a11 11 0 0 0 1.8-.7"
  })), _path307 || (_path307 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M226 192.4c0-1 1-2 2-2s2.1 1 2.1 2a2 2 0 0 1-2 2 2 2 0 0 1-2.1-2m23.2 4.4c-.4-.5-1.4-.4-2.2.2-.8.7-1 1.6-.5 2.2.5.5 1.5.4 2.3-.3.7-.6 1-1.6.5-2"
  })), _path308 || (_path308 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "m246.3 198 .7-1c.7-.6 1.8-.7 2.3-.2l.1.2s1-2 2.3-2.6c1.3-.7 3.4-.5 3.4-.5a2.8 2.8 0 0 0-2.9-2.8 3 3 0 0 0-2.4 1l-.2-1s-1.3.3-1.9 1.8 0 3.6 0 3.6-.3-.9-.7-1.5a8 8 0 0 0-2.4-1.6l-1.3-.7-.1.5a5 5 0 0 0 0 .8 7.9 7.9 0 0 0-3.7.5 4.7 4.7 0 0 0 2.5 2.2l-.8.7a4 4 0 0 0-.4.5l1.3.2 2.5.2a15 15 0 0 0 1.7-.2m-80.3 0c0-.4-.3-.7-.7-1-.7-.7-1.7-.8-2.2-.3l-.2.3s-1-2-2.3-2.7c-1.2-.7-3.3-.5-3.3-.5a2.8 2.8 0 0 1 2.8-2.8c1 0 1.9.4 2.4 1l.2-1s1.3.3 2 1.8c.5 1.5-.1 3.6-.1 3.6s.3-.9.8-1.5a8 8 0 0 1 2.4-1.6l1.3-.7v1.3a7.9 7.9 0 0 1 3.7.5 4.7 4.7 0 0 1-2.5 2.2l.8.7.4.5-1.2.2-2.6.2a15 15 0 0 1-1.7-.2"
  })), _path309 || (_path309 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M163 196.8c.6-.5 1.6-.4 2.4.3.7.6 1 1.5.4 2-.5.6-1.5.5-2.2-.2-.8-.6-1-1.6-.5-2m41-6.3c0-1.1.9-2 2-2s2.1.9 2.1 2c0 1-1 2-2 2a2 2 0 0 1-2.1-2"
  })), _path310 || (_path310 = /*#__PURE__*/React.createElement("path", {
    fill: "#005bbf",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M201.8 160.6c0-2.2 1.9-4 4.3-4s4.2 1.8 4.2 4-1.9 4-4.3 4a4.1 4.1 0 0 1-4.2-4"
  })), _path311 || (_path311 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M205 149.3v2.2h-2.4v2.2h2.3v6.3H202l-.2.6c0 .6.1 1.1.3 1.6h7.9c.2-.5.3-1 .3-1.6l-.2-.6h-2.8v-6.3h2.3v-2.2h-2.3v-2.2z"
  })), _path312 || (_path312 = /*#__PURE__*/React.createElement("path", {
    fill: "#ccc",
    d: "M206.5 330.6a82 82 0 0 1-35.5-8.2 22.7 22.7 0 0 1-12.8-20.4v-32h96.4v32a22.7 22.7 0 0 1-12.8 20.4 81 81 0 0 1-35.3 8.2"
  })), _path313 || (_path313 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.5,
    d: "M206.5 330.6a82 82 0 0 1-35.5-8.2 22.7 22.7 0 0 1-12.8-20.4v-32h96.4v32a22.7 22.7 0 0 1-12.8 20.4 81 81 0 0 1-35.3 8.2z"
  })), _path314 || (_path314 = /*#__PURE__*/React.createElement("path", {
    fill: "#ccc",
    d: "M206.3 270h48.3v-53.5h-48.3z"
  })), _path315 || (_path315 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.5,
    d: "M206.3 270h48.3v-53.5h-48.3z"
  })), _path316 || (_path316 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M206.3 302c0 12.6-10.7 22.9-24 22.9s-24.2-10.3-24.2-23v-32h48.2v32"
  })), _path317 || (_path317 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    stroke: "#000",
    strokeWidth: 0.5,
    d: "M168.6 320.9c1.5.8 3.6 2 5.8 2.6l-.1-54.7h-5.7z"
  })), _path318 || (_path318 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 0.5,
    d: "M158 301.6a24.4 24.4 0 0 0 5.5 15v-47.5h-5.4z"
  })), _path319 || (_path319 = /*#__PURE__*/React.createElement("path", {
    fill: "#c7b500",
    stroke: "#000",
    strokeWidth: 0.5,
    d: "M179.4 324.7a26.6 26.6 0 0 0 5.6 0v-55.9h-5.6v56z"
  })), _path320 || (_path320 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    stroke: "#000",
    strokeWidth: 0.5,
    d: "M190 323.5a19 19 0 0 0 5.8-2.5v-52.2H190z"
  })), _path321 || (_path321 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M158.1 270h48.2v-53.5H158z"
  })), _path322 || (_path322 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.5,
    d: "M158.1 270h48.2v-53.5H158z"
  })), _path323 || (_path323 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    stroke: "#000",
    strokeWidth: 0.5,
    d: "M201 316c2.4-2 4.6-6.8 5.4-12.2l.1-35H201l.1 47.3z"
  })), _path324 || (_path324 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.5,
    d: "M206.3 302c0 12.6-10.7 22.9-24 22.9s-24.2-10.3-24.2-23v-32h48.2v32"
  })), _path325 || (_path325 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M254.6 270v32c0 12.6-10.8 22.9-24.1 22.9s-24.2-10.3-24.2-23v-32h48.3"
  })), _path326 || (_path326 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.5,
    d: "M254.6 270v32c0 12.6-10.8 22.9-24.1 22.9s-24.2-10.3-24.2-23v-32h48.3"
  })), _path327 || (_path327 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m215.1 294.1.1.5c0 .6-.5 1-1.1 1a1 1 0 0 1-1.1-1v-.5h-1.5a2.5 2.5 0 0 0 1.8 2.9v3.9h1.6V297a2.6 2.6 0 0 0 1.7-1.6h4.4v-1.2zm21.8 0v1.2h-4a2.5 2.5 0 0 1-.3.6l4.6 5.2-1.2 1-4.6-5.3-.2.1v8.7h-1.6V297h-.2l-4.8 5.2-1.2-1 4.7-5.3a2 2 0 0 1-.2-.4h-4V294h13zm2.6 0v1.2h4.4c.3.8.9 1.4 1.7 1.6v3.9h1.6V297a2.5 2.5 0 0 0 1.8-2.4 2 2 0 0 0 0-.5h-1.6l.1.5c0 .6-.5 1-1 1-.7 0-1.2-.4-1.2-1a1 1 0 0 1 .1-.5zm-6.7 22.1a15.6 15.6 0 0 0 3.7-1l.8 1.4a17.6 17.6 0 0 1-4.3 1.2 2.6 2.6 0 0 1-2.6 2 2.6 2.6 0 0 1-2.5-2 17.5 17.5 0 0 1-4.6-1.2l.8-1.4c1.3.5 2.6.9 4 1a2.5 2.5 0 0 1 1.5-1.3v-6.7h1.6v6.7c.7.2 1.3.7 1.6 1.4zm-11-2.2-.8 1.4a16.6 16.6 0 0 1-3.6-3.1c-.9.2-1.8 0-2.5-.5a2.4 2.4 0 0 1-.3-3.5l.1-.1a15.3 15.3 0 0 1-1.3-4.8h1.7a13.1 13.1 0 0 0 1 4c.5 0 1 0 1.4.2l4.1-4.5 1.3 1-4.1 4.5c.5.9.5 2-.1 2.8a15.2 15.2 0 0 0 3.1 2.6m-6-4.8c.3-.4 1-.5 1.5 0s.5 1 .1 1.4a1.2 1.2 0 0 1-1.6.1 1 1 0 0 1 0-1.5m-2.2-4.5-1.6-.3-.3-4.3 1.7-.6v2.5c0 1 0 1.8.2 2.7m1.4-5.3 1.7.4v2.2c0-.8.3 2.1.3 2.1l-1.7.6a14 14 0 0 1-.3-2.7zm5.6 13.7a15.7 15.7 0 0 0 4.8 2.6l.4-1.6a13.7 13.7 0 0 1-4-2zm-.8 1.4a17.4 17.4 0 0 0 4.8 2.6l-1.2 1.1a18.7 18.7 0 0 1-4-2zm2.2-9.4 1.6.7 3-3.3-1-1.4zm-1.3-1-1-1.4 3-3.3 1.6.7zm18.1 9.9.8 1.4a16.7 16.7 0 0 0 3.6-3.1c.9.2 1.8 0 2.5-.5a2.4 2.4 0 0 0 .3-3.5l-.1-.1a15 15 0 0 0 1.3-4.8h-1.7a13.3 13.3 0 0 1-1 4 3 3 0 0 0-1.4.2l-4.1-4.5-1.3 1 4.1 4.5a2.4 2.4 0 0 0 .1 2.8 15 15 0 0 1-3.1 2.6m6-4.8a1.2 1.2 0 0 0-1.5 0 1 1 0 0 0-.1 1.4 1.2 1.2 0 0 0 1.6.1 1 1 0 0 0 0-1.5m2.2-4.5 1.6-.3.3-4.3-1.7-.6v2.5c0 1 0 1.9-.2 2.8zm-1.4-5.3-1.7.4v2.2c0-.8-.3 2.1-.3 2.1l1.7.6.3-2.7zm-5.6 13.7a15.7 15.7 0 0 1-4.8 2.6l-.4-1.6a13.7 13.7 0 0 0 4-2zm.8 1.4a17.4 17.4 0 0 1-4.8 2.6l1.2 1.1a18.6 18.6 0 0 0 4-2zm-2.2-9.4-1.6.7-2.9-3.3 1-1.4zm1.3-1 1-1.4-3-3.3-1.6.7zm-20.1-8.7.5 1.6h4.5l.5-1.6zm21.1 0-.5 1.6h-4.5l-.5-1.6zm-11.6 21.9c0-.6.5-1 1.1-1a1 1 0 0 1 1.1 1c0 .6-.5 1-1 1a1.1 1.1 0 0 1-1.2-1m1.9-7.8 1.7-.4v-4.3l-1.7-.5zm-1.6 0-1.7-.4v-4.3l1.7-.5z"
  })), _path328 || (_path328 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M211.5 294.2c.2-1 1-1.6 1.8-2V287h1.6v5.3c.8.3 1.5.9 1.7 1.6h4.4v.3h-6a1.2 1.2 0 0 0-1-.6c-.4 0-.7.3-1 .6zm12.2 0v-.3h4.1a2.4 2.4 0 0 1 .2-.3l-5-5.7 1.2-1 5 5.6.2-.1V285h1.6v7.3h.3l4.9-5.5 1.2 1-4.9 5.5.3.6h4v.3zm21.6 0a1.1 1.1 0 0 1 1-.6c.5 0 .8.3 1 .6h1.6c-.2-1-.9-1.6-1.8-2V287h-1.6v5.3c-.8.3-1.4.8-1.7 1.6h-4.4v.3zm-30.2-15 6 6.8 1.3-1-6.1-6.7.3-.6h4.4V276h-4.4a2.6 2.6 0 0 0-2.5-1.7 2.6 2.6 0 0 0-2.7 2.5 2.5 2.5 0 0 0 1.8 2.4v5.2h1.6v-5.2zm32 0v5.3h-1.7v-5.2a2.5 2.5 0 0 1-.4-.2l-6 6.8-1.3-1 6.2-6.9-.1-.3h-4.5V276h4.5a2.6 2.6 0 0 1 2.4-1.7 2.6 2.6 0 0 1 2.7 2.5 2.5 2.5 0 0 1-1.9 2.4zm-16.1 0v3.3h-1.7v-3.2a2.6 2.6 0 0 1-1.7-1.6h-4V276h4a2.6 2.6 0 0 1 2.5-1.7c1.2 0 2.2.7 2.5 1.7h4v1.6h-4a2.5 2.5 0 0 1-1.6 1.6m-17.8 4-1.7.4v4.3l1.7.5zm1.6 0 1.7.4v4.3l-1.7.5zm30.6 0-1.7.4v4.3l1.7.5zm1.6 0 1.7.4v4.3l-1.7.5zm-25.5.8 1.6-.7 2.9 3.3-1 1.4zm-1.3 1-1 1.4 3 3.3 1.6-.7zm18.5-1.1-1.6-.7-3 3.3 1 1.4zm1.2 1 1 1.4-3 3.3-1.5-.7zm-20.3 9 .5-1.6h4.5l.5 1.6zm-6.7-17c0-.6.5-1 1.2-1a1 1 0 0 1 1 1c0 .6-.4 1-1 1a1.1 1.1 0 0 1-1.2-1m12.1.8-.5 1.6H220l-.5-1.6zm0-1.6-.5-1.6H220l-.5 1.6zm15.7 17.8-.5-1.6h-4.5l-.5 1.6zm4.4-17c0-.6.5-1 1.1-1a1 1 0 0 1 1.1 1c0 .6-.5 1-1 1a1.1 1.1 0 0 1-1.2-1m-16.1 0c0-.6.5-1 1.1-1a1 1 0 0 1 1.1 1c0 .6-.5 1-1.1 1a1.1 1.1 0 0 1-1.1-1m6.2.8.5 1.6h4.6l.5-1.6zm0-1.6.5-1.6h4.6l.5 1.6zm-5.9 5-1.7.5v4.3l1.7.5V281m1.7 0 1.6.5v4.3l-1.6.5z"
  })), _path329 || (_path329 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#c8b100",
    strokeWidth: 0.3,
    d: "M232.7 316.3a15.6 15.6 0 0 0 3.7-1.1l.8 1.4a17.6 17.6 0 0 1-4.3 1.2 2.6 2.6 0 0 1-2.6 2 2.6 2.6 0 0 1-2.5-2 17.5 17.5 0 0 1-4.6-1.2l.8-1.4c1.3.5 2.6.9 4 1a2.5 2.5 0 0 1 1.5-1.3v-6.7h1.6v6.7c.7.2 1.3.7 1.6 1.4zm-4.7-20.4a2.3 2.3 0 0 1-.2-.5h-4V294h4a2.6 2.6 0 0 1 .2-.4l-5-5.6 1.2-1 5 5.5a2 2 0 0 1 .2 0V285h1.7v7.3h.2l4.9-5.5 1.2 1-4.9 5.5.3.6h4v1.5h-4c0 .2-.2.4-.3.5l4.7 5.3-1.3 1-4.6-5.3-.2.1v8.7h-1.6V297l-.2-.1-4.8 5.3-1.2-1 4.7-5.3m-12.8-16.7 6 6.8 1.3-1-6.1-6.7.3-.6h4.4V276h-4.4a2.6 2.6 0 0 0-2.5-1.7 2.6 2.6 0 0 0-2.6 2.5 2.5 2.5 0 0 0 1.7 2.4v5.2h1.6v-5.2zm6.5 34.8-.8 1.4a16.6 16.6 0 0 1-3.6-3.1c-.9.2-1.8 0-2.5-.5a2.4 2.4 0 0 1-.3-3.5l.1-.1a15.3 15.3 0 0 1-1.2-4.8h1.6a13.1 13.1 0 0 0 1 4c.5 0 1 0 1.4.2l4.1-4.5 1.3 1-4.1 4.5c.6.9.5 2-.1 2.8a15.2 15.2 0 0 0 3.1 2.6zm-8.4-13.1V297a2.5 2.5 0 0 1-1.8-2.4c0-1 .8-2 1.8-2.4V287h1.6v5.3c.8.2 1.5.8 1.7 1.6h4.4v1.5h-4.4a2.6 2.6 0 0 1-1.6 1.6v3.9h-1.7m2.3 8.3c.4-.4 1.1-.5 1.6 0s.5 1 .1 1.4a1.2 1.2 0 0 1-1.6.1 1 1 0 0 1 0-1.5zm-2-4.5-1.7-.3-.3-4.3 1.7-.6v2.5c0 1 0 1.8.3 2.7zm1.4-5.3 1.6.4v2.2c0-.8.3 2.1.3 2.1l-1.7.6-.3-2.7v-2.6zm5.5 13.7a15.7 15.7 0 0 0 4.8 2.6l.4-1.6a13.7 13.7 0 0 1-4-2l-1.2 1m-.8 1.4a17.4 17.4 0 0 0 4.8 2.6l-1.2 1.1a18.7 18.7 0 0 1-4-2l.4-1.7"
  })), _path330 || (_path330 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#c8b100",
    strokeWidth: 0.3,
    d: "m221.9 305.1 1.6.7 3-3.3-1-1.4-3.6 4m-1.3-1-1-1.4 3-3.3 1.6.7-3.6 4m-7.6-9.5c0-.6.5-1 1-1 .7 0 1.2.5 1.2 1 0 .6-.5 1.1-1.1 1.1a1 1 0 0 1-1.1-1zm25.7 19.4.8 1.4a16.7 16.7 0 0 0 3.6-3.1c.9.2 1.8 0 2.6-.5a2.4 2.4 0 0 0 .2-3.5l-.1-.1a15 15 0 0 0 1.3-4.8h-1.7a13.3 13.3 0 0 1-1 4 3 3 0 0 0-1.4.2l-4.1-4.5-1.3 1 4.1 4.5a2.4 2.4 0 0 0 .1 2.8 15 15 0 0 1-3 2.6zm8.4-13.1V297a2.5 2.5 0 0 0 1.8-2.4c0-1-.7-2-1.8-2.4V287h-1.6v5.3c-.8.2-1.4.8-1.7 1.6h-4.4v1.5h4.4c.3.8.9 1.3 1.7 1.6v3.9zm-2.3 8.3a1.2 1.2 0 0 0-1.6 0 1 1 0 0 0-.1 1.4 1.2 1.2 0 0 0 1.6.1 1 1 0 0 0 0-1.5zm2-4.5 1.7-.3.3-4.3-1.7-.6v2.5c0 1 0 1.8-.2 2.7zm-1.3-5.3-1.7.4v2.2c0-.8-.3 2.1-.3 2.1l1.7.6.3-2.7v-2.6m1.6-20.1v5.2h-1.6v-5.2a2.3 2.3 0 0 1-.4-.2l-6 6.8-1.2-1 6-7v-.2h-4.5V276h4.4a2.6 2.6 0 0 1 2.5-1.7 2.6 2.6 0 0 1 2.6 2.5 2.5 2.5 0 0 1-1.8 2.4zm-16 0v3.2h-1.7v-3.2a2.6 2.6 0 0 1-1.7-1.6h-4V276h4c.4-1 1.3-1.7 2.5-1.7s2.2.7 2.5 1.7h4v1.6h-4a2.5 2.5 0 0 1-1.6 1.6zm8.8 33.8a15.7 15.7 0 0 1-4.8 2.6l-.4-1.6a13.7 13.7 0 0 0 4-2l1.2 1m.8 1.4a17.4 17.4 0 0 1-4.8 2.6l1.2 1.1a18.7 18.7 0 0 0 4-2l-.4-1.7m-27.4-31.4-1.7.5v4.3l1.7.5v-5.2m1.7 0 1.6.4v4.3l-1.6.5V283m30.5 0-1.7.5v4.3l1.7.5V283"
  })), _path331 || (_path331 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#c8b100",
    strokeWidth: 0.3,
    d: "m247.1 283.1 1.7.5v4.3l-1.7.5V283m-8.6 22-1.6.7-2.9-3.3 1-1.4 3.5 4m1.3-1 1-1.4-3-3.3-1.6.7 3.6 4m-18.2-20 1.6-.7 3 3.3-1 1.4-3.6-4m-1.3 1-1 1.4 3 3.3 1.6-.7-3.6-4m18.5-1.1-1.6-.7-3 3.3 1 1.4 3.6-4m1.2 1 1 1.4-3 3.2-1.5-.6 3.5-4m-20.3 9 .5-1.6h4.5l.5 1.6h-5.5m0 1.5.5 1.6h4.5l.5-1.6h-5.5M213 277c0-.6.5-1 1.2-1 .6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1-1.2-1zm12.1.8-.5 1.6h-4.5l-.5-1.6h5.5m0-1.6-.5-1.6h-4.5l-.5 1.6h5.5m20.1 18.5c0-.5.5-1 1.1-1s1.1.5 1.1 1c0 .6-.5 1.1-1 1.1a1 1 0 0 1-1.2-1zm-4.4-.7-.5-1.6h-4.5l-.5 1.6h5.5m0 1.5-.5 1.6h-4.5l-.5-1.6h5.5m-11.6 21.9c0-.6.5-1 1.1-1s1.1.4 1.1 1-.5 1-1 1a1.1 1.1 0 0 1-1.2-1zm1.9-7.8 1.7-.4v-4.3l-1.7-.5v5.2m-1.6 0-1.7-.4v-4.3l1.7-.5v5.2m15.7-32.6c0-.6.5-1 1.1-1a1 1 0 0 1 1.1 1c0 .6-.5 1-1 1a1.1 1.1 0 0 1-1.2-1zm-16.1 0c0-.6.5-1 1.1-1a1 1 0 0 1 1.1 1c0 .6-.5 1-1 1a1.1 1.1 0 0 1-1.2-1zm6.2.8.5 1.6h4.6l.5-1.6h-5.5m0-1.6.4-1.6h4.6l.5 1.6h-5.5m-6 5-1.6.5v4.3l1.6.5V281m1.7 0 1.6.5v4.3l-1.6.5V281"
  })), _path332 || (_path332 = /*#__PURE__*/React.createElement("path", {
    fill: "#058e6e",
    d: "M227.7 294.7a2.6 2.6 0 0 1 2.6-2.5 2.6 2.6 0 0 1 2.6 2.5 2.6 2.6 0 0 1-2.6 2.4c-1.4 0-2.6-1-2.6-2.4"
  })), _path333 || (_path333 = /*#__PURE__*/React.createElement("path", {
    fill: "#db4446",
    d: "M230.9 229.7v-.6l.1-.3-2.3-.1a5.9 5.9 0 0 1-2.3-1.2c-.8-.7-1.1-1-1.6-1.2-1.3-.2-2.3.4-2.3.4s1 .4 1.7 1.3 1.5 1.3 1.8 1.4c.6.2 2.6 0 3.1.1z"
  })), _path334 || (_path334 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M230.9 229.7v-.6l.1-.3-2.3-.1a5.9 5.9 0 0 1-2.3-1.2c-.8-.7-1.1-1-1.6-1.2-1.3-.2-2.3.4-2.3.4s1 .4 1.7 1.3 1.5 1.3 1.8 1.4c.6.2 2.6 0 3.1.1z"
  })), _path335 || (_path335 = /*#__PURE__*/React.createElement("path", {
    fill: "#ed72aa",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M238.1 227.5v1.4c.2.6-.1 1.2 0 1.5 0 .4.1.6.3.9l.2.9-.7-.5-.6-.4v1c.1.2.3.8.6 1.1l1 1.3c.2.5.1 1.4.1 1.4s-.4-.7-.8-.8l-1.2-.7s.7.8.7 1.5c0 .8-.3 1.6-.3 1.6s-.3-.7-.8-1.1l-1-.9s.4 1.2.4 2v2.3l-.9-1-1-.7c0-.2.5.6.6 1.1 0 .5.3 2.3 1.8 4.5 1 1.3 2.3 3.6 5.3 2.9 3-.8 1.9-4.8 1.3-6.7a16.8 16.8 0 0 1-1-4.6c0-.8.6-2.9.5-3.3a8 8 0 0 1 .2-3.1c.4-1.3.7-1.8.9-2.3.2-.6.4-.9.4-1.3l.1-1.3.7 1.3.1 1.5s.1-1 1-1.6c.8-.6 1.8-1.1 2-1.4.3-.3.3-.5.3-.5s0 1.8-.6 2.6l-1.7 2s.7-.3 1.2-.3h.9s-.6.4-1.4 1.6c-.8 1-.5 1.2-1 2.1-.6 1-1 1-1.7 1.5-1 .8-.5 4.2-.4 4.7.2.5 2 4.5 2 5.5s.2 3.2-1.5 4.6c-1.1 1-3 1-3.4 1.2-.4.3-1.2 1.1-1.2 2.8s.6 2 1 2.4c.6.5 1.2.2 1.3.6.2.3.2.5.5.7.2.2.3.4.2.8 0 .3-.8 1.1-1.1 1.7l-.8 2.4c0 .2-.1 1 .1 1.3 0 0 .9 1 .3 1.2-.4.2-.8-.2-1-.2l-.9.5c-.3-.1-.3-.3-.4-.8l-.1-.7c-.2 0-.3.2-.4.5 0 .2 0 .8-.3.8-.2 0-.5-.4-.8-.5-.2 0-.8-.2-.8-.4 0-.3.4-.9.7-1 .4 0 .8-.3.5-.5s-.5-.2-.7 0-.8 0-.7-.2v-.8c0-.2-.4-.5.1-.8.6-.3.8.2 1.4.1.6 0 .8-.3 1-.6s.2-1-.2-1.4c-.4-.5-.7-.5-.9-.8l-.3-.9v2.2l-.7-.8c-.3-.3-.6-1.3-.6-1.3v1.3c0 .4.3.7.2.8s-.8-.7-1-.8a3.7 3.7 0 0 1-1-1l-.4-1.4a4.2 4.2 0 0 1 0-1.5l.4-1h-1.4c-.7 0-1.2-.3-1.5.2s-.2 1.5.2 2.8c.3 1.2.5 1.9.4 2.1a3 3 0 0 1-.7.8h-.9a2.5 2.5 0 0 0-1.2-.3h-1.3l-1.1-.3c-.3.1-.8.3-.6.7.2.6-.2.7-.5.7l-.9-.2c-.4-.1-.9 0-.8-.4 0-.4.2-.4.4-.7s.2-.5 0-.5h-.6c-.2.2-.5.5-.8.4-.2-.1-.4-.4-.4-1s-.7-1.2 0-1.1c.5 0 1.3.4 1.4 0 .2-.3 0-.4-.2-.7s-.8-.4-.3-.7l.7-.5c.1-.2.4-.8.7-.6.6.2 0 .7.6 1.3.6.7 1 1 2 .8 1 0 1.3-.2 1.3-.5l-.1-1v-1s-.4.3-.5.6l-.4.8v-2a8 8 0 0 0-.2-.8l-.3.9-.1 1s-.7-.5-.5-1.5c.1-.7-.1-1.6.1-2 .2-.3.7-1.5 2-1.6h2.6l2-.3s-2.8-1.4-3.5-1.9a9.5 9.5 0 0 1-2-2l-.6-1.6s-.5 0-1 .3a5 5 0 0 0-1.2 1l-.7 1 .1-1.2v-.8s-.4 1.2-1 1.7l-1.4 1v-.8l.2-1s-.4.8-1.1 1c-.7 0-1.8 0-1.9.4 0 .5.2 1 0 1.4 0 .3-.4.5-.4.5l-.8-.4c-.4 0-.7.2-.7.2s-.3-.4-.2-.7c.1-.2.7-.6.5-.8l-.8.2c-.3.1-.8.3-.8-.2 0-.4.2-.7 0-1 0-.3 0-.5.2-.6l1.2-.1c0-.2-.2-.5-.8-.6s-.8-.5-.5-.8c.3-.2.3-.3.5-.6.1-.2.2-.7.7-.5.5.3.4.8 1 1a4 4 0 0 0 2-.2l1.5-1 1.5-1-1-.8c-.3-.3-.7-.9-1-1a8.3 8.3 0 0 0-1.8-.6 9 9 0 0 1-1.7-.5l.8-.3c.2-.2.6-.6.8-.6h.3-1.4c-.3-.1-1-.6-1.3-.6l-.8.1s.8-.4 1.4-.5l1-.1s-.9-.3-1.1-.6l-.6-1c-.2-.1-.3-.5-.6-.5l-1 .3q-.6 0-.6-.6l-.1-.5c-.2-.3-.6-.8-.2-1h1.4c0-.2-.5-.6-.8-.8-.4-.2-1-.5-.7-.8l.8-.5c.2-.3.3-1 .7-.7.4.2.8 1.2 1.1 1.1.3 0 .3-.8.3-1 0-.4 0-1 .2-.9.3 0 .5.4 1 .5.4 0 1-.1 1 .2s-.3.7-.6 1-.4 1-.3 1.4c.2.5.7 1.2 1.2 1.4.4.3 1.2.5 1.7.9.5.3 1.7 1.2 2.1 1.3l.8.4s.5-.2 1.1-.2c.7 0 2.1 0 2.6-.2.6-.2 1.3-.6 1-1-.1-.6-1.3-1-1.2-1.4 0-.4.5-.4 1.2-.4.8 0 1.8.1 2-1 .2-1 .2-1.5-.8-1.8-1-.2-1.8-.2-2-1-.2-.7-.4-.9-.2-1.1.3-.2.6-.3 1.4-.4.8 0 1.6 0 1.9-.2.2-.2.3-.7.6-.9s1.4-.4 1.4-.4 1.4.7 2.7 1.7a15 15 0 0 1 2.2 2.1"
  })), _path336 || (_path336 = /*#__PURE__*/React.createElement("path", {
    d: "m228.1 226.8-.2-.6v-.3s.8 0 .7.3c0 .2-.2.2-.3.3z"
  })), _path337 || (_path337 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m228.1 226.8-.2-.6v-.3s.8 0 .7.3c0 .2-.2.2-.3.3z"
  })), _path338 || (_path338 = /*#__PURE__*/React.createElement("path", {
    d: "M232 225.4v-.4s.7 0 1 .3c.5.4.9 1 .9 1l-.8-.4h-.5l-.3-.1v-.3z"
  })), _path339 || (_path339 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.1,
    d: "M232 225.4v-.4s.7 0 1 .3c.5.4.9 1 .9 1l-.8-.4h-.5l-.3-.1v-.3z"
  })), _path340 || (_path340 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m237.3 231.3-.4-.7a8 8 0 0 1-.3-.4"
  })), _path341 || (_path341 = /*#__PURE__*/React.createElement("path", {
    fill: "#db4446",
    d: "M217.4 226.6s.5.4.8.4h.8s.2-.5.1-.8c-.2-1.2-1.2-1.4-1.2-1.4s.3.7.1 1a2 2 0 0 1-.6.8"
  })), _path342 || (_path342 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M217.4 226.6s.5.4.8.4h.8s.2-.5.1-.8c-.2-1.2-1.2-1.4-1.2-1.4s.3.7.1 1a2 2 0 0 1-.6.8z"
  })), _path343 || (_path343 = /*#__PURE__*/React.createElement("path", {
    fill: "#db4446",
    d: "M215.2 227.6s-.4-.7-1.3-.6c-.8 0-1.4.8-1.4.8h1.2c.3.3.4 1 .4 1l.7-.6a7 7 0 0 0 .4-.6"
  })), _path344 || (_path344 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M215.2 227.6s-.4-.7-1.3-.6c-.8 0-1.4.8-1.4.8h1.2c.3.3.4 1 .4 1l.7-.6a7 7 0 0 0 .4-.6z"
  })), _path345 || (_path345 = /*#__PURE__*/React.createElement("path", {
    fill: "#db4446",
    d: "M214.2 230.6s-.8.1-1.2.6-.3 1.3-.3 1.3.4-.5.9-.5l1 .2-.1-.8z"
  })), _path346 || (_path346 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M214.2 230.6s-.8.1-1.2.6-.3 1.3-.3 1.3.4-.5.9-.5l1 .2-.1-.8z"
  })), _path347 || (_path347 = /*#__PURE__*/React.createElement("path", {
    d: "m228.2 230.5.3-.5.3.5z"
  })), _path348 || (_path348 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m228.2 230.5.3-.5.3.5h-.7"
  })), _path349 || (_path349 = /*#__PURE__*/React.createElement("path", {
    d: "m229 230.5.3-.5.4.5z"
  })), _path350 || (_path350 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m229 230.5.3-.5.4.5h-.8"
  })), _path351 || (_path351 = /*#__PURE__*/React.createElement("path", {
    d: "m228.6 227.3.8.3-.7.4-.1-.6"
  })), _path352 || (_path352 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m228.6 227.3.8.3-.7.4-.1-.6"
  })), _path353 || (_path353 = /*#__PURE__*/React.createElement("path", {
    d: "m229.5 227.6.7.2-.5.4z"
  })), _path354 || (_path354 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m229.5 227.6.7.2-.5.4-.2-.6"
  })), _path355 || (_path355 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M224.2 233.7s-.7.2-1 .6c-.4.5-.3 1-.3 1s.6-.5 1.5-.3l1.2.3 1.3-.3s-.7.8-.7 1.3l.2 1.1c0 .7-.6 1.6-.6 1.6l1-.3a4.6 4.6 0 0 0 1.7-.8l.9-1s-.2 1 0 1.4l.2 1.6.8-.6c.2-.1.7-.4.9-.7l.3-1s0 .8.4 1.3l.6 1.6s.3-.8.6-1.1c.3-.4.7-.8.7-1a4.3 4.3 0 0 0-.1-.9l.4.8m-11 .6s.5-.8 1-1l1.1-.8.9-.4m1 5 1.3-.8a4 4 0 0 0 1-1"
  })), _path356 || (_path356 = /*#__PURE__*/React.createElement("path", {
    fill: "#db4446",
    d: "M216.6 240.4s-.4-.5-1.1-.3c-.7 0-1.2.9-1.2.9s.6-.2 1-.1.6.4.6.4l.4-.4z"
  })), _path357 || (_path357 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M216.6 240.4s-.4-.5-1.1-.3c-.7 0-1.2.9-1.2.9s.6-.2 1-.1.6.4.6.4l.4-.4z"
  })), _path358 || (_path358 = /*#__PURE__*/React.createElement("path", {
    fill: "#db4446",
    d: "M215.8 243.2s-.6 0-1.1.3c-.5.4-.5 1.2-.5 1.2s.4-.4.8-.3l.9.2v-.6c.2-.4-.1-.8-.1-.8"
  })), _path359 || (_path359 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M215.8 243.2s-.6 0-1.1.3c-.5.4-.5 1.2-.5 1.2s.4-.4.8-.3l.9.2v-.6c.2-.4-.1-.8-.1-.8z"
  })), _path360 || (_path360 = /*#__PURE__*/React.createElement("path", {
    fill: "#db4446",
    d: "M217.2 245.8s0 .8.3 1.3c.4.5 1.1.5 1.1.5l-.3-.7c0-.4.3-.8.3-.8s-.3-.3-.7-.3z"
  })), _path361 || (_path361 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M217.2 245.8s0 .8.3 1.3c.4.5 1.1.5 1.1.5l-.3-.7c0-.4.3-.8.3-.8s-.3-.3-.7-.3zm16 1.3s2 1.2 1.9 2.2c0 1-1 2.3-1 2.3"
  })), _path362 || (_path362 = /*#__PURE__*/React.createElement("path", {
    fill: "#db4446",
    d: "M224.2 252.6s-.4-.6-1.1-.6-1.4.7-1.4.7.8-.1 1 .2l.5.6.5-.3z"
  })), _path363 || (_path363 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M224.2 252.6s-.4-.6-1.1-.6-1.4.7-1.4.7.8-.1 1 .2l.5.6.5-.3z"
  })), _path364 || (_path364 = /*#__PURE__*/React.createElement("path", {
    fill: "#db4446",
    d: "M222.2 255.3s-1-.1-1.4.3c-.4.5-.4 1.3-.4 1.3s.6-.6 1-.5c.5 0 1 .3 1 .3v-.7l-.3-.7"
  })), _path365 || (_path365 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M222.2 255.3s-1-.1-1.4.3c-.4.5-.4 1.3-.4 1.3s.6-.6 1-.5c.5 0 1 .3 1 .3v-.7l-.3-.7z"
  })), _path366 || (_path366 = /*#__PURE__*/React.createElement("path", {
    fill: "#db4446",
    d: "M224 258.1s-.3.7 0 1.1c.3.5 1 .8 1 .8s-.3-.4-.2-.8c.1-.3.7-.8.7-.8l-1.4-.2"
  })), _path367 || (_path367 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M224 258.1s-.3.7 0 1.1c.3.5 1 .8 1 .8s-.3-.4-.2-.8c.1-.3.7-.8.7-.8l-1.4-.2z"
  })), _path368 || (_path368 = /*#__PURE__*/React.createElement("path", {
    fill: "#db4446",
    d: "M236 259.3s-.8-.2-1.2 0c-.5.3-.8 1.4-.8 1.4s.7-.6 1.2-.5c.5 0 1 .3 1 .3v-.8z"
  })), _path369 || (_path369 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M236 259.3s-.8-.2-1.2 0c-.5.3-.8 1.4-.8 1.4s.7-.6 1.2-.5c.5 0 1 .3 1 .3v-.8z"
  })), _path370 || (_path370 = /*#__PURE__*/React.createElement("path", {
    fill: "#db4446",
    d: "M236.4 262.2s-.6.6-.4 1.1l.6 1s0-.7.2-1l1-.3-.7-.5a16 16 0 0 1-.7-.3"
  })), _path371 || (_path371 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M236.4 262.2s-.6.6-.4 1.1l.6 1s0-.7.2-1l1-.3-.7-.5a16 16 0 0 1-.7-.3z"
  })), _path372 || (_path372 = /*#__PURE__*/React.createElement("path", {
    fill: "#db4446",
    d: "M239.4 263s-.3.8.2 1.3c.6.5 1 .5 1 .5s-.3-.7-.2-1.1c.1-.5.5-.7.5-.7l-.8-.2-.7.3"
  })), _path373 || (_path373 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M239.4 263s-.3.8.2 1.3c.6.5 1 .5 1 .5s-.3-.7-.2-1.1c.1-.5.5-.7.5-.7l-.8-.2-.7.3z"
  })), _path374 || (_path374 = /*#__PURE__*/React.createElement("path", {
    fill: "#ffd691",
    stroke: "#000",
    strokeWidth: 0.5,
    d: "M208.8 316.4c2 .6 3 2 3 3.8 0 2.3-2.2 4-5 4-3 0-5.3-1.7-5.3-4 0-1.7 1-3.6 3-3.8l-.2-.4-.7-.7h1.2l.8.5.5-.7c.3-.4.6-.5.6-.5l.6.6.3.5.7-.4.8-.3s0 .4-.2.7l-.1.7"
  })), _path375 || (_path375 = /*#__PURE__*/React.createElement("path", {
    fill: "#058e6e",
    stroke: "#000",
    strokeWidth: 0.5,
    d: "M206.3 326.7s-3.8-2.6-5.5-3c-2-.4-4.5 0-5.5 0 0 0 1.2.8 1.8 1.4.5.5 2.3 1.5 3.3 1.8 3 .8 6-.2 6-.2m1 .2s2.4-2.5 5-2.9c3-.4 5 .3 6.2.6l-1.5.8c-.5.3-2 1.5-4 1.6-2 0-4.4-.3-4.8-.2l-.9.1"
  })), _path376 || (_path376 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    stroke: "#000",
    strokeWidth: 0.5,
    d: "M206.7 323.8a4.8 4.8 0 0 1 0-7.1 4.8 4.8 0 0 1 1.5 3.5 4.9 4.9 0 0 1-1.5 3.6"
  })), _path377 || (_path377 = /*#__PURE__*/React.createElement("path", {
    fill: "#058e6e",
    stroke: "#000",
    strokeWidth: 0.5,
    d: "M205.7 329s.6-1.5.6-2.7l-.1-2.1h.8s.3 1.1.3 2l-.1 2.4-.7.1-.8.3"
  })), _path378 || (_path378 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M254 190.7c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1 0 .6-.5 1-1 1a1 1 0 0 1-1-1"
  })), _path379 || (_path379 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M254 190.7c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1 0 .6-.5 1-1 1a1 1 0 0 1-1-1z"
  })), _path380 || (_path380 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M255.4 188.2c0-.6.5-1 1.1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path381 || (_path381 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M255.4 188.2c0-.6.5-1 1.1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path382 || (_path382 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M256.4 185.2c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1"
  })), _path383 || (_path383 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M256.4 185.2c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1z"
  })), _path384 || (_path384 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M256.5 182c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1 0 .6-.5 1-1 1a1 1 0 0 1-1-1"
  })), _path385 || (_path385 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M256.5 182c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1 0 .6-.5 1-1 1a1 1 0 0 1-1-1z"
  })), _path386 || (_path386 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M255.7 179c0-.6.5-1 1-1 .7 0 1.2.4 1.2 1s-.5 1-1.1 1a1 1 0 0 1-1-1"
  })), _path387 || (_path387 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M255.7 179c0-.6.5-1 1-1 .7 0 1.2.4 1.2 1s-.5 1-1.1 1a1 1 0 0 1-1-1z"
  })), _path388 || (_path388 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M254.1 176.1c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path389 || (_path389 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M254.1 176.1c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path390 || (_path390 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M252 173.8c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path391 || (_path391 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M252 173.8c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path392 || (_path392 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M249.4 171.8c0-.5.5-1 1.1-1a1 1 0 0 1 0 2c-.6 0-1-.4-1-1"
  })), _path393 || (_path393 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M249.4 171.8c0-.5.5-1 1.1-1a1 1 0 0 1 0 2c-.6 0-1-.4-1-1z"
  })), _path394 || (_path394 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M246.5 170.3c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path395 || (_path395 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M246.5 170.3c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path396 || (_path396 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M243.3 169.1c0-.5.5-1 1.1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1"
  })), _path397 || (_path397 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M243.3 169.1c0-.5.5-1 1.1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1z"
  })), _path398 || (_path398 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M239.9 168.5c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path399 || (_path399 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M239.9 168.5c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path400 || (_path400 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M236.6 168.3c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path401 || (_path401 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M236.6 168.3c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path402 || (_path402 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M233.3 168.5c0-.6.5-1 1-1 .7 0 1.1.4 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path403 || (_path403 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M233.3 168.5c0-.6.5-1 1-1 .7 0 1.1.4 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path404 || (_path404 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M230.1 168.5c0-.6.5-1 1-1 .6 0 1.1.4 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1"
  })), _path405 || (_path405 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M230.1 168.5c0-.6.5-1 1-1 .6 0 1.1.4 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1z"
  })), _path406 || (_path406 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M231.7 171.2c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1m.6 3.1c0-.6.4-1 1-1s1 .4 1 1c0 .5-.4 1-1 1a1 1 0 0 1-1-1m0 3c0-.5.6-1 1.1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1m-1 2.8c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1 0 .6-.4 1-1 1a1 1 0 0 1-1-1m-1.9 2.6c0-.5.5-1 1-1 .7 0 1.2.5 1.2 1s-.5 1-1.1 1-1-.4-1-1"
  })), _path407 || (_path407 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M227.6 166.5c0-.5.5-1 1.1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1"
  })), _path408 || (_path408 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M227.6 166.5c0-.5.5-1 1.1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1z"
  })), _path409 || (_path409 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M224.8 165c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path410 || (_path410 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M224.8 165c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path411 || (_path411 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M221.6 164c0-.6.5-1 1-1 .6 0 1.1.4 1.1 1 0 .5-.5 1-1 1-.6 0-1.1-.5-1.1-1"
  })), _path412 || (_path412 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M221.6 164c0-.6.5-1 1-1 .6 0 1.1.4 1.1 1 0 .5-.5 1-1 1-.6 0-1.1-.5-1.1-1z"
  })), _path413 || (_path413 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M218.3 163.4c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1"
  })), _path414 || (_path414 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M218.3 163.4c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1z"
  })), _path415 || (_path415 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M215 163.5c0-.6.5-1 1.1-1s1 .4 1 1c0 .5-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path416 || (_path416 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M215 163.5c0-.6.5-1 1.1-1s1 .4 1 1c0 .5-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path417 || (_path417 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M211.7 164c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path418 || (_path418 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M211.7 164c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path419 || (_path419 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M208.6 165.1c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1"
  })), _path420 || (_path420 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M208.6 165.1c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1z"
  })), _path421 || (_path421 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M156 190.7c0-.5.4-1 1-1s1 .5 1 1c0 .6-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path422 || (_path422 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M156 190.7c0-.5.4-1 1-1s1 .5 1 1c0 .6-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path423 || (_path423 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M154.5 188.2c0-.6.5-1 1-1 .6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path424 || (_path424 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M154.5 188.2c0-.6.5-1 1-1 .6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path425 || (_path425 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M153.5 185.2c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path426 || (_path426 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M153.5 185.2c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path427 || (_path427 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M153.4 182c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1 0 .6-.5 1-1 1a1 1 0 0 1-1-1"
  })), _path428 || (_path428 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M153.4 182c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1 0 .6-.5 1-1 1a1 1 0 0 1-1-1z"
  })), _path429 || (_path429 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M154.2 179c0-.6.5-1 1-1 .6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path430 || (_path430 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M154.2 179c0-.6.5-1 1-1 .6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path431 || (_path431 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M155.8 176.1c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1s-.5 1-1 1a1 1 0 0 1-1-1"
  })), _path432 || (_path432 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M155.8 176.1c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1s-.5 1-1 1a1 1 0 0 1-1-1z"
  })), _path433 || (_path433 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M158 173.8c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path434 || (_path434 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M158 173.8c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path435 || (_path435 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M160.5 171.8c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path436 || (_path436 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M160.5 171.8c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path437 || (_path437 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M163.5 170.3c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path438 || (_path438 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M163.5 170.3c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path439 || (_path439 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M166.6 169.1c0-.5.5-1 1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1"
  })), _path440 || (_path440 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M166.6 169.1c0-.5.5-1 1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1z"
  })), _path441 || (_path441 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M170 168.5c0-.5.5-1 1.1-1a1 1 0 0 1 0 2c-.6 0-1-.4-1-1"
  })), _path442 || (_path442 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M170 168.5c0-.5.5-1 1.1-1a1 1 0 0 1 0 2c-.6 0-1-.4-1-1z"
  })), _path443 || (_path443 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M173.4 168.3c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path444 || (_path444 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M173.4 168.3c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path445 || (_path445 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M176.6 168.5c0-.6.5-1 1-1 .6 0 1.1.4 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1"
  })), _path446 || (_path446 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M176.6 168.5c0-.6.5-1 1-1 .6 0 1.1.4 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1z"
  })), _path447 || (_path447 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M179.8 168.5c0-.6.5-1 1-1 .7 0 1.2.4 1.2 1s-.5 1-1.1 1a1 1 0 0 1-1-1"
  })), _path448 || (_path448 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M179.8 168.5c0-.6.5-1 1-1 .7 0 1.2.4 1.2 1s-.5 1-1.1 1a1 1 0 0 1-1-1z"
  })), _path449 || (_path449 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M178.2 171.2c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1m-.7 3.1c0-.6.4-1 1-1s1 .4 1 1c0 .5-.4 1-1 1a1 1 0 0 1-1-1m-.2 3c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1m.9 2.8c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1 0 .6-.5 1-1 1a1 1 0 0 1-1.1-1m1.8 2.6c0-.5.5-1 1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1"
  })), _path450 || (_path450 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M182.3 166.5c0-.5.5-1 1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1"
  })), _path451 || (_path451 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M182.3 166.5c0-.5.5-1 1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1z"
  })), _path452 || (_path452 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M185.2 165c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path453 || (_path453 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M185.2 165c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path454 || (_path454 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M188.3 164c0-.6.5-1 1-1 .7 0 1.1.4 1.1 1 0 .5-.4 1-1 1s-1-.5-1-1"
  })), _path455 || (_path455 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M188.3 164c0-.6.5-1 1-1 .7 0 1.1.4 1.1 1 0 .5-.4 1-1 1s-1-.5-1-1z"
  })), _path456 || (_path456 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M191.6 163.4c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path457 || (_path457 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M191.6 163.4c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path458 || (_path458 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M194.9 163.5c0-.6.4-1 1-1s1 .4 1 1c0 .5-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path459 || (_path459 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M194.9 163.5c0-.6.4-1 1-1s1 .4 1 1c0 .5-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path460 || (_path460 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M198.2 164c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path461 || (_path461 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M198.2 164c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path462 || (_path462 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M201.3 165.1c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1"
  })), _path463 || (_path463 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M201.3 165.1c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1z"
  })), _path464 || (_path464 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M174.7 228.9h-1v-1h-1.5v3.6h1.6v2.5h-3.4v7h1.8v14.3h-3.5v7.3h27.2v-7.3h-3.5V241h1.8v-7h-3.4v-2.5h1.6V228h-1.6v.9h-.8v-1h-1.6v1h-1.1v-1h-1.6v3.6h1.6v2.5H184v-7.8h1.7v-3.5H184v.9h-1v-1h-1.5v1h-.9v-1H179v3.6h1.7v7.8h-3.3v-2.5h1.6V228h-1.6v.9h-.9v-1h-1.8zm-6 33.7H196m-27.3-1.8H196m-27.3-1.8H196m-27.3-1.7H196m-27.3-2H196m-23.8-1.6h20.2m-20.2-1.8h20.2m-20.2-2h20.2m-20.2-1.7h20.2m-20.2-1.8h20.2m-20.2-1.8h20.2m-20.2-1.7h20.2m-22-1.8h23.8m-23.8-1.8h23.8m-23.8-1.8h23.8m-23.8-1.8h23.8m-20.4-1.7h17m-10.2-1.8h3.4m-3.4-1.8h3.4m-3.4-1.8h3.4m-3.4-1.7h3.4m-5.1-2.2h6.8m-12 7.5h3.6m-5-2.2h6.6m-6.7 32.6v-1.8m0-1.8v-1.7m-1.8 1.7v1.8m3.4 0V259m1.7 3.6v-1.8m0-1.8v-1.7m0-2v-1.6m0-1.8v-2m-1.7 7.4v-2m-3.4 2v-2m7 0v2m1.5-2v-1.6m-5.1-1.8v1.8m3.5-1.8v1.8m3.3-1.8v1.8M179 252v-2m1.7-1.7v1.7m0-5.3v1.8m-1.7-3.6v1.8m1.7-3.5v1.7m-3.3-1.7v1.7m-3.5-1.7v1.7m-1.6-3.5v1.8m3.3-1.8v1.8m3.4-1.8v1.8m1.7-3.6v1.8m-3.3-1.8v1.8m-3.5-1.8v1.8m-1.6-3.6v1.8m6.7-1.8v1.8m-3.4-5.3v1.8m15.3-1.8h-3.5m5-2.2h-6.6m6.7 32.6v-1.8m0-1.8v-1.7m1.8 1.7v1.8m-3.4 0V259m-1.7 3.6v-1.8m0-1.8v-1.7m0-2v-1.6m0-1.8v-2m1.7 7.4v-2m3.4 2v-2m-7 0v2m-1.5-2v-1.6m5.1-1.8v1.8m-3.5-1.8v1.8m-3.3-1.8v1.8m1.7-1.8v-2m-1.7-1.7v1.7m0-5.3v1.8m1.7-3.6v1.8m-1.7-3.5v1.7m3.3-1.7v1.7m3.5-1.7v1.7m1.6-3.5v1.8m-3.3-1.8v1.8m-3.4-1.8v1.8m-1.7-3.6v1.8m3.3-1.8v1.8m3.5-1.8v1.8m1.6-3.6v1.8m-6.7-1.8v1.8m3.4-5.3v1.8m-7 18v-2m0-5.4v-1.8m0 5.4v-1.8m0-5.3v-1.8m0-1.8v-1.7m0-3.6v-1.8m0-1.7v-1.8m-8.3 4.6h3.5m3.3-5.3h3.4m3.3 5.3h3.5"
  })), _path465 || (_path465 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "M186.8 262.6v-4.7c0-.8-.4-3.5-4.6-3.5-4 0-4.4 2.7-4.4 3.5v4.7z"
  })), _path466 || (_path466 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    stroke: "#000",
    strokeWidth: 0.4,
    d: "m179.3 258.2-2.2-.3c0-.9.2-2.2.9-2.6l2 1.5c-.3.2-.7 1-.7 1.4zm6 0 2.2-.3c0-.9-.2-2.2-.9-2.6l-2 1.5c.3.2.7 1 .7 1.4zm-2.2-2.3 1-2a5.3 5.3 0 0 0-2-.4l-1.7.4 1.1 2zm-4.2-5.5v-4.9c0-1.3-1-2.4-2.5-2.4s-2.4 1-2.4 2.4v4.9zm6.8 0v-4.9c0-1.3 1-2.4 2.5-2.4s2.4 1 2.4 2.4v4.9zm-1.7-12 .4-4.4h-4.2l.2 4.4zm3.3 0-.4-4.4h4.4l-.5 4.4zm-10 0 .2-4.4h-4.2l.5 4.4z"
  })), _path467 || (_path467 = /*#__PURE__*/React.createElement("path", {
    fill: "#0039f0",
    d: "M185.3 262.6v-4c0-.7-.5-2.7-3.1-2.7-2.4 0-2.9 2-2.9 2.7v4zm-6.9-12.7v-4.2c0-1-.6-2.2-2-2.2s-2 1.1-2 2.2v4.3h4zm7.8 0v-4.2c0-1 .7-2.2 2-2.2s2 1.1 2 2.2v4.3h-4z"
  })), _path468 || (_path468 = /*#__PURE__*/React.createElement("path", {
    fill: "#ad1519",
    d: "M190.8 269.8c0-9.7 7-17.6 15.6-17.6s15.6 7.9 15.6 17.6-7 17.5-15.6 17.5-15.6-7.8-15.6-17.5"
  })), _path469 || (_path469 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.6,
    d: "M190.8 269.8c0-9.7 7-17.6 15.6-17.6s15.6 7.9 15.6 17.6-7 17.5-15.6 17.5-15.6-7.8-15.6-17.5z"
  })), _path470 || (_path470 = /*#__PURE__*/React.createElement("path", {
    fill: "#005bbf",
    d: "M195.4 269.7c0-7 5-12.8 11-12.8s11 5.7 11 12.8c0 7.2-5 13-11 13s-11-5.8-11-13"
  })), _path471 || (_path471 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.6,
    d: "M195.4 269.7c0-7 5-12.8 11-12.8s11 5.7 11 12.8c0 7.2-5 13-11 13s-11-5.8-11-13z"
  })), _path472 || (_path472 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M201.2 260.9s-1.3 1.4-1.3 2.7a6 6 0 0 0 .6 2.4c-.2-.5-.8-.8-1.4-.8-.8 0-1.4.6-1.4 1.3l.2.8.5.9c.1-.3.5-.5 1-.5s1 .4 1 1a1 1 0 0 1 0 .2h-1.2v1h1l-.8 1.5 1-.4.8.9.8-.9 1 .4-.7-1.5h1v-1h-1.1a.9.9 0 0 1 0-.3 1 1 0 0 1 1-1c.4 0 .7.3 1 .6l.4-1 .2-.7a1.4 1.4 0 0 0-1.4-1.3c-.7 0-1.2.3-1.4.9 0 0 .6-1.2.6-2.5s-1.4-2.7-1.4-2.7"
  })), _path473 || (_path473 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 0.3,
    d: "M201.2 260.9s-1.3 1.4-1.3 2.7a6 6 0 0 0 .6 2.4c-.2-.5-.8-.8-1.4-.8-.8 0-1.4.6-1.4 1.3l.2.8.5.9c.1-.3.5-.5 1-.5s1 .4 1 1a1 1 0 0 1 0 .2h-1.2v1h1l-.8 1.5 1-.4.8.9.8-.9 1 .4-.7-1.5h1v-1h-1.1a.9.9 0 0 1 0-.3 1 1 0 0 1 1-1c.4 0 .7.3 1 .6l.4-1 .2-.7a1.4 1.4 0 0 0-1.4-1.3c-.7 0-1.2.3-1.4.9 0 0 .6-1.2.6-2.5s-1.4-2.7-1.4-2.7z"
  })), _path474 || (_path474 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M199.2 269.9h4.1v-1h-4.1z"
  })), _path475 || (_path475 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M199.2 269.9h4.1v-1h-4.1z"
  })), _path476 || (_path476 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M211.4 260.9s-1.3 1.4-1.3 2.7.6 2.4.6 2.4c-.2-.5-.7-.8-1.4-.8-.8 0-1.4.6-1.4 1.3l.2.8.5.9c.2-.3.5-.5 1-.5a1 1 0 0 1 1 1 1 1 0 0 1 0 .2h-1.2v1h1l-.8 1.5 1-.4.8.9.8-.9 1 .4-.7-1.5h1v-1h-1.1a.8.8 0 0 1 0-.3 1 1 0 0 1 1-1c.4 0 .8.3 1 .6l.4-1 .2-.7a1.4 1.4 0 0 0-1.4-1.3c-.6 0-1.2.3-1.4.9 0 0 .6-1.2.6-2.5s-1.4-2.7-1.4-2.7"
  })), _path477 || (_path477 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 0.3,
    d: "M211.4 260.9s-1.3 1.4-1.3 2.7.6 2.4.6 2.4c-.2-.5-.7-.8-1.4-.8-.8 0-1.4.6-1.4 1.3l.2.8.5.9c.2-.3.5-.5 1-.5a1 1 0 0 1 1 1 1 1 0 0 1 0 .2h-1.2v1h1l-.8 1.5 1-.4.8.9.8-.9 1 .4-.7-1.5h1v-1h-1.1a.8.8 0 0 1 0-.3 1 1 0 0 1 1-1c.4 0 .8.3 1 .6l.4-1 .2-.7a1.4 1.4 0 0 0-1.4-1.3c-.6 0-1.2.3-1.4.9 0 0 .6-1.2.6-2.5s-1.4-2.7-1.4-2.7z"
  })), _path478 || (_path478 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M209.4 269.9h4.1v-1h-4.1z"
  })), _path479 || (_path479 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M209.4 269.9h4.1v-1h-4.1z"
  })), _path480 || (_path480 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M206.3 269.6s-1.3 1.5-1.3 2.8.6 2.4.6 2.4c-.2-.5-.7-.9-1.4-.9-.8 0-1.4.6-1.4 1.4l.2.7.5 1c.1-.4.5-.6 1-.6a1 1 0 0 1 1 1 .9.9 0 0 1 0 .3h-1.2v1h1l-.8 1.5 1-.4.8.9.8-1 1 .5-.7-1.5h1v-1h-1.1a.9.9 0 0 1 0-.3 1 1 0 0 1 1-1q.6 0 .9.6l.5-1 .2-.7a1.4 1.4 0 0 0-1.4-1.4c-.7 0-1.2.4-1.4 1 0 0 .6-1.2.6-2.5s-1.4-2.7-1.4-2.7"
  })), _path481 || (_path481 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinejoin: "round",
    strokeWidth: 0.3,
    d: "M206.3 269.6s-1.3 1.5-1.3 2.8.6 2.4.6 2.4c-.2-.5-.7-.9-1.4-.9-.8 0-1.4.6-1.4 1.4l.2.7.5 1c.1-.4.5-.6 1-.6a1 1 0 0 1 1 1 .9.9 0 0 1 0 .3h-1.2v1h1l-.8 1.5 1-.4.8.9.8-1 1 .5-.7-1.5h1v-1h-1.1a.9.9 0 0 1 0-.3 1 1 0 0 1 1-1q.6 0 .9.6l.5-1 .2-.7a1.4 1.4 0 0 0-1.4-1.4c-.7 0-1.2.4-1.4 1 0 0 .6-1.2.6-2.5s-1.4-2.7-1.4-2.7z"
  })), _path482 || (_path482 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M204.3 278.6h4.1v-1h-4.1z"
  })), _path483 || (_path483 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M204.3 278.6h4.1v-1h-4.1z"
  })), _path484 || (_path484 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M237.6 223.4h-.3a1.5 1.5 0 0 1-.3.4c-.2.2-.6.2-.8 0a.5.5 0 0 1-.1-.4.5.5 0 0 1-.5 0c-.3-.1-.3-.5-.1-.7v-.5h-.3l-.1.2c-.2.3-.5.3-.7.2a.6.6 0 0 1 0-.2h-.3c-.5.2-.7-1-.7-1.2l-.2.2s.2.7.1 1.2c0 .6-.3 1.2-.3 1.2a9 9 0 0 1 2.9 1.6 9 9 0 0 1 2.2 2.3l1.2-.5c.6-.2 1.3-.2 1.3-.2l.2-.2c-.3 0-1.5.1-1.5-.4v-.2a.7.7 0 0 1-.2 0c-.2-.2-.2-.4 0-.7l.2-.1v-.3h-.3l-.2.1c-.2.3-.6.3-.8 0a.4.4 0 0 1-.1-.4.6.6 0 0 1-.5 0c-.2-.2-.3-.5 0-.8l.2-.3z"
  })), _path485 || (_path485 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M237.6 223.4h-.3a1.5 1.5 0 0 1-.3.4c-.2.2-.6.2-.8 0a.5.5 0 0 1-.1-.4.5.5 0 0 1-.5 0c-.3-.1-.3-.5-.1-.7v-.5h-.3l-.1.2c-.2.3-.5.3-.7.2a.6.6 0 0 1 0-.2h-.3c-.5.2-.7-1-.7-1.2l-.2.2s.2.7.1 1.2c0 .6-.3 1.2-.3 1.2a9 9 0 0 1 2.9 1.6 9 9 0 0 1 2.2 2.3l1.2-.5c.6-.2 1.3-.2 1.3-.2l.2-.2c-.3 0-1.5.1-1.5-.4v-.2a.7.7 0 0 1-.2 0c-.2-.2-.2-.4 0-.7l.2-.1v-.3h-.3l-.2.1c-.2.3-.6.3-.8 0a.4.4 0 0 1-.1-.4.6.6 0 0 1-.5 0c-.2-.2-.3-.5 0-.8l.2-.3z"
  })), _path486 || (_path486 = /*#__PURE__*/React.createElement("path", {
    d: "M235.4 224h.2v.3h-.1c-.1 0-.1-.2 0-.2"
  })), _path487 || (_path487 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.1,
    d: "M235.4 224h.2v.3h-.1c-.1 0-.1-.2 0-.2z"
  })), _path488 || (_path488 = /*#__PURE__*/React.createElement("path", {
    d: "m236.3 224.8-.3-.2v-.2h.1l.4.3.3.2v.2h-.2z"
  })), _path489 || (_path489 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.1,
    d: "m236.3 224.8-.3-.2v-.2h.1l.4.3.3.2v.2h-.2l-.3-.3"
  })), _path490 || (_path490 = /*#__PURE__*/React.createElement("path", {
    d: "m234.6 223.7-.2-.2s-.1 0 0-.1l.3.1.3.1v.2h-.1z"
  })), _path491 || (_path491 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.1,
    d: "m234.6 223.7-.2-.2s-.1 0 0-.1l.3.1.3.1v.2h-.1l-.3-.1"
  })), _path492 || (_path492 = /*#__PURE__*/React.createElement("path", {
    d: "M233.7 223h.2v.2h-.2s-.1-.1 0-.2"
  })), _path493 || (_path493 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.1,
    d: "M233.7 223h.2v.2h-.2s-.1-.1 0-.2z"
  })), _path494 || (_path494 = /*#__PURE__*/React.createElement("path", {
    d: "M237.3 225.5v-.2h-.3l.1.2z"
  })), _path495 || (_path495 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.1,
    d: "M237.3 225.5v-.2h-.3l.1.2z"
  })), _path496 || (_path496 = /*#__PURE__*/React.createElement("path", {
    d: "m237.9 226.2.2.2h.1c.1 0 0-.1 0-.2l-.2-.2-.2-.2h-.1v.2z"
  })), _path497 || (_path497 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.1,
    d: "m237.9 226.2.2.2h.1c.1 0 0-.1 0-.2l-.2-.2-.2-.2h-.1v.2l.2.2"
  })), _path498 || (_path498 = /*#__PURE__*/React.createElement("path", {
    d: "M238.8 227v-.3h-.3v.2h.3"
  })), _path499 || (_path499 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.1,
    d: "M238.8 227v-.3h-.3v.2h.3z"
  })), _path500 || (_path500 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M236.2 221.1h-.6l-.1.9v.1h.2l.7-.5-.3-.5"
  })), _path501 || (_path501 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M236.2 221.1h-.6l-.1.9v.1h.2l.7-.5-.3-.5"
  })), _path502 || (_path502 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M234.6 221.6v.5l.9.1h.1v-.2l-.5-.7z"
  })), _path503 || (_path503 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M234.6 221.6v.5l.9.1h.1v-.2l-.5-.7-.5.3"
  })), _path504 || (_path504 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m236.4 222.6-.4.3-.6-.7v-.1h1.1z"
  })), _path505 || (_path505 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m236.4 222.6-.4.3-.6-.7v-.1h1.1v.5"
  })), _path506 || (_path506 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M235.3 222a.3.3 0 0 1 .4 0 .3.3 0 0 1 0 .3.3.3 0 0 1-.3 0 .3.3 0 0 1-.1-.3"
  })), _path507 || (_path507 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M235.3 222a.3.3 0 0 1 .4 0 .3.3 0 0 1 0 .3.3.3 0 0 1-.3 0 .3.3 0 0 1-.1-.3z"
  })), _path508 || (_path508 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m233.2 221.1-.2-.7-.4-.4s.4-.2.8.1 0 .9 0 .9z"
  })), _path509 || (_path509 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m233.2 221.1-.2-.7-.4-.4s.4-.2.8.1 0 .9 0 .9z"
  })), _path510 || (_path510 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m234.2 221.4-.4.4-.6-.6v-.2h1z"
  })), _path511 || (_path511 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m234.2 221.4-.4.4-.6-.6v-.2h1v.4"
  })), _path512 || (_path512 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m233.1 221 .3-.1v.3c0 .2-.1.2-.2.2z"
  })), _path513 || (_path513 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m233.1 221 .3-.1v.3c0 .2-.1.2-.2.2z"
  })), _path514 || (_path514 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M238.3 222.5h-.5l-.3.7v.2h.2l.8-.4z"
  })), _path515 || (_path515 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M238.3 222.5h-.5l-.3.7v.2h.2l.8-.4-.2-.5"
  })), _path516 || (_path516 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M236.7 222.8v.5l.8.2h.1v-.2l-.4-.7z"
  })), _path517 || (_path517 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M236.7 222.8v.5l.8.2h.1v-.2l-.4-.7-.5.2"
  })), _path518 || (_path518 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m238.4 224-.5.2-.4-.7v-.2h.1l.9.2z"
  })), _path519 || (_path519 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m238.4 224-.5.2-.4-.7v-.2h.1l.9.2-.1.5"
  })), _path520 || (_path520 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M237.3 223.2h.4a.3.3 0 0 1 0 .4.3.3 0 0 1-.3 0 .3.3 0 0 1 0-.4"
  })), _path521 || (_path521 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M237.3 223.2h.4a.3.3 0 0 1 0 .4.3.3 0 0 1-.3 0 .3.3 0 0 1 0-.4z"
  })), _path522 || (_path522 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m240.2 224.3.1.5-.8.3h-.2v-.2l.4-.8z"
  })), _path523 || (_path523 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m240.2 224.3.1.5-.8.3h-.2v-.2l.4-.8.5.2"
  })), _path524 || (_path524 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m240 225.8-.5.1-.3-.8v-.1h.2l.8.3z"
  })), _path525 || (_path525 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m240 225.8-.5.1-.3-.8v-.1h.2l.8.3-.1.5"
  })), _path526 || (_path526 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m238.6 224.3-.2.5.9.3h.1v-.1l-.3-.8z"
  })), _path527 || (_path527 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m238.6 224.3-.2.5.9.3h.1v-.1l-.3-.8-.5.1"
  })), _path528 || (_path528 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M239.5 225.2a.3.3 0 0 0 0-.3.3.3 0 0 0-.4 0 .3.3 0 0 0 0 .3.3.3 0 0 0 .4 0"
  })), _path529 || (_path529 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M239.5 225.2a.3.3 0 0 0 0-.3.3.3 0 0 0-.4 0 .3.3 0 0 0 0 .3.3.3 0 0 0 .4 0z"
  })), _path530 || (_path530 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M240.8 227h.8l.5.3s.1-.4-.3-.7c-.3-.3-.8.2-.8.2z"
  })), _path531 || (_path531 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M240.8 227h.8l.5.3s.1-.4-.3-.7c-.3-.3-.8.2-.8.2z"
  })), _path532 || (_path532 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "m240.3 226.1-.3.5.8.5v-.1h.2l-.1-1z"
  })), _path533 || (_path533 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "m240.3 226.1-.3.5.8.5v-.1h.2l-.1-1-.6.1"
  })), _path534 || (_path534 = /*#__PURE__*/React.createElement("path", {
    fill: "#c8b100",
    d: "M241 227s.1-.1 0-.2h-.3c-.2 0-.2.1-.1.2z"
  })), _path535 || (_path535 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.3,
    d: "M241 227s.1-.1 0-.2h-.3c-.2 0-.2.1-.1.2zm38-21.9v.6h-2.4v-.6h1v-1.3h-.7v-.5h.6v-.6h.6v.6h.6v.6h-.6v1.2h1"
  })), _path536 || (_path536 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M134.4 217.1v-1.2m-.4 1.2v-1.2m-.2 1.2v-1.2m-.3 1.2v-1.2"
  })), _path537 || (_path537 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.1,
    d: "M133.2 217.1v-1.2m-.5 1.1v-1m.2 1v-1m-.7 1v-1m.2 1v-1m-.9 1v-1m.2 1v-1m.3 1v-1m-.7 1v-1m-.3.9v-.8m-.1.8v-.8m-.5.7v-.6m.2.6v-.6m-.4.5v-.5m-.2.5v-.4m-.3.3v-.3m-.3.3v-.2"
  })), _path538 || (_path538 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.2,
    d: "M129.2 216.6v-.2"
  })), _path539 || (_path539 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M135.7 217v-1m-.5 1v-1m-.4 1.2V216m143 1.1V216m-.4 1.1V216m-.3 1.1V216m-.3 1.2V216"
  })), _path540 || (_path540 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.1,
    d: "M276.6 217.1V216m-.6 1v-1m.3 1v-1m-.8 1v-1m.3 1v-1m-.9 1v-1m.2 1v-1m.2 1v-1m-.6 1v-1m-.3.9v-.8m-.2.8v-.8m-.4.7v-.6m.2.6v-.6m-.5.6v-.6m-.2.5v-.4m-.3.4v-.4m-.2.3v-.2"
  })), _path541 || (_path541 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeWidth: 0.2,
    d: "M272.6 216.6v-.2"
  })), _path542 || (_path542 = /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M279.1 217v-1m-.6 1v-1m-.4 1.1V216"
  })));
};

var _path$8, _path2$2, _path3$2;
function _extends$9() { return _extends$9 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$9.apply(null, arguments); }
var SvgFlagDe = function SvgFlagDe(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$9({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 640 480"
  }, props), _path$8 || (_path$8 = /*#__PURE__*/React.createElement("path", {
    fill: "#fc0",
    d: "M0 320h640v160H0z"
  })), _path2$2 || (_path2$2 = /*#__PURE__*/React.createElement("path", {
    fill: "#000001",
    d: "M0 0h640v160H0z"
  })), _path3$2 || (_path3$2 = /*#__PURE__*/React.createElement("path", {
    fill: "red",
    d: "M0 160h640v160H0z"
  })));
};

var _g;
function _extends$8() { return _extends$8 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$8.apply(null, arguments); }
var SvgFlagIt = function SvgFlagIt(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$8({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 640 480"
  }, props), _g || (_g = /*#__PURE__*/React.createElement("g", {
    fillRule: "evenodd",
    strokeWidth: "1pt"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M0 0h640v480H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#009246",
    d: "M0 0h213.3v480H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#ce2b37",
    d: "M426.7 0H640v480H426.7z"
  }))));
};

var _path$7;
function _extends$7() { return _extends$7 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$7.apply(null, arguments); }
var SvgArrowBack = function SvgArrowBack(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$7({
    xmlns: "http://www.w3.org/2000/svg",
    width: 11,
    height: 8,
    fill: "none"
  }, props), _path$7 || (_path$7 = /*#__PURE__*/React.createElement("path", {
    fill: "#2C2C69",
    d: "M10.39 4.002a.874.874 0 0 0-.875-.875H3.098L4.72 1.504a.877.877 0 0 0 0-1.238.877.877 0 0 0-1.238 0L.37 3.38a.88.88 0 0 0-.003 1.24l3.115 3.114c.34.341.894.341 1.238 0a.877.877 0 0 0 0-1.238l-1.621-1.62h6.417a.874.874 0 0 0 .875-.874"
  })));
};

var _path$6;
function _extends$6() { return _extends$6 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$6.apply(null, arguments); }
var SvgMegaphone = function SvgMegaphone(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$6({
    xmlns: "http://www.w3.org/2000/svg",
    width: 21,
    height: 16,
    fill: "currentColor"
  }, props), _path$6 || (_path$6 = /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "m9.989 3.636 4.813-2.75a1.817 1.817 0 0 1 3.38.932v2.637a2.91 2.91 0 0 1 0 5.635v2.637a1.818 1.818 0 0 1-3.38.933L9.99 10.91H7.273v3.272a1.818 1.818 0 1 1-3.637 0v-3.273a3.636 3.636 0 0 1 0-7.273zm6.738-1.818a.364.364 0 0 0-.727 0v10.91a.364.364 0 0 0 .727 0z",
    clipRule: "evenodd"
  })));
};

var _path$5;
function _extends$5() { return _extends$5 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$5.apply(null, arguments); }
var SvgGear = function SvgGear(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$5({
    xmlns: "http://www.w3.org/2000/svg",
    width: 18,
    height: 18,
    fill: "currentColor"
  }, props), _path$5 || (_path$5 = /*#__PURE__*/React.createElement("path", {
    d: "M10.375 17.334h-2.75a.62.62 0 0 1-.406-.146.6.6 0 0 1-.219-.375l-.333-2.104a5.6 5.6 0 0 1-.834-.396 6 6 0 0 1-.77-.521l-1.938.896a.62.62 0 0 1-.458.031.6.6 0 0 1-.354-.302L.938 11.98a.54.54 0 0 1-.063-.438.7.7 0 0 1 .25-.375l1.792-1.313a2.5 2.5 0 0 1-.052-.427 10 10 0 0 1 0-.854q.01-.24.052-.427L1.125 6.834a.7.7 0 0 1-.25-.375.54.54 0 0 1 .063-.438l1.375-2.437a.6.6 0 0 1 .354-.302.62.62 0 0 1 .458.03l1.938.897q.333-.271.77-.521a4.3 4.3 0 0 1 .834-.375L7 1.188A.6.6 0 0 1 7.22.813a.62.62 0 0 1 .406-.146h2.75a.62.62 0 0 1 .406.146.6.6 0 0 1 .22.375l.332 2.104q.396.146.844.385t.76.532l1.938-.896a.62.62 0 0 1 .458-.031q.23.072.355.302L17.063 6a.6.6 0 0 1 .073.448.62.62 0 0 1-.26.386l-1.793 1.27q.042.21.053.448a10 10 0 0 1 0 .886 3 3 0 0 1-.053.437l1.792 1.292a.7.7 0 0 1 .25.375.54.54 0 0 1-.062.438l-1.375 2.437a.6.6 0 0 1-.355.302.62.62 0 0 1-.458-.031l-1.937-.896q-.334.27-.76.531a3.6 3.6 0 0 1-.845.386L11 16.813a.6.6 0 0 1-.219.375.62.62 0 0 1-.406.146M9 11.709a2.6 2.6 0 0 0 1.917-.792A2.6 2.6 0 0 0 11.708 9a2.6 2.6 0 0 0-.791-1.916A2.6 2.6 0 0 0 9 6.292a2.6 2.6 0 0 0-1.917.792A2.6 2.6 0 0 0 6.292 9q0 1.126.791 1.917A2.6 2.6 0 0 0 9 11.709"
  })));
};

var _path$4, _path2$1, _path3$1;
function _extends$4() { return _extends$4 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$4.apply(null, arguments); }
var SvgPeople = function SvgPeople(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$4({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 14,
    fill: "currentColor"
  }, props), _path$4 || (_path$4 = /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M13.892 7.941c1.141.775 1.941 1.825 1.941 3.225v2.5h3.334v-2.5c0-1.816-2.975-2.891-5.275-3.225",
    clipRule: "evenodd"
  })), _path2$1 || (_path2$1 = /*#__PURE__*/React.createElement("path", {
    d: "M7.5 7a3.333 3.333 0 1 0 0-6.667A3.333 3.333 0 0 0 7.5 7"
  })), _path3$1 || (_path3$1 = /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M12.5 7a3.332 3.332 0 1 0 0-6.667c-.392 0-.758.083-1.108.2a4.98 4.98 0 0 1 0 6.267c.35.116.716.2 1.108.2M7.5 7.833C5.275 7.833.833 8.95.833 11.166v2.5h13.334v-2.5c0-2.216-4.442-3.333-6.667-3.333",
    clipRule: "evenodd"
  })));
};

var _path$3;
function _extends$3() { return _extends$3 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$3.apply(null, arguments); }
var SvgBubble = function SvgBubble(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$3({
    xmlns: "http://www.w3.org/2000/svg",
    width: 17,
    height: 16,
    fill: "currentColor"
  }, props), _path$3 || (_path$3 = /*#__PURE__*/React.createElement("path", {
    d: "M3.73 13.063q-1.355 0-2.292-.938Q.5 11.188.5 9.833q0-1.353.938-2.291t2.291-.938q1.355 0 2.292.938t.937 2.291-.937 2.292-2.292.938m8.124-3.605q-1.875 0-3.177-1.302T7.375 4.98t1.302-3.177T11.854.5t3.177 1.302 1.302 3.177-1.302 3.177-3.177 1.302M10.188 15.5q-.96 0-1.626-.667a2.2 2.2 0 0 1-.666-1.625q0-.958.667-1.625a2.2 2.2 0 0 1 1.624-.666q.96 0 1.626.666.666.667.666 1.625 0 .959-.666 1.625a2.2 2.2 0 0 1-1.626.667"
  })));
};

var _path$2;
function _extends$2() { return _extends$2 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$2.apply(null, arguments); }
var SvgTropheeGp = function SvgTropheeGp(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$2({
    xmlns: "http://www.w3.org/2000/svg",
    width: 18,
    height: 18,
    fill: "currentColor"
  }, props), _path$2 || (_path$2 = /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M.643 0A.643.643 0 0 0 0 .643v2.571a3.86 3.86 0 0 0 3.244 3.809 5.79 5.79 0 0 0 3.827 4.862v.972a.64.64 0 0 0-.61.44l-.496 1.489h-.18a.64.64 0 0 0-.61.44l-.642 1.928a.643.643 0 0 0 .61.846h7.714a.642.642 0 0 0 .61-.846l-.643-1.929a.64.64 0 0 0-.61-.44h-.18l-.496-1.488a.64.64 0 0 0-.61-.44v-.972a5.79 5.79 0 0 0 3.827-4.862A3.86 3.86 0 0 0 18 3.214V.643A.643.643 0 0 0 17.357 0zm2.571 1.286H1.286v1.928c0 1.198.82 2.205 1.928 2.49zm13.5 1.928c0 1.198-.82 2.205-1.928 2.49V1.287h1.928z",
    clipRule: "evenodd"
  })));
};

var _path$1;
function _extends$1() { return _extends$1 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$1.apply(null, arguments); }
var SvgValid = function SvgValid(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$1({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 20,
    fill: "none"
  }, props), _path$1 || (_path$1 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M10 20C4.486 20 0 15.514 0 10S4.486 0 10 0s10 4.486 10 10-4.486 10-10 10m0-18.667c-4.778 0-8.667 3.889-8.667 8.667S5.222 18.667 10 18.667s8.667-3.889 8.667-8.667S14.778 1.333 10 1.333m-.862 11.805 6-6a.665.665 0 1 0-.942-.942l-5.528 5.528L6.473 9.53a.665.665 0 1 0-.943.943l2.667 2.666a.665.665 0 0 0 .943 0z"
  })));
};

var _path, _path2, _path3;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var SvgInvalid = function SvgInvalid(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 20,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M10 0a10 10 0 0 0-7.07 2.93A10 10 0 0 0 0 10a10 10 0 0 0 2.93 7.07A10 10 0 0 0 10 20a10 10 0 0 0 7.07-2.93 9.995 9.995 0 0 0-.002-14.138A10 10 0 0 0 10 0m0 18.585A8.584 8.584 0 1 1 18.585 10a8.6 8.6 0 0 1-2.518 6.067A8.6 8.6 0 0 1 10 18.585"
  })), _path2 || (_path2 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M13.123 12.123 7.875 6.875a.708.708 0 1 0-1 1l5.247 5.248a.707.707 0 1 0 1.001-1"
  })), _path3 || (_path3 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M13.123 6.875a.703.703 0 0 0-1 0l-5.248 5.248a.708.708 0 1 0 1 1l5.248-5.248a.703.703 0 0 0 0-1"
  })));
};

const MppIcons = {
    pen: SvgPen,
    logo: SvgLogo,
    graph: SvgGraph,
    help: SvgHelp,
    map: SvgMap,
    ressources: SvgRessources,
    trophee: SvgTrophee,
    goldTrophee: SvgCoupeOr,
    silverTrophee: SvgCoupeArgent,
    bronzeTrophee: SvgCoupeBronze,
    history: SvgHistory,
    logOut: SvgLogout,
    burgerMenu: SvgBurgerMenu,
    training: SvgTraining,
    users: SvgUsers,
    target: SvgTarget,
    chart: SvgChart,
    school: SvgSchool,
    cloud: SvgCloud,
    drops: SvgDrops,
    trash: SvgTrash,
    openBook: SvgOpenBook,
    infos: SvgInfo,
    copy: SvgCopy,
    remove: SvgRemove,
    flag_fr: SvgFlagFr,
    flag_en: SvgFlagEn,
    flag_es: SvgFlagEs,
    flag_de: SvgFlagDe,
    flag_it: SvgFlagIt,
    arrowBack: SvgArrowBack,
    gear: SvgGear,
    megaphone: SvgMegaphone,
    people: SvgPeople,
    bubble: SvgBubble,
    tropheeGp: SvgTropheeGp,
    valid: SvgValid,
    invalid: SvgInvalid,
};

const MppSkeletonLoader = ({ backgroundColor = 'var(--medium_grey)', highlightColor = 'var(--light_grey)', count = 1, circular = false, spaceBetweenRow = '10px', heightRow = '16px', }) => {
    const rows = Array.from({ length: count }, (_, index) => index);
    return (React__default.createElement("div", { className: "skeleton_wrapper" }, rows.map((_, idx) => (React__default.createElement("div", { key: idx, className: `skeleton ${circular ? 'skeleton_circular' : ''}`, style: {
            background: `linear-gradient(90deg, ${backgroundColor} 25%, ${highlightColor} 50%, ${backgroundColor} 80%)`,
            backgroundSize: '400% 100%',
            marginBottom: spaceBetweenRow,
            height: heightRow,
        } })))));
};

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
        onHover={(e) => {
          console.log(e.target);
        }}
        onHoverLeave={(e) => {
          console.log(e.target);
        }}
        onClick={(e) => {
          console.log(e.target);
        }}
      />
*/
const MppRankingCard = ({ title, subtitle, ranking, points, subPointsText, pointsColor, rankingColorBackground, onClick, onHover, onHoverLeave, }) => {
    return (React__default.createElement("div", { className: "ranking_card_background ", onClick: onClick, onMouseEnter: onHover, onMouseLeave: onHoverLeave },
        React__default.createElement("div", { className: `flex_row ${title ? '' : 'loading'}` }, title ? (React__default.createElement(React__default.Fragment, null,
            React__default.createElement("p", { className: "text_body_sb ranking_background", style: { backgroundColor: `${rankingColorBackground}` } }, ranking),
            React__default.createElement("div", { className: "content_background" },
                React__default.createElement("p", { className: "text_body_sb" }, title),
                React__default.createElement("p", { className: "text_small" }, subtitle)))) : (React__default.createElement(React__default.Fragment, null,
            React__default.createElement("div", { className: "number_loading" },
                React__default.createElement(MppSkeletonLoader, { heightRow: "25px" })),
            React__default.createElement("div", { className: "text_loading" },
                React__default.createElement(MppSkeletonLoader, { count: 2 }))))),
        React__default.createElement("div", { className: `"points_background ${title ? '' : 'skeleton_loading'}` }, title ? (React__default.createElement(React__default.Fragment, null,
            React__default.createElement("p", { className: "text_body_sb", style: { color: `${pointsColor}` } }, points),
            React__default.createElement("p", { className: "sub_point_text text_small" }, subPointsText))) : (React__default.createElement(MppSkeletonLoader, { count: 2 })))));
};

const MppPodiumStep = ({ id, title, subtitle, subtitleBold, pointsNumber, typeOfPlayer, color, ranking, displayAllInfos, onClick, onHover, onHoverLeave, }) => {
    return (React__default.createElement("div", { className: "podium_step__container", onClick: onClick, onMouseEnter: onHover, onMouseLeave: onHoverLeave, "data-id": id !== null && id !== void 0 ? id : '' },
        React__default.createElement("div", { className: `podium_step__content ${title ? '' : 'loading_background'}` },
            React__default.createElement("div", { className: "podium_step__img" }, ranking === 1 ? (React__default.createElement(MppIcons.goldTrophee, null)) : ranking === 2 ? (React__default.createElement(MppIcons.silverTrophee, null)) : (React__default.createElement(MppIcons.bronzeTrophee, null))),
            title ? (React__default.createElement("ul", { className: "podium_step__list" },
                React__default.createElement("li", { className: "podium_step__list--title title_h3" }, title),
                subtitle && displayAllInfos ? (React__default.createElement("li", { className: "podium_step__list--subtitle text_small" }, subtitle)) : null,
                subtitleBold && displayAllInfos ? (React__default.createElement("li", { className: "podium_step__list--subtitle_bold text_small_b" }, subtitleBold)) : null,
                React__default.createElement("li", { style: { color: `${color}` }, className: "podium_step__list--type text_small_b" },
                    pointsNumber,
                    React__default.createElement("span", { className: "text_small" }, typeOfPlayer)))) : (React__default.createElement(MppSkeletonLoader, { count: 2, spaceBetweenRow: "5px" }))),
        React__default.createElement("div", { className: "podium_step_number__container", style: {
                height: `${ranking == 1 ? '4.6em' : ranking == 2 ? '3.4em' : '2.1em'}`,
            } },
            React__default.createElement("span", { className: "podium_step_number__number text_body_sb", style: { backgroundColor: `${color}` } }, ranking))));
};

const MppPodium = ({ rankedElements, typeOfPlayers, color, displayFullInfos, onClick, onHover, onHoverLeave, }) => {
    return (React__default.createElement("div", { className: "podium__container" }, rankedElements
        ? rankedElements.map(({ name, points, ranking, city, structure, id }) => (React__default.createElement(MppPodiumStep, { id: id, onClick: onClick, onHover: onHover, onHoverLeave: onHoverLeave, displayAllInfos: displayFullInfos, subtitle: structure, subtitleBold: city, key: ranking, title: name, pointsNumber: `${points} pts `, typeOfPlayer: typeOfPlayers, color: color, ranking: ranking })))
        : Array.from({ length: 3 }, (_, index) => (React__default.createElement(MppPodiumStep, { key: index, title: null, pointsNumber: '0', subtitle: "", subtitleBold: "", typeOfPlayer: typeOfPlayers, color: color, ranking: index + 1, displayAllInfos: false })))));
};

/**
 * @interface MppCardEditionProps
 * @property {string} [backgroundColor] - Couleur de fond.
 * @property {string} [textColor] - Couleur des textes.
 * @property {string} editionName - Nom de l'édition.
 * @property {string} editionDatesInfos - Informations sur les dates de l'édition.
 * @property {string} [editionMessage] - Message à afficher sur la droite donnant l'état d'avancement de l'édition.
 * @property {React.ReactNode} [editionsDropDown] - Composant React pour afficher un menu déroulant des éditions.
 *
 * Composant d'affichage des dates de début et de fin d'édition et, côté scolaire, affichage d'un message en fonction de la date du jour.
 *
 * @example
 * ```tsx
 * <MppCardEdition
 *   editionMessage="Il reste 7 jours !"
 *   backgroundColor={ScoColors.veryLightYellow}
 *   textColor={ScoColors.darkBlue}
 *   editionDatesInfos={'Du lundi 18 novembre 9h au lundi 9 décembre 20h'}
 *   editionName={'Edition Automne 2024'}
 * />
 * ```
 */
const MppCardEdition = ({ backgroundColor, textColor, editionName, editionDatesInfos, editionMessage, editionsDropDown, }) => {
    return (React__default.createElement("div", { style: { backgroundColor: `${backgroundColor}` }, className: "card_edition__container" },
        React__default.createElement("div", { style: { color: `${textColor}` }, className: "card_edition__infos" },
            React__default.createElement(React__default.Fragment, null,
                React__default.createElement("p", { className: "edition_infos__date text_body" },
                    React__default.createElement("span", { className: "edition_infos__name text_body_sb" },
                        editionName,
                        " -",
                        ' '),
                    editionDatesInfos))),
        editionsDropDown,
        editionMessage ? (React__default.createElement("div", { className: "card_edition__days" },
            React__default.createElement(MppIcons.history, { fill: ScoColors.tonicViolet, className: "card_edition__icon" }),
            React__default.createElement("p", { className: "edition_days__details text_body_sb" }, editionMessage))) : null));
};

var BoType;
(function (BoType) {
    BoType[BoType["scoBO"] = 0] = "scoBO";
    BoType[BoType["gpBo"] = 1] = "gpBo";
})(BoType || (BoType = {}));

/**
 * @interface MppMenuProps
 * @property {Array<NavigationLink>} navigationLinks - Liste des liens de navigation à afficher dans le menu.
 * @property {React.ElementType} LinkComponent - Composant de lien à utiliser pour la navigation (ex : `Link` de Next.js).
 * @property {BoType} boType - Type de back-office (ex : `scoBO` ou `gpBo`).
 * @property {function(): void} onLogout - Fonction de rappel appelée lors de la déconnexion.
 * @property {string} actualPage - URL ou nom de la page actuelle pour la mise en surbrillance.
 * @property {string} aboutText - Texte à afficher pour la page "À propos".
 * @property {string} logOutText - Texte à afficher pour le lien de déconnexion.
 *
 * @example
 *
 * const navigationLinks = [
 *   { icon: MppIcons.tata, name: 'Accueil', navigation: '/' },
 *   { icon: MppIcons.toto, name: 'Profil', navigation: '/profil' },
 * ];
 *
 * <MppMenu
 *   navigationLinks={navigationLinks}
 *   LinkComponent={Link}
 *   boType={BoType.scoBO}
 *   onLogout={() => console.log('Déconnexion')}
 *   actualPage="/"
 *   aboutText="À propos"
 *   logOutText="Déconnexion"
 * />
 */
const MppMenu = ({ navigationLinks, LinkComponent, boType, onLogout, actualPage, aboutText, logOutText, clientIsLoad, clientName, codeClientInput, codeClientButton, languageDropDown, backToClientsLink, }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    return (React__default.createElement("div", { className: "menu_background" },
        React__default.createElement("div", { className: "center" },
            React__default.createElement("div", { className: `logo_container ${boType === BoType.gpBo ? 'logo_gp' : 'logo_sco'}` }),
            boType === BoType.gpBo && backToClientsLink && (React__default.createElement("div", { className: "gp_menu_client_data " },
                clientName && React__default.createElement("span", { className: "text_body_sb" }, clientName),
                React__default.createElement(LinkComponent, { href: backToClientsLink.navigation, className: "navigation_flex text_small_b navigation_return_link" },
                    React__default.createElement(MppIcons.arrowBack, { className: "icon_arrow_back text_small_b" }),
                    React__default.createElement("span", null, backToClientsLink.name)))),
            React__default.createElement("div", { className: "navigation_background" }, clientIsLoad ? (navigationLinks.map((navigationLink, index) => (React__default.createElement("div", { onMouseEnter: () => setHoveredIndex(index), onMouseLeave: () => setHoveredIndex(null), className: `navigation_element ${actualPage.includes(navigationLink.navigation) ? 'actual_page' : ''} ${hoveredIndex === index ||
                    actualPage.includes(navigationLink.navigation)
                    ? 'text_body_sb '
                    : 'text_body '}`, key: navigationLink.name },
                React__default.createElement(LinkComponent, { href: navigationLink.navigation, className: "navigation_flex" },
                    React__default.createElement(navigationLink.icon, { className: "icon" }),
                    React__default.createElement("p", null, navigationLink.name)))))) : (React__default.createElement(MppSkeletonLoader, { count: 5, spaceBetweenRow: "16px", heightRow: "20px" })))),
        boType === BoType.gpBo && (React__default.createElement("div", { className: "navigation_client_code_section" },
            React__default.createElement("div", { className: "navigation_client_code_section--input" }, codeClientInput),
            codeClientButton)),
        React__default.createElement("div", { className: "navigation_background" },
            boType === BoType.gpBo && (React__default.createElement("div", { className: "navigation_language_dropdown" }, languageDropDown)),
            React__default.createElement(LinkComponent, { className: "navigation_element", href: 'https://mapetiteplanete.org/' },
                React__default.createElement("p", { className: "text_body" }, aboutText)),
            React__default.createElement("div", { className: "navigation_element bottom", onClick: onLogout },
                React__default.createElement(MppIcons.logOut, { className: "icon" }),
                React__default.createElement("p", { className: "text_body_sb" }, logOutText)))));
};

var img = "data:image/png;base64,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";

const MppLoader = () => {
    return (React__default.createElement("div", { className: "container" },
        React__default.createElement("div", { className: "spinner" })));
};

/**
 * @interface LoginLayoutProps
 * @property {BoType} boType - Type de back-office, utilisé pour déterminer l'affichage du logo (ex: `scoBO`).
 * @property {function(): void | null} onPressLoginButon - Fonction appelée lorsque le bouton de connexion est cliqué.
 * @property {string} welcomeText - Texte principal de bienvenue à afficher.
 * @property {string} welcomeTextBold - Partie du texte de bienvenue à afficher en gras.
 * @property {string} welcomeSubtitle - Sous-titre du texte de bienvenue.
 * @property {string} loginTitle - Titre de la section de connexion.
 * @property {string} loginSubtitle - Sous-titre de la section de connexion.
 * @property {string} buttonText - Texte du bouton de connexion.
 * @property {string} codeValue - Valeur actuelle de l'input de connexion.
 * @property {string} inputPlaceHolder - Texte d'indice à afficher dans l'input de connexion.
 * @property {function(string): void} setCodeValue - Fonction pour mettre à jour la valeur de l'input de connexion.
 * @property {string} onClickErrorMessage - Message d'erreur à afficher lors de l'échec de la connexion.
 * @property {function(string): void} setOnClickErrorMessage - Fonction pour mettre à jour le message d'erreur de connexion.
 * @property {boolean} isLoading - Indique si une requête est en cours de traitement pour afficher un loader.
 *
 * @example
 * <LoginLayout
 *   boType={BoType.scoBO}
 *   onPressLoginButon={() => console.log('Login button pressed')}
 *   welcomeText="Bienvenue"
 *   welcomeTextBold="à SCOBO"
 *   welcomeSubtitle="Connectez-vous pour accéder à votre espace."
 *   loginTitle="Connexion"
 *   loginSubtitle="Veuillez entrer votre code"
 *   buttonText="Se connecter"
 *   codeValue={code}
 *   setCodeValue={setCode}
 *   inputPlaceHolder="Entrez votre code"
 *   onClickErrorMessage={errorMessage}
 *   setOnClickErrorMessage={setErrorMessage}
 *   isLoading={isLoggingIn}
 * />
 */
const ComponentName = ({ boType, onPressLoginButon, welcomeText, welcomeTextBold, welcomeSubtitle, loginTitle, loginSubtitle, buttonText, codeValue, setCodeValue, inputPlaceHolder, onClickErrorMessage, setOnClickErrorMessage, isLoading, }) => {
    const [hasError, setHasError] = useState(true);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && onPressLoginButon && !hasError) {
            onPressLoginButon();
        }
    };
    useEffect(() => {
        if (codeValue && onClickErrorMessage) {
            setOnClickErrorMessage('');
        }
    }, [codeValue, onClickErrorMessage, setOnClickErrorMessage]);
    return (React__default.createElement("div", { className: "container_login_background" },
        React__default.createElement("div", { className: 'container_image_section' },
            React__default.createElement("div", { className: `login_logo ${boType === BoType.scoBO ? 'logo_sco' : 'logo_gp'}` }),
            React__default.createElement("div", { className: "login_welcome_text_container" },
                React__default.createElement("p", { className: "title_h2 welcome_text" },
                    welcomeText,
                    " ",
                    React__default.createElement("span", { className: "title_h1" }, welcomeTextBold)),
                React__default.createElement("p", null, welcomeSubtitle)),
            React__default.createElement("img", { className: "login_illustration", src: img, alt: "illustration of woman on computer" })),
        React__default.createElement("div", { className: "container_input_section" },
            React__default.createElement("div", { className: "input_section_content" },
                React__default.createElement("p", { className: "title_h1" }, loginTitle),
                React__default.createElement("p", null, loginSubtitle),
                React__default.createElement("div", null,
                    React__default.createElement(MppInputText, { placeholder: inputPlaceHolder, value: codeValue, onChange: (value) => {
                            setCodeValue(value);
                            setHasError(false);
                        }, setHasError: (hasError) => {
                            setHasError(hasError);
                        }, onClickErrorMessage: onClickErrorMessage, onKeyDown: handleKeyDown })),
                React__default.createElement("div", null, isLoading ? (React__default.createElement(MppLoader, null)) : (React__default.createElement(MppButton, { title: buttonText, buttonType: ButtonType.primaryLarge, onPress: hasError ? null : onPressLoginButon })))))));
};

/**
 * Props pour le composant StatCard.
 * @interface MppInputTextProps
 * @property {(typeof MppIcons)[keyof typeof MppIcons]} IconComponent - Composant icon de MppIcons pour afficher l'icone de la stat.
 * @property {string} title - Titre de la card.
 * @property {number} stat - Nombre/statistique que l'on veut afficher.
 * @property {BoType.gpBo} boType - Permet d'afficher une ombre spécifique au BO ECU, n'autorise que le type gpBo.
 * @property {string} statDetails - String qui affiche des détails après les stats
 */
/**
 * Composant d'affichage des statisques dans une card avec une icone à gauche pour illustrer
 *
 * @example
 * ```jsx
 * <MppStatCard
 * title={t('traduction')}
 * IconComponent={MppIcons.training}
 * stat={12}
 * statDetails="/élèves"
 * />
 * ```
 */
const StatCard = ({ IconComponent, title, stat, boType, statDetails, }) => {
    return (React__default.createElement("div", { className: `stat_card__container${boType ? ' stat_card__container--shadow' : ''}` },
        stat !== null && stat !== undefined ? (React__default.createElement("div", { className: "stat_card__icon" },
            React__default.createElement(IconComponent, null))) : (React__default.createElement("div", { className: "loader_background" },
            React__default.createElement(MppSkeletonLoader, { circular: true }))),
        React__default.createElement("div", { className: "stat_card__content" }, stat !== null && stat !== undefined ? (React__default.createElement(React__default.Fragment, null,
            React__default.createElement("p", { className: "stat_card__title text_small" }, title),
            React__default.createElement("p", { className: "stat_card__number title_h3" },
                stat,
                " ", statDetails !== null && statDetails !== void 0 ? statDetails : ''))) : (React__default.createElement(MppSkeletonLoader, { count: 2 })))));
};

const MppTextArea = ({ placeholder, value = '', onChange, readOnly = false, }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const textAreaRef = useRef(null);
    useEffect(() => {
        setInputValue(value);
        adjustHeight();
    }, [value]);
    const adjustHeight = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    };
    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setIsFocused(false);
    };
    const handleChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        adjustHeight();
        onChange(newValue);
    };
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement("div", { className: `mpp_text_area_container ${isFocused && !readOnly ? 'focused' : ''}` },
            React__default.createElement("textarea", { ref: textAreaRef, placeholder: placeholder, value: inputValue, onFocus: handleFocus, onBlur: handleBlur, onChange: readOnly ? null : handleChange, className: `mpp_text_area ${readOnly ? 'read_only' : ''}`, readOnly: readOnly }))));
};

var Direction;
(function (Direction) {
    Direction[Direction["top_right"] = 0] = "top_right";
    Direction[Direction["top_left"] = 1] = "top_left";
    Direction[Direction["bottom_left"] = 2] = "bottom_left";
    Direction[Direction["bottom_right"] = 3] = "bottom_right";
})(Direction || (Direction = {}));
const MppInfosPin = ({ texts, direction = Direction.bottom_left, }) => {
    let directionStyleValues;
    switch (direction) {
        case Direction.bottom_right:
            directionStyleValues = {
                top: '46px',
            };
            break;
        case Direction.top_left:
            directionStyleValues = {
                bottom: '46px',
                right: 0,
            };
            break;
        case Direction.top_right:
            directionStyleValues = {
                bottom: '46px',
            };
            break;
        default:
            directionStyleValues = {
                top: '46px',
                right: 0,
            };
    }
    const [hover, setHover] = React__default.useState(false);
    const isMobile = () => window.innerWidth < 896;
    return (React__default.createElement("div", { className: "infos_pin_main" },
        React__default.createElement(MppIcons.infos, { className: "infos_pin_main_icon", onMouseEnter: () => (isMobile() ? null : setHover(true)), onMouseLeave: () => (isMobile() ? null : setHover(false)), onClick: () => (isMobile() ? setHover(!hover) : null) }),
        React__default.createElement("div", { onClick: () => (isMobile() ? setHover(false) : null), className: ` ${hover ? 'infos_content_visible' : 'infos_content_invisible'} infos_pin_container`, style: directionStyleValues }, texts.map((text, index) => (React__default.createElement("p", { key: index, className: "infos_content text_small" },
            React__default.createElement("span", { className: "infos_title text_small_b" },
                text.title,
                " : "),
            text.content))))));
};

/**
 * Le composant MppMultiSectionButton rend un bouton à sections multiples avec des actions personnalisables pour chaque section.
 *
 * @component
 * @param {MppMultiSectionButtonProps} props - Les propriétés du composant MppMultiSectionButton.
 * @param {Array<ButtonActions>} props.buttons_actions - Un tableau d'actions de boutons, chacun contenant un label et une fonction OnClick.
 *
 * @returns {JSX.Element} Le composant MppMultiSectionButton rendu.
 *
 * @example
 * const buttonActions = [
 *   { label: 'Bouton 1', OnClick: () => console.log('Bouton 1 cliqué') },
 *   { label: 'Bouton 2', OnClick: () => console.log('Bouton 2 cliqué') },
 *   { label: 'Bouton 3', OnClick: () => console.log('Bouton 3 cliqué') }
 * ];
 *
 * return (
 *   <MppMultiSectionButton buttons_actions={buttonActions} />
 * );
 */
const MppMultiSectionButton = ({ buttons_actions, }) => {
    const [selectedIndex, setSelectedIndex] = React__default.useState(0);
    return (React__default.createElement("div", { className: "multi_section_button--container" }, buttons_actions.map((button, index) => (React__default.createElement("button", { key: index, className: `multi_section_button--button text_body_sb ${selectedIndex === index ? 'multi_section_button--selected' : ''}`, type: "button", onClick: () => {
            button.OnClick();
            setSelectedIndex(index);
        } }, button.label)))));
};

export { BoType, ButtonType, MppButton, MppCardEdition as MppEditionCard, MppIcons, MppInfosPin, MppInputText, MppLoader, ComponentName as MppLoginLayout, MppMenu, MppMultiSectionButton, MppPodium, MppRankingCard, MppSkeletonLoader, StatCard as MppStatCard, MppTextArea, ScoColors };
