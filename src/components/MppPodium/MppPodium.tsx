import React from "react";
import MppPodiumStep from "../MppPodiumStep/MppPodiumStep";
import "./MppPodium.css";
interface MppPodiumProps {
  rankedElements: League[] | Class[];
  isMppScolaire: boolean;
}

interface League {} // a importer d'un seul autre fichier
interface Class {} // a importer d'un seul autre fichier

const MppPodium: React.FC<MppPodiumProps> = ({
  rankedElements,
  isMppScolaire,
}) => {
  return (
    <div className="podium__container">
      {rankedElements.map((element) => (
        <MppPodiumStep
          key={element.id}
          title={element.name}
          pointsNumber={element.points}
          typeOfPlayer={isMppScolaire ? "élève" : "player"}
          color={isMppScolaire ? "var(--yellow_2)" : "var(--yellow_2)"}
          ranking={element.ranking}
        />
      ))}
    </div>
  );
};

export default MppPodium;
