import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ExitToAppRounded as ExitToAppRoundedIcon, PersonRounded as PersonRoundedIcon } from '@mui/icons-material';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { IAuthUser } from '@books-client/models';
import { StyledBlock } from './styled/StyledBlock';
import { StyledToolbar } from './styled/StyledToolbar';
import { StyledUser } from './styled/StyledUser';

import { ReactComponent as RealLogo } from './assets/Real-Logo1.svg';

export interface IHeaderProps {
    title?: string;
    user?: IAuthUser;
    logOut: () => void;
}

export const Header: FC<IHeaderProps> = ({ logOut: logout, user, title = 'Books App' }) => (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position='fixed' sx={{ bgColor: '#2b2b2b', overflow: 'hidden' }}>
            <StyledToolbar>
                <Link to='/'>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <RealLogo />
                    </IconButton>

                    <Typography variant='h6' component='span'>
                        {title}
                    </Typography>
                </Link>

                {user?.isAuth && (
                    <StyledBlock>
                        <StyledUser>User: {user.name}</StyledUser>
                        <Link to='/profile'>
                            <PersonRoundedIcon
                                fontSize='large'
                                style={{
                                    cursor: 'pointer',
                                    fill: 'white',
                                    marginRight: '10px',
                                }}
                            />
                        </Link>
                        <Link to='/admin'>
                            <AdminPanelSettingsRoundedIcon
                                fontSize='large'
                                style={{
                                    cursor: 'pointer',
                                    fill: 'white',
                                    marginRight: '10px',
                                }}
                            />
                        </Link>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            color='inherit'
                            onClick={logout}
                        >
                            <ExitToAppRoundedIcon fontSize='large' />
                        </IconButton>
                    </StyledBlock>
                )}
            </StyledToolbar>
        </AppBar>
        <Toolbar />
    </Box>
);