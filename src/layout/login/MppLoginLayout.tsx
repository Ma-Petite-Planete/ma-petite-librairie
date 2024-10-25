import React, { useState, useEffect } from 'react';
import './mpp_login_layout.css';
import { MppButton, ButtonType } from '../../components/MppButton';
import { default as MppInputText } from '../../components/MppInputText/MppInputText';
import { BoType } from '../../components/BoType';
import { ReactComponent as ScoYellowLogo } from '../../ressources/logo/sco_yellow_logo_blue_text.svg';
import womanOnComputer from '../../ressources/illustration/woman_on_computer.png';
import MppLoader from '../../components/MppLoader/MppLoader';

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

const ComponentName: React.FC<LoginLayoutProps> = ({
  boType,
  onPressLoginButon,
  welcomeText,
  welcomeTextBold,
  welcomeSubtitle,
  loginTitle,
  loginSubtitle,
  buttonText,
  codeValue,
  setCodeValue,
  inputPlaceHolder,
  onClickErrorMessage,
  setOnClickErrorMessage,
  isLoading,
}) => {
  const [hasError, setHasError] = useState(true);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onPressLoginButon && !hasError) {
      onPressLoginButon();
    }
  };
  useEffect(() => {
    if (codeValue && onClickErrorMessage) {
      setOnClickErrorMessage('');
    }
  }, [codeValue, onClickErrorMessage, setOnClickErrorMessage]);

  return (
    <div className="container_login_background">
      <div className={'container_image_section'}>
        {boType === BoType.scoBO ? (
          <ScoYellowLogo className="login_logo" />
        ) : null}

        <div className="login_welcome_text_container">
          <p className="title_h2 welcome_text">
            {welcomeText} <span className="title_h1">{welcomeTextBold}</span>
          </p>
          <p>{welcomeSubtitle}</p>
        </div>

        <img
          className="login_illustration"
          src={womanOnComputer}
          alt="illustration of woman on computer"
        />
      </div>

      <div className="container_input_section">
        <div className="input_section_content">
          <p className="title_h1">{loginTitle}</p>
          <p>{loginSubtitle}</p>
          <div>
            <MppInputText
              placeholder={inputPlaceHolder}
              value={codeValue}
              onChange={(value: string) => {
                setCodeValue(value);
                setHasError(false);
              }}
              setHasError={(hasError: boolean): void => {
                setHasError(hasError);
              }}
              onClickErrorMessage={onClickErrorMessage}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div>
            {isLoading ? (
              <MppLoader />
            ) : (
              <MppButton
                title={buttonText}
                buttonType={ButtonType.primaryLarge}
                onPress={hasError ? null : onPressLoginButon}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentName;
