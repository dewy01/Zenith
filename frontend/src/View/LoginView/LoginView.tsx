import { Avatar, Box, Button, Paper, Stack, Typography } from '@mui/material';
import Logo from '~/assets/Logo.png';
import { FORM_ID, LoginForm } from './LoginForm';
import { loginFormSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavLink } from 'react-router-dom';
import { mutateUserLogin } from '~/api/User/query';
import { DialogPassword } from '../RegisterView/PasswordRenew';
import { Trans } from '@lingui/react';

export const LoginView = () => {
  const form = useForm<loginFormSchema>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginFormSchema),
  });
  const { mutateAsync } = mutateUserLogin();

  const handleSubmit = (data: loginFormSchema) => {
    mutateAsync(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Paper sx={{ paddingY: 6, paddingX: 6 }} elevation={2}>
        <Stack gap={3}>
          <Box display={'flex'} gap={2} justifyContent={'center'}>
            <Avatar variant="square" alt="Omnify logo" src={Logo} />
            <Typography variant="h4">
              <Trans id="Login">Login</Trans>
            </Typography>
          </Box>
          <LoginForm onSubmit={handleSubmit} formContext={form} />
          <Button type="submit" form={FORM_ID} variant="contained">
            <Trans id="Login">Login</Trans>
          </Button>
          <Box display={'flex'}>
            <DialogPassword />
            <Button
              color="inherit"
              fullWidth
              component={NavLink}
              to={'/register'}
            >
              <Trans id="Go to register">Go to register</Trans>
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};
