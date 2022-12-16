import type { FC } from 'react';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';

import { LoginForm } from '../../components/LoginForm';
import { StyledContent } from './styled/StyledContent';
import { StyledRoot } from './styled/StyledRoot';


export const LoginPage: FC = () => (
  <StyledRoot>
    <Container maxWidth="sm">
      <StyledContent>
        <Typography variant="h5" gutterBottom>
          You need to be Loggedin to Edit Books !
        </Typography>

        <LoginForm />

        <Typography variant="body2" sx={{ mb: 5 }}>
          <p>Don’t have an account?</p>
          <Link variant="subtitle2">Register (TODO) </Link>
        </Typography>
      </StyledContent>
    </Container>
  </StyledRoot>
);