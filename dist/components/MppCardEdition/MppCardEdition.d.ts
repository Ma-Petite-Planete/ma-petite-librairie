import React from 'react';
import './mpp_card_edition.css';
interface MppCardEditionProps {
    backgroundColor?: string;
    textColor?: string;
    editionName: string;
    startDate: string;
    endDate: string;
    displayDaysLeft: boolean;
}
/**
 * @interface MppCardEditionProps
 * @property {string} backgroundColor - Couleur de fond.
 * @property {string} textColor - Couleur des textes.
 * @property {string} editionName - Nom de l'édition.
 * @property {string} startDate - Date de début de l'édition.
 * @property {string} endDate - Date de fin de l'édition.
 * @property {boolean} displayDaysLeft - Booléen pour afficher ou pas le message.
 *
 * Composant d'affichage des dates de début et de fin d'édition et, côté scolaire, affichage d'un message en fonction de la date du jour
 *
 * @example
 * ````
 * <MppCardEdition
        displayDaysLeft={true}
        backgroundColor={ScoColors.veryLightYellow}
        textColor={ScoColors.darkBlue}
        editionName={'Edition Automne 2024'}
        startDate={'2024-02-12 08:57:38+00'}
        endDate={'2024-03-03 08:57:49+00'}
      />
 * ````
 */
declare const MppCardEdition: React.FC<MppCardEditionProps>;
export default MppCardEdition;
