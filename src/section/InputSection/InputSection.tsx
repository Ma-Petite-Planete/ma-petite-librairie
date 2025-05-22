import { useEffect, useState } from 'react';
import MppInputText from '../../components/MppInputText/MppInputText';
import React from 'react';
import MppInput from '../../components/MppInput/MppInput';
import './input_section_style.css';
import MppIncrementInput from '../../components/MppIncrementInput/MppIncrementInput';

const InputDemo: React.FC = () => {
  const [inputDemoIcon, setInputDemoIcon] = useState('');
  const [incrementValue, setIncrementValue] = useState(0);

  const handleChangeDemoIcon = (value: string) => {
    setInputDemoIcon(value);
  };

  const handleIconClick = () => {
    setInputDemoIcon('');
  };

  const [inputDemoCounter, setInputDemoCounter] = useState('');
  const [errorDemoCounter, setErrorDemoCounter] = useState('');

  const handleChangeDemoCounter = (value: string) => {
    setInputDemoCounter(value);
    if (value.length > 15) {
      setErrorDemoCounter('Le texte ne doit pas dépasser 15 caractères.');
    } else {
      setErrorDemoCounter('');
    }
  };

  const [inputDemoCondition, setInputDemoCondition] = useState('');

  const handleChangeDemoCondition = (value: string, hasError: boolean) => {
    if (hasError) {
      console.log('les conditions ne sont pas respecté');
    } else {
      setInputDemoCondition(value);
    }
  };

  useEffect(() => {
    console.log(incrementValue);
  }, [incrementValue]);
  const [test, setTest] = useState('');
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

      <MppInput
        value={inputDemoIcon}
        placeholder={'exemple password'}
        isPassword={true}
        onChange={handleChangeDemoIcon}
        onClickIcon={handleIconClick}
      />

      <MppInput
        value={inputDemoCounter}
        placeholder={'exemple counter'}
        onChange={handleChangeDemoCounter}
        needCounter={true}
        maxCharacters={20}
        errorMessage={errorDemoCounter}
      />

      <MppInput
        value={test}
        placeholder={'moteur de recherche'}
        onChange={(value) => setTest(value)}
        isResearch={true}
      />

      <MppIncrementInput
        value={incrementValue}
        onChange={setIncrementValue}
        maxIncrement={100}
      />
    </div>
  );
};

export default InputDemo;
