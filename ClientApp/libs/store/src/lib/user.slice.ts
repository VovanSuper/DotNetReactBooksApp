import { IAppState, IAuthUser, LoginRequestDTO, USER_FEATURE_KEY } from '@books-client/models';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserService } from '@books-client/services';

export interface UserState {
    loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
    error?: string;
    user?: IAuthUser;
}

export const loginIn = createAsyncThunk('user/Login', async (data: LoginRequestDTO, { fulfillWithValue, rejectWithValue }) => {
    try {
        const response = await UserService.signIn(data);
        const { email, id, token } = response;
        if (token) {
            localStorage.setItem('accessToken', token);
            localStorage.setItem('authUser', JSON.stringify({ id, email, token }));
        }
        return fulfillWithValue(response);
    } catch (error: any) {
        console.error(error);
        return rejectWithValue(error);
    }
});

export const initialUserState: UserState = {
    loadingStatus: 'not loaded',
    error: undefined,
    user: undefined
};

export const userSlice = createSlice({
    name: USER_FEATURE_KEY,
    initialState: initialUserState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginIn.pending, (state: UserState) => {
                state.loadingStatus = 'loading';
            })
            .addCase(loginIn.fulfilled, (state: UserState, action: PayloadAction<IAuthUser>) => {
                state.loadingStatus = 'loaded';
                state.error = undefined;
                state.user = action.payload;
            })
            .addCase(loginIn.rejected, (state: UserState, action) => {
                state.loadingStatus = 'error';
                state.error = action.error.message || 'Login error';
            });
    },
});

export const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;

export const getUserState = (rootState: IAppState): UserState => rootState[USER_FEATURE_KEY] as unknown as UserState;