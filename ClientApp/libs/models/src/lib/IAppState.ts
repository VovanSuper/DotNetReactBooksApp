import { IAuthUser } from './IAppUser';
import { IBook } from './IBook';

export const BOOKS_FEATURE_KEY = 'books';
export const USER_FEATURE_KEY = 'user';

export interface IAppState {
  user?: IAuthUser;
  books?: Array<IBook>,
}