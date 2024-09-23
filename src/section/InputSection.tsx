import { useState } from 'react';
import { MppIcons } from '../utils/MppIcons';
import MppInputText from '../components/MppInputText/MppInputText';
import React from 'react';

const InputDemo: React.FC = () => {
  const [inputDemoIcon, setInputDemoIcon] = useState('');

  const handleChangeDemoIcon = (value: string) => {
    setInputDemoIcon(value);
  };

  const handleIconClick = () => {
    setInputDemoIcon('');
  };

  const [inputDemoCounter, setInputDemoCounter] = useState('');

  const handleChangeDemoCounter = (value: string) => {
    setInputDemoCounter(value);
  };

  const [inputDemoCondition, setInputDemoCondition] = useState('');
  const handleChangeDemoCondition = (value: string, hasError: boolean) => {
    if (hasError) {
      console.log('les conditions ne sont pas respecté');
    } else {
      setInputDemoCondition(value);
    }
  };
  return (
    <div style={{ width: '300px' }}>
      <MppInputText
        placeholder="exemple condition"
        value={inputDemoCondition}
        onChange={handleChangeDemoCondition}
        validationConditions={[
          {
            condition: (value) => value.length >= 5,
            message: 'Le texte doit contenir au moins 5 caractères.',
          },
          {
            condition: (value) => /^[a-zA-Z]+$/.test(value),
            message: 'Le texte doit uniquement contenir des lettres.',
          },
        ]}
      />

      <MppInputText
        value={inputDemoIcon}
        placeholder={'exemple icon'}
        onChange={handleChangeDemoIcon}
        icon={MppIcons.ressources}
        onClickIcon={handleIconClick}
      />

      <MppInputText
        value={inputDemoCounter}
        placeholder={'exemple counter'}
        onChange={handleChangeDemoCounter}
        needCounter={true}
        maxCharacteres={20}
      />
    </div>
  );
};

export default InputDemo;
