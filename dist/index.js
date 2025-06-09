import * as React from 'react';
import React__default, { useState, useEffect, useCallback, useRef } from 'react';

var ButtonType;
(function (ButtonType) {
    ButtonType[ButtonType["primaryLarge"] = 0] = "primaryLarge";
    ButtonType[ButtonType["primaryMedium"] = 1] = "primaryMedium";
    ButtonType[ButtonType["primaryMediumRed"] = 2] = "primaryMediumRed";
    ButtonType[ButtonType["secondaryLarge"] = 3] = "secondaryLarge";
    ButtonType[ButtonType["secondaryMedium"] = 4] = "secondaryMedium";
    ButtonType[ButtonType["secondaryMediumRed"] = 5] = "secondaryMediumRed";
})(ButtonType || (ButtonType = {}));

/**
 * @interface MppButtonProps
 * @property {string} title - Titre du bouton.
 * @property {ButtonType} buttonType - Enum pour le style.
 * @property {() => void} [onPress] - Fonction à exécuter lorsque le bouton est cliqué.
 * @property {React.CSSProperties} [style] - Style personnalisé.
 * @property {React.CSSProperties} [hoverStyle] - Style au survol.
 * @property {React.CSSProperties} [activeStyle] - Style lors du clic.
 *
 * @example
 *
 * <MppButton
 *   title="Bouton d'action"
 *   onPress={() => console.log('Bouton cliqué!')}
 *   buttonType={ButtonType.primaryLarge}
 * />
 */
const MppButton = ({ title, onPress, buttonType, type = 'button', style = {}, hoverStyle = {}, activeStyle = {}, isSubmitDisabled = true, }) => {
    const [hover, setHover] = React__default.useState(false);
    const [active, setActive] = React__default.useState(false);
    const isDisabled = type === 'submit' ? isSubmitDisabled : onPress === null;
    const combinedStyle = Object.assign(Object.assign(Object.assign({}, style), (hover && !isDisabled ? hoverStyle : {})), (active && !isDisabled ? activeStyle : {}));
    let buttonStyle;
    switch (buttonType) {
        case ButtonType.primaryLarge:
            buttonStyle = 'button_large text_body_sb';
            break;
        case ButtonType.primaryMedium:
            buttonStyle = 'button_medium text_body';
            break;
        case ButtonType.primaryMediumRed:
            buttonStyle = 'button_medium text_body primary_red_design';
            break;
        case ButtonType.secondaryLarge:
            buttonStyle = 'secondary_type button_large text_body_sb';
            break;
        case ButtonType.secondaryMedium:
        default:
            buttonStyle = 'secondary_type button_medium text_body';
            break;
        case ButtonType.secondaryMediumRed:
            buttonStyle =
                'secondary_type button_medium text_body secondary_red_design';
            break;
    }
    return (React__default.createElement("button", { type: type, className: `mpp_button ${buttonStyle}`, style: combinedStyle, onClick: !isDisabled ? onPress : undefined, onMouseEnter: () => !isDisabled && setHover(true), onMouseLeave: () => !isDisabled && setHover(false), onMouseDown: () => !isDisabled && setActive(true), onMouseUp: () => !isDisabled && setActive(false), disabled: isDisabled }, title));
};

/**
    NE doit plus etre utilisé ancien composé trop complexe, favoriser MppInput
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
const GpColors = {
    orange: 'var(--orange)',
    mintGreen: 'var(--mint_green)',
    lightBlue: 'var(--light_blue)',
    teal: 'var(--teal)',
    pink: 'var(--pink)',
    royalBlue: 'var(--royal_blue)',
    lightGreen: 'var(--light_green)',
    errorRed: 'var(--error_red)',
    pastelGreen: 'var(--pastel_green)',
    pastelOrange: 'var(--pastel_orange)',
    pastelPink: 'var(--pastel_pink)',
    lightBeige: 'var(--light_beige)',
    beige: 'var(--beige)',
    taupe: 'var(--taupe)',
    kaki: 'var(--kaki)',
    anthracite: 'var(--anthracite)',
    darkGrey: 'var(--dark_grey)',
    mediumGrey: 'var(--medium_grey)',
    lightGrey: 'var(--light_grey)',
    white: 'var(--white)',
    darkBlue: 'var(--dark_blue)',
};

var _path$w;
function _extends$B() { return _extends$B = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$B.apply(null, arguments); }
var SvgPen = function SvgPen(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$B({
    xmlns: "http://www.w3.org/2000/svg",
    width: 18,
    height: 18,
    fill: "currentColor"
  }, props), _path$w || (_path$w = /*#__PURE__*/React.createElement("path", {
    d: "M-.003 14.251v3.75h3.75l11.06-11.06-3.75-3.75zm17.71-10.21a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"
  })));
};

var _path$v, _path2$a;
function _extends$A() { return _extends$A = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$A.apply(null, arguments); }
var SvgLogo = function SvgLogo(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$A({
    xmlns: "http://www.w3.org/2000/svg",
    width: 30,
    height: 30,
    fill: "none"
  }, props), _path$v || (_path$v = /*#__PURE__*/React.createElement("path", {
    fill: "#2C2C69",
    d: "M15 3a12 12 0 1 0 0 24 12 12 0 0 0 0-24m0 21.884A9.883 9.883 0 1 1 24.884 15 9.894 9.894 0 0 1 15 24.884"
  })), _path2$a || (_path2$a = /*#__PURE__*/React.createElement("path", {
    fill: "#2C2C69",
    d: "M19.929 10.315a2.678 2.678 0 1 0 0 5.356 2.678 2.678 0 0 0 0-5.356m.721 2.623a1.011 1.011 0 1 1 0-2.023 1.011 1.011 0 0 1 0 2.023M9.382 12.997a2.679 2.679 0 1 0 0 5.358 2.679 2.679 0 0 0 0-5.358m.721 2.623a1.01 1.01 0 1 1 0-2.022 1.01 1.01 0 0 1 0 2.022"
  })));
};

var _path$u;
function _extends$z() { return _extends$z = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$z.apply(null, arguments); }
var SvgGraph = function SvgGraph(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$z({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 21,
    fill: "currentColor"
  }, props), _path$u || (_path$u = /*#__PURE__*/React.createElement("path", {
    d: "M2.292 18.273a.607.607 0 0 1-.625-.625v-8.75a.607.607 0 0 1 .625-.625h2.916a.607.607 0 0 1 .625.625v8.75a.607.607 0 0 1-.625.625zm6.25 0a.607.607 0 0 1-.625-.625V3.898a.607.607 0 0 1 .625-.625h2.916a.607.607 0 0 1 .625.625v13.75a.607.607 0 0 1-.625.625zm6.25 0a.607.607 0 0 1-.625-.625v-7.083a.607.607 0 0 1 .625-.625h2.916a.607.607 0 0 1 .625.625v7.083a.607.607 0 0 1-.625.625z"
  })));
};

var _path$t;
function _extends$y() { return _extends$y = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$y.apply(null, arguments); }
var SvgHelp = function SvgHelp(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$y({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 21,
    fill: "currentColor"
  }, props), _path$t || (_path$t = /*#__PURE__*/React.createElement("path", {
    d: "M10.083 15.628q.334 0 .563-.23a.76.76 0 0 0 .23-.562.77.77 0 0 0-.23-.562.77.77 0 0 0-.563-.23.77.77 0 0 0-.562.23.77.77 0 0 0-.23.562q0 .333.23.563.23.228.562.229m-.02-8.604q.708 0 1.145.385t.438.99q0 .416-.25.823t-.813.885q-.54.48-.864 1.01-.323.532-.323.97 0 .228.177.364a.65.65 0 0 0 .406.135.56.56 0 0 0 .417-.167.75.75 0 0 0 .208-.416q.063-.417.282-.74t.677-.698q.624-.52.906-1.041.28-.521.281-1.167 0-1.104-.719-1.77-.718-.668-1.906-.668-.792 0-1.458.313a2.8 2.8 0 0 0-1.104.917.64.64 0 0 0-.136.468q.031.24.198.365a.57.57 0 0 0 .49.104.73.73 0 0 0 .427-.292q.271-.375.656-.572.385-.198.865-.198M10 19.107a8.4 8.4 0 0 1-3.27-.635 8.1 8.1 0 0 1-2.647-1.76 8.3 8.3 0 0 1-1.77-2.647q-.646-1.52-.646-3.291a8.3 8.3 0 0 1 .646-3.271 8.3 8.3 0 0 1 1.77-2.646 8.3 8.3 0 0 1 2.646-1.77A8.3 8.3 0 0 1 10 2.44q1.73 0 3.25.646a8.3 8.3 0 0 1 2.646 1.771 8.4 8.4 0 0 1 1.781 2.646 8.2 8.2 0 0 1 .656 3.27q0 1.771-.656 3.292a8.4 8.4 0 0 1-1.781 2.646 8.1 8.1 0 0 1-2.646 1.76 8.35 8.35 0 0 1-3.25.636"
  })));
};

var _path$s;
function _extends$x() { return _extends$x = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$x.apply(null, arguments); }
var SvgMap = function SvgMap(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$x({
    xmlns: "http://www.w3.org/2000/svg",
    width: 18,
    height: 19,
    fill: "currentColor"
  }, props), _path$s || (_path$s = /*#__PURE__*/React.createElement("path", {
    d: "m17.5.773-.16.03L12 2.873l-6-2.1-5.64 1.9c-.21.07-.36.25-.36.48v15.12c0 .28.22.5.5.5l.16-.03L6 16.673l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V1.273c0-.28-.22-.5-.5-.5M7 3.243l4 1.4v11.66l-4-1.4zm-5 .99 3-1.01v11.7l-3 1.16zm14 11.08-3 1.01V4.633l3-1.16z"
  })));
};

var _g$5, _defs$4;
function _extends$w() { return _extends$w = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$w.apply(null, arguments); }
var SvgRessources = function SvgRessources(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$w({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 21,
    fill: "currentColor"
  }, props), _g$5 || (_g$5 = /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#ressources_svg__a)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15.833 16.607H4.167V4.94H10V3.273H4.167c-.925 0-1.667.75-1.667 1.667v11.667c0 .916.742 1.666 1.667 1.666h11.666c.917 0 1.667-.75 1.667-1.666v-5.834h-1.667zM11.667 3.273V4.94h2.991l-8.191 8.192 1.175 1.175 8.191-8.192v2.992H17.5V3.273z"
  }))), _defs$4 || (_defs$4 = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "ressources_svg__a"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 .773h20v20H0z"
  })))));
};

var _path$r, _path2$9;
function _extends$v() { return _extends$v = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$v.apply(null, arguments); }
var SvgTrophee = function SvgTrophee(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$v({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 21,
    fill: "none"
  }, props), _path$r || (_path$r = /*#__PURE__*/React.createElement("path", {
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M5.333 4.107v4.591c0 3.308 2.058 6.05 4.632 6.075a3.8 3.8 0 0 0 1.796-.443 4.8 4.8 0 0 0 1.526-1.298 6.3 6.3 0 0 0 1.021-1.952 7.5 7.5 0 0 0 .359-2.307V4.107a.77.77 0 0 0-.152-.472.47.47 0 0 0-.367-.195H5.852c-.138 0-.27.07-.367.195a.77.77 0 0 0-.152.472M7.708 18.273h4.584M10 15.148v3.125M14.667 10.107h.624c.542 0 1.061-.241 1.444-.67.383-.428.598-1.01.598-1.616V6.678a.6.6 0 0 0-.15-.404.49.49 0 0 0-.36-.167H14.78"
  })), _path2$9 || (_path2$9 = /*#__PURE__*/React.createElement("path", {
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M5.333 10.107h-.639c-.538 0-1.053-.241-1.434-.67a2.44 2.44 0 0 1-.593-1.616V6.678a.6.6 0 0 1 .148-.404.48.48 0 0 1 .359-.167H5.2"
  })));
};

var _path$q, _path2$8, _path3$4, _path4, _path5, _path6, _path7, _path8, _path9;
function _extends$u() { return _extends$u = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$u.apply(null, arguments); }
var SvgCoupeOr = function SvgCoupeOr(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$u({
    xmlns: "http://www.w3.org/2000/svg",
    width: 62,
    height: 60,
    fill: "none"
  }, props), _path$q || (_path$q = /*#__PURE__*/React.createElement("path", {
    fill: "#FFD121",
    d: "M32.752 45.887h-3.504v12.348h3.504z"
  })), _path2$8 || (_path2$8 = /*#__PURE__*/React.createElement("path", {
    fill: "#FFD121",
    d: "M23.126 56.472a1.764 1.764 0 1 0 0 3.528h15.748a1.764 1.764 0 1 0 0-3.528z"
  })), _path3$4 || (_path3$4 = /*#__PURE__*/React.createElement("path", {
    fill: "#FFF7CA",
    stroke: "#FFD121",
    strokeWidth: 4,
    d: "M3 11.94a2 2 0 0 1 2-2h52a2 2 0 0 1 2 2v4c0 5.522-4.477 10-10 10H13c-5.523 0-10-4.478-10-10z"
  })), _path4 || (_path4 = /*#__PURE__*/React.createElement("path", {
    fill: "#FFF7CA",
    stroke: "#FFD121",
    strokeWidth: 4,
    d: "M11.667 3.654c0-.913.74-1.654 1.654-1.654h35.358c.913 0 1.654.74 1.654 1.654V28c0 10.678-8.656 19.333-19.333 19.333-10.678 0-19.333-8.655-19.333-19.333z"
  })), _path5 || (_path5 = /*#__PURE__*/React.createElement("path", {
    fill: "#FFF1A8",
    stroke: "#FFD121",
    strokeWidth: 3,
    d: "M41.234 20.82c0 5.8-4.701 10.5-10.5 10.5s-10.5-4.7-10.5-10.5 4.7-10.5 10.5-10.5 10.5 4.701 10.5 10.5Z"
  })), _path6 || (_path6 = /*#__PURE__*/React.createElement("path", {
    fill: "#FFD121",
    d: "M25.667 24a2.667 2.667 0 1 0 0-5.334 2.667 2.667 0 0 0 0 5.333"
  })), _path7 || (_path7 = /*#__PURE__*/React.createElement("path", {
    fill: "#FDEFA6",
    d: "M26.534 21.332a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
  })), _path8 || (_path8 = /*#__PURE__*/React.createElement("path", {
    fill: "#FFD121",
    d: "M35.667 21.333a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333"
  })), _path9 || (_path9 = /*#__PURE__*/React.createElement("path", {
    fill: "#FDEFA6",
    d: "M36.534 18.666a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
  })));
};

var _g$4, _defs$3;
function _extends$t() { return _extends$t = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$t.apply(null, arguments); }
var SvgCoupeArgent = function SvgCoupeArgent(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$t({
    xmlns: "http://www.w3.org/2000/svg",
    width: 61,
    height: 60,
    fill: "none"
  }, props), _g$4 || (_g$4 = /*#__PURE__*/React.createElement("g", {
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

var _g$3, _defs$2;
function _extends$s() { return _extends$s = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$s.apply(null, arguments); }
var SvgCoupeBronze = function SvgCoupeBronze(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$s({
    xmlns: "http://www.w3.org/2000/svg",
    width: 61,
    height: 60,
    fill: "none"
  }, props), _g$3 || (_g$3 = /*#__PURE__*/React.createElement("g", {
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

var _path$p, _g$2;
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
  }, _path$p || (_path$p = /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z"
  }))), _g$2 || (_g$2 = /*#__PURE__*/React.createElement("g", {
    mask: "url(#history_svg__a)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 21q-3.15 0-5.575-1.913Q4 17.176 3.275 14.2a.74.74 0 0 1 .15-.687.97.97 0 0 1 .675-.363q.4-.05.725.15t.45.6q.6 2.25 2.475 3.675T12 19q2.925 0 4.962-2.038T19 12t-2.038-4.962T12 5a6.75 6.75 0 0 0-3.225.8A7.4 7.4 0 0 0 6.25 8H8q.424 0 .713.287Q9 8.576 9 9q0 .424-.287.713A.97.97 0 0 1 8 10H4a.97.97 0 0 1-.712-.287A.97.97 0 0 1 3 9V5q0-.424.288-.713A.97.97 0 0 1 4 4q.424 0 .713.287Q5 4.576 5 5v1.35a8.7 8.7 0 0 1 3.113-2.475A8.9 8.9 0 0 1 12 3q1.874 0 3.512.712a9.2 9.2 0 0 1 2.85 1.926 9.2 9.2 0 0 1 1.926 2.85A8.7 8.7 0 0 1 21 12q0 1.874-.712 3.512a9.2 9.2 0 0 1-1.925 2.85 9.2 9.2 0 0 1-2.85 1.926A8.7 8.7 0 0 1 12 21Zm1-9.4 2.5 2.5a.95.95 0 0 1 .275.7.95.95 0 0 1-.275.7.95.95 0 0 1-.7.275.95.95 0 0 1-.7-.275l-2.8-2.8a1 1 0 0 1-.225-.337 1 1 0 0 1-.075-.388V8q0-.424.287-.713A.97.97 0 0 1 12 7q.424 0 .713.287Q13 7.576 13 8z"
  }))));
};

var _path$o;
function _extends$q() { return _extends$q = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$q.apply(null, arguments); }
var SvgLogout = function SvgLogout(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$q({
    xmlns: "http://www.w3.org/2000/svg",
    width: 18,
    height: 18,
    fill: "none"
  }, props), _path$o || (_path$o = /*#__PURE__*/React.createElement("path", {
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M12.235 6.047 15.188 9l-2.953 2.953M7.313 9h7.872M7.313 15.188H3.375a.56.56 0 0 1-.562-.563V3.375a.563.563 0 0 1 .562-.562h3.938"
  })));
};

var _path$n;
function _extends$p() { return _extends$p = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$p.apply(null, arguments); }
var SvgBurgerMenu = function SvgBurgerMenu(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$p({
    xmlns: "http://www.w3.org/2000/svg",
    width: 28,
    height: 23,
    fill: "none"
  }, props), _path$n || (_path$n = /*#__PURE__*/React.createElement("path", {
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeWidth: 3,
    d: "M1.5 11.5h25M1.5 1.5h25M1.5 21.5h25"
  })));
};

var _g$1, _defs$1;
function _extends$o() { return _extends$o = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$o.apply(null, arguments); }
var SvgTraining = function SvgTraining(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$o({
    xmlns: "http://www.w3.org/2000/svg",
    width: 36,
    height: 36,
    fill: "none"
  }, props), _g$1 || (_g$1 = /*#__PURE__*/React.createElement("g", {
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

var _path$m, _path2$7, _path3$3;
function _extends$n() { return _extends$n = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$n.apply(null, arguments); }
var SvgUsers = function SvgUsers(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$n({
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 32,
    fill: "none"
  }, props), _path$m || (_path$m = /*#__PURE__*/React.createElement("path", {
    stroke: "#F9CF2F",
    strokeMiterlimit: 10,
    strokeWidth: 3,
    d: "M11 20a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"
  })), _path2$7 || (_path2$7 = /*#__PURE__*/React.createElement("path", {
    stroke: "#F9CF2F",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 3,
    d: "M19.429 7.241A6.5 6.5 0 1 1 21.192 20M2 24.675a11.002 11.002 0 0 1 18-.001"
  })), _path3$3 || (_path3$3 = /*#__PURE__*/React.createElement("path", {
    stroke: "#F9CF2F",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 3,
    d: "M21.179 20a10.99 10.99 0 0 1 9 4.674"
  })));
};

var _path$l, _path2$6;
function _extends$m() { return _extends$m = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$m.apply(null, arguments); }
var SvgTarget = function SvgTarget(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$m({
    xmlns: "http://www.w3.org/2000/svg",
    width: 36,
    height: 36,
    fill: "none"
  }, props), _path$l || (_path$l = /*#__PURE__*/React.createElement("path", {
    stroke: "#C4E39A",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 3,
    d: "M18 18 31.5 4.5M27.545 8.455a13.487 13.487 0 1 0 2.64 3.726"
  })), _path2$6 || (_path2$6 = /*#__PURE__*/React.createElement("path", {
    stroke: "#C4E39A",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 3,
    d: "M22.773 13.227a6.75 6.75 0 1 0 1.966 4.387"
  })));
};

var _g, _defs;
function _extends$l() { return _extends$l = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$l.apply(null, arguments); }
var SvgChart = function SvgChart(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$l({
    xmlns: "http://www.w3.org/2000/svg",
    width: 34,
    height: 34,
    fill: "#B1C5FF"
  }, props), _g || (_g = /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#chart_svg__a)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9.284 13.313h.274c1.053 0 1.915.862 1.915 1.916v9.579a1.92 1.92 0 0 1-1.915 1.916h-.274a1.92 1.92 0 0 1-1.916-1.916v-9.579c0-1.054.862-1.916 1.916-1.916m7.663-5.747c1.054 0 1.916.862 1.916 1.916v15.326a1.92 1.92 0 0 1-1.916 1.916 1.92 1.92 0 0 1-1.916-1.916V9.482c0-1.054.862-1.916 1.916-1.916m7.663 10.947c1.054 0 1.916.862 1.916 1.916v4.379a1.92 1.92 0 0 1-1.916 1.916 1.92 1.92 0 0 1-1.916-1.916v-4.38c0-1.053.862-1.915 1.916-1.915"
  }))), _defs || (_defs = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "chart_svg__a"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M.526.724h32.842v32.842H.526z"
  })))));
};

var _path$k;
function _extends$k() { return _extends$k = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$k.apply(null, arguments); }
var SvgSchool = function SvgSchool(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$k({
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 34,
    fill: "none"
  }, props), _path$k || (_path$k = /*#__PURE__*/React.createElement("path", {
    fill: "#F9C7E9",
    d: "M16.005 19.892a4.04 4.04 0 0 0 4.032-4.033 4.04 4.04 0 0 0-4.032-4.033 4.04 4.04 0 0 0-4.033 4.033 4.037 4.037 0 0 0 4.033 4.033m0-5.699c.918 0 1.665.747 1.665 1.666s-.747 1.666-1.666 1.666a1.67 1.67 0 0 1-1.665-1.666c0-.919.747-1.666 1.665-1.666m15.99 4.473a1.2 1.2 0 0 0-.073-.364c-.01-.027-.016-.054-.028-.079l-.015-.044-2.28-4.558c-.201-.401-.61-.654-1.06-.654h-3.38a1.18 1.18 0 0 0-.49-.919l-7.484-5.345v-.487H21.7c.654 0 1.184-.53 1.184-1.183v-3.42C22.884.96 22.354.43 21.7.43h-5.698c-.654 0-1.184.53-1.184 1.184v5.09l-7.483 5.344a1.18 1.18 0 0 0-.491.919h-3.38c-.449 0-.859.253-1.06.654l-2.28 4.558c-.007.015-.009.03-.015.044q-.015.039-.026.079-.068.177-.074.364c0 .014-.009.028-.009.043v13.677c0 .654.53 1.183 1.184 1.183h29.633c.653 0 1.183-.53 1.183-1.183V18.709c0-.015-.007-.029-.009-.043zm-3.09-1.141h-3.738v-2.191h2.643l1.097 2.19zM20.518 3.848h-3.332V2.796h3.332zM4.198 15.334h2.644v2.19H3.104l1.096-2.19zm-1.827 4.558h4.471v11.31h-4.47zm6.838-1.184V13.62l6.795-4.854L22.8 13.62v17.582h-2.192v-7.934c0-.654-.53-1.184-1.184-1.184h-6.838c-.654 0-1.183.53-1.183 1.184V31.2H9.209V18.707zm4.56 12.494v-6.75h4.471v6.75zm15.868 0h-4.47v-11.31h4.47zM5.79 22.127v3.42a1.183 1.183 0 1 1-2.367 0v-3.42a1.183 1.183 0 1 1 2.367 0m20.428 3.42v-3.42a1.183 1.183 0 1 1 2.367 0v3.42a1.183 1.183 0 1 1-2.367 0"
  })));
};

var _path$j;
function _extends$j() { return _extends$j = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$j.apply(null, arguments); }
var SvgCloud = function SvgCloud(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$j({
    xmlns: "http://www.w3.org/2000/svg",
    width: 40,
    height: 20,
    fill: "none"
  }, props), _path$j || (_path$j = /*#__PURE__*/React.createElement("path", {
    fill: "#FFAE92",
    d: "M32.231 20H6.204C2.784 20 0 17.263 0 13.9s2.784-6.099 6.204-6.099a6.2 6.2 0 0 1 2.404.478C9.443 3.56 13.643 0 18.602 0c4.085 0 7.71 2.377 9.31 6.007a7.83 7.83 0 0 1 4.318-1.298c4.285 0 7.77 3.43 7.77 7.646C40.002 16.57 36.515 20 32.231 20M6.204 9.172c-2.625 0-4.762 2.121-4.762 4.728s2.137 4.728 4.762 4.728H32.23c3.49 0 6.33-2.816 6.33-6.274 0-3.46-2.839-6.274-6.33-6.274-1.53 0-3.009.553-4.166 1.56a.75.75 0 0 1-.674.157.71.71 0 0 1-.5-.46C25.72 3.768 22.39 1.37 18.601 1.37c-4.562 0-8.375 3.534-8.682 8.043a.69.69 0 0 1-.402.572.75.75 0 0 1-.722-.05 4.76 4.76 0 0 0-2.592-.764"
  })));
};

var _path$i, _path2$5;
function _extends$i() { return _extends$i = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$i.apply(null, arguments); }
var SvgDrops = function SvgDrops(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$i({
    xmlns: "http://www.w3.org/2000/svg",
    width: 26,
    height: 34,
    fill: "none"
  }, props), _path$i || (_path$i = /*#__PURE__*/React.createElement("path", {
    fill: "#F9CF2F",
    fillRule: "evenodd",
    d: "M3.374 17.613a9.57 9.57 0 0 0-2.244 6.17c0 5.303 4.306 9.609 9.609 9.609s9.609-4.306 9.609-9.61c0-2.348-.844-4.5-2.244-6.169l-6.057-7.345a1.698 1.698 0 0 0-2.617 0zm.868.724 6.062-7.348a.56.56 0 0 1 .435-.206c.17 0 .33.075.435.206l6.062 7.348a8.44 8.44 0 0 1 1.982 5.446 8.48 8.48 0 0 1-8.48 8.478 8.48 8.48 0 0 1-8.478-8.478c0-2.073.745-3.972 1.982-5.446",
    clipRule: "evenodd"
  })), _path2$5 || (_path2$5 = /*#__PURE__*/React.createElement("path", {
    fill: "#F9CF2F",
    fillRule: "evenodd",
    d: "M10.739 28.87a5.09 5.09 0 0 1-5.087-5.088.565.565 0 1 0-1.13 0A6.22 6.22 0 0 0 10.738 30a.565.565 0 1 0 0-1.13M7.382 5.977l-1.958-3.39a1.695 1.695 0 0 0-2.936 0L.531 5.977a3.96 3.96 0 0 0 3.425 5.937 3.96 3.96 0 0 0 3.426-5.937m-.978.566L4.445 3.152a.563.563 0 0 0-.978 0L1.51 6.543a2.827 2.827 0 1 0 4.895 0M15.724 5.837q-.006.009-.014.018a5.654 5.654 0 0 0 4.638 8.884 5.654 5.654 0 0 0 4.637-8.884l-3.26-4.54a1.698 1.698 0 0 0-2.755 0zm.919.66 3.246-4.522a.564.564 0 0 1 .918 0l3.253 4.53a4.524 4.524 0 0 1-3.712 7.103 4.524 4.524 0 0 1-3.71-7.106z",
    clipRule: "evenodd"
  })));
};

var _path$h, _path2$4;
function _extends$h() { return _extends$h = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$h.apply(null, arguments); }
var SvgTrash = function SvgTrash(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$h({
    xmlns: "http://www.w3.org/2000/svg",
    width: 22,
    height: 30,
    fill: "none"
  }, props), _path$h || (_path$h = /*#__PURE__*/React.createElement("path", {
    fill: "#5FD3AC",
    d: "M22 5.26a1.42 1.42 0 0 0-1.42-1.42h-4.907V1.787A1.774 1.774 0 0 0 13.9.012H8.101a1.774 1.774 0 0 0-1.774 1.774v2.055H1.42A1.42 1.42 0 0 0 0 5.26v2.2a1.42 1.42 0 0 0 1.42 1.418h.755v17.56a3.55 3.55 0 0 0 3.549 3.55h10.552a3.55 3.55 0 0 0 3.549-3.55V8.88h.755A1.42 1.42 0 0 0 22 7.46zM7.746 1.786a.355.355 0 0 1 .355-.354H13.9a.355.355 0 0 1 .355.354v2.055H7.746zM18.391 26.44a2.13 2.13 0 0 1-2.129 2.129H5.72a2.13 2.13 0 0 1-2.129-2.13V8.88h14.814zm2.19-18.98H1.42v-2.2h19.16z"
  })), _path2$4 || (_path2$4 = /*#__PURE__*/React.createElement("path", {
    fill: "#5FD3AC",
    d: "M11 25.644a.71.71 0 0 0 .71-.71V12.907a.71.71 0 0 0-1.42 0v12.029a.71.71 0 0 0 .71.71M14.903 25.644a.71.71 0 0 0 .71-.71V12.907a.71.71 0 0 0-1.42 0v12.029a.71.71 0 0 0 .71.71M7.097 25.644a.71.71 0 0 0 .71-.71V12.907a.71.71 0 0 0-1.42 0v12.029a.71.71 0 0 0 .71.71"
  })));
};

