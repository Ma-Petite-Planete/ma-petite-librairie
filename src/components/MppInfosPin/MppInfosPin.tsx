import React from 'react';
import { MppIcons } from '../../utils/MppIcons';
interface MppInfosPinProps {
  
}
[
  {
    title: 'truc',
    content: 'contenu',
  },
];

const MppInfosPin: React.FC<MppInfosPinProps> = ({}) => {
  return (
    <div className='infos_pin_main'>
      <MppIcons.infos className='icon' />
      <div className='infos_pin_container'>
        <p className='infos_content'>
          <span className='infos_title'></span>
        </p>
      </div>
    </div>
  );
};

export default MppInfosPin;
