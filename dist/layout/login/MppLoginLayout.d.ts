import React from 'react';
import './mpp_login_layout.css';
import { BoType } from '../../components/BoType';
interface LoginLayoutProps {
    boType: BoType;
    onPressLoginButon: (() => void) | null;
    welcomeText: string;
    welcomeTextBold: string;
    welcomeSubtitle: string;
    loginTitle: string;
    loginSubtitle: string;
    buttonText: string;
    codeValue: string;
    inputPlaceHolder: string;
    setCodeValue: (code: string) => void;
    onClickErrorMessage: string;
    setOnClickErrorMessage: (error: string) => void;
    isLoading: boolean;
}
/**
 * @interface LoginLayoutProps
 * @property {BoType} boType - Type de back-office utilisé pour déterminer l'arrière-plan et le logo.
 * @property {(() => void) | null} onPressLoginButon - Fonction à appeler lors du clic sur le bouton de connexion.
 * @property {string} welcomeText - Texte de bienvenue à afficher.
 * @property {string} welcomeTextBold - Texte de bienvenue en gras à afficher.
 * @property {string} welcomeSubtitle - Sous-titre de bienvenue à afficher.
 * @property {string} loginTitle - Titre de la section de connexion.
 * @property {string} loginSubtitle - Sous-titre de la section de connexion.
 * @property {string} buttonText - Texte du bouton de connexion.
 * @property {string} codeValue - Valeur actuelle du code (input).
 * @property {string} inputPlaceHolder - Texte placeHolder pour l'input.
 * @property {function(string): void} setCodeValue - Fonction pour mettre à jour la valeur du code.
 * @property {string} onClickErrorMessage - Message d'erreur à afficher lors d'un clic sur le bouton.
 * @property {function(string): void} setOnClickErrorMessage - Fonction pour mettre à jour le message d'erreur.
 * @property {boolean} isLoading - État de chargement pour afficher un loader pendant la connexion.
 *
 * @example
 *
 * <ComponentName
 *   boType={BoType.scoBO}
 *   onPressLoginButon={() => console.log('Login pressed')}
 *   welcomeText="Bienvenue sur"
 *   welcomeTextBold="Ma Petite Planète"
 *   welcomeSubtitle="Veuillez vous connecter"
 *   loginTitle="Connexion"
 *   loginSubtitle="Veuillez entrer votre code"
 *   buttonText="Se connecter"
 *   codeValue={codeValue}
 *   inputPlaceHolder="Entrez votre code"
 *   setCodeValue={setCodeValue}
 *   onClickErrorMessage={errorMessage}
 *   setOnClickErrorMessage={setErrorMessage}
 *   isLoading={isLoading}
 * />
 */
declare const ComponentName: React.FC<LoginLayoutProps>;
export default ComponentName;
