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
  city?: string;
  structure?: string;
  comparativeValue?: string;
  nb_challenge?: string;
  bottomCount?: string;
  subTitleTile?: string;
  details?: DetailRow[];
}

/**
 * MppPodium affiche un podium avec les éléments classés passés en entrée.
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
                city,
                structure,
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
                  subtitle={isBoSco ? structure : comparativeValue}
                  subtitleBold={city}
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
                    {row.statistique || '---'}
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
