import './app.css';
import React from 'react';

import { MppButton, ButtonType } from './components/MppButton';
import MppPodium from './components/MppPodium/MppPodium';
import MppRankingCard from './components/MppRankingCard/MppRankingCard';
import MppMenu from './components/MppMenu/MppMenu';
import { BoType } from './components/BoType';
import MppStatCard from './components/MppStatCard/MppStatCard';

import MppTextStyle from './section/MppTextStyleSection/MppTextStyleSection';
import InputDemo from './section/InputSection';

import { ReactComponent as YellowLogo } from './ressources/logo/sco_yellow_logo_blue_text.svg';
import { ReactComponent as WhiteLogo } from './ressources/logo/sco_white_logo_white_text.svg';
import { ReactComponent as LogoOnly } from './ressources/logo/sco_logo_only_yellow.svg';
import { ScoColors } from './utils/Mppcolors';
import { MppIcons } from './utils/MppIcons';
import MppCardEdition from './components/MppCardEdition/MppCardEdition';
import MppInfosPin, { Direction } from './components/MppInfosPin/MppInfosPin';

function App() {
  return (
    <div className="main_background">
      <h2>Logo</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <YellowLogo width={'460px'} />
        <WhiteLogo width={'460px'} />
        <LogoOnly width={'460px'} />
      </div>
      <h2>Type de Texte</h2>
      <MppTextStyle />
      <h2>Icons</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Object.entries(MppIcons).map(([iconName, IconComponent]) => (
          <div key={iconName} style={{ margin: '10px', textAlign: 'center' }}>
            <IconComponent style={{ width: '50px', height: '50px' }} />
            <p>{iconName}</p>
          </div>
        ))}
      </div>

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
      <h2>Trophés</h2>
      <MppPodium
        color={ScoColors.lightYellow}
        typeOfPlayers="élève"
        rankedElements={[
          {
            name: '4èmeD',
            points: 3,
            ranking: 1,
            structure: '2cole des intellos',
            city: 'Lyon',
          },
          {
            name: '4èmeB',
            points: 3,
            ranking: 2,
          },
          {
            name: '4èmeA',
            points: 3,
            ranking: 3,
          },
        ]}
      />
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
      <h2>Carte edition</h2>
      <MppCardEdition
        backgroundColor={ScoColors.veryLightYellow}
        textColor={ScoColors.darkBlue}
        editionName={'Edition Automne 2024'}
        editionDatesInfos="Du lundi 18 novembre 9h au lundi 9 décembre 20h"
        editionMessage="Il reste 7 jours !"
      />
      <div style={{ height: '90vh' }}>
        <MppMenu
          navigationLinks={[
            {
              name: 'Tableau de bord',
              icon: MppIcons.graph,
              navigation: '/hmome',
            },
            {
              name: 'Aide',
              icon: MppIcons.help,
              navigation: '/hmome',
            },
            {
              name: 'Défis Territoire',
              icon: MppIcons.map,
              navigation: '/hmome',
            },
            {
              name: 'Ressources',
              icon: MppIcons.ressources,
              navigation: '/homme',
            },
            {
              name: 'Classements',
              icon: MppIcons.trophee,
              navigation: '/homepage',
            },
          ]}
          actualPage="/fr/homepage"
          LinkComponent={'symbol'}
          boType={BoType.scoBO}
          onLogout={() => console.log('suppr les comptes anonymes')}
        />
      </div>

      <h2>Stat Card</h2>
      <MppStatCard
        title={'Etablissements'}
        IconComponent={MppIcons.training}
        stat={39}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Object.entries(MppIcons)
          .filter(([iconName]) =>
            [
              'training',
              'users',
              'target',
              'chart',
              'school',
              'cloud',
              'drops',
              'trash',
              'openBook',
            ].includes(iconName)
          )
          .map(([iconName, IconComponent]) => (
            <div key={iconName} style={{ margin: '10px 10px 0 0 ' }}>
              <MppStatCard
                title={iconName}
                IconComponent={IconComponent}
                stat={12}
                statDetails="test"
              />
            </div>
          ))}
      </div>

      <MppInfosPin
        direction={Direction.top_right}
        texts={[
          {
            titre: 'un titre de merde',
            text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrumvoluptates est aliquam perferendis quos possimus alias quisquam porromagni animi?',
          },
          {
            titre: 'un titre de merde',
            text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrumvoluptates est aliquam perferendis quos possimus alias quisquam porromagni animi?',
          },
        ]}
      />
    </div>
  );
}

export default App;
