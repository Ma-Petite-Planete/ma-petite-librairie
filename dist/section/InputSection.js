import { useState } from "react";
import pen from '../ressources/icon/pen.svg';
import MppInputText from "../components/MppInputText/MppInputText";
import React from "react";
const InputDemo = () => {
    const [inputDemoIcon, setInputDemoIcon] = useState('');
    const handleChangeDemoIcon = (value) => {
        setInputDemoIcon(value);
    };
    const handleIconClick = () => {
        setInputDemoIcon('');
    };
    const [inputDemoCounter, setInputDemoCounter] = useState('');
    const handleChangeDemoCounter = (value) => {
        setInputDemoCounter(value);
    };
    const [inputDemoCondition, setInputDemoCondition] = useState('');
    const handleChangeDemoCondition = (value, hasError) => {
        if (hasError) {
            console.log('les conditions ne sont pas respecté');
        }
        else {
            setInputDemoCondition(value);
        }
    };
    return (React.createElement("div", { style: { width: '300px' } },
        React.createElement(MppInputText, { placeholder: "exemple condition", value: inputDemoCondition, onChange: handleChangeDemoCondition, validationConditions: [
                { condition: (value) => value.length >= 5, message: 'Le texte doit contenir au moins 5 caractères.' },
                { condition: (value) => /^[a-zA-Z]+$/.test(value), message: 'Le texte doit uniquement contenir des lettres.' },
            ] }),
        React.createElement(MppInputText, { value: inputDemoIcon, placeholder: "exemple icon", onChange: handleChangeDemoIcon, iconUrl: pen, onClickIcon: handleIconClick }),
        React.createElement(MppInputText, { value: inputDemoCounter, placeholder: "exemple counter", onChange: handleChangeDemoCounter, needCounter: true, maxCharacteres: 20 })));
};
export default InputDemo;
