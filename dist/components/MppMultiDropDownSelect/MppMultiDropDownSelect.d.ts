import React from 'react';
import './mpp_multi_dropdown_select.css';
import { Identifier } from '../../types_and_demo_data/identifier';
interface MppDropDownSection {
    title: string;
    items: Array<Identifier>;
}
interface MppMultiDropDownSelectProps {
    data: MppDropDownSection[];
    onSelect: (selected: Identifier[]) => void;
    selectedValues: Identifier[];
    isOpenByDefault: boolean;
    placeholderOnEmpty: string;
}
declare const MppMultiDropDownSelect: React.FC<MppMultiDropDownSelectProps>;
export default MppMultiDropDownSelect;
