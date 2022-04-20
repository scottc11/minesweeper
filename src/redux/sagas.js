import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_MAP, setMap } from './mapSlice';

export function requestMap() {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    return axios.request({
        method: 'get',
        url: url
    });
}

export function* fetchMap(action) {
    try {
        const response = yield call(requestMap);
        const { data } = response;
        yield put(setMap(data)); // dispatch action to redux
    } catch (error) {
        console.log(error);
    }
}

export function* watcherSaga() {
    yield takeLatest(GET_MAP, fetchMap);
};