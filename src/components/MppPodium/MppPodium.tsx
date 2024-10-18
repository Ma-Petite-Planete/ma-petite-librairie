import React from 'react';
import MppPodiumStep from './MppPodiumStep/MppPodiumStep';
import './MppPodium.css';

interface PodiumStep {
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
}

const MppPodium: React.FC<MppPodiumProps> = ({
  rankedElements,
  typeOfPlayers,
  color,
}) => {
  return (
    <div className="podium__container">
      {rankedElements
        ? rankedElements.map(({ name, points, ranking, city, structure }) => (
            <MppPodiumStep
              subtitle={structure}
              subtitleBold={city}
              key={ranking}
              title={name}
              pointsNumber={points}
              typeOfPlayer={typeOfPlayers}
              color={color}
              ranking={ranking}
            />
          ))
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
            />
          ))}
    </div>
  );
};

export default MppPodium;
