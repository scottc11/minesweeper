import './App.css';
import React, { useState, useEffect } from 'react';
import { Map } from './components';
import Button from '@mui/material/Button';
import generateMapArray from './utils/generateMap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { initWebSocket } from './redux/mapSlice';
import { webSocket } from './redux/sagas';
import NewGameButton from './components/NewGame/NewGameButton';

function App() {
  const [initialized, setInitialize] = useState(false);
  const map = useSelector((state: RootState) => state.map);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialized) {
      dispatch(initWebSocket());
    }
  }, [initialized]);
  
  if (!initialized) {
    setInitialize(true);
  }

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


// on hover, change smiley emoji to nervous emoji