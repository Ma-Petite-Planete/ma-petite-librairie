import './app.css';
import { MppButton, ButtonType } from './components/MppButton';
import MppTextStyle from './section/MppTextStyleSection/MppTextStyleSection';
import InputDemo from './section/InputSection';
import React from 'react';
// import yellowLogo from './ressources/logo/sco_yellow_logo_blue_text.svg';
// import whiteLogo from './ressources/logo/sco_white_logo_white_text.svg';
// import logoOnly from './ressources/logo/sco_logo_only_yellow.svg';
import MppRankingCard from './components/MppRankingCard/MppRankingCard';
import { ScoColors } from './utils/Mppcolors';
import { MenuType, MppMenu } from './components/MppMenu';

function App() {
  return (
    <div className="main_background">
      <h2>Logo</h2>
      {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
        <img src={yellowLogo} alt="" style={{ width: '460px' }} />
        <img src={whiteLogo} alt="" style={{ width: '460px' }} />
        <img src={logoOnly} alt="" style={{ width: '150px' }} />
      </div> */}
      <h2>Type de Texte</h2>
      <MppTextStyle />
      <h2>Type de Bouton</h2>
      <div className="button_background">
        <MppButton
          title="Bouton d'action"
          onPress={() => {
            console.log('Bouton cliqué!');
          }}
          buttonType={ButtonType.primaryLarge}
        />
        <div>
          <MppButton
            title="Bouton d'action"
            onPress={() => {
              console.log('Bouton cliqué!');
            }}
            buttonType={ButtonType.primaryMedium}
          />
        </div>
        <MppButton
          title="Bouton d'action"
          onPress={null}
          buttonType={ButtonType.primaryLarge}
        />
      </div>
      <div className="button_background">
        <MppButton
          title="Bouton d'action"
          onPress={() => {
            console.log('Bouton cliqué!');
          }}
          buttonType={ButtonType.secondaryLarge}
        />
        <div>
          <MppButton
            title="Bouton d'action"
            onPress={() => {
              console.log('Bouton cliqué!');
            }}
            buttonType={ButtonType.secondaryMedium}
          />
        </div>
        <MppButton
          title="Bouton d'action"
          onPress={null}
          buttonType={ButtonType.secondaryLarge}
        />
      </div>
      <h2>Input</h2>
      <InputDemo />
      <h2>Ranking Card</h2>
      <div style={{ width: '651px' }}>
        <MppRankingCard
          title={'Les pouleteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'}
          subtitle={'Collège Jean Rostand'}
          ranking={4}
          points={'26.2pts'}
          subPointsText={'par élève'}
          pointsColor={ScoColors.mainYellow}
          rankingColorBackground={ScoColors.mainYellow}
        />
        <MppRankingCard
          title={'Les poulet'}
          subtitle={'Collège Jean Rostand'}
          ranking={4}
          points={'26.2pts'}
          subPointsText={'par élève'}
          pointsColor={ScoColors.mainYellow}
          rankingColorBackground={ScoColors.mainYellow}
        />
      </div>
      <h2>Menu</h2>
      <div style={{ width: '100vw', height: '100vh' }}>
        <MppMenu
          logo={''}
          navigationLinks={[]}
          LinkComponent={'symbol'}
          menuType={MenuType.scoMenu}
        />
      </div>
    </div>
  );
}

export default App;
