import React from 'react';
import './mpp_infos_pin.css';
interface TextContent {
    title: string;
    content: string;
}
export declare enum Direction {
    top_right = 0,
    top_left = 1,
    bottom_left = 2,
    bottom_right = 3
}
interface MppInfosPinProps {
    texts: Array<TextContent>;
    direction?: Direction;
}
declare const MppInfosPin: React.FC<MppInfosPinProps>;
export default MppInfosPin;
