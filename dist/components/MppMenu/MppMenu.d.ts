import React from 'react';
import './mpp_menu.css';
import { BoType } from '../BoType';
interface NavigationLink {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    name: string;
    navigation: string;
    target?: "_blank";
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
 * @property {"_blank"} [target] - Spécifie si le lien doit s'ouvrir dans un nouvel onglet.
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
declare const MppMenu: React.FC<MppMenuProps>;
export default MppMenu;
