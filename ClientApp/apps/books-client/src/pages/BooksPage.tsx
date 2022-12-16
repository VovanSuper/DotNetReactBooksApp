import { useAppDispatch, useAppSelector } from '@books-client/hooks';
import { LoadingStatus } from '@books-client/models';
import { getBooks } from '@books-client/store';
import { FC, useEffect } from 'react';

export const BooksPage: FC = () => {
  const { error, loadingStatus, entities } = useAppSelector(state => {
    console.log(state);
    const books = state.books;


    return books || [];

  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);


  if (error) return <h2>Error</h2>;

  if (loadingStatus === LoadingStatus.LOADING) return <div>Loading ...</div>;

  return (
    <p>Books</p>
  );
};