import { LoginResponseDTO } from './DTOs/LoginResponseDTO';

export type IAuthUser = Partial<Omit<LoginResponseDTO, 'password' >> & {
  name?: string;
  isAuth?: boolean;
};