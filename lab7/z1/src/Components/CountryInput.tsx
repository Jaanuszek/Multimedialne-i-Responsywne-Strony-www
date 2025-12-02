import React, { useState } from 'react';

interface CountryInputProps {
  onAdd: (country: string) => void;
}

const CountryInput: React.FC<CountryInputProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="input-group">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Wpisz nazwę kraju"
      />
      <button onClick={handleAdd}>Dodaj</button>
    </div>
  );
};

export default CountryInput;
