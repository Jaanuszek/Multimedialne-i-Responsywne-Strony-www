import React from 'react';

interface CharacterData {
  name: string;
  age: string;
  characterClass: string;
  strength: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

interface CharacterSummaryProps {
  character: CharacterData;
  onCreateNew: () => void;
}

const classLabels: Record<string, string> = {
  mag: 'Mag',
  wojownik: 'Wojownik',
  lotrzyk: 'Łotrzyk',
  druid: 'Druid',
};

const CharacterSummary: React.FC<CharacterSummaryProps> = ({ character, onCreateNew }) => {
  return (
    <div className="character-summary">
      <h2>Nowa postać została utworzona!</h2>
      
      <div className="summary-card">
        <h3>{character.name}</h3>
        
        <div className="summary-info">
          {character.age && (
            <p><strong>Wiek:</strong> {character.age}</p>
          )}
          <p><strong>Klasa:</strong> {classLabels[character.characterClass] || character.characterClass}</p>
        </div>

        <div className="summary-stats">
          <h4>Statystyki:</h4>
          <ul>
            <li><strong>Siła:</strong> {character.strength}</li>
            <li><strong>Inteligencja:</strong> {character.intelligence}</li>
            <li><strong>Mądrość:</strong> {character.wisdom}</li>
            <li><strong>Charyzma:</strong> {character.charisma}</li>
          </ul>
        </div>
      </div>

      <button onClick={onCreateNew} className="create-new-btn">
        Utwórz nową postać
      </button>
    </div>
  );
};

export default CharacterSummary;
