import React, { useState } from 'react';
import './mpp_login_layout.css';
import { MppButton, ButtonType } from '../../components/MppButton';
import { default as MppInputText } from '../../components/MppInputText/MppInputText';
import { BoType } from '../../components/BoType';
import { ReactComponent as ScoYellowLogo } from '../../ressources/logo/sco_yellow_logo_blue_text.svg';
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
  return (
    <div className="container_login_background">
      <div
        className={`container_right_side ${boType === BoType.scoBO ? 'login_sco_background' : 'login_gp_background'}`}
      >
        {boType === BoType.scoBO ? (
          <ScoYellowLogo className="login_logo" />
        ) : null}

        <div className="login_welcome_text_container">
          <p className="title_h2 welcome_text">
            Bienvenue sur l espace client{' '}
            <span className="title_h1">Mpp Scolaire</span>
          </p>
          <p>
            La plateforme qui permet aux chef.fe.s d etablissement de de
            visualiser leurparticipation au challenge
          </p>
        </div>

        <img
          className="login_illustration"
          src={womanOnComputer}
          alt="illustarion of woman on computer"
        />
      </div>

      <div className="container_left_side">
        <div className="left_side_content">
          <p className="title_h1">Connexion</p>
          <p>Rentre le code que l équipe Mpp ta transmis </p>
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
