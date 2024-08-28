
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <input 
        type="text" 
        placeholder="Pesquisar tarefas..." 
        className="search-bar" 
      />
    </header>
  );
}
