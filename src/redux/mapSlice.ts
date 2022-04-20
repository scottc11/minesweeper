import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MapState {
    count: number
}

const initialState: MapState = {
    count: 0,
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
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = mapSlice.actions

export default mapSlice.reducer