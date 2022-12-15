import { IBook } from '@books-client/models';
import { BooksService } from '@books-client/services';
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';

export const BOOKS_FEATURE_KEY = 'books';

export interface BooksState extends EntityState<IBook> {
    loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
    error: string | null;
}

export const booksAdapter = createEntityAdapter<IBook>({
    selectId: books => books.id,
    sortComparer: (b1, b2) => b1.name.localeCompare(b2.name)
});

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchBooks())
 * }, [dispatch]);
 * ```
 */
export const getBooks = createAsyncThunk('books/get', async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
        const books = await BooksService.getBooks();
        return fulfillWithValue(books);
    } catch (e) {
        console.error(e);
        return rejectWithValue(e);
    }
});

export const getBook = createAsyncThunk('book/getSingle', async ({ id }: { id: number; }, { fulfillWithValue, rejectWithValue }) => {
    try {
        const book = await BooksService.getBook({ id });
        return fulfillWithValue(book);
    } catch (e) {
        console.error(e);
        return rejectWithValue(e);
    }
});

export const deleteBook = createAsyncThunk('books/deleteSingle', async ({ id }: { id: number; }, { fulfillWithValue, rejectWithValue }) => {
    try {
        const book = await BooksService.getBook({ id });
        return fulfillWithValue(book);
    } catch (e) {
        console.error(e);
        return rejectWithValue(e);
    }

});
export const patchBook = createAsyncThunk('books/patchSingle', async ({ id, book }: { id: number; book: Partial<IBook>; }, { fulfillWithValue, rejectWithValue }) => {
    try {
        const result = await BooksService.updateBook({ id }, book);
        return fulfillWithValue(result);
    } catch (e) {
        console.error(e);
        return rejectWithValue(e);
    }
});

export const initialBooksState: BooksState = booksAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
});

export const booksSlice = createSlice({
    name: BOOKS_FEATURE_KEY,
    initialState: initialBooksState,
    reducers: {
        setAll: booksAdapter.setAll,
        setOne: booksAdapter.setOne,
        add: booksAdapter.addOne,
        remove: booksAdapter.removeOne,
        update: booksAdapter.updateOne
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state: BooksState) => {
                state.loadingStatus = 'loading';
            })
            .addCase(getBooks.fulfilled, (state: BooksState, action: PayloadAction<IBook[]>) => {
                booksAdapter.setAll(state, action.payload);
                state.loadingStatus = 'loaded';
            })
            .addCase(getBooks.rejected, (state: BooksState, action) => {
                state.loadingStatus = 'error';
                state.error = action.error.message;
            });
    },
});

/*
 * Export reducer for store configuration.
 */
export const booksReducer = booksSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(booksActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const booksActions = booksSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllBooks);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = booksAdapter.getSelectors();

export const getBooksState = (rootState: unknown): BooksState => rootState[BOOKS_FEATURE_KEY];

export const selectAllBooks = createSelector(getBooksState, selectAll);

export const selectBooksEntities = createSelector(getBooksState, selectEntities);
