import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit'

export const GET_MAP = "GET_MAP";
export const SET_MAP = "SET_MAP";

export const getMap = createAction(GET_MAP);

export interface MapState {
    count: number,
    data: Array<Array<string>>,
    post: any
}

const initialState: MapState = {
    count: 0,
    data: [],
    post: undefined
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.count += action.payload
        },
        load: (state, action: PayloadAction<Array<Array<string>>>) => {
            state.data = action.payload;
        },
        setMap: (state, action: PayloadAction<any>) => {
            state.post = action.payload;
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(getMap, (state, action) => {
    //         state.post = action.payload;
    //     })
    // }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, load, setMap } = mapSlice.actions

export default mapSlice.reducer