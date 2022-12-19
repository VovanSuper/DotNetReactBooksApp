import { useAppDispatch, useAppSelector } from '@books-client/hooks';
import { LoadingStatus } from '@books-client/models';
import { getBooks } from '@books-client/store';
import { FC, useEffect } from 'react';
import { BooksCard } from './BooksItems/BooksCard';

export const BooksPage: FC = () => {
    const { error, loadingStatus, entities } = useAppSelector((state) => state.books);
    const books = Object.entries(entities).map(([key, val]) => val);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    if (error) return <h2>Error</h2>;

    if (loadingStatus === LoadingStatus.LOADING) return <div>Loading ...</div>;

    if (!books?.length) return <h2>No books loaded ...</h2>;

    return <BooksCard title='Books' subTitle='All Books' />;
};
