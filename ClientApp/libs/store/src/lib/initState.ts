/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOCAL_STORAGE_APP_REDUX_STATE_KEY } from '@books-client/const';
import { IAppState } from '@books-client/models';

const initState: IAppState = {
    books: [],
    user: undefined
};


export const getInitState = (): IAppState => {
    const stateFromLS = window.localStorage.getItem(LOCAL_STORAGE_APP_REDUX_STATE_KEY);
    const state = stateFromLS ? (JSON.parse(stateFromLS) as IAppState) : initState;
    return state;
};
