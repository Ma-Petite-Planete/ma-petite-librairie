import React, { useCallback, useEffect, useState } from 'react';
import MppPodiumStep from './MppPodiumStep/MppPodiumStep';
import './MppPodium.css';
import { BoType } from '../BoType';
import { DetailRow } from '../../types_and_demo_data/detailRowRanking';

export interface PodiumStep {
  id?: string;
  name: string;
  points: number;
  ranking: number;
  boldSubtitle?: string;
  lightSubtitle?: string;
  comparativeValue?: string;
  nb_challenge?: string;
  bottomCount?: string;
  subTitleTile?: string;
  details?: DetailRow[];
}

/**
 * MppPodium affiche un podium avec les éléments classés passés en entrée.
 *
 * Ce composant attend jusqu'à trois éléments classés (1er, 2e, 3e). Si
 * `rankedElements` est `null`, le composant affiche des placeholders (skeleton)
 * pour chacune des trois étapes du podium.
 *
 * @param {MppPodiumProps} props - Propriétés du composant podium.
 * @param {Array<PodiumStep> | null} props.rankedElements
 *   - La liste des éléments à afficher dans le podium (typiquement 1 à 3 éléments).
 *     Si `null`, on affiche des placeholders skeleton (3 étapes).
 * @param {string} props.color
 *   - La couleur appliquée aux badges et textes du podium (ex. "#FFCC00").
 * @param {string} props.typeOfPlayers
 *   - Libellé décrivant le type de joueurs (ex. "élèves", "équipes").
 * @param {boolean} props.displayFullInfos
 *   - Indique s’il faut afficher toutes les informations disponibles (boldSubtitle, structure…).
 * @param {BoType} [props.boType=BoType.scoBO]
 *   - Type de back-office, utilisé pour appliquer le style de fond approprié.
 *     Valeurs possibles : BoType.scoBO | BoType.gpBO.
 * @param {(e: React.MouseEvent<HTMLDivElement>) => void} [props.onClick]
 *   - Callback appelé au clic sur une étape du podium ou sur le backdrop de détails.
 * @param {(e: React.MouseEvent<HTMLDivElement>) => void} [props.onHover]
 *   - Callback appelé au survol d’une étape du podium.
 * @param {(e: React.MouseEvent<HTMLDivElement>) => void} [props.onHoverLeave]
 *   - Callback appelé à la sortie du survol d’une étape du podium.
 *
 * Remarques :
 * - Chaque élément de `rankedElements` doit contenir au minimum `name`, `points`
 *   et `ranking`. Les champs optionnels (boldSubtitle, lightSubtitle, details, etc.) seront
 *   affichés si `displayFullInfos` est vrai et si les données sont présentes.
 * - Les callbacks reçoivent l'événement mouse du div concerné.
 *
 * @example
 * ```tsx
 * const steps: PodiumStep[] = [
 *   { id: 'a', name: 'Alice',   points: 42, ranking: 1, boldSubtitle: 'Paris',     lightSubtitle: 'Lycée A' },
 *   { id: 'b', name: 'Bob',     points: 37, ranking: 2, boldSubtitle: 'Lyon',      lightSubtitle: 'Lycée B' },
 *   { id: 'c', name: 'Charlie', points: 29, ranking: 3, boldSubtitle: 'Marseille', lightSubtitle: 'Lycée C' },
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

  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [detailsToShow, setDetailsToShow] = useState<DetailRow[] | null>(null);
  const isDetailToShow =
    activeStep !== null && detailsToShow != null && detailsToShow.length > 0;

  useEffect(() => {
    setActiveStep(null);
    setDetailsToShow(null);
  }, [rankedElements]);

  const handleStepClick = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      stepRanking: number,
      details?: DetailRow[]
    ) => {
      e.stopPropagation();
      const willOpen = activeStep !== stepRanking;
      setActiveStep(willOpen ? stepRanking : null);
      setDetailsToShow(
        willOpen ? (details && details.length ? details : null) : null
      );
      onClick?.(e);
    },
    [activeStep, onClick]
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDetailToShow) return;
      setActiveStep(null);
      setDetailsToShow(null);
      onClick?.(e);
    },
    [isDetailToShow, onClick]
  );

  console.log('🚀 ~ MppPodium ~ rankedElements:', rankedElements);
  return (
    <div
      className={`main_podium_container ${isDetailToShow ? 'cursor_pointer' : ''}`}
      onClick={handleBackdropClick}
    >
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
                boldSubtitle,
                lightSubtitle,
                id,
                comparativeValue,
                bottomCount,
                details,
              }) => (
                <MppPodiumStep
                  key={ranking}
                  id={id}
                  title={name}
                  pointsNumber={`${points} pts `}
                  typeOfPlayer={typeOfPlayers}
                  color={color}
                  ranking={ranking}
                  boType={boType}
                  bottomCount={bottomCount}
                  displayAllInfos={displayFullInfos}
                  subtitle={isBoSco ? lightSubtitle : comparativeValue}
                  subtitleBold={boldSubtitle}
                  details={details}
                  isOpen={activeStep === ranking}
                  onStepClick={(e) => handleStepClick(e, ranking, details)}
                  onHover={onHover}
                  onHoverLeave={onHoverLeave}
                />
              )
            )
          : Array.from({ length: 3 }, (_, index) => (
              <MppPodiumStep
                key={index}
                title={null as unknown as string}
                pointsNumber={'0'}
                subtitle=""
                subtitleBold=""
                typeOfPlayer={typeOfPlayers}
                color={color}
                ranking={index + 1}
                displayAllInfos={false}
                boType={boType}
                isOpen={false}
                onStepClick={() => {}}
              />
            ))}
      </div>

      <div
        className={`details_podium_background details_collapse ${isDetailToShow ? 'expanded' : ''}`}
        aria-hidden={!isDetailToShow}
      >
        <div className="details_inner">
          <ul className="details_list_podium">
            {(detailsToShow ?? []).map((row, idx) => (
              <li key={`${row.title}-${idx}`} className="detail_row">
                <div className="detail_left">
                  <p className="text_small">
                    <span className=" text_body_sb">{row.title}</span> -{' '}
                    {row.subtitle}
                  </p>
                </div>
                <div className="detail_right">
                  <p className="detail_stat text_body_sb">
                    {row.statistic || '---'}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
