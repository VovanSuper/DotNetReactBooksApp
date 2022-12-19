import { appColors } from '@books-client/const';
import { useAppDispatch, useAppSelector } from '@books-client/hooks';
import { IBook } from '@books-client/models';
import { getBook, patchBook, selectBook } from '@books-client/store';
import { BooksAppButton, BooksAppForm, BooksAppSubmit } from '@books-client/ui';
import { Card, Stack, TextField } from '@mui/material';
import CardHeader from '@mui/material/CardHeader/CardHeader';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export type BookEdit = Omit<IBook, 'genre' | 'author'>;

export const EditBookItem: FC = () => {
    const { id = '0' } = useParams();
    const bookId = parseInt(id);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const selectedEditBook = useAppSelector((state) => selectBook(state, Number(bookId)));

    useEffect(() => {
        dispatch(getBook({ id: bookId }));
    }, [bookId]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<BookEdit>({ mode: 'onChange' });

    const handleEditBook = (book: BookEdit) => {
        dispatch(patchBook({ id: Number(bookId), book })).then((_) => {
            return navigate('/books');
        });
    };

    const handleCancel = () => {
        reset();
        navigate('/books');
    };

    if (!selectedEditBook) return <Navigate to='/' />;

    return (
        <BooksAppForm onSubmit={handleSubmit(handleEditBook)} className='login-form' justify='center' noValidate autoComplete='off'>
            <Card sx={{ padding: '5rem' }}>
                <CardHeader title={`Edit Book ${selectedEditBook.name}`} sx={{ padding: '3rem 0' }} />
                <Stack spacing={3}>
                    <TextField
                        autoComplete={'off'}
                        helperText={errors?.name?.message}
                        error={!!errors?.name}
                        defaultValue={selectedEditBook.name}
                        label='Book name'
                        type='text'
                        id='name'
                        {...register('name', {
                            required: 'Cannot be Empty',
                            minLength: { value: 2, message: 'Should be no shorter when 2' },
                            maxLength: { value: 50, message: 'Should be no longer when 50' },
                        })}
                    />

                    <TextField
                        autoComplete={'off'}
                        helperText={errors?.year?.message}
                        error={!!errors?.year}
                        defaultValue={selectedEditBook.year}
                        label='Book year'
                        type='number'
                        id='year'
                        {...register('year', {
                            required: 'Cannot be Empty',
                            min: { value: 0, message: 'Should be more when 0' },
                            max: { value: new Date().getFullYear(), message: 'Should be lesser when current Year' },
                        })}
                    />
                </Stack>
                <Stack spacing={2} direction='row'>
                    <BooksAppSubmit disabled={!isValid}>Save</BooksAppSubmit>
                    <BooksAppButton backgroundColor={appColors.redError} onClick={handleCancel}>
                        Cancel
                    </BooksAppButton>
                </Stack>
            </Card>
        </BooksAppForm>
    );
};
