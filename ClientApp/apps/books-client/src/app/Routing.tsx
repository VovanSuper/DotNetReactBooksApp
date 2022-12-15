import type { FC } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { BooksLayout } from '@books-client/ui';
import { BooksPage } from '../pages/BooksPage';
import { BookPage } from '../pages/BookPage';
import { LoginPage } from '../pages/LoginPage';
import Page404 from '../pages/Page404';

export const AppRouting: FC = () => {
  const routes = useRoutes([
    {
      path: '/books',
      element: <BooksLayout />,
      children: [
        { element: <Navigate to="/books/all" />, index: true },
        { path: 'all', element: <BooksPage /> },
        { path: ':id', element: <BookPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    { path: '404', element: <Page404 /> },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
};
