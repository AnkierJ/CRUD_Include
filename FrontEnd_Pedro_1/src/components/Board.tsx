import { useState } from "react";
import { Column } from "./Column";
import "./Board.css";
import { AiOutlinePlus } from "react-icons/ai";
import { Card } from '../components/card/card';
import { useAtividadeData } from '../hooks/useAtividadeData';

export function Board() {
  const [afazeres, setAfazeres] = useState<any[]>([]); // Tarefas na coluna 'Afazeres'
  const [fazendo, setFazendo] = useState<any[]>([]); // Tarefas na coluna 'Fazendo'
  const [feito, setFeito] = useState<any[]>([]); // Tarefas na coluna 'Feito'

  // Função para adicionar tarefa à coluna 'Afazeres'
  const addTaskToAfazeres = (task: any) => {
    setAfazeres([...afazeres, task]);
  };

  const addTaskToFazendo = (task: any) => {
    setFazendo([...fazendo, task]);
  };

  const addTaskToFeito = (task: any) => {
    setFeito([...feito, task]);
  };

  const { data } = useAtividadeData();

  let run = true;
  let add = true;

  // Rotina para carregar as atividades do back-end e exibir nas colunas.
  {
    do {
      if (data != undefined) {
        for (let i = 0; i < data?.length; i++) {
          //alert(data[i])
          if (data[i].column_id == 1) {
            for (let k = 0; k < afazeres.length; k++) {
              if (afazeres[k].id == data[i].id) {
                add = false;
              }
            }
            if (add) { afazeres.push(data[i]); }

          } else if (data[i].column_id == 2) {
            for (let k = 0; k < fazendo.length; k++) {
              if (fazendo[k].id == data[i].id) {
                add = false;
              }
            }
            if (add) { fazendo.push(data[i]); }

          } else if (data[i].column_id == 3) {
            for (let k = 0; k < feito.length; k++) {
              if (feito[k].id == data[i].id) {
                add = false;
              }
            }
            if (add) { feito.push(data[i]); }
          }
        }
      }
      run = false;
    } while (run);
  }

  return (
    <div className="board">
      <Column
        column_id={1}
        title="Afazeres"
        tasks={afazeres}
        onAddTask={addTaskToAfazeres}
        
      />

      <Column
        column_id={2}
        title="Fazendo"
        tasks={fazendo}
        onAddTask={addTaskToFazendo} /* Função para adicionar em 'Fazendo' */
        
      />

      <Column
        column_id={3}
        title="Feito"
        tasks={feito}
        onAddTask={addTaskToFeito} /* Função para adicionar em 'Feito'*/
        
      />
      
      <div className="add-column">
        <button className="add-column-button"><AiOutlinePlus color='white'/></button>
      </div>
    </div>
  );
}
