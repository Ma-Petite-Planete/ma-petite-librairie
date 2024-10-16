import React, { useState, useEffect } from 'react';
import './mpp_login_layout.css';
import { MppButton, ButtonType } from '../../components/MppButton';
import { default as MppInputText } from '../../components/MppInputText/MppInputText';
import { BoType } from '../../components/BoType';
import { ReactComponent as ScoYellowLogo } from '../../ressources/logo/sco_yellow_logo_blue_text.svg';
import scoBackgroundMobile from '../../ressources/background/scoBackgroundMobile.png';
import scoBackgroundDesktop from '../../ressources/background/scoBackground.png';
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
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 896);
  const [hasError, setHasError] = useState(true);
  const isClientRendering = typeof window !== 'undefined';

  useEffect(() => {
    if (isClientRendering) {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 896);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isClientRendering]);

  useEffect(() => {
    if (codeValue && onClickErrorMessage) {
      setOnClickErrorMessage('');
    }
  }, [codeValue, onClickErrorMessage, setOnClickErrorMessage]);

  return (
    <div className="container_login_background">
      <div
        className={'container_image_section'}
        style={{
          backgroundImage: `url(${
            boType === BoType.scoBO
              ? isMobile
                ? scoBackgroundMobile
                : scoBackgroundDesktop
              : null
          })`,
        }}
      >
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
              setHasError={function (hasError: boolean): void {
                setHasError(hasError);
              }}
              onClickErrorMessage={onClickErrorMessage}
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
