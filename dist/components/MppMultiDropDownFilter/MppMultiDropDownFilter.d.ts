import React from 'react';
import './mpp_multi_dropdown_filter.css';
import { Identifier } from '../../types_and_demo_data/identifier';
interface MppCategoryMultiFilterProps {
    categories: Array<Identifier>;
    selectedCategories: Array<Identifier>;
    onChange: (selected: Array<Identifier>) => void;
    placeholder: string;
}
/**
 * CategoryMultiFilter rends une liste de catégories multi-sélectionnables dans un dropdown.
 */
declare const MppCategoryMultiFilter: React.FC<MppCategoryMultiFilterProps>;
export default MppCategoryMultiFilter;
