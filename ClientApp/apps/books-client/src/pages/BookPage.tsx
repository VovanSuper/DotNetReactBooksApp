import { FC } from 'react';
import { useParams } from 'react-router-dom';

export const BookPage: FC = () => {
  const { id: bookId } = useParams();

  return (
    <h1>Book : {bookId}</h1>
  );
};