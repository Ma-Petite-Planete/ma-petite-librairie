import React, { useState } from 'react';
import { Identifier } from '../../types_and_demo_data/identifier';
import MppMultiDropDownSelect from '../../components/MppMultiDropDownSelect/MppMultiDropDownSelect';

const values = [
  {
    title: 'classic',
    items: [
      {
        id: '1',
        name: 'edition classic 1',
      },
      {
        id: '2',
        name: 'edition classic 2',
      },
      {
        id: '3',
        name: 'edition classic 3',
      },
    ],
    sectionAllText: 'tout classique',
  },
  {
    title: 'private',
    items: [
      {
        id: '4',
        name: 'edition private 1',
      },
      {
        id: '5',
        name: 'edition private 2',
      },
      {
        id: '6',
        name: 'edition private 3',
      },
    ],
    sectionAllText: 'tout privée',
  },
];
const DropdownMultiSelect: React.FC = () => {
  const [selectdeItems, setSelectdeItems] = useState<Array<Identifier>>([]);
  const handleSelect = (selected: Identifier[]) => {
    setSelectdeItems(selected);
  };
  return (
    <div className="dropdown-multi-filters">
      <MppMultiDropDownSelect
        placeholderOnEmpty="choisis un truc"
        onSelect={handleSelect}
        selectedValues={selectdeItems}
        isOpenByDefault={true}
        data={values}
      />
    </div>
  );
};

export default DropdownMultiSelect;
