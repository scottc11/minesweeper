import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import NewGameButton from './components/NewGameButton/NewGameButton';
import Map from './components/Map/Map';

function App() {
  const game = useSelector((state: RootState) => state.game);

  return (
    <div className="App">
      <header className="App-header">
        <NewGameButton status={game.status}/>
        <Map data={game.map} />
      </header>
    </div>
  );
}

export default App;