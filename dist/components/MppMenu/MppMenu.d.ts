import React from 'react';
import './mpp_menu.css';
import { MenuType } from './MenuType';
interface NavigationLink {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    name: string;
    navigation: string;
}
interface MppMenuProps {
    logo: string;
    navigationLinks: Array<NavigationLink>;
    LinkComponent: React.ElementType;
    menuType: MenuType;
    onLogout: () => void;
    actualPage: string;
}
declare const MppMenu: React.FC<MppMenuProps>;
export default MppMenu;
