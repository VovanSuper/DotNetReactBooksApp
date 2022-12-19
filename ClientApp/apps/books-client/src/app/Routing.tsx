import type { FC, ReactElement } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { useAppSelector } from '@books-client/hooks';
import { BooksLayout } from '@books-client/ui';
import { BookPage } from '../pages/BookPage';
import { BooksPage } from '../pages/BooksPage/BooksPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import Page404 from '../pages/Page404';

const PrivateGuard: FC<{ children: ReactElement }> = ({ children }) => {
    const { user } = useAppSelector((state) => state.user);
    const { isAuth } = user || { isAuth: false };
    return isAuth ? children : <Navigate to='/login' />;
};

const AnonymousGuard: FC<{ children: ReactElement }> = ({ children }) => {
    const { user } = useAppSelector((state) => state.user);
    const { isAuth } = user || { isAuth: false };
    return isAuth ? <Navigate to='/' /> : children;
};

export const AppRouting: FC = () => {
    const routes = useRoutes([
        {
            path: '/books',
            element: (
                <PrivateGuard>
                    <BooksLayout />
                </PrivateGuard>
            ),
            children: [
                { element: <Navigate to='/books/all' />, index: true },
                { path: 'all', element: <BooksPage /> },
                { path: ':id', element: <BookPage /> },
            ],
        },
        {
            path: 'login',
            element: (
                <AnonymousGuard>
                    <LoginPage />
                </AnonymousGuard>
            ),
        },
        { path: '404', element: <Page404 /> },
        { path: '/', element: <Navigate to='/books/all' /> },
        {
            path: '*',
            element: <Navigate to='/404' replace />,
        },
    ]);

    return routes;
};
