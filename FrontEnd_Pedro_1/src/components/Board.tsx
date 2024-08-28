import { Column } from "./Column";
import "./Board.css";

import { Card } from '../components/card/card';
import { useAtividadeData } from '../hooks/useAtividadeData';

export function Board() {

  const { data } = useAtividadeData();

  return (
    <div className="board">
      <Column title="Afazeres" />
      <Column title="Fazendo" />
      <Column title="Feito" />
      <div className="add-column">
        <button className="add-column-button">+</button>
      </div>
    </div>
  );
}
