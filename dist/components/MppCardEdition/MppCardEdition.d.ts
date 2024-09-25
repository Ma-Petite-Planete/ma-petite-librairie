import React from 'react';
import './mpp_card_edition.css';
interface MppCardEditionProps {
    backgroundColor?: string;
    textColor?: string;
    editionName: string;
    editionDatesInfos: string;
    editionMessage: string;
}
/**
 * @interface MppCardEditionProps
 * @property {string} backgroundColor - Couleur de fond.
 * @property {string} textColor - Couleur des textes.
 * @property {string} editionName - Nom de l'édition.
 * @property {string} editionDatesInfos - Nom de l'édition.
 * @property {boolean} editionMessage - Message à afficher sur la droite donnant l'état d'avancement de l'édition.
 *
 * Composant d'affichage des dates de début et de fin d'édition et, côté scolaire, affichage d'un message en fonction de la date du jour
 *
 * @example
 * ````
 * <MppCardEdition
        editionMessage="Il reste 7 jours !"
        backgroundColor={ScoColors.veryLightYellow}
        textColor={ScoColors.darkBlue}
        editionDatesInfos={'Du lundi 18 novembre 9h au lundi 9 décembre 20h'}
        editionName={'Edition Automne 2024'}
      />
 * ````
 */
declare const MppCardEdition: React.FC<MppCardEditionProps>;
export default MppCardEdition;
