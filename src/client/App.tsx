import './App.scss';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import NewGameButton from './components/NewGameButton/NewGameButton';
import Map from './components/Map/Map';
import GameClock from './components/GameClock/GameClock';
import GameMineCounter from './components/GameMineCounter/GameMineCounter';

function App() {
  const game = useSelector((state: RootState) => state.game);

  return (
    <div className="app">
      <header className="app--header">MINESWEEPER</header>
      <div className='app--body'>
        <div className='game'>
          <div className='game--header'>
            <GameMineCounter />
            <NewGameButton status={game.status} />
            <GameClock />
          </div>
          <Map data={game.map} />
        </div>
        <div className='scores'>scores</div>
      </div>
    </div>
  );
}

export default App;