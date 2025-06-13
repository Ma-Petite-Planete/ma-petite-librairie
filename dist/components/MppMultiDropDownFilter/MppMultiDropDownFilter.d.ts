import React from 'react';
import './mpp_multi_dropdown_filter.css';
import { Identifier } from '../../types_and_demo_data/identifier';
interface CategoryMultiFilterProps {
    categories: Identifier[];
    selectedCategories: Identifier[];
    onChange: (selected: Identifier[]) => void;
    placeholder: string;
}
/**
 * CategoryMultiFilter rends une liste de catégories multi-sélectionnables dans un dropdown.
 */
declare const CategoryMultiFilter: React.FC<CategoryMultiFilterProps>;
export default CategoryMultiFilter;
