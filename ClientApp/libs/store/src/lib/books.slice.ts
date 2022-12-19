import { BOOKS_FEATURE_KEY, IBook, LoadingStatus, TLoadingStatus } from '@books-client/models';
import { BooksService } from '@books-client/services';
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction, Update } from '@reduxjs/toolkit';

export interface BooksState extends EntityState<IBook> {
    loadingStatus?: TLoadingStatus;
    error?: string | null;
    selectedBooks: number[] | null;
}

export const booksAdapter = createEntityAdapter<IBook>({
    selectId: (book) => book.id,
    sortComparer: (b1, b2) => b1.name.localeCompare(b2.name),
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

export const getBook = createAsyncThunk('book/getSingle', async ({ id }: { id: number }, { fulfillWithValue, rejectWithValue }) => {
    try {
        const book = await BooksService.getBook({ id });
        return fulfillWithValue(book);
    } catch (e) {
        console.error(e);
        return rejectWithValue(e);
    }
});

export const deleteBook = createAsyncThunk('books/deleteSingle', async ({ id }: { id: number }, { fulfillWithValue, rejectWithValue }) => {
    try {
        const book = await BooksService.deleteBook({ id });
        return fulfillWithValue(book);
    } catch (e) {
        console.error(e);
        return rejectWithValue(e);
    }
});
export const patchBook = createAsyncThunk('books/patchSingle', async ({ id, book }: { id: number; book: Partial<IBook> }, { fulfillWithValue, rejectWithValue }) => {
    try {
        const result = await BooksService.updateBook({ id }, book);
        return fulfillWithValue(result);
    } catch (e) {
        console.error(e);
        return rejectWithValue(e);
    }
});

export const initialBooksState: BooksState = booksAdapter.getInitialState({
    loadingStatus: LoadingStatus.NOT_LOADED,
    error: null,
    selectedBooks: null,
});

export const booksSlice = createSlice({
    name: BOOKS_FEATURE_KEY,
    initialState: initialBooksState,
    reducers: {
        setAll: booksAdapter.setAll,
        setOne: booksAdapter.setOne,
        add: booksAdapter.addOne,
        remove: booksAdapter.removeOne,
        update: booksAdapter.updateOne,
        selectBooks: (state, { payload }: PayloadAction<number[]>) => ({
            ...state,
            selectedBooks: payload,
        }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state: BooksState) => {
                state.loadingStatus = LoadingStatus.LOADING;
            })
            .addCase(getBooks.fulfilled, (state: BooksState, action: PayloadAction<IBook[]>) => {
                booksAdapter.setAll(state, action.payload);
                state.error = undefined;
                state.loadingStatus = LoadingStatus.LOADED;
            })
            .addCase(getBooks.rejected, (state: BooksState, action) => {
                state.loadingStatus = LoadingStatus.ERROR;
                state.error = action.error.message ?? 'error loading books';
            })

            .addCase(getBook.pending, (state: BooksState) => {
                state.loadingStatus = LoadingStatus.LOADING;
            })
            .addCase(getBook.fulfilled, (state: BooksState, action: PayloadAction<IBook>) => {
                booksAdapter.setOne(state, action.payload);
                state.error = undefined;
                state.loadingStatus = LoadingStatus.LOADED;
            })
            .addCase(getBook.rejected, (state: BooksState, action) => {
                state.loadingStatus = LoadingStatus.ERROR;
                state.error = action.error.message ?? `error loading book: ${action.payload}`;
            })

            .addCase(deleteBook.pending, (state: BooksState) => {
                state.loadingStatus = LoadingStatus.LOADING;
            })
            .addCase(deleteBook.fulfilled, (state: BooksState, action: PayloadAction<IBook>) => {
                booksAdapter.removeOne(state, action.payload.id);
                state.error = undefined;
                state.loadingStatus = LoadingStatus.LOADED;
            })
            .addCase(deleteBook.rejected, (state: BooksState, action) => {
                state.loadingStatus = LoadingStatus.ERROR;
                state.error = action.error.message ?? `error deleting the book ${action.payload}`;
            })

            .addCase(patchBook.pending, (state: BooksState) => {
                state.loadingStatus = LoadingStatus.LOADING;
            })
            .addCase(patchBook.fulfilled, (state: BooksState, action: PayloadAction<IBook>) => {
                const update = { changes: action.payload as Partial<IBook>, id: action.payload.id } as Update<IBook>;
                booksAdapter.updateOne(state, update);
                state.error = undefined;
                state.loadingStatus = LoadingStatus.LOADED;
            })
            .addCase(patchBook.rejected, (state: BooksState, action) => {
                state.loadingStatus = LoadingStatus.ERROR;
                state.error = action.error.message ?? `error updating the book ${action.payload}`;
            });
    },
});
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
const { selectAll, selectEntities, selectById } = booksAdapter.getSelectors();

export const getBooksState = (rootState: any): BooksState => rootState[BOOKS_FEATURE_KEY];

export const selectAllBooks = createSelector(getBooksState, selectAll);

export const selectBooksEntities = createSelector(getBooksState, selectEntities);
