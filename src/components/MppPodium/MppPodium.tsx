import React from 'react';
import MppPodiumStep from './MppPodiumStep/MppPodiumStep';
import './MppPodium.css';

interface PodiumStep {
  id?: string;
  name: string;
  points: number;
  ranking: number;
  city?: string;
  structure?: string;
}
interface MppPodiumProps {
  rankedElements: Array<PodiumStep> | null;
  color: string;
  typeOfPlayers: string;
  displayFullInfos: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onHover?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onHoverLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const MppPodium: React.FC<MppPodiumProps> = ({
  rankedElements,
  typeOfPlayers,
  color,
  displayFullInfos,
  onClick,
  onHover,
  onHoverLeave,
}) => {
  return (
    <div className="podium__container">
      {rankedElements
        ? rankedElements.map(
            ({ name, points, ranking, city, structure, id }) => (
              <MppPodiumStep
                id={id}
                onClick={onClick}
                onHover={onHover}
                onHoverLeave={onHoverLeave}
                displayAllInfos={displayFullInfos}
                subtitle={structure}
                subtitleBold={city}
                key={ranking}
                title={name}
                pointsNumber={points}
                typeOfPlayer={typeOfPlayers}
                color={color}
                ranking={ranking}
              />
            )
          )
        : Array.from({ length: 3 }, (_, index) => (
            <MppPodiumStep
              key={index}
              title={null}
              pointsNumber={0}
              subtitle=""
              subtitleBold=""
              typeOfPlayer={typeOfPlayers}
              color={color}
              ranking={index + 1}
              displayAllInfos={false}
            />
          ))}
    </div>
  );
};

export default MppPodium;
