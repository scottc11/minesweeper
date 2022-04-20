import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from '@redux-saga/core'
import { createLogger } from 'redux-logger';
import mapReducer from './mapSlice'
import { watcherSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

const middleware = [sagaMiddleware, logger];

export const store = configureStore({
    reducer: {
        map: mapReducer
    },
    middleware: middleware
})

sagaMiddleware.run(watcherSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch