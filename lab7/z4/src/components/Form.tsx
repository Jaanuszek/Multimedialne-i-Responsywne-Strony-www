import React, { useState } from 'react';
import ClassSelection from './ClassSelection';

interface CharacterData {
  name: string;
  age: string;
  characterClass: string;
  strength: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

interface FormProps {
  onSubmit: (data: CharacterData) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [strength, setStrength] = useState(0);
  const [intelligence, setIntelligence] = useState(0);
  const [wisdom, setWisdom] = useState(0);
  const [charisma, setCharisma] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const MAX_POINTS = 10;
  const usedPoints = strength + intelligence + wisdom + charisma;
  const remainingPoints = MAX_POINTS - usedPoints;
  const isOverLimit = usedPoints > MAX_POINTS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    // Walidacja
    if (!name.trim()) {
      newErrors.push('Nazwa postaci jest wymagana');
    }

    if (age && isNaN(Number(age))) {
      newErrors.push('Wiek musi być liczbą');
    }

    if (!characterClass) {
      newErrors.push('Klasa postaci jest wymagana');
    }

    if (isOverLimit) {
      newErrors.push('Przekroczono limit punktów statystyk');
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      onSubmit({
        name,
        age,
        characterClass,
        strength,
        intelligence,
        wisdom,
        charisma,
      });
    }
  };

  const handleStatChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    setter(Math.max(0, numValue));
  };

  return (
    <form onSubmit={handleSubmit} className="character-form">
      <h2>Kreator postaci</h2>

      {errors.length > 0 && (
        <div className="errors">
          <h4>Błędy:</h4>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="form-group">
        <label>Nazwa postaci *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Wpisz nazwę postaci"
        />
      </div>

      <div className="form-group">
        <label>Wiek postaci</label>
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Wpisz wiek (opcjonalne)"
        />
      </div>

      <div className="form-group">
        <label>Klasa postaci *</label>
        <ClassSelection
          value={characterClass}
          onChange={(value) => setCharacterClass(value)}
        />
      </div>

      <div className="stats-section">
        <h3>Statystyki postaci</h3>
        <p className={`points-info ${isOverLimit ? 'over-limit' : ''}`}>
          Pozostało punktów: <strong>{remainingPoints}</strong> / {MAX_POINTS}
          {isOverLimit && <span className="warning"> (Przekroczono limit!)</span>}
        </p>

        <div className="form-group">
          <label>Siła</label>
          <input
            type="number"
            min="0"
            value={strength}
            onChange={(e) => handleStatChange(setStrength, e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Inteligencja</label>
          <input
            type="number"
            min="0"
            value={intelligence}
            onChange={(e) => handleStatChange(setIntelligence, e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Mądrość</label>
          <input
            type="number"
            min="0"
            value={wisdom}
            onChange={(e) => handleStatChange(setWisdom, e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Charyzma</label>
          <input
            type="number"
            min="0"
            value={charisma}
            onChange={(e) => handleStatChange(setCharisma, e.target.value)}
          />
        </div>
      </div>

      <button type="submit" disabled={isOverLimit} className="submit-btn">
        Utwórz postać
      </button>
    </form>
  );
};

export default Form;