var _path$g;
function _extends$g() { return _extends$g = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$g.apply(null, arguments); }
var SvgOpenBook = function SvgOpenBook(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$g({
    xmlns: "http://www.w3.org/2000/svg",
    width: 30,
    height: 24,
    fill: "none"
  }, props), _path$g || (_path$g = /*#__PURE__*/React.createElement("path", {
    fill: "#2C2C69",
    d: "M18.08 6.853a.4.4 0 0 1-.028-.312.41.41 0 0 1 .205-.24 17.7 17.7 0 0 1 4.59-1.606.42.42 0 0 1 .317.059.406.406 0 0 1 .117.57.42.42 0 0 1-.269.173 16.8 16.8 0 0 0-4.37 1.53.42.42 0 0 1-.562-.174M6.986 5.497c1.522.308 2.992.823 4.37 1.53a.42.42 0 0 0 .562-.174.405.405 0 0 0-.177-.55A17.6 17.6 0 0 0 7.15 4.695a.42.42 0 0 0-.317.058.406.406 0 0 0 .152.743m0 4.312c1.522.307 2.992.821 4.37 1.529a.42.42 0 0 0 .562-.174.407.407 0 0 0-.177-.552A17.7 17.7 0 0 0 7.15 9.006a.417.417 0 0 0-.491.32.41.41 0 0 0 .326.482zm11.463 1.576a.4.4 0 0 0 .191-.046 16.8 16.8 0 0 1 4.372-1.53.41.41 0 0 0 .325-.481.417.417 0 0 0-.49-.321 17.7 17.7 0 0 0-4.59 1.606.408.408 0 0 0 .192.774zM6.984 14.122c1.524.306 2.994.82 4.371 1.53q.09.046.192.046a.408.408 0 0 0 .192-.774 17.7 17.7 0 0 0-4.59-1.606.409.409 0 1 0-.166.802zm15.864-.803a17.7 17.7 0 0 0-4.59 1.606.41.41 0 0 0-.215.462.414.414 0 0 0 .407.312.4.4 0 0 0 .192-.046 16.8 16.8 0 0 1 4.37-1.53.41.41 0 0 0 .327-.483.416.416 0 0 0-.491-.32m7.134 10.39-.01.028-.003.007v.002l-.025.05-.006.01a.3.3 0 0 1-.032.043l-.003.003v.001l-.037.036-.01.009-.001.001-.041.032h-.005a.3.3 0 0 1-.045.026l-.009.004a.3.3 0 0 1-.051.019H29.7q-.025.008-.05.011l-.014.003v-.001a.3.3 0 0 1-.05.004h-.005l-.042-.001h-.009a.1.1 0 0 1-.03-.005l-.023-.005-.017-.005-.028-.01-.009-.003-.006-.003c-3.193-1.26-8.047-1.975-14.42-2.117-6.372.142-11.225.857-14.422 2.12l-.005.003-.01.003q-.012.005-.027.009v.001l-.018.004-.02.006L.465 24H.456L.416 24H.41l-.05-.003-.015-.003a.3.3 0 0 1-.05-.011H.295a.3.3 0 0 1-.052-.019l-.01-.004q-.023-.011-.044-.025l-.004-.003-.043-.031-.011-.01H.13a.3.3 0 0 1-.035-.038L.09 23.85l-.03-.043-.006-.01a.3.3 0 0 1-.027-.05l-.002-.008q-.007-.015-.01-.029l-.005-.014-.006-.024.002-.002-.003-.021L0 23.63c-.002-.006 0-.02 0-.028V3.688a.4.4 0 0 1 .12-.29.42.42 0 0 1 .293-.121c.496 0 .999.022 1.5.057V2.23c0-.108.044-.212.123-.29a.42.42 0 0 1 .294-.119c.42 0 .841.018 1.263.046V.41A.417.417 0 0 1 4.01 0C7.86.01 11.65 1.393 15 4.006 18.348 1.392 22.139.01 25.985 0c.23 0 .417.183.417.41v1.46c.42-.03.844-.045 1.261-.047v-.001a.42.42 0 0 1 .295.12c.079.077.123.18.123.29v1.104a21 21 0 0 1 1.5-.058.42.42 0 0 1 .296.118c.08.078.123.181.123.29V23.63c0 .01 0 .011-.003.017v.002l-.003.02q0 .013-.006.024-.002.011-.006.016m-1.9-19.553v16.23a.4.4 0 0 1-.161.323.42.42 0 0 1-.359.073 19.07 19.07 0 0 0-10.471.318c5.122.228 9.176.865 12.075 1.9V4.1q-.542.013-1.084.055m-1.68-1.468v14.629a.41.41 0 0 1-.415.41 16.43 16.43 0 0 0-8.283 2.34 19.9 19.9 0 0 1 9.545-.202V2.646q-.423.011-.847.042M25.57.826c-3.553.105-7.051 1.449-10.154 3.902l-.001 15.869c3.123-2.317 6.608-3.584 10.153-3.681zm-21.14 0-.002 16.088c3.545.1 7.03 1.366 10.153 3.681l.002-15.868C11.478 2.275 7.98.93 4.428.826zM2.748 19.865c3.15-.71 6.43-.639 9.544.203a16.4 16.4 0 0 0-8.283-2.341.413.413 0 0 1-.415-.41V2.687c-.28-.02-.562-.037-.846-.042zM.83 4.1v18.897c2.9-1.034 6.953-1.67 12.076-1.9v.002a19.07 19.07 0 0 0-10.472-.318.42.42 0 0 1-.359-.073.4.4 0 0 1-.16-.324V4.155q-.542-.04-1.085-.054"
  })));
};

var _path$f, _path2$3, _path3$2;
function _extends$f() { return _extends$f = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$f.apply(null, arguments); }
var SvgInfo = function SvgInfo(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$f({
    xmlns: "http://www.w3.org/2000/svg",
    width: 30,
    height: 30,
    fill: "none"
  }, props), _path$f || (_path$f = /*#__PURE__*/React.createElement("path", {
    stroke: "#fff",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M15 26.25c6.213 0 11.25-5.037 11.25-11.25S21.213 3.75 15 3.75 3.75 8.787 3.75 15 8.787 26.25 15 26.25"
  })), _path2$3 || (_path2$3 = /*#__PURE__*/React.createElement("path", {
    stroke: "#fff",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M14.063 14.063H15v6.562h.938"
  })), _path3$2 || (_path3$2 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M15 11.25a1.406 1.406 0 1 0 0-2.812 1.406 1.406 0 0 0 0 2.812"
  })));
};

var _circle, _path$e;
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
  })), _path$e || (_path$e = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M21 24v1.25a.75.75 0 0 1-.75.75h-8.5a.75.75 0 0 1-.75-.75v-11.5a.75.75 0 0 1 .75-.75H14v9.25c0 .965.785 1.75 1.75 1.75zm0-10.75V10h-5.25a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75V14h-3.25a.75.75 0 0 1-.75-.75m3.78-.97-2.06-2.06a.75.75 0 0 0-.53-.22H22v3h3v-.19a.75.75 0 0 0-.22-.53"
  })));
};

var _path$d;
function _extends$d() { return _extends$d = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$d.apply(null, arguments); }
var SvgRemove = function SvgRemove(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$d({
    xmlns: "http://www.w3.org/2000/svg",
    width: 28,
    height: 28,
    fill: "none"
  }, props), _path$d || (_path$d = /*#__PURE__*/React.createElement("path", {
    fill: "#2C2C69",
    d: "M14 0C6.258 0 0 6.258 0 14s6.258 14 14 14 14-6.258 14-14S21.742 0 14 0m0 25.2C7.826 25.2 2.8 20.174 2.8 14S7.826 2.8 14 2.8 25.2 7.826 25.2 14 20.174 25.2 14 25.2M19.026 7 14 12.026 8.974 7 7 8.974 12.026 14 7 19.026 8.974 21 14 15.974 19.026 21 21 19.026 15.974 14 21 8.974z"
  })));
};

var _path$c;
function _extends$c() { return _extends$c = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$c.apply(null, arguments); }
var SvgArrowBack = function SvgArrowBack(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$c({
    xmlns: "http://www.w3.org/2000/svg",
    width: 11,
    height: 8,
    fill: "none"
  }, props), _path$c || (_path$c = /*#__PURE__*/React.createElement("path", {
    fill: "#2C2C69",
    d: "M10.39 4.002a.874.874 0 0 0-.875-.875H3.098L4.72 1.504a.877.877 0 0 0 0-1.238.877.877 0 0 0-1.238 0L.37 3.38a.88.88 0 0 0-.003 1.24l3.115 3.114c.34.341.894.341 1.238 0a.877.877 0 0 0 0-1.238l-1.621-1.62h6.417a.874.874 0 0 0 .875-.874"
  })));
};

