import React from 'react';
import './mpp_menu.css';
import { BoType } from '../BoType';
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
declare const MppMenu: React.FC<MppMenuProps>;
export default MppMenu;
