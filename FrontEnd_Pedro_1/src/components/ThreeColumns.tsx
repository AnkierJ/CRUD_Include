import { useEffect, useState } from 'react';

// Definindo a interface para o item
interface Item {
  id: number;
  column: number;
  content: string;
}

const ThreeColumns: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  // Função para buscar os dados do backend
  const fetchData = async () => {
    try {
      const response = await fetch('URL_DO_SEU_BACKEND');
      const data: Item[] = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Dividir os itens em três colunas
  const column1Items = items.filter(item => item.column === 1);
  const column2Items = items.filter(item => item.column === 2);
  const column3Items = items.filter(item => item.column === 3);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '30%', border: '1px solid black', padding: '10px' }}>
        <h3>Coluna 1</h3>
        {column1Items.map(item => (
          <div key={item.id}>{item.content}</div>
        ))}
      </div>
      <div style={{ width: '30%', border: '1px solid black', padding: '10px' }}>
        <h3>Coluna 2</h3>
        {column2Items.map(item => (
          <div key={item.id}>{item.content}</div>
        ))}
      </div>
      <div style={{ width: '30%', border: '1px solid black', padding: '10px' }}>
        <h3>Coluna 3</h3>
        {column3Items.map(item => (
          <div key={item.id}>{item.content}</div>
        ))}
      </div>
    </div>
  );
};

export default ThreeColumns;
