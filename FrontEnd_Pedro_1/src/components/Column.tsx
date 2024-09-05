import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import { Card } from "./card/card";
import "./Column.css";
import { AtividadeData } from "../interface/AtividadeData";
//import { postData } from "../hooks/ChangeAtividadeData";

interface ColumnProps {
  column_id_prop: number;
  title: string;
  tasks: AtividadeData[]; // Tipo correto para tarefas
  onAddTask: (task: AtividadeData) => void; // Função para adicionar tarefas
}

export function Column(this: any, { column_id_prop, title, tasks, onAddTask }: ColumnProps) {
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
        column_id: 0, // Adicionando o ID da coluna à nova tarefa
        title: newTaskTitle,
        description: "Descrição padrão",
        date: new Date() 
      };
      onAddTask(newTask);
      setNewTaskTitle("");
    }
  };

  return (
    <div className="column" style={{ height: isMinimized ? "10%" : "100%" }}>
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
            <button
              className="add-task-button"
              onClick={handleAddTask}
            >
              Adicionar Tarefa
            </button>
          </div>
          <div className="card-grid">
            {tasks?.map((atividade) => (
              <Card
                key={atividade.id} // Chave única para cada componente Card
                id={atividade.id}
                column_id={atividade.column_id}
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
