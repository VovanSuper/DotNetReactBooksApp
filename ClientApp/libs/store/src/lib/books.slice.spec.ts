import { getBooks, booksAdapter, booksReducer } from './books.slice';

describe('books reducer', () => {
    it('should handle initial state', () => {
        const expected = booksAdapter.getInitialState({
            loadingStatus: 'not loaded',
            error: null,
        });

        expect(booksReducer(undefined, { type: '' })).toEqual(expected);
    });

    it('should handle fetchBookss', () => {
        let state = booksReducer(undefined, getBooks.pending(null, null));

        expect(state).toEqual(
            expect.objectContaining({
                loadingStatus: 'loading',
                error: null,
                entities: {},
            })
        );

        state = booksReducer(state, getBooks.fulfilled([{ id: 1 }], null, null));

        expect(state).toEqual(
            expect.objectContaining({
                loadingStatus: 'loaded',
                error: null,
                entities: { 1: { id: 1 } },
            })
        );

        state = booksReducer(state, getBooks.rejected(new Error('Uh oh'), null, null));

        expect(state).toEqual(
            expect.objectContaining({
                loadingStatus: 'error',
                error: 'Uh oh',
                entities: { 1: { id: 1 } },
            })
        );
    });
});
