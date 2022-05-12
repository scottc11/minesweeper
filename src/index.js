import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './client/index.scss';
import App from './client/App';
import reportWebVitals from './client/reportWebVitals';
import { store } from './client/redux/store';
import axios from 'axios';
import { ServerURL } from './common/conf';
import { newGame } from './client/redux/actions/gameActions';

store.dispatch(newGame()); // new game

axios.defaults.baseURL = `${ServerURL}`;
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'connect.sid'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
