import { styled } from '@mui/material/styles';

export const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: '100%',
  margin: 'auto',
  minHeight: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));