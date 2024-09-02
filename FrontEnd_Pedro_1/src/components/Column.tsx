/*import { useState } from 'react';
import { Card } from './card/card';
import './Column.css';

import { useAtividadeData } from '../hooks/useAtividadeData';
import { Header } from '../components/Header';
import { Board } from '../components/Board';

interface ColumnProps {
  title: string;
}

export function Column(/*{ children }: any,  { title }: ColumnProps ) {
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
} */
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import { Card } from "./card/card";
import "./Column.css";
import { useAtividadeData } from "../hooks/useAtividadeData";

interface ColumnProps {
  title: string;
  tasks: any[]; // Lista de tarefas que pertencem a esta coluna
  onAddTask: (task: any) => void; // Função para adicionar tarefas
}

export function Column({ title, tasks, onAddTask }: ColumnProps) {
  const [columnTitle, setColumnTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(event.target.value);
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        description: "Descrição padrão", // Descrição inicial
        date: new Date(), // Data atual
      };
      onAddTask(newTask);
      setNewTaskTitle(""); // Limpa o campo de título da nova tarefa
    }
  };

  return (
    <div className="column" style={{height: isMinimized? '10%':'100%'}}>
      {isMinimized ? (
        <div className="column-header">
          {isEditing ? (
            <>
              <input
                type="text"
                value={columnTitle}
                onChange={handleTitleChange}
                onBlur={() => setIsEditing(false)}
                autoFocus
              />
            </>
          ) : (
            <h2 onClick={() => setIsEditing(true)}>{columnTitle}</h2>
          )}
          {/*<p>{Array.prototype.filter.call(cardgrid, elemento => elemento.classList.contains(Card)).length}</p>*/}
          <button
            className="minimize-column"
            onClick={() => setIsMinimized(false)}
          >
            <AiFillCaretDown color="Grey" />
          </button>
        </div>
      ) : (
        <>
          <div className="column-header">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={columnTitle}
                  onChange={handleTitleChange}
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                />
              </>
            ) : (
              <h2 onClick={() => setIsEditing(true)}>{columnTitle}</h2>
            )}
            <button
              className="minimize-column"
              onClick={() => setIsMinimized(true)}
            >
              <AiFillCaretUp color="Grey" />
            </button>
          </div>
          <div className="add-task">
            <input
              type="text"
              placeholder="Título da tarefa"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <button className="add-task-button" onClick={handleAddTask}>
              Adicionar Tarefa
            </button>
          </div>
          <div className="card-grid">
            {tasks.map((atividade) => (
              <Card
                key={atividade.id} // Chave única para cada componente Card
                id={atividade.id}
                title={atividade.title}
                description={atividade.description}
                date={new Date(atividade.date)} // Convertendo string para objeto Date, se necessário
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
