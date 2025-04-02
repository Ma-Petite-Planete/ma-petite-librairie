import React from 'react';
import './mpp_menu.css';
import { BoType } from '../BoType';
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
declare const MppMenu: React.FC<MppMenuProps>;
export default MppMenu;