var _path$b;
function _extends$b() { return _extends$b = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$b.apply(null, arguments); }
var SvgMegaphone = function SvgMegaphone(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$b({
    xmlns: "http://www.w3.org/2000/svg",
    width: 21,
    height: 16,
    fill: "currentColor"
  }, props), _path$b || (_path$b = /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "m9.989 3.636 4.813-2.75a1.817 1.817 0 0 1 3.38.932v2.637a2.91 2.91 0 0 1 0 5.635v2.637a1.818 1.818 0 0 1-3.38.933L9.99 10.91H7.273v3.272a1.818 1.818 0 1 1-3.637 0v-3.273a3.636 3.636 0 0 1 0-7.273zm6.738-1.818a.364.364 0 0 0-.727 0v10.91a.364.364 0 0 0 .727 0z",
    clipRule: "evenodd"
  })));
};

var _path$a;
function _extends$a() { return _extends$a = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$a.apply(null, arguments); }
var SvgGear = function SvgGear(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$a({
    xmlns: "http://www.w3.org/2000/svg",
    width: 18,
    height: 18,
    fill: "currentColor"
  }, props), _path$a || (_path$a = /*#__PURE__*/React.createElement("path", {
    d: "M10.375 17.334h-2.75a.62.62 0 0 1-.406-.146.6.6 0 0 1-.219-.375l-.333-2.104a5.6 5.6 0 0 1-.834-.396 6 6 0 0 1-.77-.521l-1.938.896a.62.62 0 0 1-.458.031.6.6 0 0 1-.354-.302L.938 11.98a.54.54 0 0 1-.063-.438.7.7 0 0 1 .25-.375l1.792-1.313a2.5 2.5 0 0 1-.052-.427 10 10 0 0 1 0-.854q.01-.24.052-.427L1.125 6.834a.7.7 0 0 1-.25-.375.54.54 0 0 1 .063-.438l1.375-2.437a.6.6 0 0 1 .354-.302.62.62 0 0 1 .458.03l1.938.897q.333-.271.77-.521a4.3 4.3 0 0 1 .834-.375L7 1.188A.6.6 0 0 1 7.22.813a.62.62 0 0 1 .406-.146h2.75a.62.62 0 0 1 .406.146.6.6 0 0 1 .22.375l.332 2.104q.396.146.844.385t.76.532l1.938-.896a.62.62 0 0 1 .458-.031q.23.072.355.302L17.063 6a.6.6 0 0 1 .073.448.62.62 0 0 1-.26.386l-1.793 1.27q.042.21.053.448a10 10 0 0 1 0 .886 3 3 0 0 1-.053.437l1.792 1.292a.7.7 0 0 1 .25.375.54.54 0 0 1-.062.438l-1.375 2.437a.6.6 0 0 1-.355.302.62.62 0 0 1-.458-.031l-1.937-.896q-.334.27-.76.531a3.6 3.6 0 0 1-.845.386L11 16.813a.6.6 0 0 1-.219.375.62.62 0 0 1-.406.146M9 11.709a2.6 2.6 0 0 0 1.917-.792A2.6 2.6 0 0 0 11.708 9a2.6 2.6 0 0 0-.791-1.916A2.6 2.6 0 0 0 9 6.292a2.6 2.6 0 0 0-1.917.792A2.6 2.6 0 0 0 6.292 9q0 1.126.791 1.917A2.6 2.6 0 0 0 9 11.709"
  })));
};

var _path$9, _path2$2, _path3$1;
function _extends$9() { return _extends$9 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$9.apply(null, arguments); }
var SvgPeople = function SvgPeople(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$9({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 14,
    fill: "currentColor"
  }, props), _path$9 || (_path$9 = /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M13.892 7.941c1.141.775 1.941 1.825 1.941 3.225v2.5h3.334v-2.5c0-1.816-2.975-2.891-5.275-3.225",
    clipRule: "evenodd"
  })), _path2$2 || (_path2$2 = /*#__PURE__*/React.createElement("path", {
    d: "M7.5 7a3.333 3.333 0 1 0 0-6.667A3.333 3.333 0 0 0 7.5 7"
  })), _path3$1 || (_path3$1 = /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M12.5 7a3.332 3.332 0 1 0 0-6.667c-.392 0-.758.083-1.108.2a4.98 4.98 0 0 1 0 6.267c.35.116.716.2 1.108.2M7.5 7.833C5.275 7.833.833 8.95.833 11.166v2.5h13.334v-2.5c0-2.216-4.442-3.333-6.667-3.333",
    clipRule: "evenodd"
  })));
};

var _path$8;
function _extends$8() { return _extends$8 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$8.apply(null, arguments); }
var SvgBubble = function SvgBubble(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$8({
    xmlns: "http://www.w3.org/2000/svg",
    width: 17,
    height: 16,
    fill: "currentColor"
  }, props), _path$8 || (_path$8 = /*#__PURE__*/React.createElement("path", {
    d: "M3.73 13.063q-1.355 0-2.292-.938Q.5 11.188.5 9.833q0-1.353.938-2.291t2.291-.938q1.355 0 2.292.938t.937 2.291-.937 2.292-2.292.938m8.124-3.605q-1.875 0-3.177-1.302T7.375 4.98t1.302-3.177T11.854.5t3.177 1.302 1.302 3.177-1.302 3.177-3.177 1.302M10.188 15.5q-.96 0-1.626-.667a2.2 2.2 0 0 1-.666-1.625q0-.958.667-1.625a2.2 2.2 0 0 1 1.624-.666q.96 0 1.626.666.666.667.666 1.625 0 .959-.666 1.625a2.2 2.2 0 0 1-1.626.667"
  })));
};

var _path$7;
function _extends$7() { return _extends$7 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$7.apply(null, arguments); }
var SvgTropheeGp = function SvgTropheeGp(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$7({
    xmlns: "http://www.w3.org/2000/svg",
    width: 18,
    height: 18,
    fill: "currentColor"
  }, props), _path$7 || (_path$7 = /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M.643 0A.643.643 0 0 0 0 .643v2.571a3.86 3.86 0 0 0 3.244 3.809 5.79 5.79 0 0 0 3.827 4.862v.972a.64.64 0 0 0-.61.44l-.496 1.489h-.18a.64.64 0 0 0-.61.44l-.642 1.928a.643.643 0 0 0 .61.846h7.714a.642.642 0 0 0 .61-.846l-.643-1.929a.64.64 0 0 0-.61-.44h-.18l-.496-1.488a.64.64 0 0 0-.61-.44v-.972a5.79 5.79 0 0 0 3.827-4.862A3.86 3.86 0 0 0 18 3.214V.643A.643.643 0 0 0 17.357 0zm2.571 1.286H1.286v1.928c0 1.198.82 2.205 1.928 2.49zm13.5 1.928c0 1.198-.82 2.205-1.928 2.49V1.287h1.928z",
    clipRule: "evenodd"
  })));
};

var _path$6;
function _extends$6() { return _extends$6 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$6.apply(null, arguments); }
var SvgValid = function SvgValid(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$6({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 20,
    fill: "none"
  }, props), _path$6 || (_path$6 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M10 20C4.486 20 0 15.514 0 10S4.486 0 10 0s10 4.486 10 10-4.486 10-10 10m0-18.667c-4.778 0-8.667 3.889-8.667 8.667S5.222 18.667 10 18.667s8.667-3.889 8.667-8.667S14.778 1.333 10 1.333m-.862 11.805 6-6a.665.665 0 1 0-.942-.942l-5.528 5.528L6.473 9.53a.665.665 0 1 0-.943.943l2.667 2.666a.665.665 0 0 0 .943 0z"
  })));
};

var _path$5, _path2$1, _path3;
function _extends$5() { return _extends$5 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$5.apply(null, arguments); }
var SvgInvalid = function SvgInvalid(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$5({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 20,
    fill: "none"
  }, props), _path$5 || (_path$5 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M10 0a10 10 0 0 0-7.07 2.93A10 10 0 0 0 0 10a10 10 0 0 0 2.93 7.07A10 10 0 0 0 10 20a10 10 0 0 0 7.07-2.93 9.995 9.995 0 0 0-.002-14.138A10 10 0 0 0 10 0m0 18.585A8.584 8.584 0 1 1 18.585 10a8.6 8.6 0 0 1-2.518 6.067A8.6 8.6 0 0 1 10 18.585"
  })), _path2$1 || (_path2$1 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M13.123 12.123 7.875 6.875a.708.708 0 1 0-1 1l5.247 5.248a.707.707 0 1 0 1.001-1"
  })), _path3 || (_path3 = /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M13.123 6.875a.703.703 0 0 0-1 0l-5.248 5.248a.708.708 0 1 0 1 1l5.248-5.248a.703.703 0 0 0 0-1"
  })));
};

var _path$4;
function _extends$4() { return _extends$4 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$4.apply(null, arguments); }
var SvgEye = function SvgEye(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$4({
    xmlns: "http://www.w3.org/2000/svg",
    width: 25,
    height: 16,
    fill: "currentColor"
  }, props), _path$4 || (_path$4 = /*#__PURE__*/React.createElement("path", {
    d: "M11 .5C6 .5 1.73 3.61 0 8c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C20.27 3.61 16 .5 11 .5M11 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8C9.34 5 8 6.34 8 8s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3"
  })));
};

var _path$3;
function _extends$3() { return _extends$3 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$3.apply(null, arguments); }
var SvgTriangle = function SvgTriangle(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$3({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 8,
    fill: "currentColor"
  }, props), _path$3 || (_path$3 = /*#__PURE__*/React.createElement("path", {
    fill: "#2C2C69",
    d: "M6.735 7.205a1 1 0 0 1-1.47 0L.622 2.179C.031 1.539.485.5 1.357.5h9.286c.872 0 1.326 1.038.735 1.679z"
  })));
};

