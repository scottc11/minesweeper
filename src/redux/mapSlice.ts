import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit'

export const GET_MAP = "GET_MAP";
export const SET_MAP = "SET_MAP";
export const INIT_WEB_SOCKET = "INIT_WEB_SOCKET";

export const getMap = createAction(GET_MAP);
export const initWebSocket = createAction(INIT_WEB_SOCKET);

export enum GameAction {
    NEW_GAME = 'new',
    OPEN_TILE = 'open',
    GET_MAP = 'map',
    HELP = 'help'
};

export enum GameStatus {
    OK = 'OK',
    SELECTING = 'selecting',
    GAME_OVER = 'You lose'
}

export interface MapState {
    data: Array<Array<string>>;
    status: GameStatus;
}

const initialState: MapState = {
    data: [],
    status: GameStatus.OK
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        load: (state, action: PayloadAction<Array<Array<string>>>) => {
            state.data = action.payload;
        },
        setStatus: (state, action: PayloadAction<GameStatus>) => {
            state.status = action.payload;
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(getMap, (state, action) => {
    //         state.post = action.payload;
    //     })
    // }
})

// Action creators are generated for each case reducer function
export const { load, setStatus } = mapSlice.actions

export default mapSlice.reducer