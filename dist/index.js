import React from 'react';

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

var css_248z = ".mpp_button {\r\n    background-color: var(--dark_blue);\r\n    color: var(--white);\r\n    border: none;\r\n    border-radius: var(--standard_border_radius);\r\n    cursor: pointer;\r\n    transition: background-color 0.3s ease;\r\n  }\r\n  \r\n  .mpp_button:hover {\r\n    background-color:  var(--dark_blue_light);\r\n  }\r\n\r\n  .secondary_type:hover{\r\n    background-color:  var(--dark_blue_very_light);\r\n  }\r\n  \r\n  .mpp_button:disabled {\r\n    background-color: var(--disable_dark_blue);\r\n    cursor: not-allowed;\r\n  }\r\n\r\n  .button_large{\r\n    padding: 12px 40px;\r\n  }\r\n\r\n  .button_medium{\r\n    padding: 8px 32px;\r\n  }\r\n\r\n  .secondary_type{\r\n    background-color: var(--white);\r\n    color: var(--dark_blue);\r\n    border: 2px solid var(--dark_blue);\r\n  }\r\n\r\n  .secondary_type:disabled{\r\n    color: var(--disable_dark_blue);\r\n    background-color: var(--white);\r\n    border: 2px solid var(--disable_dark_blue)\r\n  }\r\n\r\n  ";
styleInject(css_248z);

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

export { MppButton };
