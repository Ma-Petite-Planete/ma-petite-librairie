import React, { useState } from 'react';
import './mpp_menu.css';
import { BoType } from '../BoType';
import { MppIcons } from '../../utils/MppIcons';
import MppSkeletonLoader from '../MppSkeletonLoader/MppSkeletonLoader';

interface NavigationLink {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  name: string;
  navigation: string;
  target?: string | null;
}

interface MppMenuProps {
  backToClientsLink?: NavigationLink;
  navigationLinks: Array<NavigationLink>;
  LinkComponent: React.ElementType;
  boType: BoType;
  toggleLanguage?: string;
  onLogout: () => void;
  actualPage: string;
  aboutText?: string;
  logOutText: string;
  clientIsLoad: boolean;
  clientName?: string;
  codeClientInput?: React.ReactNode;
  codeClientButton?: React.ReactNode;
  languageToggle?: React.ReactNode;
}

/**
 * Composant de menu principal pour les interfaces back-office (GP ou SCO).
 *
 * @component
 * @param {MppMenuProps} props - Propriétés du composant
 *
 * @interface MppMenuProps
 * @property {NavigationLink[]} navigationLinks - Liste des liens de navigation affichés dans le menu.
 * @property {React.ElementType} LinkComponent - Composant de lien utilisé pour la navigation (ex : `Link` de Next.js ou React Router).
 * @property {BoType} boType - Type de back-office (ex : `BoType.scoBO` ou `BoType.gpBo`).
 * @property {() => void} onLogout - Fonction appelée lors du clic sur le bouton de déconnexion.
 * @property {string} actualPage - Nom ou URL de la page actuelle, utilisé pour la mise en surbrillance du lien actif.
 * @property {string} logOutText - Texte affiché pour le bouton de déconnexion.
 * @property {boolean} clientIsLoad - Indique si les données client sont chargées (affiche un loader sinon).
 * @property {string} [clientName] - Nom du client à afficher (pour le back-office GP).
 * @property {React.ReactNode} [codeClientInput] - Composant d’input pour la saisie du code client (GP uniquement).
 * @property {React.ReactNode} [codeClientButton] - Composant bouton associé à l’input du code client.
 * @property {NavigationLink} [backToClientsLink] - Lien de retour à la liste des clients (GP uniquement).
 * @property {React.ReactNode} [languageToggle] - Composant pour le changement de langue.
 * @property {string} [aboutText] - Texte du lien "À propos", redirigeant vers le site Ma Petite Planète.
 *
 * @interface NavigationLink
 * @property {React.FC<React.SVGProps<SVGSVGElement>>} icon - Icône du lien de navigation.
 * @property {string} name - Nom du lien affiché.
 * @property {string} navigation - URL de destination.
 * @property {string} [target] - Spécifie si le lien doit s'ouvrir dans un nouvel onglet.
 *
 * @example
 * ```tsx
 * const navigationLinks = [
 *   { icon: MppIcons.home, name: 'Accueil', navigation: '/' },
 *   { icon: MppIcons.profile, name: 'Profil', navigation: '/profil' },
 * ];
 *
 * <MppMenu
 *   navigationLinks={navigationLinks}
 *   LinkComponent={Link}
 *   boType={BoType.gpBo}
 *   onLogout={() => console.log('Déconnexion')}
 *   actualPage="/"
 *   logOutText="Se déconnecter"
 *   clientIsLoad={true}
 *   clientName="Entreprise ABC"
 *   codeClientInput={<input />}
 *   codeClientButton={<button>Valider</button>}
 *   backToClientsLink={{
 *     name: 'Retour aux clients',
 *     navigation: '/clients',
 *     icon: MppIcons.arrowBack
 *   }}
 *   languageToggle={<LanguageSwitcher />}
 *   aboutText="À propos"
 * />
 * ```
 */
const MppMenu: React.FC<MppMenuProps> = ({
  navigationLinks,
  LinkComponent,
  boType,
  onLogout,
  actualPage,
  aboutText,
  logOutText,
  clientIsLoad,
  clientName,
  codeClientInput,
  codeClientButton,
  backToClientsLink,
  languageToggle,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="menu_background">
      <div className="center">
        <div
          className={`logo_container ${boType === BoType.gpBo ? 'logo_gp' : 'logo_sco'}`}
        ></div>
        {boType === BoType.gpBo && (
          <div className="gp_menu_client_data ">
            {clientName && <span className="text_body_sb">{clientName}</span>}
            {backToClientsLink && (
              <LinkComponent
                href={backToClientsLink.navigation}
                className="navigation_flex text_small_b navigation_return_link"
              >
                <MppIcons.arrowBack className="icon_arrow_back text_small_b" />
                <span className='text_small_b' >{backToClientsLink.name}</span>
              </LinkComponent>
            )}
          </div>
        )}
        <div className="navigation_background">
          {clientIsLoad ? (
            navigationLinks.map((navigationLink, index) => (
              <div
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`navigation_element ${actualPage.includes(navigationLink.navigation) ? 'actual_page' : ''} ${
                  hoveredIndex === index ||
                  actualPage.includes(navigationLink.navigation)
                    ? 'text_body_sb '
                    : 'text_body '
                }`}
                key={navigationLink.name}
              >
                <LinkComponent
                  href={navigationLink.navigation}
                  className="navigation_flex"
                  target={navigationLink.target ?? ''}
                >
                  <navigationLink.icon className="icon" />
                  <p>{navigationLink.name}</p>
                </LinkComponent>
              </div>
            ))
          ) : (
            <MppSkeletonLoader
              count={5}
              spaceBetweenRow="16px"
              heightRow="20px"
            />
          )}
        </div>
      </div>
      {boType === BoType.gpBo && (
        <div className="navigation_client_code_section">
          <div className="navigation_client_code_section--input">
            {codeClientInput}
          </div>
          {codeClientButton}
        </div>
      )}

      <div className="navigation_background">
        {aboutText && (
          <LinkComponent
            className="navigation_element"
            href={'https://mapetiteplanete.org/'}
          >
            <p className="text_body">{aboutText}</p>
          </LinkComponent>
        )}
        {languageToggle}

        <div className="navigation_element bottom" onClick={onLogout}>
          <MppIcons.logOut className="icon" />
          <p className="text_body_sb">{logOutText}</p>
        </div>
      </div>
    </div>
  );
};

export default MppMenu;
