import { GameClientType, GameStatus } from '../../../common/types';
import { FLAG_TILE, INCREMENT_GAME_CLOCK, LOAD_GAME_DATA, NEW_GAME, REMOVE_FLAG, RESET_GAME_CLOCK, REVEAL_TILE, SET_GAME_BUTTON_STATUS, START_GAME_CLOCK, STOP_GAME_CLOCK } from '../actions';

const initialState = {
    map: [],
    status: GameStatus.OK,
    timeElapsed: 0,
    clockIsRunning: false
}

function gameReducer(state = initialState, action: any) {
    switch (action.type) {
        case NEW_GAME:
            return { ...state }
        case LOAD_GAME_DATA:
            return { ...state, map: action.payload.map, status: action.payload.status};
        case REVEAL_TILE:
            return { ...state, map: action.payload.map, status: action.payload.status };
        case FLAG_TILE:
            // TODO: flag count +1
            return { ...state, map: action.payload.map, status: action.payload.status };
        case REMOVE_FLAG:
            // TODO: flag count -1
            return { ...state, map: action.payload.map, status: action.payload.status };
        case SET_GAME_BUTTON_STATUS:
            return { ...state, status: action.payload }
        case INCREMENT_GAME_CLOCK:
            return { ...state, timeElapsed: state.timeElapsed + 1 }
        case STOP_GAME_CLOCK:
            return {...state, clockIsRunning: false}
        case START_GAME_CLOCK:
            return { ...state, clockIsRunning: true }
        case RESET_GAME_CLOCK:
            return { ...state, timeElapsed: 0 }
        default:
            return state;
    }
}

export default gameReducer;