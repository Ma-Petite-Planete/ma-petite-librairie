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
declare const ComponentName: React.FC<LoginLayoutProps>;
export default ComponentName;
