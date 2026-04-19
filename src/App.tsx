import { Header } from './components/layout/Header';
import { Table } from './components/game/Table';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Table />
    </div>
  );
}

export default App;
