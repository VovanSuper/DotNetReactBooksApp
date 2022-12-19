import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { BookOnlineRounded, ExitToAppRounded } from '@mui/icons-material';

import { IAuthUser } from '@books-client/models';
import { StyledBlock } from './styled/StyledBlock';
import { StyledToolbar } from './styled/StyledToolbar';
import { StyledUser } from './styled/StyledUser';

import { appColors } from '@books-client/const';
import { AppBar, IconButton, Typography } from '@mui/material';
import { StyledLogoWrapper } from './styled/StyledLogo';

export interface IHeaderProps {
    title?: string;
    user?: IAuthUser;
    logOut: () => void;
}

export const Header: FC<IHeaderProps> = ({ logOut, user, title = 'Books App' }) => (
    <AppBar position='fixed' sx={{ bgColor: appColors.dark, overflow: 'hidden', maxHeight: '4rem' }}>
        <StyledToolbar>
            {/* <RealLogo /> */}
            <Link to='/'>
                <StyledLogoWrapper>Books App</StyledLogoWrapper>

                <Typography variant='h6' component='span'>
                    {title}
                </Typography>
            </Link>

            {user?.isAuth && (
                <StyledBlock>
                    <StyledUser>User: {user.name ?? user.email}</StyledUser>
                    <Link to='/books'>
                        <BookOnlineRounded
                            fontSize='large'
                            style={{
                                cursor: 'pointer',
                                fill: 'white',
                                marginRight: '10px',
                            }}
                        />
                    </Link>
                    <IconButton size='large' aria-label='user account' aria-controls='menu-appbar' aria-haspopup='true' color='inherit' onClick={logOut}>
                        <ExitToAppRounded fontSize='large' />
                    </IconButton>
                </StyledBlock>
            )}
        </StyledToolbar>
    </AppBar>
);