var _path$2, _path2;
function _extends$2() { return _extends$2 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$2.apply(null, arguments); }
var SvgDownload = function SvgDownload(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$2({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 14,
    fill: "none"
  }, props), _path$2 || (_path$2 = /*#__PURE__*/React.createElement("path", {
    fill: "#2C2C69",
    d: "M15.125 8.096a.874.874 0 0 0-.875.875v1.852a1.43 1.43 0 0 1-1.428 1.428H3.43a1.43 1.43 0 0 1-1.428-1.428V8.97a.874.874 0 1 0-1.75 0v1.852A3.18 3.18 0 0 0 3.43 14h9.392A3.18 3.18 0 0 0 16 10.823V8.97a.874.874 0 0 0-.875-.875"
  })), _path2 || (_path2 = /*#__PURE__*/React.createElement("path", {
    fill: "#2C2C69",
    d: "M8.127 0a.874.874 0 0 0-.875.875v6.417L5.628 5.67a.877.877 0 0 0-1.238 0 .877.877 0 0 0 0 1.238l3.115 3.114a.88.88 0 0 0 1.24.002L11.86 6.91a.877.877 0 0 0 0-1.238.877.877 0 0 0-1.238 0l-1.62 1.621V.875A.874.874 0 0 0 8.127 0"
  })));
};

var _path$1;
function _extends$1() { return _extends$1 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$1.apply(null, arguments); }
var SvgInputClose = function SvgInputClose(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$1({
    xmlns: "http://www.w3.org/2000/svg",
    width: 10,
    height: 10,
    fill: "none"
  }, props), _path$1 || (_path$1 = /*#__PURE__*/React.createElement("path", {
    fill: "#2C2C69",
    d: "M10 1.007 8.993 0 5 3.993 1.007 0 0 1.007 3.993 5 0 8.993 1.007 10 5 6.007 8.993 10 10 8.993 6.007 5z"
  })));
};

