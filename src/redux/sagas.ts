import { call, put, take, takeLatest } from 'redux-saga/effects';
import { GameStatus, INIT_WEB_SOCKET, load, setStatus } from './mapSlice';
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
// webSocket.onopen = () => {
//     console.log('opening...')
// }

function* webSocketListener(): any { // note: you could pass an "action" param here
    const channel = yield call(recieveMessage, webSocket);
    try {
        while(true) {
            let socketMessage = yield take(channel);
            const target: string = socketMessage.data.split(`:`)[0];
            switch (target) {
                case 'new':
                    console.log(socketMessage.data);
                    yield put(setStatus(GameStatus.OK));
                    yield webSocket.send("map");
                    break;
                case 'open':
                    console.log(socketMessage.data);
                    let action = parseOpenData(socketMessage.data);
                    console.log(action);
                    if (action === "OK") {
                        yield put(setStatus(GameStatus.OK))
                    } else if (action === "You lose") {
                        yield put(setStatus(GameStatus.GAME_OVER))
                    }
                    yield webSocket.send("map");
                    break;
                case 'map':
                    console.log(socketMessage.data);
                    yield put(load(parseMapData(socketMessage.data))); // dispatch action to redux
                    break;
                default:
                    console.log(socketMessage.data);
                    break;
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        console.log("something terminated");
    }
}

export function* watcherSaga() {
    yield takeLatest(INIT_WEB_SOCKET, webSocketListener);
};