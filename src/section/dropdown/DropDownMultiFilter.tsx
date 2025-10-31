import React, { useState } from 'react';
import {
  demoIdentifiers,
  Identifier,
} from '../../types_and_demo_data/identifier';
import MppCategoryMultiFilter from '../../components/MppMultiDropDownFilter/MppMultiDropDownFilter';

const DropDownMultiFilters: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<
    Array<Identifier>
  >([]);
  return (
    <div className="dropdown-multi-filters">
      <h3>Choisissez vos filtres</h3>
      <MppCategoryMultiFilter
        categories={demoIdentifiers}
        selectedCategories={selectedCategories}
        onChange={setSelectedCategories}
        placeholder="Choisissez des catégories"
      />
    </div>
  );
};

export default DropDownMultiFilters;
