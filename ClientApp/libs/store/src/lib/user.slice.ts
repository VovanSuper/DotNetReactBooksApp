import { IAppState, IAuthUser, LoadingStatus, LoginRequestDTO, TLoadingStatus, USER_FEATURE_KEY } from '@books-client/models';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserService } from '@books-client/services';

export interface UserState {
    loadingStatus: TLoadingStatus;
    error?: string;
    user?: IAuthUser;
}

export const loginIn = createAsyncThunk('user/Login', async (data: LoginRequestDTO, { fulfillWithValue, rejectWithValue }) => {
    try {
        const userData = await UserService.signIn(data);
        const { id, name, email, token } = userData;
        if (token) {
            localStorage.setItem(USER_FEATURE_KEY, JSON.stringify({ id, email, token }));
        }
        return fulfillWithValue(userData);
    } catch (error: any) {
        console.error(error);
        return rejectWithValue(error);
    }
});

export const initialUserState: UserState = {
    loadingStatus: LoadingStatus.NOT_LOADED,
    error: undefined,
    user: undefined,
};

export const userSlice = createSlice({
    name: USER_FEATURE_KEY,
    initialState: initialUserState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginIn.pending, (state: UserState) => {
                state.loadingStatus = LoadingStatus.LOADING;
            })
            .addCase(loginIn.fulfilled, (state: UserState, action: PayloadAction<IAuthUser>) => {
                state.loadingStatus = LoadingStatus.LOADED;
                state.error = undefined;
                state.user = { ...action.payload, isAuth: true };
            })
            .addCase(loginIn.rejected, (state: UserState, action) => {
                state.loadingStatus = LoadingStatus.LOADED;
                state.error = action.error.message || 'Login error';
            });
    },
});

export const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;

export const getUserState = (rootState: IAppState): UserState => rootState[USER_FEATURE_KEY] as unknown as UserState;
