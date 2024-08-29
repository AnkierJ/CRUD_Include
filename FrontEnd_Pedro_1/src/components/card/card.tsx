import { useState } from "react";
import "./Card.css";

interface CardProps {
  id: number;
  title: string;
  description: string;
  date: Date;
}

export function Card({ title, description, date }: CardProps) {
  const [urgencyColor, setUrgencyColor] = useState("red");
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newDate, setNewDate] = useState(date);

  const handleSave = () => {
    setIsEditing(false);
    // Aqui você pode enviar as atualizações para o backend, se necessário.
  };

  return (
    <div className="card" style={{ borderLeft: `4px solid ${urgencyColor}` }}>
      {/*<h3>{title}</h3>
      <p className="card-description">{description}</p>
  <p>{date.toDateString()}</p>*/}

      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <input
            type="date"
            value={newDate.toISOString().split("T")[0]}
            onChange={(e) => setNewDate(new Date(e.target.value))}
          />
          <button onClick={handleSave}>Salvar</button>
        </div>
      ) : (
        <div>
          <h2>{newTitle}</h2>
          <p>{newDescription}</p>
          <p>{newDate.toDateString()}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </div>
      )}

      <div className="color-selector">
        <button
          onClick={() => setUrgencyColor("red")}
          style={{ backgroundColor: "red" }}
        ></button>
        <button
          onClick={() => setUrgencyColor("yellow")}
          style={{ backgroundColor: "yellow" }}
        ></button>
        <button
          onClick={() => setUrgencyColor("green")}
          style={{ backgroundColor: "green" }}
        ></button>
      </div>
    </div>
  );
}
