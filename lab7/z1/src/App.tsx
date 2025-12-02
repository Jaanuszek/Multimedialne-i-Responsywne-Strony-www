import { useState } from 'react';
import CountryInput from './Components/CountryInput';
import CountryList from './Components/CountryList';
import './App.css';

function App() {
  const [countries, setCountries] = useState<string[]>([]);

  const handleAddCountry = (country: string) => {
    setCountries([...countries, country]);
  };

  const handleDeleteCountry = (index: number) => {
    const newCountries = countries.filter((_, i) => i !== index);
    setCountries(newCountries);
  };

  return (
    <div className="main">
      <div className="header">
        <h2>Country list</h2>
      </div>
      <div className="container">
        <h2>moje ulubione kraje</h2>
        <CountryInput onAdd={handleAddCountry} />
        <CountryList countries={countries} onDelete={handleDeleteCountry} />
      </div>
    </div>
  );
}

export default App;
