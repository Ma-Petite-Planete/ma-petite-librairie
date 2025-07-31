import React from 'react';
import './mpp_text_area.css';
interface MppTextAreaProps {
    placeholder: string;
    value: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    style?: React.CSSProperties;
    id?: string;
}
declare const MppTextArea: React.FC<MppTextAreaProps>;
export default MppTextArea;
