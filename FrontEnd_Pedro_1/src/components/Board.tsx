import { useState } from 'react';

import { Column } from "./Column";
import "./Board.css";
import { AiOutlinePlus } from "react-icons/ai";
import { Card } from '../components/card/card';
import { useAtividadeData } from '../hooks/useAtividadeData';

export function Board() {

  const [afazeres, setAfazeres] = useState<any[]>([]); // Tarefas na coluna 'Afazeres'
  const [fazendo, setFazendo] = useState<any[]>([]); // Tarefas na coluna 'Fazendo'
  const [feito, setFeito] = useState<any[]>([]); // Tarefas na coluna 'Feito'

  const { data } = useAtividadeData();

  // Função para adicionar tarefa à coluna 'Afazeres'
  const addTaskToAfazeres = (task: any) => {
    setAfazeres([...afazeres, task]);
  };

  return (
    <div className="board">
      <Column 
        title="Afazeres" 
        tasks={afazeres} 
        onAddTask={addTaskToAfazeres}
      />
      <Column 
        title="Fazendo" 
        tasks={fazendo} 
        onAddTask={addTaskToAfazeres} /* Função para adicionar em 'Fazendo' */
      />
      <Column 
        title="Feito" 
        tasks={feito} 
        onAddTask={addTaskToAfazeres} /* Função para adicionar em 'Feito' */
      />
      
      <div className="add-column">
        <button className="add-column-button"><AiOutlinePlus color='white'/></button>
      </div>
    </div>
  );
}
