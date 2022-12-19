/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOCAL_STORAGE_APP_REDUX_STATE_KEY } from '@books-client/const';
import { IAppState, LoadingStatus } from '@books-client/models';

const initState: IAppState = {
    books: {
        entities: {},
        ids: [],
        selectedBooks: null,
    },
    user: { user: { email: undefined, id: undefined, isAuth: false, name: undefined, token: undefined }, loadingStatus: LoadingStatus.NOT_LOADED },
};

export const getInitState = (): IAppState => {
    const stateFromLS = window.localStorage.getItem(LOCAL_STORAGE_APP_REDUX_STATE_KEY);
    const state = stateFromLS ? (JSON.parse(stateFromLS) as IAppState) : initState;
    return state;
};
