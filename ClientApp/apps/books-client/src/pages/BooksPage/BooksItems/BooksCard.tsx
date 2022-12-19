import { useAppDispatch, useAppSelector } from '@books-client/hooks';
import { booksActions, deleteBook, selectAllBooks } from '@books-client/store';
import { BookListItem } from '@books-client/ui';
import { Card, CardHeader, CardProps } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export interface IBookCardProps extends CardProps {
    title: string;
    subTitle: string;
}

export const BooksCard: FC<IBookCardProps> = ({ title, subTitle, ...rest }) => {
    const books = useAppSelector(selectAllBooks);
    const { selectedBooks = [] } = useAppSelector((state) => state.books);
    const setSelected = booksActions.selectBooks;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleDeleteBook = (id: number) => dispatch(deleteBook({ id }));

    const handleBookSelected = (id: number) => {
        if (!selectedBooks?.length) {
            return dispatch(setSelected([id]));
        }
        if (selectedBooks.some((sId) => sId === id)) {
            return dispatch(setSelected(selectedBooks.filter((sBookId) => sBookId !== id)));
        }
        return dispatch(setSelected([...(selectedBooks || []), id]));
    };

    const handleEditBook = (id: number) => navigate(`/books/${id}`);

    return (
        <Card {...rest}>
            <CardHeader title={title} subheader={subTitle} />
            {books.map((book) => (
                <BookListItem
                    key={book.id}
                    book={book}
                    checked={!!selectedBooks?.length && selectedBooks.includes(book.id)}
                    onSelected={(id) => handleBookSelected(id)}
                    onDelete={handleDeleteBook}
                    onEdit={handleEditBook}
                />
            ))}
        </Card>
    );
};
