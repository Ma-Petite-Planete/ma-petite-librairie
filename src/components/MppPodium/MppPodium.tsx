import React from "react";
import MppPodiumStep from "../MppPodiumStep/MppPodiumStep";
import "./MppPodium.css";

interface PodiumStep {
  name: String;
  points: number;
  ranking: number;
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
      {rankedElements.map((element) => (
        <MppPodiumStep
          title={element.name}
          pointsNumber={element.points}
          typeOfPlayer={typeOfPlayers}
          color={color}
          ranking={element.ranking}
        />
      ))}
    </div>
  );
};

export default MppPodium;