var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var SvgResearch = function SvgResearch(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/React.createElement("path", {
    fill: "#2C2C69",
    d: "M11.085 11.847 7 7.757a3.7 3.7 0 0 1-1.186.687 4.2 4.2 0 0 1-1.441.246q-1.83 0-3.102-1.273Q.001 6.145 0 4.345t1.271-3.072Q2.543 0 4.356 0q1.796 0 3.06 1.273 1.262 1.273 1.262 3.072a4.24 4.24 0 0 1-.95 2.682l4.12 4.09q.152.136.152.348a.53.53 0 0 1-.17.382.5.5 0 0 1-.372.153.5.5 0 0 1-.373-.153m-6.73-4.175a3.17 3.17 0 0 0 2.34-.976 3.22 3.22 0 0 0 .966-2.35q0-1.375-.966-2.352a3.17 3.17 0 0 0-2.34-.976q-1.39 0-2.363.976a3.2 3.2 0 0 0-.975 2.351q0 1.375.975 2.35.974.978 2.364.977"
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
    arrowBack: SvgArrowBack,
    gear: SvgGear,
    megaphone: SvgMegaphone,
    people: SvgPeople,
    bubble: SvgBubble,
    tropheeGp: SvgTropheeGp,
    valid: SvgValid,
    invalid: SvgInvalid,
    eye: SvgEye,
    triangle: SvgTriangle,
    download: SvgDownload,
    research: SvgResearch,
    inputClose: SvgInputClose
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
 * Composant de menu principal pour les interfaces back-office (GP ou SCO).
 *
 * @component
 * @param {MppMenuProps} props - Propriétés du composant
 *
 * @interface MppMenuProps
 * @property {NavigationLink[]} navigationLinks - Liste des liens de navigation affichés dans le menu.
 * @property {React.ElementType} LinkComponent - Composant de lien utilisé pour la navigation (ex : `Link` de Next.js ou React Router).
 * @property {BoType} boType - Type de back-office (ex : `BoType.scoBO` ou `BoType.gpBo`).
 * @property {() => void} onLogout - Fonction appelée lors du clic sur le bouton de déconnexion.
 * @property {string} actualPage - Nom ou URL de la page actuelle, utilisé pour la mise en surbrillance du lien actif.
 * @property {string} logOutText - Texte affiché pour le bouton de déconnexion.
 * @property {boolean} clientIsLoad - Indique si les données client sont chargées (affiche un loader sinon).
 * @property {string} [clientName] - Nom du client à afficher (pour le back-office GP).
 * @property {React.ReactNode} [codeClientInput] - Composant d’input pour la saisie du code client (GP uniquement).
 * @property {React.ReactNode} [codeClientButton] - Composant bouton associé à l’input du code client.
 * @property {NavigationLink} [backToClientsLink] - Lien de retour à la liste des clients (GP uniquement).
 * @property {React.ReactNode} [languageToggle] - Composant pour le changement de langue.
 * @property {string} [aboutText] - Texte du lien "À propos", redirigeant vers le site Ma Petite Planète.
 *
 * @interface NavigationLink
 * @property {React.FC<React.SVGProps<SVGSVGElement>>} icon - Icône du lien de navigation.
 * @property {string} name - Nom du lien affiché.
 * @property {string} navigation - URL de destination.
 * @property {string} [target] - Spécifie si le lien doit s'ouvrir dans un nouvel onglet.
 *
 * @example
 * ```tsx
 * const navigationLinks = [
 *   { icon: MppIcons.home, name: 'Accueil', navigation: '/' },
 *   { icon: MppIcons.profile, name: 'Profil', navigation: '/profil' },
 * ];
 *
 * <MppMenu
 *   navigationLinks={navigationLinks}
 *   LinkComponent={Link}
 *   boType={BoType.gpBo}
 *   onLogout={() => console.log('Déconnexion')}
 *   actualPage="/"
 *   logOutText="Se déconnecter"
 *   clientIsLoad={true}
 *   clientName="Entreprise ABC"
 *   codeClientInput={<input />}
 *   codeClientButton={<button>Valider</button>}
 *   backToClientsLink={{
 *     name: 'Retour aux clients',
 *     navigation: '/clients',
 *     icon: MppIcons.arrowBack
 *   }}
 *   languageToggle={<LanguageSwitcher />}
 *   aboutText="À propos"
 * />
 * ```
 */
const MppMenu = ({ navigationLinks, LinkComponent, boType, onLogout, actualPage, aboutText, logOutText, clientIsLoad, clientName, codeClientInput, codeClientButton, backToClientsLink, languageToggle, }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    return (React__default.createElement("div", { className: "menu_background" },
        React__default.createElement("div", { className: "center" },
            React__default.createElement("div", { className: `logo_container ${boType === BoType.gpBo ? 'logo_gp' : 'logo_sco'}` }),
            boType === BoType.gpBo && (React__default.createElement("div", { className: "gp_menu_client_data " },
                clientName && React__default.createElement("span", { className: "text_body_sb" }, clientName),
                backToClientsLink && (React__default.createElement(LinkComponent, { href: backToClientsLink.navigation, className: "navigation_flex text_small_b navigation_return_link" },
                    React__default.createElement(MppIcons.arrowBack, { className: "icon_arrow_back text_small_b" }),
                    React__default.createElement("span", { className: 'text_small_b' }, backToClientsLink.name))))),
            React__default.createElement("div", { className: "navigation_background" }, clientIsLoad ? (navigationLinks.map((navigationLink, index) => {
                var _a;
                return (React__default.createElement("div", { onMouseEnter: () => setHoveredIndex(index), onMouseLeave: () => setHoveredIndex(null), className: `navigation_element ${actualPage.includes(navigationLink.navigation) ? 'actual_page' : ''} ${hoveredIndex === index ||
                        actualPage.includes(navigationLink.navigation)
                        ? 'text_body_sb '
                        : 'text_body '}`, key: navigationLink.name },
                    React__default.createElement(LinkComponent, { href: navigationLink.navigation, className: "navigation_flex", target: (_a = navigationLink.target) !== null && _a !== void 0 ? _a : '' },
                        React__default.createElement(navigationLink.icon, { className: "icon" }),
                        React__default.createElement("p", null, navigationLink.name))));
            })) : (React__default.createElement(MppSkeletonLoader, { count: 5, spaceBetweenRow: "16px", heightRow: "20px" })))),
        boType === BoType.gpBo && (React__default.createElement("div", { className: "navigation_client_code_section" },
            React__default.createElement("div", { className: "navigation_client_code_section--input" }, codeClientInput),
            codeClientButton)),
        React__default.createElement("div", { className: "navigation_background" },
            aboutText && (React__default.createElement(LinkComponent, { className: "navigation_element", href: 'https://mapetiteplanete.org/' },
                React__default.createElement("p", { className: "text_body" }, aboutText))),
            languageToggle,
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

const useClickOutside = (elementRef, callback) => {
    const handleClickOutside = (event) => {
        if (!elementRef.current.contains(event.target) &&
            callbackRef.current) {
            callbackRef.current();
        }
    };
    const callbackRef = useRef();
    callbackRef.current = callback;
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });
};

/**
 * Le composant MppDropDown rend un menu déroulant personnalisable.
 *
 * @template T - Le type des options.
 * @template K - La clé du type des options.
 *
 * @param {MppDropDownProps<T, K>} props - Les propriétés du composant dropdown.
 * @param {string} props.placeholder - Le texte de l'espace réservé à afficher lorsqu'aucune option n'est sélectionnée.
 * @param {(option: T) => void} props.onChange - La fonction de rappel pour gérer les changements de sélection d'option.
 * @param {T[]} props.options - La liste des options à afficher dans le menu déroulant.
 * @param {boolean} [props.isDisabled] - Indicateur pour désactiver le menu déroulant.
 * @param {T} props.defaultValue - L'option sélectionnée par défaut.
 * @param {string} [props.textClassname=''] - Le nom de la classe CSS pour le texte.
 * @param {K} props.property - La propriété de l'option à afficher dans le menu déroulant.
 *
 * @example
 * ```tsx
 * const ExampleComponent = () => {
 *   const options = [
 *     { id: '1', value: 'Option 1' },
 *     { id: '2', value: 'Option 2' },
 *     { id: '3', value: 'Option 3' },
 *   ];
 *
 *   const handleChange = (selectedOption: T) => {
 *     console.log('Option sélectionnée:', selectedOption);
 *   };
 *
 *   return (
 *     <MppDropDown
 *       options={options}
 *       onChange={handleChange}
 *       defaultValue={options[0]}
 *       placeholder="Sélectionnez une option"
 *       property="value"
 *     />
 *   );
 * };
 * ```
 */
const MppDropDown = ({ placeholder, onChange, options, isDisabled, defaultValue, textClassname = '', property, needEmojiFont = false, isDropDownEmpty = false, emptyValue, }) => {
    const [selectedOption, setSelectedOption] = React__default.useState(defaultValue);
    const [isDropdownVisible, setIsDropdownVisible] = React__default.useState(false);
    const dropDownRef = useRef(null);
    const displayedDefaultValue = defaultValue[property];
    const selectedValue = selectedOption[property];
    useClickOutside(dropDownRef, () => {
        if (!isDisabled) {
            setIsDropdownVisible(false);
        }
    });
    useEffect(() => {
        if (isDisabled) {
            setSelectedOption(null);
        }
    }, [isDisabled]);
    useEffect(() => {
        setSelectedOption(defaultValue);
    }, [defaultValue]);
    return (React__default.createElement("div", { ref: dropDownRef, className: `custom_select ${isDisabled ? 'select_disabled' : ''}` },
        React__default.createElement("button", { disabled: isDisabled, onClick: !isDisabled ? () => setIsDropdownVisible(!isDropdownVisible) : null, className: ` select_button ${textClassname}
          ${isDropdownVisible ? 'open' : ''}
          ${(placeholder && displayedDefaultValue === '' && !selectedOption) || isDisabled ? 'default' : ''}
          ${selectedOption ? 'selected' : ''}` },
            React__default.createElement("span", { className: `select_button--selected_value ${needEmojiFont ? 'emoji' : ''} ${textClassname}` }, selectedValue
                ? selectedValue
                : displayedDefaultValue
                    ? displayedDefaultValue
                    : placeholder),
            React__default.createElement("span", { className: `${isDropdownVisible ? 'arrow arrow--open' : isDisabled ? 'arrow--disabled arrow' : 'arrow'}` })),
        isDropdownVisible && (React__default.createElement("ul", { className: "select_dropdown" }, isDropDownEmpty ? (React__default.createElement("div", null, emptyValue)) : (options.map((option, index) => {
            const displayedvalue = option[property];
            return (React__default.createElement("li", { onKeyDown: (event) => {
                    if (event.key === 'Enter') {
                        setSelectedOption(option);
                        setIsDropdownVisible(false);
                        onChange(option);
                    }
                }, tabIndex: 0, className: `${needEmojiFont ? 'emoji' : ''}${textClassname}`, key: index, onClick: () => {
                    setSelectedOption(option);
                    setIsDropdownVisible(false);
                    onChange(option);
                } },
                displayedvalue,
                React__default.createElement("div", { className: "select_dropdown_divider" })));
        }))))));
};

/**
 * Le composant MppLoaderDots rend une animation de chargement avec des points élastiques.
 *
 * @component
 *
 * @returns {JSX.Element} Le composant MppLoaderDots rendu.
 *
 * @example
 * <MppLoaderDots />
 */
const MppLoaderDots = () => {
    return (React__default.createElement("div", { className: "snippet", "data-title": "dot-elastic" },
        React__default.createElement("div", { className: "stage" },
            React__default.createElement("div", { className: "dot-elastic" }))));
};

var labelType;
(function (labelType) {
    labelType["grey"] = "grey_label";
    labelType["orange"] = "orange_label";
    labelType["green"] = "green_label";
})(labelType || (labelType = {}));
/**
 * Le composant MppLabelType rend une étiquette avec un type et une valeur spécifiques.
 *
 * @component
 * @param {MppLabelTypeProps} props - Les propriétés du composant MppLabelType.
 * @param {string} props.value - La valeur à afficher à l'intérieur de l'étiquette.
 * @param {labelType} props.labelType - Le type de l'étiquette qui détermine la classe CSS à appliquer.
 *
 * @returns {JSX.Element} Le composant MppLabelType rendu.
 *
 * @example
 * <MppLabelType
 *   value="Exemple de valeur"
 *   labelType={labelType.grey}
 * />
 */
const MppLabelType = ({ value, labelType, }) => {
    return (React__default.createElement("div", null,
        React__default.createElement("span", { className: `${labelType} text_small_b label` }, value)));
};

var ColumnType;
(function (ColumnType) {
    ColumnType[ColumnType["league_created_vs_previsions"] = 0] = "league_created_vs_previsions";
    ColumnType[ColumnType["leagyues_with_more_then_4_players"] = 1] = "leagyues_with_more_then_4_players";
    ColumnType[ColumnType["players_registered"] = 2] = "players_registered";
    ColumnType[ColumnType["activity_rate"] = 3] = "activity_rate";
})(ColumnType || (ColumnType = {}));
var ProgressBarStyle;
(function (ProgressBarStyle) {
    ProgressBarStyle["red"] = "red";
    ProgressBarStyle["green"] = "green";
    ProgressBarStyle["orange"] = "orange";
    ProgressBarStyle["default"] = "default";
})(ProgressBarStyle || (ProgressBarStyle = {}));
/**
 * Le composant `MppLinearProgressBar` rend une barre de progression linéaire personnalisable avec un style dynamique basé sur des conditions.
 *
 * @component
 * @param {LinearProgressBarProps} props - Propriétés permettant de configurer la barre de progression.
 * @param {number} props.value - Valeur actuelle de la barre de progression (obligatoire).
 * @param {boolean} [props.useValueAsProgressBarWidth=false] - Si `true`, la valeur est utilisée directement comme pourcentage de largeur (0 à 100).
 * @param {number} [props.maxValue] - La valeur maximale, utilisée pour calculer le pourcentage de progression si `useValueAsProgressBarWidth` est `false`.
 * @param {boolean} [props.displayValueAsDefault] - Si `true`, affiche une barre par défaut sans se baser sur la valeur, utile pour les cas sans données.
 * @param {boolean} [props.conditionForGreen] - Condition qui force le style de la barre en vert.
 * @param {boolean} [props.conditionForRed] - Condition qui force le style de la barre en rouge.
 *
 * @returns {JSX.Element} Le composant React représentant la barre de progression.
 *
 * @example
 * // Utilisation classique avec valeur et maximum
 * const value = 40
 * const maxValue = 100
 * <MppLinearProgressBar value={40} maxValue={100} conditionForGreen={value < 100} conditionForRed={value === 100}/>
 *
 * @example
 * // Utiliser la valeur comme pourcentage de largeur directement
 * // A utiliser si la value est déjà un pourcentage
 * // Du coup doit être moins de 100
 * <MppLinearProgressBar value={75} useValueAsProgressBarWidth={true} />
 *
 * @example
 * // Affichage de la barre par défaut sans données
 * const value = 8
 * <MppLinearProgressBar value={value} displayValueAsDefault={true} />
 **/
const MppLinearProgressBar = ({ maxValue, value, conditionForGreen, conditionForRed, useValueAsProgressBarWidth = false, displayValueAsDefault, }) => {
    const progressBarPercentage = (() => {
        if (displayValueAsDefault || value === 0)
            return 51;
        if (useValueAsProgressBarWidth)
            return value;
        if (maxValue !== null) {
            return Math.round((value / maxValue) * 100);
        }
        return 0;
    })();
    const colorToDisplay = () => {
        if (value === 0 || displayValueAsDefault) {
            return ProgressBarStyle.default;
        }
        else if (conditionForGreen) {
            return ProgressBarStyle.green;
        }
        else if (conditionForRed) {
            return ProgressBarStyle.red;
        }
        else {
            return ProgressBarStyle.orange;
        }
    };
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement("div", { className: `linear_progress_bar_container ${colorToDisplay()}` },
            React__default.createElement("div", { className: "linear_progress_bar--background_value" },
                React__default.createElement("div", { className: "progress_bar background_value--indicator" },
                    React__default.createElement("div", { className: "linear_progress_bar--main_value", style: {
                            width: `${progressBarPercentage}%`,
                        } },
                        React__default.createElement("div", { className: "progress_bar main_value--indicator" }),
                        React__default.createElement("p", { className: "main_value--value" }, Math.round(value))))),
            !displayValueAsDefault && (React__default.createElement("p", { className: `background_value--max_value ${progressBarPercentage >= 100 ? 'hide' : 'end_line_number'}` }, maxValue)))));
};

var MessageType;
(function (MessageType) {
    MessageType[MessageType["error"] = 0] = "error";
    MessageType[MessageType["succes"] = 1] = "succes";
})(MessageType || (MessageType = {}));
var AnimationDirection;
(function (AnimationDirection) {
    AnimationDirection["from_bottom"] = "toaster_message_container--bottom";
    AnimationDirection["from_top"] = "toaster_message_container--top";
})(AnimationDirection || (AnimationDirection = {}));
/**
 * Le composant MppToaster rend un message de notification (toast) avec des styles et animations personnalisables.
 *
 * @component
 * @param {MppToasterProps} props - Les propriétés du composant MppToaster.
 * @param {string} props.message - Le message à afficher dans le toast.
 * @param {boolean} props.displayToast - Indicateur pour afficher ou masquer le toast.
 * @param {MessageType} props.messageType - Le type de message (erreur ou succès).
 * @param {AnimationDirection} props.animationDirection - La direction de l'animation du toast.
 *
 * @returns {JSX.Element} Le composant MppToaster rendu.
 *
 * @example
 * <MppToaster
 *   message="Opération réussie"
 *   displayToast={true}
 *   messageType={MessageType.succes}
 *   animationDirection={AnimationDirection.from_bottom}
 * />
 */
const MppToaster = ({ message, displayToast, messageType, animationDirection, }) => {
    const [displayToaster, setDisplayToaster] = useState(false);
    useEffect(() => {
        if (displayToast) {
            setDisplayToaster(true);
        }
    }, [displayToast]);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDisplayToaster(false);
        }, 3000);
        return () => clearTimeout(timeout);
    }, [displayToaster]);
    return (React__default.createElement("div", { className: `
        ${messageType === MessageType.error
            ? 'error_message_container'
            : 'success_message_container'}
        ${displayToaster ? 'visible' : 'hidden'}
        ${animationDirection}
        toaster_message
      ` },
        messageType === MessageType.error ? (React__default.createElement(MppIcons.invalid, null)) : (React__default.createElement(MppIcons.valid, null)),
        React__default.createElement("span", { className: "toaster_message--span text_body" }, message)));
};

