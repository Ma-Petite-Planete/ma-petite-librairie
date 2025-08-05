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
}
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
      className={`podium__container ${boType === BoType.scoBO ? 'sco_background_color' : 'gp_background_color'}`}
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
