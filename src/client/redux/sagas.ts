import { call, put, takeLatest } from 'redux-saga/effects';
import { ServerURL } from '../../common/conf';
import { NEW_GAME } from './actions';
import axios, { AxiosResponse } from 'axios';
import { loadGameData } from './actions/gameActions';

function requestGame() {
    return axios.request({
        method: 'post',
        url: `${ServerURL}api/games/new`
    })
}


function* handleNewGame() {
    try {
        const response: AxiosResponse = yield call(requestGame);
        yield put(loadGameData(response.data));
    } catch (error) {
        console.error(error);
    }
}

export function* gameSaga() {
    yield takeLatest(NEW_GAME, handleNewGame);
}