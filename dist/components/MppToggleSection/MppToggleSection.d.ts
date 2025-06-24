import React from 'react';
import './mpp_toggle_section.css';
interface MppToggleSectionProps {
    title: string;
    children: React.ReactNode;
    isSectionOpenByDefault?: boolean;
}
/**
 * Le composant MppToggleSection affiche une section repliable avec un titre,
 * permettant à l'utilisateur de développer ou réduire le contenu.
 *
 * @component
 * @param {MppToggleSectionProps} props - Les propriétés du composant MppToggleSection.
 * @param {string} props.title - Le titre affiché dans l'en-tête de la section.
 * @param {React.ReactNode} props.children - Le contenu de la section repliable.
 * @param {boolean} [props.isSectionOpenByDefault=false] - Détermine si la section est ouverte par défaut.
 *
 * @returns {JSX.Element} Le composant MppToggleSection rendu.
 *
 * @example
 * <MppToggleSection
 *   title="Mes paramètres"
 *   isSectionOpenByDefault={true}
 * >
 *   <p>Contenu de la section</p>
 * </MppToggleSection>
 */
declare const MppToggleSection: React.FC<MppToggleSectionProps>;
export default MppToggleSection;
