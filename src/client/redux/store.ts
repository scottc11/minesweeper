import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';

const logger = createLogger();

const middleware = applyMiddleware(thunkMiddleware, logger);

export const store = createStore(
    rootReducer,
    middleware
)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch