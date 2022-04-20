import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit'

export const GET_MAP = "GET_MAP";
export const SET_MAP = "SET_MAP";
export const INIT_WEB_SOCKET = "INIT_WEB_SOCKET";

export const getMap = createAction(GET_MAP);
export const initWebSocket = createAction(INIT_WEB_SOCKET);

export interface MapState {
    data: Array<Array<string>>,
}

const initialState: MapState = {
    data: [],
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        load: (state, action: PayloadAction<Array<Array<string>>>) => {
            state.data = action.payload;
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(getMap, (state, action) => {
    //         state.post = action.payload;
    //     })
    // }
})

// Action creators are generated for each case reducer function
export const { load } = mapSlice.actions

export default mapSlice.reducer