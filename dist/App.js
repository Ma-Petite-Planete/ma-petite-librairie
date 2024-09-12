import "./app.css";
import { MppButton, ButtonType } from "./components/MppButton";
import MppTextStyle from "./section/MppTextStyleSection/MppTextStyleSection";
import InputDemo from "./section/InputSection";
import React from "react";
import yellowLogo from './ressources/logo/yellow_logo_blue_text.svg';
import whiteLogo from './ressources/logo/white_logo_white_text.svg';
import logoOnly from './ressources/logo/logo_only.svg';
function App() {
    return (React.createElement("div", { className: "main_background" },
        React.createElement("h1", null, "Logo"),
        React.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
            React.createElement("img", { src: yellowLogo, alt: "", style: { width: '460px' } }),
            React.createElement("img", { src: whiteLogo, alt: "", style: { width: '460px' } }),
            React.createElement("img", { src: logoOnly, alt: "", style: { width: '150px' } })),
        React.createElement("h1", null, "Type de Texte"),
        React.createElement(MppTextStyle, null),
        React.createElement("h1", null, "Type de Bouton"),
        React.createElement("div", { className: "button_background" },
            React.createElement(MppButton, { title: "Bouton d'action", onPress: () => {
                    console.log('Bouton cliqué!');
                }, buttonType: ButtonType.primaryLarge }),
            React.createElement("div", null,
                React.createElement(MppButton, { title: "Bouton d'action", onPress: () => {
                        console.log('Bouton cliqué!');
                    }, buttonType: ButtonType.primaryMedium })),
            React.createElement(MppButton, { title: "Bouton d'action", onPress: null, buttonType: ButtonType.primaryLarge })),
        React.createElement("div", { className: "button_background" },
            React.createElement(MppButton, { title: "Bouton d'action", onPress: () => {
                    console.log('Bouton cliqué!');
                }, buttonType: ButtonType.secondaryLarge }),
            React.createElement("div", null,
                React.createElement(MppButton, { title: "Bouton d'action", onPress: () => {
                        console.log('Bouton cliqué!');
                    }, buttonType: ButtonType.secondaryMedium })),
            React.createElement(MppButton, { title: "Bouton d'action", onPress: null, buttonType: ButtonType.secondaryLarge })),
        React.createElement("h1", null, "Input"),
        React.createElement(InputDemo, null)));
}
export default App;
