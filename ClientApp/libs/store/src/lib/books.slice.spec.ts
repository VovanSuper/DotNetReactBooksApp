import { IBook } from '@books-client/models';
import { getBooks, booksAdapter, booksReducer } from './books.slice';

describe('books reducer', () => {
    it('should handle initial state', () => {
        const expected = booksAdapter.getInitialState({
            loadingStatus: 'not loaded',
            error: null,
        });

        expect(booksReducer(undefined, { type: '' })).toEqual(expected);
    });

    it('should handle fetchBooks', () => {
        let state = booksReducer(undefined, getBooks.pending("loading", void 0));

        expect(state).toEqual(
            expect.objectContaining({
                loadingStatus: 'loading',
                error: null,
                entities: {},
            })
        );

        state = booksReducer(state, getBooks.fulfilled([{ id: 1, author: { id: 1, name: 'VovanSuppa' }, authorId: 1, genre: { genreName: 'G1', id: 1 }, year: 2023, name: "The Vovan Book 1" } as IBook], 'loaded', void 0));

        expect(state).toEqual(
            expect.objectContaining({
                loadingStatus: 'loaded',
                error: null,
                entities: { 1: { id: 1 } },
            })
        );

        state = booksReducer(state, getBooks.rejected(new Error('Handle books Loading Error'), '1', void 0));

        expect(state).toEqual(
            expect.objectContaining({
                loadingStatus: 'error',
                error: 'Handle books Loading Error',
                entities: { 1: { id: 1 } },
            })
        );
    });
});
