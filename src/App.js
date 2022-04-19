import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import useWebSocket from 'react-use-websocket';

function App() {

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
        <button onClick={() => sendMessage("help")}>Help</button>
        <button onClick={() => sendMessage("map")}>Map</button>
        <button onClick={() => sendMessage("new 1")}>New</button>
        <button onClick={() => sendMessage("open")}>Open</button>
      </header>
    </div>
  );
}

export default App;
