import React from 'react';
import './mpp_menu.css';
import { MenuType } from './MenuType';
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
declare const MppMenu: React.FC<MppMenuProps>;
export default MppMenu;
