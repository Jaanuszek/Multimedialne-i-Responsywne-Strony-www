import React from 'react';
import CountryItem from './CountryItem';

interface CountryListProps {
  countries: string[];
  onDelete: (index: number) => void;
}

const CountryList: React.FC<CountryListProps> = ({ countries, onDelete }) => {
  if (countries.length === 0) {
    return <p className="empty-message">Brak krajów na liście.</p>;
  }

  return (
    <ul className="country-list">
      {countries.map((country, index) => (
        <CountryItem
          key={index}
          country={country}
          index={index}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default CountryList;
