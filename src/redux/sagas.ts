import { call, put, take, takeLatest } from 'redux-saga/effects';
import { GameStatus, GameAction, INIT_WEB_SOCKET, load, setStatus } from './mapSlice';
import { eventChannel, END } from 'redux-saga';

function parseOpenData(data: string): string {
    return data.split(': ')[1];
}

function parseMapData(data: string): Array<Array<string>> {
    let mapData = data.split(`\n`).slice(1);
    mapData.pop();
    const rows = mapData.map(row => {
        return row.split('');
    });
    return rows;
}

const recieveMessage = (socket: WebSocket) => {
    return eventChannel( emitter => {
        socket.onmessage = msg => {
            return emitter(msg);
        }
        return () => {
            emitter(END);
        }
    })
}

export const webSocket = new WebSocket("wss://hometask.eg1236.com/game1/");

function* webSocketListener(): any { // note: you could pass an "action" param here
    const channel = yield call(recieveMessage, webSocket);
    try {
        while(true) {
            let socketMessage = yield take(channel);
            const target: string = socketMessage.data.split(`:`)[0];
            switch (target) {
                case GameAction.NEW_GAME:
                    console.log(socketMessage.data);
                    yield put(setStatus(GameStatus.OK));
                    yield webSocket.send("map");
                    break;
                case GameAction.OPEN_TILE:
                    console.log(socketMessage.data);
                    let status = parseOpenData(socketMessage.data) as GameStatus;
                    yield put(setStatus(status))
                    yield webSocket.send(GameAction.GET_MAP);
                    break;
                case GameAction.GET_MAP:
                    console.log(socketMessage.data);
                    yield put(load(parseMapData(socketMessage.data))); // dispatch action to redux
                    break;
                default: // HELP
                    console.log(socketMessage.data);
                    break;
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        console.log("Terminated Socket Connection");
        webSocket.close();
    }
}

export function* watcherSaga() {
    yield takeLatest(INIT_WEB_SOCKET, webSocketListener);
};