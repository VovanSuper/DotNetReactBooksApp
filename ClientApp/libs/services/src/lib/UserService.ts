import { AxiosResponse } from 'axios';

import { $api, apiEndpoint } from './http';

import { IAuthUser, LoginRequestDTO, LoginResponseDTO } from "@books-client/models";

interface ILoginIn {
    (payload: LoginRequestDTO, signal?: AbortSignal): Promise<IAuthUser>;
}

export class UserService {
    static signIn: ILoginIn = async (payload: LoginRequestDTO, signal?: AbortSignal) =>
        $api
            .post<LoginResponseDTO>(apiEndpoint.Login, payload, { signal })
            .then((resp: AxiosResponse<LoginResponseDTO>) => resp.data)
            .then((user: IAuthUser) => ({ ...user, isAuth: true }));


    //   static async signOut() {
    //     return $api.post('/Auth/logout')
    //   }
}
