import axios from "axios";
import { AnyAction } from "redux";
import { FLAG_TILE, INCREMENT_GAME_CLOCK, LOAD_GAME_DATA, NEW_GAME, REMOVE_FLAG, RESET_GAME_CLOCK, REVEAL_TILE, SET_GAME_BUTTON_STATUS, START_GAME_CLOCK, STOP_GAME_CLOCK } from ".";
import { ServerURL } from "../../../common/conf";
import { GameClientType, GameStatus, TilePosition } from "../../../common/types";
import { AppDispatch, RootState } from "../store";

export function newGame(): any {
    return async (dispatch: AppDispatch) => {
        dispatch(resetGameClock());
        dispatch(startGameClock());
        const response = await axios.post(`${ServerURL}api/games/new`);
        dispatch({ type: LOAD_GAME_DATA, payload: response.data });
    }
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

export function incrementGameClock() {
    return {
        type: INCREMENT_GAME_CLOCK
    }
}

export function stopGameClock() {
    return {
        type: STOP_GAME_CLOCK
    }
}

export function startGameClock() {
    return {
        type: START_GAME_CLOCK
    }
}

export function resetGameClock() {
    return {
        type: RESET_GAME_CLOCK
    }
}