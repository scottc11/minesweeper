import { takeLatest } from 'redux-saga/effects';
import { ServerURL } from '../../common/conf';
import { NEW_GAME } from './actions';
import axios from 'axios';

export const newGame = () => {
    try {
        axios.post(ServerURL + `api/game/new`);       
    } catch (error) {
        
    }
}

export function* gameSaga() {
    yield takeLatest(NEW_GAME, newGame);
}