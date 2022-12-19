import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';

import { environment } from '@books-client/env';

import { booksReducer } from './books.slice';
import { getInitState } from './initState';
import { userReducer } from './user.slice';

const { production } = environment || { production: false };
const isDevelopmentEnv = !production;

const rootReducer = combineReducers({
    user: userReducer,
    books: booksReducer,
});

const store = configureStore({
    reducer: rootReducer,
    preloadedState: getInitState(),
    devTools: isDevelopmentEnv,
});

// store.subscribe(() => window.localStorage.setItem(LOCAL_STORAGE_APP_REDUX_STATE_KEY, JSON.stringify(store.getState())));

export type RootState = ReturnType<typeof store.getState>;

export type RootStateFn = () => RootState;
export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, any, AnyAction>;

export { store };
