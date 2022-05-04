import axios from "axios";
import { AnyAction } from "redux";
import { LOAD_GAME_DATA, NEW_GAME, REVEAL_TILE } from ".";
import { ServerURL } from "../../../common/conf";
import { GameClientType, TilePosition } from "../../../common/types";
import { AppDispatch, RootState } from "../store";

export function newGame() {
    return postDataToServer(`${ServerURL}api/games/new`);
}

export const loadGameData = (data: GameClientType) => {
    return {
        type: LOAD_GAME_DATA,
        payload: data
    }
}
// ThunkAction<void, RootState, unknown, AnyAction>
export function revealTile(tile: TilePosition): any {    
    return async (dispatch: AppDispatch) => {
        const response = await axios.post(axios.defaults.baseURL + `api/games/reveal/${tile.col}-${tile.row}`);
        dispatch({ type: REVEAL_TILE, payload: response.data });
    }
}

function postDataToServer(url: string): any {
    return async (dispatch: AppDispatch) => {
        const response = await axios.post(url);
        dispatch({ type: LOAD_GAME_DATA, payload: response.data });
    }
}