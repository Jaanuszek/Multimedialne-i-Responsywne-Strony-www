import React from 'react';

interface ClassSelectionProps {
  value: string;
  onChange: (value: string) => void;
}

const ClassSelection: React.FC<ClassSelectionProps> = ({ value, onChange }) => {
  const classes = [
    { value: 'mag', label: 'Mag' },
    { value: 'wojownik', label: 'Wojownik' },
    { value: 'lotrzyk', label: 'Łotrzyk' },
    { value: 'druid', label: 'Druid' },
  ];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="class-select"
    >
      <option value="">-- Wybierz klasę --</option>
      {classes.map((cls) => (
        <option key={cls.value} value={cls.value}>
          {cls.label}
        </option>
      ))}
    </select>
  );
};

export default ClassSelection;