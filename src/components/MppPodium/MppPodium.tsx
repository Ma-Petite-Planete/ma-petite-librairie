import React from 'react';
import MppPodiumStep from './MppPodiumStep/MppPodiumStep';
import './MppPodium.css';
import { BoType } from '../BoType';

export interface PodiumStep {
  id?: string;
  name: string;
  points: number;
  ranking: number;
  city?: string;
  structure?: string;
  comparativeValue?: string;
  nb_challenge?: string;
  bottomCount?: string;
  subTitleTile?: string;
}

/**
 * MppPodium affiche un podium avec les éléments classés passés en entrée.
 *
 * @param {MppPodiumProps} props - Propriétés du composant podium.
 * @param {Array<PodiumStep> | null} props.rankedElements
 *   - La liste des 3 (ou moins) éléments à afficher dans le podium.
 *   Si `null`, on affiche des placeholders skeleton (3 étapes).
 * @param {string} props.color
 *   - La couleur appliquée aux badges et textes du podium.
 * @param {string} props.typeOfPlayers
 *   - Label de type de joueurs (ex. "élèves", "équipes").
 * @param {boolean} props.displayFullInfos
 *   - Indique s’il faut afficher toutes les informations (city, structure…).
 * @param {BoType} [props.boType=BoType.scoBO]
 *   - Type de back-office, pour appliquer le bon style de fond.
 * @param {(e: React.MouseEvent<HTMLDivElement>) => void} [props.onClick]
 *   - Callback appelé au clic sur une étape du podium.
 * @param {(e: React.MouseEvent<HTMLDivElement>) => void} [props.onHover]
 *   - Callback appelé au survol d’une étape du podium.
 * @param {(e: React.MouseEvent<HTMLDivElement>) => void} [props.onHoverLeave]
 *   - Callback appelé à la sortie du survol d’une étape du podium.
 *
 * @example
 * ```tsx
 * const steps: PodiumStep[] = [
 *   { id: 'a', name: 'Alice',   points: 42, ranking: 1, city: 'Paris',    structure: 'Lycée A' },
 *   { id: 'b', name: 'Bob',     points: 37, ranking: 2, city: 'Lyon',     structure: 'Lycée B' },
 *   { id: 'c', name: 'Charlie', points: 29, ranking: 3, city: 'Marseille',structure: 'Lycée C' },
 * ];
 *
 * <MppPodium
 *   rankedElements={steps}
 *   color="#FFCC00"
 *   typeOfPlayers="élèves"
 *   displayFullInfos={true}
 *   boType={BoType.gpBO}
 *   onClick={(e) => console.log('clicked', e)}
 * />
 * ```
 */
interface MppPodiumProps {
  rankedElements: Array<PodiumStep> | null;
  color: string;
  typeOfPlayers: string;
  displayFullInfos: boolean;
  boType?: BoType;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onHover?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onHoverLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const MppPodium: React.FC<MppPodiumProps> = ({
  rankedElements,
  typeOfPlayers,
  color,
  displayFullInfos,
  onClick,
  onHover,
  onHoverLeave,
  boType = BoType.scoBO,
}) => {
  const isBoSco = boType === BoType.scoBO;
  return (
    <div
      className={`podium__container ${isBoSco ? 'sco_background_color' : 'gp_background_color'}`}
      style={{ maxWidth: isBoSco ? '541px' : '652px' }}
    >
      {rankedElements
        ? rankedElements.map(
            ({
              name,
              points,
              ranking,
              city,
              structure,
              id,
              comparativeValue,
              bottomCount,
            }) => (
              <MppPodiumStep
                id={id}
                onClick={onClick}
                onHover={onHover}
                onHoverLeave={onHoverLeave}
                displayAllInfos={displayFullInfos}
                subtitle={isBoSco ? structure : comparativeValue}
                subtitleBold={city}
                key={ranking}
                title={name}
                pointsNumber={`${points} pts `}
                typeOfPlayer={typeOfPlayers}
                color={color}
                ranking={ranking}
                boType={boType}
                bottomCount={bottomCount}
              />
            )
          )
        : Array.from({ length: 3 }, (_, index) => (
            <MppPodiumStep
              key={index}
              title={null}
              pointsNumber={'0'}
              subtitle=""
              subtitleBold=""
              typeOfPlayer={typeOfPlayers}
              color={color}
              ranking={index + 1}
              displayAllInfos={false}
              boType={boType}
            />
          ))}
    </div>
  );
};
