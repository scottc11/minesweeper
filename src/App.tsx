import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import NewGameButton from './components/NewGameButton/NewGameButton';
import Map from './components/Map/Map';

function App() {
  const map = useSelector((state: RootState) => state.map);

  return (
    <div className="App">
      <header className="App-header">
        <NewGameButton status={map.status}/>
        <Map data={map.data} />
      </header>
    </div>
  );
}

export default App;