import { styled } from '@mui/material/styles';

export const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.default,
}));