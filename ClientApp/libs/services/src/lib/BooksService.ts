import type { IBook } from '@books-client/models';
import type { AxiosResponse } from 'axios';

import { $api, apiEndpoint } from './http';

interface IGetAll {
    (signal?: AbortSignal): Promise<Array<IBook>>;
}

interface IGetSingle {
    ({ id }: { id: number }, signal?: AbortSignal): Promise<IBook>;
}

interface IDeleteSingle {
    ({ id }: { id: number }, signal?: AbortSignal): Promise<IBook>;
}

interface IUpdateSingle {
    ({ id }: { id: number }, payload: Partial<IBook>, signal?: AbortSignal): Promise<IBook>;
}

export class BooksService {
    static getBooks: IGetAll = async (signal?: AbortSignal) => $api.get<IBook[]>(apiEndpoint.Books, { signal }).then((resp: AxiosResponse<IBook[]>) => resp.data);

    static getBook: IGetSingle = async ({ id }, signal?: AbortSignal) => $api.get<IBook>(apiEndpoint.Books, { params: { id }, signal }).then((resp) => resp.data);

    static deleteBook: IDeleteSingle = async ({ id }, signal?: AbortSignal) => $api.delete<IBook>(apiEndpoint.Books, { data: { id }, signal }).then((resp) => resp.data);

    static updateBook: IUpdateSingle = async ({ id }, payload, signal?: AbortSignal) =>
        $api.patch<IBook>(apiEndpoint.Books, payload, { params: { id }, signal }).then((resp) => resp.data);

    //   static async signOut() {
    //     return $api.post('/Auth/logout')
    //   }
}
