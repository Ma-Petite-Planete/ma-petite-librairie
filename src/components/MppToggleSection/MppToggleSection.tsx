import React, { useRef, useState, useEffect } from 'react';
import './mpp_toggle_section.css';

interface MppToggleSectionProps {
  title: string;
  children: React.ReactNode;
  isSectionOpenByDefault?: boolean;
}

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

  const toggleSection = () => setIsOpen(!isOpen);

  return (
    <div className="toggle_section_container">
      <div className="toggle_section_header" onClick={toggleSection}>
        <p>{title}</p>
        <div className={`toggle_section_arrow ${isOpen ? 'arrow_open' : ''}`} />
      </div>

      <div
        ref={contentRef}
        className="toggle_section_content"
        style={{
          height,
          overflow: 'hidden',
          transition: 'height 0.4s ease',
        }}
      >
        <div className="toggle_section_inner">{children}</div>
      </div>
    </div>
  );
};

export default MppToggleSection;
