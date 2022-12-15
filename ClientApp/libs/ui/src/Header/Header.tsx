import { FC } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { ExitToAppRounded as ExitToAppRoundedIcon, PersonRounded as PersonRoundedIcon } from '@mui/icons-material';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export interface IHeaderProps {
    logout?: () => void;
    // user: IAppUser;
}

export const Header: FC<IHeaderProps> = ({ logout, user }) => {
    const StyledBlock = styled.div`
        display: flex;
        align-items: center;
    `;
    const StyledLink = styled(Link)`
        text-decoration: none;
        color: white;
        &:hover {
            color: white;
        }
    `;
    const StyledToolbar = styled(Toolbar)`
        justify-content: space-between;
    `;
    const StyledUser = styled.div`
        font-size: 24px;
        margin-right: 30px;
    `;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='fixed' sx={{ bgColor: '#2b2b2b', overflow: 'hidden' }}>
                <StyledToolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        {/* <MenuIcon /> */}
                    </IconButton>

                    <Link to='/'>
                        <Typography variant='h6' component='span'>
                            REPEAT beta
                        </Typography>
                    </Link>

                    {user.isAuth && (
                        <StyledBlock>
                            <StyledUser>Пользователь: {user?.currentUser?.user?.login}</StyledUser>
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
                            {/* <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu> */}
                        </StyledBlock>
                    )}
                </StyledToolbar>
            </AppBar>
            <Toolbar />
        </Box>
    );
};
