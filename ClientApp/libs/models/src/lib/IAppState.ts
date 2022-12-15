import { IAuthUser } from './IAppUser';
import { IBook } from './IBook';

export interface IAppState {
  user?: IAuthUser;
  books: Array<IBook>,
  
}