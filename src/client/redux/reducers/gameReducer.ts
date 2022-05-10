import { GameClientType, GameStatus } from '../../../common/types';
import { LOAD_GAME_DATA, NEW_GAME, REVEAL_TILE, SET_GAME_BUTTON_STATUS } from '../actions';

const initialState: GameClientType = {
    map: [],
    status: GameStatus.OK
}

function gameReducer(state = initialState, action: any) {
    switch (action.type) {
        case NEW_GAME:
            return { ...state }
        case LOAD_GAME_DATA:
            return action.payload;
        case REVEAL_TILE:
            return action.payload;
        case SET_GAME_BUTTON_STATUS:
            return { ...state, status: action.payload }
        default:
            return state;
    }
}

export default gameReducer;