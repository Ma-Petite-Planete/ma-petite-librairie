import React, { useState, useEffect, KeyboardEventHandler } from 'react';
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
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

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
  onKeyDown,
}) => {
  const [hasError, setHasError] = useState(true);

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
              onKeyDown={onKeyDown}
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
