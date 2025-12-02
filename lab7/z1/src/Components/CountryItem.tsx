import React from 'react';

interface CountryItemProps {
  country: string;
  index: number;
  onDelete: (index: number) => void;
}

const CountryItem: React.FC<CountryItemProps> = ({ country, index, onDelete }) => {
  const getRowColor = (country: string, index: number): string => {
    const rowNumber = index + 1;
    const name = country.toLowerCase();
    const isEven = rowNumber % 2 === 0;

    if (isEven) {
      if (name.includes('a') || name.includes('r')) {
        return '#4a90d9';
      } else {
        return '#f0e68c';
      }
    } else {
      if (country.length > 6) {
        return '#ffa500';
      } else {
        return '#a9a9a9';
      }
    }
  };

  const wikipediaUrl = `https://pl.wikipedia.org/wiki/${encodeURIComponent(country)}`;

  return (
    <li
      style={{ backgroundColor: getRowColor(country, index) }}
      className="country-item"
    >
      <span className="country-info">
        {index + 1}.{' '}
        <a
          href={wikipediaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="country-link"
        >
          {country}
        </a>
      </span>
      <button onClick={() => onDelete(index)} className="delete-btn">
        Usuń
      </button>
    </li>
  );
};

export default CountryItem;
