import React, { useState } from 'react';
import './mpp_menu.css';
import { BoType } from '../BoType';
import { MppIcons } from '../../utils/MppIcons';
import MppSkeletonLoader from '../MppSkeletonLoader/MppSkeletonLoader';

interface NavigationLink {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  name: string;
  navigation: string;
}

interface MppMenuProps {
  backToClientsLink?: NavigationLink;
  navigationLinks: Array<NavigationLink>;
  LinkComponent: React.ElementType;
  boType: BoType;
  onLogout: () => void;
  actualPage: string;
  aboutText: string;
  logOutText: string;
  clientIsLoad: boolean;
  clientName?: string;
  codeClientInput?: React.ReactNode;
  codeClientButton?: React.ReactNode;
  languageDropDown?: React.ReactNode;
}

/**
 * @interface MppMenuProps
 * @property {Array<NavigationLink>} navigationLinks - Liste des liens de navigation à afficher dans le menu.
 * @property {React.ElementType} LinkComponent - Composant de lien à utiliser pour la navigation (ex : `Link` de Next.js).
 * @property {BoType} boType - Type de back-office (ex : `scoBO` ou `gpBo`).
 * @property {function(): void} onLogout - Fonction de rappel appelée lors de la déconnexion.
 * @property {string} actualPage - URL ou nom de la page actuelle pour la mise en surbrillance.
 * @property {string} aboutText - Texte à afficher pour la page "À propos".
 * @property {string} logOutText - Texte à afficher pour le lien de déconnexion.
 *
 * @example
 *
 * const navigationLinks = [
 *   { icon: MppIcons.tata, name: 'Accueil', navigation: '/' },
 *   { icon: MppIcons.toto, name: 'Profil', navigation: '/profil' },
 * ];
 *
 * <MppMenu
 *   navigationLinks={navigationLinks}
 *   LinkComponent={Link}
 *   boType={BoType.scoBO}
 *   onLogout={() => console.log('Déconnexion')}
 *   actualPage="/"
 *   aboutText="À propos"
 *   logOutText="Déconnexion"
 * />
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
  languageDropDown,
  backToClientsLink,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="menu_background">
      <div className="center">
        <div
          className={`logo_container ${boType === BoType.gpBo ? 'logo_gp' : 'logo_sco'}`}
        ></div>
        {boType === BoType.gpBo && backToClientsLink && (
          <div className="gp_menu_client_data ">
            {clientName && <span className="text_body_sb">{clientName}</span>}

            <LinkComponent
              href={backToClientsLink.navigation}
              className="navigation_flex text_small_b navigation_return_link"
            >
              <MppIcons.arrowBack className="icon_arrow_back text_small_b" />
              <span>{backToClientsLink.name}</span>
            </LinkComponent>
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
        {boType === BoType.gpBo && (
          <div className="navigation_language_dropdown">{languageDropDown}</div>
        )}
        <LinkComponent
          className="navigation_element"
          href={'https://mapetiteplanete.org/'}
        >
          <p className="text_body">{aboutText}</p>
        </LinkComponent>
        <div className="navigation_element bottom" onClick={onLogout}>
          <MppIcons.logOut className="icon" />
          <p className="text_body_sb">{logOutText}</p>
        </div>
      </div>
    </div>
  );
};

export default MppMenu;
