import './App.css';
import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { Map } from './components';
import Button from '@mui/material/Button';
import generateMapArray from './utils/generateMap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { getMap, increment, load } from './redux/mapSlice';

interface GameAction {
  action: string;
  data: Array<string>;
}

function parseMapData(data: string): Array<Array<string>> {
  let mapData = data.split(`\n`).slice(1);
  mapData.pop();
  console.log(mapData);
  const rows = mapData.map( row => {
    return row.split('');
  });
  return rows;
}

function App() {
  
  const { count, data } = useSelector((state: RootState) => state.map);
  const dispatch = useDispatch();

  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    "wss://hometask.eg1236.com/game1/",
    {
      share: true,
      shouldReconnect: () => false,
    }
  );
  
  useEffect(() => {
    if (lastMessage) {
      const target: string = lastMessage.data.split(`:`)[0];
      switch (target) {
        case 'new':
          console.log("New Game"); // trigger redux action
          break;
        case 'open':
          console.log("Open");     // trigger redux action
          break;
        case 'map':
          console.log("Map");      // trigger redux action
          dispatch(load(parseMapData(lastMessage.data)));
          break;
        default:
          console.log("Getting Help");
          break;
      }
    }
  }, [lastMessage]);

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={() => sendMessage("help")}>Help</Button>
        <Button onClick={() => sendMessage("map")}>Map</Button>
        <Button onClick={() => sendMessage("new 1")}>New Game</Button>
        <Button onClick={() => sendMessage("open 1 2")}>Open</Button>
        <Button onClick={() => dispatch(getMap())}>Saga</Button>
        <Button onClick={() => dispatch(increment())}>{count}</Button>
        <Map data={data} />
      </header>
    </div>
  );
}

export default App;
