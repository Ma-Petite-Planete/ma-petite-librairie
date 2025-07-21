import React, { useRef, useState, useEffect } from 'react';
import './mpp_toggle_section.css';

interface MppToggleSectionProps {
  title: string;
  children: React.ReactNode;
  isSectionOpenByDefault?: boolean;
}

/**
 * Le composant MppToggleSection affiche une section repliable avec un titre,
 * permettant à l'utilisateur de développer ou réduire le contenu.
 *
 * @component
 * @param {MppToggleSectionProps} props - Les propriétés du composant MppToggleSection.
 * @param {string} props.title - Le titre affiché dans l'en-tête de la section.
 * @param {React.ReactNode} props.children - Le contenu de la section repliable.
 * @param {boolean} [props.isSectionOpenByDefault=false] - Détermine si la section est ouverte par défaut.
 *
 * @returns {JSX.Element} Le composant MppToggleSection rendu.
 *
 * @example
 * <MppToggleSection
 *   title="Mes paramètres"
 *   isSectionOpenByDefault={true}
 * >
 *   <p>Contenu de la section</p>
 * </MppToggleSection>
 */

const MppToggleSection: React.FC<MppToggleSectionProps> = ({
  title,
  children,
  isSectionOpenByDefault = false,
}) => {
  const [isOpen, setIsOpen] = useState(isSectionOpenByDefault);
  const [height, setHeight] = useState('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(isSectionOpenByDefault);
  }, [isSectionOpenByDefault]);

  const toggleSection = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new ResizeObserver(() => {
      if (isOpen && contentRef.current) {
        setHeight(`${contentRef.current.scrollHeight}px`);
      }
    });

    observer.observe(contentRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isOpen]);

  return (
    <div className="toggle_section_container">
      <div className="toggle_section_header" onClick={toggleSection}>
        <p>{title}</p>
        <div className={`toggle_section_arrow ${isOpen ? 'arrow_open' : ''}`} />
      </div>

      <div

        className="toggle_section_content"
        style={{
          height,
          overflow: 'hidden',
          transition: 'height 0.4s ease',
        }}
      >
        <div className="toggle_section_inner" ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};

export default MppToggleSection;
