import { GameClientType, GameStatus } from '../../../common/types';
import { FLAG_TILE, LOAD_GAME_DATA, NEW_GAME, REMOVE_FLAG, REVEAL_TILE, SET_GAME_BUTTON_STATUS } from '../actions';

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
        case FLAG_TILE:
            // TODO: flag count +1
            return action.payload;
        case REMOVE_FLAG:
            // TODO: flag count -1
            return action.payload;
        case SET_GAME_BUTTON_STATUS:
            return { ...state, status: action.payload }
        default:
            return state;
    }
}

export default gameReducer;