import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Table } from './components/game/Table';
import { LandingPage } from './components/LandingPage';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  if (!gameStarted) {
    return <LandingPage onEnter={handleStartGame} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <Header />
      <Table />
      <button
        onClick={() => setGameStarted(false)}
        className="fixed top-4 right-4 z-50 px-4 py-2 text-sm font-medium text-text-bright bg-bg-card border border-border rounded-lg hover:bg-bg-panel transition-colors duration-250"
      >
        ← Back
      </button>
    </div>
  );
}

export default App;
