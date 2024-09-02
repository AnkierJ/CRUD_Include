import React from "react";
import { useState } from "react";
import "./Card.css";
import { CirclePicker } from "react-color";
import { AiFillTag, AiFillEdit, AiOutlineCheckCircle } from "react-icons/ai";

interface CardProps {
  id: number;
  title: string;
  description: string;
  date: Date;
}

export function Card({ title, description, date }: CardProps) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  const [currentColor, setCurrentColor] = useState("grey");
  const [isEditing, setIsEditing] = useState(false);
  const [isTagging, setIsTagging] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newDate, setNewDate] = useState(date);
  const handleSave = () => {
    setIsEditing(false);
    setIsTagging(false);
    // Aqui você pode enviar as atualizações para o backend, se necessário.
  };
  const handleChangeComplete = (color: any) => {
    setCurrentColor(color.hex);
    handleSave();
  };

  return (
    <div className="card" style={{ borderLeft: `4px solid ${currentColor}` }} draggable='true'>
      {isEditing ? (
        <div className="editContainer">
          <input
            required
            style={{ fontSize: "14px", fontWeight:'bold' }}
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            style={{ height: "32px" }}
            placeholder="Descrição"
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <input
            style={{ padding: "4px" }}
            type="date"
            value={newDate.toISOString().split("T")[0]}
            onChange={(e) => setNewDate(new Date(e.target.value))}
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
          <button onClick={() => setIsEditing(true)} className="editButton">
            <AiFillEdit color="grey" size={16} />
          </button>
          <h4 style={{ marginBlock: 0 }}>
            {newTitle}
          </h4>
          <p
            className="card-description"
            style={{ marginBlock:4}}
          >
            {newDescription}
          </p>
          <p style={{ fontSize: 14, marginBlock:0, color:'gray' }}>
            {newDate.toLocaleTimeString('pt-BR', options)}
          </p>
        </div>
      )}
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
      ) : (
        <div>
          <button onClick={() => setIsTagging(true)} className="tagButton">
            <AiFillTag color="grey" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;
