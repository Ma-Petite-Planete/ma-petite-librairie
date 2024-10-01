import React, { useState, useEffect } from 'react';
import './mpp_login_layout.css';
import { MppButton, ButtonType } from '../../components/MppButton';
import { default as MppInputText } from '../../components/MppInputText/MppInputText';
import { BoType } from '../../components/BoType';
import { ReactComponent as ScoYellowLogo } from '../../ressources/logo/sco_yellow_logo_blue_text.svg';
import scoBackgroundMobile from '../../ressources/background/scoBackgroundMobile.png';
import scoBackgroundDesktop from '../../ressources/background/scoBackground.png';
import womanOnComputer from '../../ressources/illustration/woman_on_computer.png';

interface LoginLayoutProps {
  boType: BoType;
  onPressLoginButon: (() => void) | null;
}

const ComponentName: React.FC<LoginLayoutProps> = ({
  boType,
  onPressLoginButon,
}) => {
  const [companyCode, setCompanyCode] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 896);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 896);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="container_login_background">
      <div
        className={'container_right_side'}
        style={{
          backgroundImage: `url(${boType === BoType.scoBO ? (isMobile ? scoBackgroundMobile : scoBackgroundDesktop) : null})`,
        }}
      >
        {boType === BoType.scoBO ? (
          <ScoYellowLogo className="login_logo" />
        ) : null}

        <div className="login_welcome_text_container">
          <p className="title_h2 welcome_text">
            Bienvenue sur lespace client{' '}
            <span className="title_h1">Mpp Scolaire</span>
          </p>
          <p>
            La plateforme qui permet aux chef.fe.s détablissement de visualiser
            leur participation au challenge
          </p>
        </div>

        <img
          className="login_illustration"
          src={womanOnComputer}
          alt="illustration of woman on computer"
        />
      </div>

      <div className="container_left_side">
        <div className="left_side_content">
          <p className="title_h1">Connexion</p>
          <p>Rentre le code que léquipe Mpp ta transmis </p>
          <div>
            <MppInputText
              placeholder={'Code Client'}
              value={companyCode}
              onChange={function (value: string, hasError: boolean): void {
                if (!hasError) setCompanyCode(value);
              }}
              validationConditions={[
                {
                  condition: (value) => value.length >= 5,
                  message: 'Le texte doit contenir au moins 5 caractères.',
                },
              ]}
            />
          </div>
          <div>
            <MppButton
              title={'Entrer'}
              buttonType={ButtonType.primaryLarge}
              onPress={onPressLoginButon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentName;
