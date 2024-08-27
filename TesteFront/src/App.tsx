import * as React from 'react'
import { useState } from 'react';
import './App.css';
import { useAtividadeData } from './hooks/useAtividadeData';
import { AtividadeData } from './interface/AtividadeData';

import { Card } from 'C:/Users/Acer/TesteFront/src/components/card/card';

function App() {
  const { data } = useAtividadeData();

  return (
    <div className="container">
      <header> Teste </header>
      <h1> Atividades </h1>
      <div className="card-grid">
        {data?.map(AtividadeData => 
          <Card
            id={AtividadeData.id}
            title={AtividadeData.title} 
            description={AtividadeData.description} 
            date={AtividadeData.date}
            />
          )}
      </div>
    </div>
  )
}

export default App
