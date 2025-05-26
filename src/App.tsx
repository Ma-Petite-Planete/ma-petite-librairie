import './app.css';
import React from 'react';

import { MppButton, ButtonType } from './components/MppButton';
import MppPodium from './components/MppPodium/MppPodium';
import MppRankingCard from './components/MppRankingCard/MppRankingCard';
import MppMenu from './components/MppMenu/MppMenu';
import { BoType } from './components/BoType';
import MppStatCard from './components/MppStatCard/MppStatCard';

import MppTextStyle from './section/MppTextStyleSection/MppTextStyleSection';
import InputDemo from './section/InputSection/InputSection';

import { ScoColors, GpColors } from './utils/Mppcolors';
import { MppIcons } from './utils/MppIcons';
import MppCardEdition from './components/MppCardEdition/MppCardEdition';
import MppInfosPin, { Direction } from './components/MppInfosPin/MppInfosPin';

import LayoutLoginSection from './section/MppLayoutLoginSection';
import MppLoader from './components/MppLoader/MppLoader';
import MppTextArea from './components/MppTextArea/MppTextArea';
import MppSkeletonLoader from './components/MppSkeletonLoader/MppSkeletonLoader';
import MppMultiSectionButtonProps from './components/MppMultiSectionButtons/MppMultiSectionButton';
import MppDropDown from './components/MppDropdown/MppDropdown';
import MppLoaderDots from './components/MppLoaderDots/MppLoaderDots';
import { MppLinearProgressBar } from './components/MppLinearProgressBar/MppLinearProgressBar';
import MppToggleButton from './components/MppToggleButton/MppToggleButton';
import {
  MppLabelType,
  labelType,
} from './components/MppLabelType/MppLabelType';
import MppCheckbox from './components/MppCheckBox/MppCheckbox';
import MppInputText from './components/MppInputText/MppInputText';
import {
  MppToaster,
  AnimationDirection,
  MessageType,
} from './components/MppToaster/MppToaster';
function App() {
  return (
    <div className="main_background">
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
          onPress={() => {
            console.log('Bouton cliqué!');
          }}
          buttonType={ButtonType.primaryMediumRed}
        />
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
          onPress={() => {
            console.log('Bouton cliqué!');
          }}
          buttonType={ButtonType.secondaryMediumRed}
        />
        <MppButton
          title="Bouton d'action"
          onPress={null}
          buttonType={ButtonType.secondaryLarge}
        />
      </div>
      <h2>Input</h2>
      <div style={{ width: '400px' }}>
        <MppTextArea
          placeholder={'Je suis un texte area'}
          value={
            'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
          }
          onChange={function (value: string): void {
            console.log(value);
          }}
          readOnly={true}
        ></MppTextArea>
      </div>
      <InputDemo />
      <h2>Trophés</h2>
      <MppPodium
        onClick={() => {}}
        onHover={() => {}}
        onHoverLeave={() => {}}
        displayFullInfos={false}
        color={ScoColors.lightYellow}
        typeOfPlayers="élève"
        rankedElements={[
          {
            id: 'test',
            name: '4èmeD',
            points: 3,
            ranking: 1,
            structure: '2cole des intellos',
            city: 'Lyon',
          },
          {
            id: 'test2',
            name: '4èmeB',
            points: 3,
            ranking: 2,
          },
          {
            id: 'test3',
            name: '4èmeA',
            points: 3,
            ranking: 3,
          },
        ]}
      />
      <h2>Ranking Card</h2>
      <div style={{ width: '651px' }}>
        <MppRankingCard
          onHover={(e) => {
            console.log(e.target);
          }}
          onHoverLeave={(e) => {
            console.log(e.target);
          }}
          onClick={(e) => {
            console.log(e.target);
          }}
          title={'Les pouleteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'}
          subtitle={'Collège Jean Rostand'}
          ranking={4}
          points={'26.2pts'}
          subPointsText={'par élève'}
          pointsColor={ScoColors.mainYellow}
          rankingColorBackground={ScoColors.mainYellow}
        />
        <MppRankingCard
          title={null}
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
        editionName={'Edition Printemps'}
        editionDatesInfos="Du lundi 18 novembre 9h au lundi 9 décembre 20h"
        editionMessage="Il reste 7 jours !"
      />

      <MppCardEdition
        backgroundColor={GpColors.darkBlue}
        textColor={ScoColors.white}
        editionName={'Edition Printemps'}
        editionDatesInfos="Du lundi 18 novembre 9h au lundi 9 décembre 20h"
        editionsDropDown={
          <MppDropDown
            property="name"
            textClassname="text_body_sb"
            options={[
              {
                id: 'nfrjhnf',
                name: 'Edition truc muche',
              },
              {
                id: 'fnjhrfr',
                name: 'Edition machin chose',
              },
            ]}
            onChange={function (value): void {
              console.log(value);
            }}
            placeholder="Sélectionner une langue"
            defaultValue={{
              id: '',
              name: "Changer d'édition",
            }}
            isDisabled={false}
          />
        }
      />
      <h2>Navigation Bar</h2>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <MppMenu
          backToClientsLink={{
            name: 'Tableau de bord',
            icon: MppIcons.graph,
            navigation: '/hompage',
          }}
          codeClientInput={
            <MppInputText
              onChange={(value) => {
                console.log(value);
              }}
              placeholder={'code client'}
              value={'je sais pas'}
            />
          }
          codeClientButton={
            <MppButton
              title={'Go'}
              buttonType={ButtonType.primaryLarge}
              onPress={(): void => {
                console.log('change de client');
              }}
            />
          }
          navigationLinks={[
            {
              name: 'Mes ligues',
              icon: MppIcons.bubble,
              navigation: '/hompage',
            },
            {
              name: 'Players',
              icon: MppIcons.people,
              navigation: '/hmome',
            },
            {
              name: 'Ma structure',
              icon: MppIcons.gear,
              navigation: '/hmfrfrome',
            },
            {
              name: 'Tableau de bord',
              icon: MppIcons.graph,
              navigation: '/hfrfomme',
            },
            {
              name: 'Classements',
              icon: MppIcons.tropheeGp,
              navigation: '/homepage',
              target: '_blank',
            },
            {
              name: 'Espace porteurs de projet',
              icon: MppIcons.ressources,
              navigation: '/hmofrfrme',
            },
            {
              name: 'Kit ambassadeur.rice',
              icon: MppIcons.megaphone,
              navigation: '/hmfrfome',
            },
            {
              name: 'aide',
              icon: MppIcons.help,
              navigation: '/hnjfrnome',
            },
          ]}
          actualPage="/fr/hmome"
          LinkComponent={'symbol'}
          boType={BoType.gpBo}
          onLogout={() => console.log('suppr les comptes anonymes')}
          logOutText={'Se déconnecter'}
          clientIsLoad={true}
          clientName="Airbus Helicopters"
        />
        <MppMenu
          navigationLinks={[
            {
              name: 'Tableau de bord',
              icon: MppIcons.graph,
              navigation: '/hompage',
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
          aboutText={'A propos de MPP'}
          logOutText={'Se déconnecter'}
          clientIsLoad={true}
        />
      </div>
      <h2>Layout</h2>
      <h3>Login Layout</h3>
      <LayoutLoginSection />

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
                stat={0}
                statDetails="test"
              />
            </div>
          ))}
      </div>
      <h2>MPP Glossaire</h2>
      <MppInfosPin
        direction={Direction.top_right}
        texts={[
          {
            title: 'un titre random',
            content:
              'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrumvoluptates est aliquam perferendis quos possimus alias quisquam porromagni animi?',
          },
          {
            title: 'un titre random',
            content:
              'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrumvoluptates est aliquam perferendis quos possimus alias quisquam porromagni animi?',
          },
          {
            title: 'un titre random',
            content:
              'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrumvoluptates est aliquam perferendis quos possimus alias quisquam porromagni animi?',
          },
          {
            title: 'un titre random',
            content:
              'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrumvoluptates est aliquam perferendis quos possimus alias quisquam porromagni animi?',
          },
          {
            title: 'un titre random',
            content:
              'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrumvoluptates est aliquam perferendis quos possimus alias quisquam porromagni animi?',
          },
        ]}
      />
      <h2>Loader</h2>
      <MppLoader />
      <div style={{ width: '400px', marginTop: '10px', display: 'flex' }}>
        <div style={{ width: '70px', marginRight: '20px' }}>
          <MppSkeletonLoader circular={true} />
        </div>
        <MppSkeletonLoader count={3} />
      </div>
      <h2>MultiSectionButtons</h2>
      <MppMultiSectionButtonProps
        buttons_actions={[
          {
            label: 'Action 1',
            OnClick: () => console.log('Action 1'),
          },
          {
            label: 'Action 2',
            OnClick: () => console.log('Action 2'),
          },
          {
            label: 'Action 3',
            OnClick: () => console.log('Action 3'),
          },
        ]}
      />
      <h2>Select Input</h2>

      <div style={{ width: '20%' }}>
        <MppDropDown
          needEmojiFont={true}
          property="value"
          options={[
            {
              id: 'fr',
              value: '🇨🇵 Français',
            },
            {
              id: 'en',
              value: 'English',
            },
          ]}
          onChange={function (value): void {
            console.log(value);
          }}
          placeholder="Sélectionner une langue"
          defaultValue={{
            id: 'test',
            value: '🇨🇵 🇮🇹 🇪🇸 🇩🇪 🇬🇧',
          }}
          isDisabled={false}
        />
        <MppDropDown
          property="value"
          options={[
            {
              id: 'id1',
              value: 'valeur 1',
            },
            {
              id: 'id2',
              value: 'valeur 2',
            },
          ]}
          onChange={function (value): void {
            console.log(value);
          }}
          placeholder="Sélectionner une langue"
          defaultValue={{
            id: 'id0',
            value: 'valeur par défaut',
          }}
          isDisabled={false}
        />
      </div>

      <h2>Loader points</h2>
      <MppLoaderDots />

      <h2>Linear progress bar</h2>
      <div className="linear_progress_bar_container">
        <MppLinearProgressBar
          conditionForGreen={1 / 2 < 2}
          conditionForRed={1 / 2 > 3}
          maxValue={2}
          value={1}
        />
        <MppLinearProgressBar
          conditionForGreen={0 / 1 >= 1}
          conditionForRed={0 / 1 < 0.8}
          maxValue={1}
          value={0}
        />
        <MppLinearProgressBar value={158} displayValueAsDefault={true} />
        <MppLinearProgressBar
          conditionForGreen={2 > 0}
          maxValue={0}
          value={2}
        />
      </div>

      <h2>Toggle button</h2>
      <div style={{ width: '40%' }}>
        <MppToggleButton
          value={true}
          onChange={(value: boolean) => {
            console.log(value);
          }}
        />
      </div>

      <h2>Label Type</h2>
      <div className="label_section">
        <MppLabelType value={'Commu'} labelType={labelType.grey} />
        <MppLabelType value={'Université'} labelType={labelType.orange} />
        <MppLabelType value={'Entreprise'} labelType={labelType.green} />
      </div>

      <h2>Checkbox</h2>
      {[{ id: 'truc1' }, { id: 'truc2' }, { id: 'truc3' }].map((element) => (
        <div key={element.id}>
          <MppCheckbox
            value={element.id}
            onChange={(value: string): void => {
              console.log('🚀 ~ App ~ value:', value);
            }}
            checked={false}
          />
        </div>
      ))}

      <h2>Toaster</h2>
      <div style={{ height: '70px' }}>
        <MppToaster
          animationDirection={AnimationDirection.from_top}
          displayToast={true}
          messageType={MessageType.error}
          message="pas ouf"
        />
      </div>
      <div style={{ height: '70px' }}>
        <MppToaster
          animationDirection={AnimationDirection.from_bottom}
          displayToast={true}
          messageType={MessageType.succes}
          message="bien joué"
        />
      </div>
    </div>
  );
}

export default App;
