import { useAppDispatch, useAppSelector } from '@books-client/hooks';
import { getBooks, selectAllBooks } from '@books-client/store';
import { FC, useEffect } from 'react';
import { BooksCard } from './BooksItems/BooksCard';
import { StyledBooksWrapper } from './styled/StyledBooksWrapper';

export const BooksPage: FC = () => {
    const books = useAppSelector(selectAllBooks);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    // if (error) return <h2>Error</h2>;

    // if (loadingStatus === LoadingStatus.LOADING) return <div>Loading ...</div>;

    if (!books?.length) return <h2>No books loaded yet...</h2>;

    return (
        <StyledBooksWrapper>
            <BooksCard className='books-card' title='Books' subTitle='All Books' />
        </StyledBooksWrapper>
    );
};
