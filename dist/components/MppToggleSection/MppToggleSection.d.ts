import React from 'react';
import './mpp_toggle_section.css';
interface MppToggleSectionProps {
    title: string;
    children: React.ReactNode;
    isSectionOpenByDefault?: boolean;
}
declare const MppToggleSection: React.FC<MppToggleSectionProps>;
export default MppToggleSection;
