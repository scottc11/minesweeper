import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import NewGameButton from './components/NewGameButton/NewGameButton';
import Map from './components/Map/Map';
import GameClock from './components/GameClock/GameClock';
import GameMineCounter from './components/GameMineCounter/GameMineCounter';
import GameRules from './components/GameRules/GameRules';
import { GameStatus } from '../common/types';
import { stopGameClock } from './redux/actions/gameActions';
import { useEffect } from 'react';
import ScoresTable from './components/ScoresTable/ScoresTable';

function App() {
  const game = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  useEffect( () => {
    if (game.status === GameStatus.GAME_OVER) {
      dispatch(stopGameClock());
    }
  }, [game.status])

  return (
    <div className="app">
      <header className="app--header">MINESWEEPER</header>
      <div className='app--body'>
        <div className='app--body--rules-container'>
          <GameRules />
        </div>
        <div className='app--body--game-container'>
          <div className='game--header'>
            <GameMineCounter />
            <NewGameButton status={game.status} />
            <GameClock />
          </div>
          <Map data={game.map} />
        </div>
        <div className='app--body--scores-container'>
          <ScoresTable />
        </div>
      </div>
      <div className='app--footer'>
      </div>
    </div>
  );
}

export default App;