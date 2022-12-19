/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppState, LoadingStatus, USER_FEATURE_KEY } from '@books-client/models';

const initState: IAppState = {
    books: {
        entities: {},
        ids: [],
        selectedBooks: null,
    },
    user: { user: { email: undefined, id: undefined, isAuth: false, name: undefined, token: undefined }, loadingStatus: LoadingStatus.NOT_LOADED },
};

export const getInitState = (): IAppState => {
    const userStateFromLS = window.localStorage.getItem(USER_FEATURE_KEY);
    if (userStateFromLS) {
        const userObj = JSON.parse(userStateFromLS);
        if (userObj) {
            const userState = { user: { user: { ...userObj, isAuth: true } } };
            return userState as IAppState;
        }
    }
    return initState;
};
