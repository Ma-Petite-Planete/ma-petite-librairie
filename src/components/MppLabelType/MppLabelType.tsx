import React from 'react';
import './mpp_label_type.css';

export enum labelType {
  grey = 'grey_label',
  orange = 'orange_label',
  green = 'green_label',
}

interface MppLabelType {
  value: string;
  labelType: labelType;
}

const MppLabelType: React.FC<MppLabelType> = ({ value, labelType }) => {
  return (
    <div>
      <span className={`${labelType} text_small_b label`}>{value}</span>
    </div>
  );
};

export default MppLabelType;
