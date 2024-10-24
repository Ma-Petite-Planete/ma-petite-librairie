import React, { useState } from 'react';
import MppLoginLayout from '../layout/login/MppLoginLayout';
import { BoType } from '../components/BoType';

const LayoutLoginSection: React.FC = () => {
  const [codeValue, setCodeValue] = useState('');
  const [loginVerifMessage, setLoginVerifMessage] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const handleLogin = (): void => {
    setisLoading(true);
    if (codeValue === 'test') {
      setLoginVerifMessage('Code Incorrect');
    }
  };
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <MppLoginLayout
        boType={BoType.scoBO}
        welcomeText={'Bienvenue sur lespace client'}
        welcomeTextBold={'Mpp Scolaire'}
        welcomeSubtitle={
          'La plateforme qui permet aux chef.fe.s détablissement de visualiser leur participation au challenge'
        }
        loginTitle={'Connexion'}
        loginSubtitle={'Rentre le code que léquipe Mpp ta transmis'}
        buttonText={'Entrer'}
        inputPlaceHolder={'Code Client'}
        onPressLoginButon={handleLogin}
        setCodeValue={function (code: string): void {
          setCodeValue(code);
        }}
        codeValue={codeValue}
        onClickErrorMessage={loginVerifMessage}
        setOnClickErrorMessage={function (error: string): void {
          setLoginVerifMessage(error);
        }}
        isLoading={isLoading}
      />
    </div>
  );
};

export default LayoutLoginSection;
