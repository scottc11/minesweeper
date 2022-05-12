import axios from "axios";
import { AnyAction } from "redux";
import { FLAG_TILE, LOAD_GAME_DATA, NEW_GAME, REMOVE_FLAG, REVEAL_TILE, SET_GAME_BUTTON_STATUS } from ".";
import { ServerURL } from "../../../common/conf";
import { GameClientType, GameStatus, TilePosition } from "../../../common/types";
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

export function flagTile(tile: TilePosition): any {
    const url = `${ServerURL}api/games/flag/${tile.col}-${tile.row}`;
    return async (dispatch: AppDispatch) => {
        const response = await axios.post(url);
        dispatch({ type: FLAG_TILE, payload: response.data});
    }
}

export function removeFlag(tile: TilePosition): any {
    const url = `${ServerURL}api/games/removeflag/${tile.col}-${tile.row}`;
    return async (dispatch: AppDispatch) => {
        const response = await axios.post(url);
        dispatch({ type: REMOVE_FLAG, payload: response.data });
    }
}

function postDataToServer(url: string): any {
    return async (dispatch: AppDispatch) => {
        const response = await axios.post(url);
        dispatch({ type: LOAD_GAME_DATA, payload: response.data });
    }
}

export function setGameButtonStatus(status: GameStatus) {
    return {
        type: SET_GAME_BUTTON_STATUS,
        payload: status
    }
}