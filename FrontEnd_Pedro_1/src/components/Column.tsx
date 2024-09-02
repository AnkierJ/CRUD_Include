import { useState } from 'react';
import { Card } from './card/card';
import './Column.css';

import { AtividadeData } from '../interface/AtividadeData';

interface ColumnProps {
  column_id: number;
  title: string;
  tasks: AtividadeData[]; // Tipo correto para tarefas
  onAddTask: (task: AtividadeData) => void; // Função para adicionar tarefas
  
}

export function Column({ column_id, title, tasks, onAddTask}: ColumnProps) {
  const [columnTitle, setColumnTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [columnId] = useState(column_id);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(event.target.value);
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        description: 'Descrição padrão',
        date: new Date(),
        column_id: columnId // Adicionando o ID da coluna à nova tarefa
      };
      onAddTask(newTask);
      setNewTaskTitle('');
    }
  };

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
      <div className="add-task">
        <input
          type="text"
          placeholder="Título da tarefa"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button className="add-task-button" onClick={handleAddTask}>Adicionar Tarefa</button>
      </div>
      <div className="card-grid">
        {tasks.map((atividade) => (
          <Card
            key={atividade.id}
            id={atividade.id}
            title={atividade.title} 
            description={atividade.description} 
            date={new Date(atividade.date)}
          />
        ))}
      </div>
    </div>
  );
}
