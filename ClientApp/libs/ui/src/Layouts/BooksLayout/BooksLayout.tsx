import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../Header/Header';
import { StyledMain } from '../styled/StyledMain';
import { StyledRoot } from '../styled/StyledRoot';

export const BooksLayout: FC = () => {
  const user = { name: '', email: '', isAuth: false };
  const logOut = () => void 0 ;

  
  return (
    <StyledRoot>
      <Header logOut={logOut} user={user} />

      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledRoot>
  );
};
