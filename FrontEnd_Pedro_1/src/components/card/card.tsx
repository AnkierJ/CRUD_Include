import { useState } from "react";
import "./Card.css";
import { CirclePicker } from "react-color";
import { AiFillTag, AiFillEdit, AiOutlineCheckCircle } from "react-icons/ai";

import { editData } from "../../hooks/EditAtividadeData";
import { AtividadeData } from "../../interface/AtividadeData";

interface CardProps {
  column_id: number;
  id?: number;
  title: string;
  description: string;
  date: Date;
}

export function Card({ column_id, id, title, description, date }: CardProps) {
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
  const [newDate, setNewDate] = useState(date);
  const [newColumn_Id, setNewColumn_Id] = useState(Number);
  const [newId, setNewId] = useState(id)

  const edditedAtividade: AtividadeData = {
    id: newId,
    title: newTitle,
    column_id: newColumn_Id,
    description: newDescription,
    date: newDate
  };

  const handleSave = () => {

    alert("Column_Id:" + newColumn_Id);
    editData(edditedAtividade);

    setIsEditing(false);
    setIsTagging(false);

    

    // Aqui você pode enviar as atualizações para o backend, se necessário.
  };

  const handleChangeComplete = (color: any) => {
    setCurrentColor(color.hex);
    handleSave();
  };

  return (
    <div
      className="card"
      style={{ borderLeft: `4px solid ${currentColor}` }}
      draggable="true"
    >
      {isEditing ? (
        <div className="editContainer">
          <input
            required
            style={{ fontSize: "14px", fontWeight: "bold" }}
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
          <select onChange={(e) => setNewColumn_Id(e.target.selectedIndex + 1)}>
            <option value={1}> Afazeres </option>
            <option value={2}> Fazendo </option>
            <option value={3}> Feito </option>
          </select>

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
          <h4 style={{ marginBlock: 0 }}>{newTitle}</h4>
          <p className="card-description" style={{ marginBlock: 4 }}>
            {newDescription}
          </p>
          <p style={{ fontSize: 14, marginBlock: 0, color: "gray" }}>
            {newDate.toLocaleTimeString("pt-BR", options)}
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
