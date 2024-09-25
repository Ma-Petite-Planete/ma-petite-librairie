import React, { useState } from 'react';
import './mpp_menu.css';
import { BoType } from '../BoType';
import { GpBlueLogo, MppIcons, ScoYellowLogo } from '../..';

interface NavigationLink {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  name: string;
  navigation: string;
}

interface MppMenuProps {
  navigationLinks: Array<NavigationLink>;
  LinkComponent: React.ElementType;
  boType: BoType;
  onLogout: () => void;
  actualPage: string;
}

const MppMenu: React.FC<MppMenuProps> = ({
  navigationLinks,
  LinkComponent,
  boType,
  onLogout,
  actualPage,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="menu_background">
      <div className="center">
        <div className="logo_container">
          {boType === BoType.scoBO ? (
            <ScoYellowLogo className="logo" />
          ) : (
            <GpBlueLogo className="logo" />
          )}
        </div>

        <div className="navigation_background">
          {navigationLinks.map((navigationLink, index) => (
            <div
              className={`navigation_element ${actualPage.includes(navigationLink.navigation) ? 'actual_page' : ''}`}
              key={navigationLink.name}
            >
              <LinkComponent
                href={navigationLink.navigation}
                className="navigation_flex"
              >
                <navigationLink.icon className="icon" />
                <p
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={
                    hoveredIndex === index ||
                    actualPage.includes(navigationLink.navigation)
                      ? 'text_body_sb'
                      : 'text_body'
                  }
                >
                  {navigationLink.name}
                </p>
              </LinkComponent>
            </div>
          ))}
        </div>
      </div>
      <div className="navigation_background">
        {boType === BoType.gpBo ? 'ici selecteur de langue' : null}
        <LinkComponent
          className="navigation_element"
          href={'https://mapetiteplanete.org/'}
        >
          <p className="text_body">A propos de Mpp</p>
        </LinkComponent>
        <div className="navigation_element bottom">
          <LinkComponent href={'./onBoarding'} className="navigation_flex">
            <MppIcons.logOut className="icon" />
            <p className="text_body_sb" onClick={onLogout}>
              Se déconnecter
            </p>
          </LinkComponent>
        </div>
      </div>
    </div>
  );
};

export default MppMenu;
