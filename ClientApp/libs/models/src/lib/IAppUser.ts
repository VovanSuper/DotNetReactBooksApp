import { LoginResponseDTO } from './DTOs/LoginResponseDTO';

export type IAuthUser = LoginResponseDTO & {
  isAuth?: boolean;
};