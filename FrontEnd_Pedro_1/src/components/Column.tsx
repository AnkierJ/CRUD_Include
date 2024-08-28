import { useState } from 'react';
import { Card } from './card/card';
import './Column.css';

import { useAtividadeData } from '../hooks/useAtividadeData';
import { Header } from '../components/Header';
import { Board } from '../components/Board';

interface ColumnProps {
  title: string;
}

export function Column(/*{ children }: any,*/{ title }: ColumnProps ) {
  const [columnTitle, setColumnTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(event.target.value);
  };

  const { data } = useAtividadeData();

  return (
    <div className="column">
      <div className="column-header">
        {isEditing ? (
          <input 
            type="text" 
            value={columnTitle} 
            onChange={handleTitleChange} 
            onBlur={() => setIsEditing(false)}
            autoFocus
          />
        ) : (
          <h2 onClick={() => setIsEditing(true)}>{columnTitle}</h2>
        )}
        <button className="delete-column">X</button>
      </div>
      <button className="add-task-button">Adicionar Tarefa</button>
      
      <div className="card-grid">

        {data?.map((atividade) => (
          <Card
            key={atividade.id} // Chave única para cada componente Card
            id={atividade.id}
            title={atividade.title} 
            description={atividade.description} 
            date={new Date(atividade.date)} // Convertendo string para objeto Date, se necessário
          />
        ))}
      </div>
    </div>
  );
}
