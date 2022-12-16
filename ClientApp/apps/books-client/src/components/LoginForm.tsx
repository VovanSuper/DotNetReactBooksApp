import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { LoginRequestDTO } from '@books-client/models';
import { BooksAppForm, BooksAppSubmit } from '@books-client/ui';
import { useAppDispatch } from '@books-client/hooks';
import { loginIn } from '@books-client/store';

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isValid },
  } = useForm<LoginRequestDTO>({ mode: 'onChange' });

  const changeShowPass = () => setShowPassword(prev => !prev);

  const handleLogin = (loginData: LoginRequestDTO) => {
    dispatch(loginIn(loginData))
      .then(_ => navigate('/books', { replace: true }));
  };

  return (
    <BooksAppForm onSubmit={handleSubmit(handleLogin)} className="login-form" justify='center' noValidate autoComplete='off'>
      <Stack spacing={3}>
        <TextField
          autoComplete={'off'}
          helperText={errors?.email?.message}
          error={!!errors?.email}
          label='Email'
          type='text'
          id='email'
          {...register('email', {
            required: 'Cannot be Empty',
            minLength: { value: 2, message: 'Should be no shorter when 2' },
            maxLength: { value: 50, message: 'Should be no longer when 50' },
          })}
        />

        <TextField
          autoComplete={'off'}
          helperText={errors?.password && errors?.password?.message}
          error={!!errors?.password}
          label='Password'
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <IconButton edge="end" onClick={changeShowPass}  >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            )
          }}
          id='password'
          {...register('password', {
            required: 'Cannot be Empty',
            minLength: { value: 2, message: 'Should be no shorter when 2' },
            maxLength: { value: 5, message: 'Should be no longer when 5' },
          })}
        />

        <BooksAppSubmit disabled={!isValid}>
          Login
        </BooksAppSubmit>
      </Stack>
    </BooksAppForm >
  );
};
