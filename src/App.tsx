import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Table } from './components/game/Table';
import { LandingPage } from './components/LandingPage';
import DesignsPage from './pages/designs';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
  };

  // Routes
  if (currentPath === '/designs') {
    return (
      <div className="w-full">
        <DesignsPage />
        <button
          onClick={() => navigateTo('/')}
          className="fixed top-4 right-4 z-50 px-4 py-2 text-sm font-medium text-white bg-slate-700 border border-slate-600 rounded-lg hover:bg-slate-600 transition-colors duration-250"
        >
          ← Back to Game
        </button>
      </div>
    );
  }

  if (!gameStarted) {
    return <LandingPage onEnter={handleStartGame} />;
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden max-h-[calc(100vh-64px)]">
        <Table />
      </div>
      <button
        onClick={() => setGameStarted(false)}
        className="fixed top-4 left-4 z-50 px-4 py-2 text-sm font-medium text-text-bright bg-bg-card border border-border rounded-lg hover:bg-bg-panel transition-colors duration-250"
      >
        ← Back
      </button>
      <button
        onClick={() => navigateTo('/designs')}
        className="fixed bottom-4 right-4 z-50 px-4 py-2 text-sm font-medium text-text-bright bg-bg-card border border-border rounded-lg hover:bg-bg-panel transition-colors duration-250"
      >
        Design Kit →
      </button>
    </div>
  );
}

export default App;
