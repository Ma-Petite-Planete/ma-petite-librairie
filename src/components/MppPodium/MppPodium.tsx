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
  rankedElements: Array<PodiumStep>;
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
      {rankedElements.map(({ name, points, ranking, city, structure }) => (
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
      ))}
    </div>
  );
};

export default MppPodium;
