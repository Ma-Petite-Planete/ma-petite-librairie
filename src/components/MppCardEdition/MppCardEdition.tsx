import React, { useEffect } from 'react';
import './mpp_card_edition.css';
import { MppIcons } from '../../utils/MppIcons';
import { ScoColors } from '../../utils/Mppcolors';

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

const MppCardEdition: React.FC<MppCardEditionProps> = ({
  backgroundColor,
  textColor,
  editionName,
  editionDatesInfos,
  editionMessage,
}) => {
  return (
    <div
      style={{ backgroundColor: `${backgroundColor}` }}
      className='card_edition__container'
    >
      <div style={{ color: `${textColor}` }} className='card_edition__infos'>
        <p className='edition_infos__date text_body'>
          <span className='edition_infos__name text_body_sb'>
            {editionName} -{' '}
          </span>
         {editionDatesInfos}
        </p>
      </div>

      {editionMessage ? (
        <div className='card_edition__days'>
          <MppIcons.history
            fill={ScoColors.tonicViolet}
            className='card_edition__icon'
          />
          <p className='edition_days__details text_body_sb'>
            {editionMessage}
          </p>
        </div>
      ) : null}
    </div>
  );
};



export default MppCardEdition;


