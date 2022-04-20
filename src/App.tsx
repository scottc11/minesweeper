import './App.css';
import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { Map } from './components';
import Button from '@mui/material/Button';
import generateMapArray from './utils/generateMap';

function App() {

  const mapData = generateMapArray(10, 20);

  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    "wss://hometask.eg1236.com/game1/",
    {
      share: true,
      shouldReconnect: () => false,
    }
  );

  useEffect(() => {
    lastMessage && console.log(lastMessage.data);
  }, [lastMessage]);

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={() => sendMessage("help")}>Help</Button>
        <Button onClick={() => sendMessage("map")}>Map</Button>
        <Button onClick={() => sendMessage("new 1")}>New Game</Button>
        <Button onClick={() => sendMessage("open 1 2")}>Open</Button>
        <Map data={mapData} />
      </header>
    </div>
  );
}

export default App;
