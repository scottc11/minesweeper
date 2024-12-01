import React from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { newGame } from './redux/actions/gameActions';
import './index.scss';
import App from './App';

store.dispatch(newGame()); // new game

axios.defaults.baseURL = `${process.env.SERVER_DOMAIN}:${process.env.SERVER_PORT}`;
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'connect.sid'

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);