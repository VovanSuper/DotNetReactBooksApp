import type { EntityState } from '@reduxjs/toolkit';

import { IAuthUser } from './IAppUser';
import { IBook } from './IBook';
import { TLoadingStatus } from './loading-status';

export const BOOKS_FEATURE_KEY = 'books';
export const USER_FEATURE_KEY = 'user';

export interface IAppState {
    user: {
        user?: IAuthUser;
        loadingStatus: TLoadingStatus;
    };
    books?: EntityState<IBook> & { selectedBooks: number[] | null };
}
