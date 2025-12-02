import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import CharacterSummary from './components/CharacterSummary';

interface CharacterData {
  name: string;
  age: string;
  characterClass: string;
  strength: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

function App() {
  const [createdCharacter, setCreatedCharacter] = useState<CharacterData | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleFormSubmit = (data: CharacterData) => {
    setCreatedCharacter(data);
    setShowForm(false);
  };

  const handleCreateNew = () => {
    setCreatedCharacter(null);
    setShowForm(true);
  };

  return (
    <div className="app-container">
      {showForm ? (
        <Form onSubmit={handleFormSubmit} />
      ) : (
        createdCharacter && (
          <CharacterSummary
            character={createdCharacter}
            onCreateNew={handleCreateNew}
          />
        )
      )}
    </div>
  );
}

export default App;