/**
 * Le composant MppToggleButton rend un bouton bascule personnalisable.
 *
 * @component
 * @param {ToggleButtonProps} props - Les propriétés du composant MppToggleButton.
 * @param {boolean} props.value - L'état initial du bouton bascule.
 * @param {function} props.onChange - La fonction de rappel pour gérer les changements d'état du bouton bascule.
 *
 * @returns {JSX.Element} Le composant MppToggleButton rendu.
 *
 * @example
 * <MppToggleButton
 *   value={true}
 *   onChange={(newValue) => console.log(newValue)}
 * />
 */
const MppToggleButton = ({ value, onChange }) => {
    const [toggleValue, setToggleValue] = useState(value);
    return (React__default.createElement("div", { className: "toggle_button_container" },
        React__default.createElement("label", { htmlFor: "toggle", className: `toggle_button ${toggleValue ? 'checked' : ''}` },
            React__default.createElement("input", { onChange: () => {
                    const value = !toggleValue;
                    setToggleValue(value);
                    onChange(value);
                }, checked: toggleValue, type: "checkbox", id: "toggle" }),
            React__default.createElement("div", { className: "toggle_button_indicator" }))));
};

/**
 * Le composant MppCheckbox rend une case à cocher personnalisable avec un style optionnel pour l'en-tête de tableau.
 *
 * @component
 * @param {MppCheckboxProps} props - Les propriétés du composant MppCheckbox.
 * @param {string} props.value - La valeur associée à la case à cocher.
 * @param {function} props.onChange - La fonction de rappel pour gérer les changements d'état de la case à cocher.
 * @param {boolean} props.checked - L'état initial de la case à cocher.
 * @param {boolean} props.isTableHeader - Indicateur pour déterminer si la case à cocher est utilisée dans un en-tête de tableau.
 *
 * @returns {JSX.Element} Le composant MppCheckbox rendu.
 *
 * @example
 * <MppCheckbox
 *   value="exampleValue"
 *   onChange={handleCheckboxChange}
 *   checked={true}
 *   isTableHeader={false}
 * />
 */
const MppCheckbox = ({ value, onChange, checked, indeterminate, isTableHeader = false, }) => {
    const [isSelected, setIsSelected] = useState(checked !== null && checked !== void 0 ? checked : false);
    const inputRef = useRef(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = indeterminate !== null && indeterminate !== void 0 ? indeterminate : false;
        }
    }, [indeterminate]);
    if (isTableHeader) {
        console.log("indeterminate", indeterminate);
    }
    useEffect(() => {
        setIsSelected(checked !== null && checked !== void 0 ? checked : false);
    }, [checked]);
    return (React__default.createElement("div", { className: "checkbox_container" },
        React__default.createElement("div", { className: "checkbox_container_checkbox" },
            React__default.createElement("label", { className: `
            checkbox_container_label ${isTableHeader ? 'main_checkbox' : 'secondary_checkbox'}  
            ${isTableHeader && indeterminate ? 'indeterminated_checkbox' : ''} `, htmlFor: `checkbox_${value}` },
                React__default.createElement("input", { ref: inputRef, className: "checkbox_container_input", checked: isSelected, type: "checkbox", name: "checkbox", id: `checkbox_${value}`, onChange: () => {
                        setIsSelected((param) => !param);
                        onChange({
                            value: value,
                            checked: !isSelected,
                        });
                    } }),
                React__default.createElement("span", { className: "checkmark" }),
                React__default.createElement("span", { className: "checkmark_indeterminate", style: { display: indeterminate ? 'block' : 'none' } })))));
};

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
const MppInput = ({ placeholder, value = '', icon: Icon, needCounter = false, maxCharacters, errorMessage = '', readOnly = false, onChange, onKeyDown, onClickIcon, isPassword = false, autoComplete, canClearField = false, prefixIcon: PrefixIcon, }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFirstEntry, setIsFirstEntry] = useState(onKeyDown ? false : true);
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
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
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement("div", { className: `mpp_input_container ${isFocused && !readOnly ? 'focused' : ''} ${errorMessage.length > 0 && !isFirstEntry && value ? 'error' : ''}` },
            PrefixIcon ? React__default.createElement(PrefixIcon, { className: "with_prefix_icon" }) : null,
            React__default.createElement("input", { type: !showPassword && isPassword ? 'password' : 'text', placeholder: placeholder, value: value, onFocus: handleFocus, onBlur: handleBlur, onChange: handleChange, className: `mpp_input ${readOnly ? 'read_only' : ''}`, readOnly: readOnly, onKeyDown: onKeyDown, autoComplete: autoComplete }),
            (isFocused || value) && Icon ? (React__default.createElement(Icon, { className: `${onClickIcon ? 'input_icon_pointer' : ''} ${suffixComponentClassname} `, onClick: handleIconClick })) : isPassword ? (React__default.createElement(MppIcons.eye, { className: `input_icon_pointer ${showPassword ? 'eye_focus' : 'eye_unfocus'} ${suffixComponentClassname} `, onClick: handleShowPassword })) : needCounter ? (React__default.createElement("span", { className: `input_counter ${value.length === maxCharacters ? 'max_characteres' : ''} ${suffixComponentClassname} ` }, `${value.length}/${maxCharacters}`)) : canClearField && value.length > 0 ? (React__default.createElement(MppIcons.inputClose, { className: `input_icon_pointer ${suffixComponentClassname}`, onClick: () => {
                    onChange('');
                } })) : null),
        React__default.createElement("div", { className: "input_errors" }, errorMessage.length > 0 && value && !isFirstEntry && (React__default.createElement("p", { className: "input_error" }, errorMessage)))));
};

/**
 * Le composant MppIncrementInput fournit un contrôle numérique avec boutons d’incrémentation et décrmentation,
 * ainsi qu’un champ pour saisir la valeur manuellement.
 *
 * @param {MppIncrementInputProps} props - Les propriétés du composant.
 * @param {number} props.value - La valeur actuelle affichée et contrôlée par le composant.
 * @param {(newValue: number) => void} props.onChange - Fonction de rappel invoquée avec la nouvelle valeur
 *        dès qu’elle change (via les boutons ou la saisie manuelle).
 * @param {number} props.maxIncrement - La valeur maximale autorisée (le bouton + et la saisie sont clampés entre 0 et maxIncrement).
 *
 * @example
 * ```tsx
 * import React, { useState } from 'react';
 * import { MppIncrementInput } from './MppIncrementInput';
 *
 * const ExampleComponent = () => {
 *   const [quantity, setQuantity] = useState(1);
 *
 *   return (
 *     <MppIncrementInput
 *       value={quantity}
 *       onChange={setQuantity}
 *       maxIncrement={100}
 *     />
 *   );
 * };
 * ```
 */
const MppIncrementInput = ({ value, onChange, maxIncrement, }) => {
    const [inputValue, setInputValue] = useState(value.toString());
    useEffect(() => {
        setInputValue(value.toString());
    }, [value]);
    const commitChange = () => {
        let n = parseInt(inputValue, 10);
        if (isNaN(n)) {
            setInputValue(value.toString());
            return;
        }
        n = Math.max(1, Math.min(maxIncrement, n));
        onChange(n);
        setInputValue(n.toString());
    };
    return (React__default.createElement("div", { className: "increment_input_background text_body" },
        React__default.createElement("button", { className: "increment_button", onClick: () => onChange(Math.max(1, value - 1)), disabled: value <= 1 }, "\u2212"),
        React__default.createElement("input", { type: "text", inputMode: "numeric", pattern: "\\d*", maxLength: maxIncrement.toString().length, className: "increment_value increment_value_input", value: inputValue, onChange: (e) => {
                const digitsOnly = e.target.value.replace(/\D/g, '');
                setInputValue(digitsOnly);
            }, onBlur: commitChange, onKeyDown: (e) => {
                if (e.key === 'Enter') {
                    e.target.blur();
                }
            }, min: 1, max: maxIncrement }),
        React__default.createElement("button", { className: "increment_button", onClick: () => onChange(Math.min(maxIncrement, value + 1)), disabled: value >= maxIncrement }, "+")));
};

export { AnimationDirection, BoType, ButtonType, ColumnType, GpColors, MessageType, MppButton, MppCheckbox as MppCheckBox, MppDropDown, MppCardEdition as MppEditionCard, MppIcons, MppIncrementInput, MppInfosPin, MppInput, MppInputText, MppLabelType, MppLinearProgressBar, MppLoader, MppLoaderDots, ComponentName as MppLoginLayout, MppMenu, MppMultiSectionButton, MppPodium, MppRankingCard, MppSkeletonLoader, StatCard as MppStatCard, MppTextArea, MppToaster, MppToggleButton, ProgressBarStyle, ScoColors, labelType };
