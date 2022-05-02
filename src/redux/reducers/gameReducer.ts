import { GameClientType, GameStatus } from '../../../common/types';
import { NEW_GAME } from '../actions';

const initialState: GameClientType = {
    map: [],
    status: GameStatus.OK
}

function gameReducer(state = initialState, action: any) {
    switch (action.type) {
        case NEW_GAME:
            return { ...state }
        default:
            return state;
    }
}

export default gameReducer;