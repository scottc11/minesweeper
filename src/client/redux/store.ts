import createSagaMiddleware from '@redux-saga/core'
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import { gameSaga } from './sagas';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

const middleware = applyMiddleware(sagaMiddleware, logger);

export const store = createStore(
    rootReducer,
    middleware
)

sagaMiddleware.run(gameSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch