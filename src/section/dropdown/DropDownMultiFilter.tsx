import React, { useState } from 'react';
import { demoIdentifiers, Identifier } from '../../types_and_demo_data/identifier';
import CategoryMultiFilter from '../../components/MppMultiDropDownFilter/MppMultiDropDownFilter';

const DropDownMultiFilters: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<Identifier[]>([]);
    return (
        <div className="dropdown-multi-filters">
            <h2>Choisissez vos filtres</h2>
            <CategoryMultiFilter
                categories={demoIdentifiers}
                selectedCategories={selectedCategories}
                onChange={setSelectedCategories}
                placeholder="Choisissez des catégories"
            />
        </div>
    );
};

export default DropDownMultiFilters;
