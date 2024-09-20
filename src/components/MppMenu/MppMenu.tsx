/// <reference types="vite-plugin-svgr/client" />

import React from 'react';
import './mpp_menu.css';
import { MenuType } from './MenuType';
import { MppIcon } from '../../utils/MppIcons';
import { ScoColors } from '../../utils/Mppcolors';
// import { gpBlueLogo, scoYellowLogo } from '../..';

interface NavigationLink {
  icon: string;
  name: string;
  navigation: string;
}

interface MppMenuProps {
  logo: string;
  navigationLinks: Array<NavigationLink>;
  LinkComponent: React.ElementType;
  menuType: MenuType;
}

const MppMenu: React.FC<MppMenuProps> = ({
  navigationLinks,
  LinkComponent,
  menuType,
}) => {
  return (
    <div className="menu_background">
      <div className="center">
        {/* <img
          className="logo"
          src={menuType === MenuType.scoMenu ? scoYellowLogo : gpBlueLogo}
          alt="Logo Ma petite planète"
        /> */}
        <div className="navigation_background">
          {navigationLinks.map((navigationLink) => (
            <LinkComponent
              href={navigationLink.navigation}
              key={navigationLink.name}
            >
              <p>{navigationLink.name}</p>
            </LinkComponent>
          ))}
        </div>
      </div>
      <div>
        <MppIcon.map fill={ScoColors.error} />
        {menuType === MenuType.gpMenu ? 'ici selecteur de langue' : null}
        <p className="text_body text_color_grey">A propos de Mpp</p>
        <LinkComponent href={'./Logout'}>
          <p className="text_body_sb text_color_grey">Se déconnecter</p>
        </LinkComponent>
      </div>
    </div>
  );
};

export default MppMenu;
