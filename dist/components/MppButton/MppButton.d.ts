import React from 'react';
import './mpp_button.css';
import { ButtonType } from './ButtonType';
interface MppButtonProps {
    title: string;
    buttonType: ButtonType;
    type?: 'button' | 'submit' | 'reset';
    onPress: ((event?: React.MouseEvent<HTMLButtonElement>) => void) | null;
    style?: React.CSSProperties;
    hoverStyle?: React.CSSProperties;
    activeStyle?: React.CSSProperties;
}
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
declare const MppButton: React.FC<MppButtonProps>;
export default MppButton;
