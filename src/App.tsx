import './App.css';
import React, { useState, useEffect } from 'react';
import { Map } from './components';
import Button from '@mui/material/Button';
import generateMapArray from './utils/generateMap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { initWebSocket } from './redux/mapSlice';
import { webSocket } from './redux/sagas';

function App() {
  const [initialized, setInitialize] = useState(false);
  const { data } = useSelector((state: RootState) => state.map);
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
        <Button onClick={() => webSocket.send("help")}>Help</Button>
        <Button onClick={() => webSocket.send("map")}>Map</Button>
        <Button onClick={() => webSocket.send("new 1")}>New Game</Button>
        <Button onClick={() => webSocket.send("open 1 2")}>Open</Button>
        <Map data={data} />
      </header>
    </div>
  );
}

export default App;
