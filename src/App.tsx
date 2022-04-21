import './App.css';
import React, { useState, useEffect } from 'react';
import { Map } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { initWebSocket } from './redux/mapSlice';
import NewGameButton from './components/NewGameButton/NewGameButton';

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