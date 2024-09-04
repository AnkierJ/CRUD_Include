import React from "react";
import { useState } from "react";
import "./Card.css";
import { CirclePicker } from "react-color";
import {
  AiFillTag,
  AiFillEdit,
  AiOutlineCheckCircle,
  AiFillCloseCircle,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

interface CardProps {
  id: number;
  title: string;
  description: string;
  date: Date;
  deadline: Date;
  columnId: number;
}

export function Card({ title, description, date, deadline, columnId }: CardProps) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const [currentColor, setCurrentColor] = useState("grey");
  const [isEditing, setIsEditing] = useState(false);
  const [isTagging, setIsTagging] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newDeadline, setNewDeadline] = useState(deadline);
  const handleSave = () => {
    setIsEditing(false);
    setIsTagging(false);
    // Aqui você pode enviar as atualizações para o backend, se necessário.
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };
  const handleChangeComplete = (color: any) => {
    setCurrentColor(color.hex);
    handleSave();
  };

  return (
    <div className="card" style={{ borderLeft: `4px solid ${currentColor}` }}>
      {isEditing ? (
        <div className="editContainer">
          <input
            required
            style={{ fontSize: "14px", fontWeight: "bold" }}
            type="text"
            placeholder="Título"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            style={{ height: "32px" }}
            placeholder="Descrição"
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <p style={{margin:'0', fontSize:14, justifySelf: 'left'}}>Data limite:</p>
          <input
            style={{ padding: "4px" }}
            type="datetime-local"
            value={date.toISOString().split("T")[0]}
            onChange={(e) => setNewDeadline(new Date(e.target.value))}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSave} className="saveButton">
            <AiOutlineCheckCircle
              color="white"
              size={20}
              style={{ position: "absolute", left: 20 }}
            />
            Salvar
          </button>
        </div>
      ) : (
        <div className="infoContainer">
          <div className="buttons">
            <button onClick={() => setIsEditing(true)}>
              <AiFillEdit color="grey" size={16} />
            </button>
            <button onClick={() => setIsTagging(true)}>
              <AiFillTag color="grey" size={16} />
            </button>
            <button>
              <AiFillCloseCircle color="grey" size={16} />
            </button>
          </div>
        
          <h4 style={{ marginBlock: 0 }}>{newTitle}</h4>
          {newDescription && <p className="card-description" style={{ marginBlock: 4 }}>
            {newDescription} 
          </p>}
          {!newDescription && <p className="card-description" style={{ marginBlock: 4, color:'grey'}}>
            Edite para criar uma descrição! 
          </p>}
          {!newDeadline && <p style={{ fontSize: 12, marginBlock: 0, color: "gray" }}>
            <strong>Criado:</strong> {date.toLocaleTimeString("pt-BR", options)}
          </p>}
          {newDeadline && <p style={{ fontSize: 12, marginBlock: 0, color: "gray" }}>
            <strong>Criado:</strong> {date.toLocaleTimeString("pt-BR", options)} <strong>Até:</strong> {newDeadline.toLocaleDateString("pt-BR", options)}
          </p>}

          {isTagging ? (
            <div className="colorPicker">
              <CirclePicker
                width="240px"
                color={currentColor}
                onChangeComplete={handleChangeComplete}
                circleSize={20}
                circleSpacing={10}
                colors={[
                  "red",
                  "#f44336",
                  "#e91e63",
                  "#9c27b0",
                  "#673ab7",
                  "#3f51b5",
                  "#2196f3",
                  "#00bcd4",
                  "#009688",
                  "#4caf50",
                  "#8bc34a",
                  "#ffeb3b",
                  "#ffc107",
                  "#ff9800",
                  "#795548",
                  "grey",
                ]}
              />
            </div>
          ) : null}
          <div className="navarrows">
            <button
              style={columnId == 1 ? { display: "none" } : { display: "grid" }}
            >
              <AiOutlineLeft color="grey" size={16} />
            </button>
            <button>
              <AiOutlineRight
                color="grey"
                size={16}
                style={
                  columnId == 3 ? { display: "none" } : { display: "grid" }
                }
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
