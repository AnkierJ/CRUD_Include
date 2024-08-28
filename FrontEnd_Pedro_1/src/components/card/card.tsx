import React, { useState } from 'react';
import './Card.css';

interface CardProps {
  id: number;
  title: string;
  description: string;
  date: Date;
}

export function Card({ title, description, date }: CardProps) {
  const [urgencyColor, setUrgencyColor] = useState('red');

  return (
    <div className="card" style={{ borderLeft: `4px solid ${urgencyColor}` }}>
      <h3>{title}</h3>
      <p className="card-description">{description}</p>
      <p>{date.toDateString()}</p>
      <div className="color-selector">
        <button onClick={() => setUrgencyColor('red')} style={{ backgroundColor: 'red' }}></button>
        <button onClick={() => setUrgencyColor('yellow')} style={{ backgroundColor: 'yellow' }}></button>
        <button onClick={() => setUrgencyColor('green')} style={{ backgroundColor: 'green' }}></button>
      </div>
    </div>
  );
}
