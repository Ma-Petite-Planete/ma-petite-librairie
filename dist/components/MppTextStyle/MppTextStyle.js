import React from 'react';
import './mpp_text_style.css';
const MppTextStyle = () => {
    return (React.createElement("div", null,
        React.createElement("div", { className: 'text_style_container' },
            React.createElement("div", { className: 'text_style_sub_container' },
                React.createElement("p", { className: 'title_h1' }, "Titre H1 (.title_h1)"),
                React.createElement("p", { className: 'title_h2' }, "Titre H2 (.title_h2)"),
                React.createElement("p", { className: 'title_h3' }, "Titre H3 (.title_h3)"),
                React.createElement("p", { className: 'subtitle' }, "Sous Titre (.subtitle)")),
            React.createElement("div", { className: 'text_style_sub_container' },
                React.createElement("p", null, "Texte Display (native value)"),
                React.createElement("p", { className: 'text_body' }, "Texte body (.text_body)"),
                React.createElement("p", { className: 'text_body_sb' }, "Texte body semi bold (.text_body_sb)"),
                React.createElement("p", { className: 'text_small_b' }, "Texte small bold (.text_small_b)"),
                React.createElement("p", { className: 'text_small' }, "Texte small (.text_small)")))));
};
export default MppTextStyle;
