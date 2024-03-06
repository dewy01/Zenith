import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import Logo from '~/assets/Logo.png';
import { FORM_ID, RegisterForm } from './RegisterForm';
import { registerFormSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavLink } from 'react-router-dom';
import { mutateUserRegister } from '~/api/User/query';

export const RegisterView = () => {
  const form = useForm<registerFormSchema>({
    defaultValues: {
      id: -1,
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: zodResolver(registerFormSchema),
  });
  const { mutateAsync } = mutateUserRegister();

  const handleSubmit = (data: registerFormSchema) => {
    mutateAsync(data);
    form.reset();
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
      <Stack
        gap={3}
        sx={(theme) => ({
          backgroundColor: theme.palette.action.focus,
          padding: 8,
          borderRadius: 2,
        })}
      >
        <Box display={'flex'} gap={2} justifyContent={'center'}>
          <Avatar variant="square" alt="Omnify logo" src={Logo} />
          <Typography variant="h4">Register</Typography>
        </Box>
        <RegisterForm onSubmit={handleSubmit} formContext={form} />
        <Button type="submit" form={FORM_ID} variant="contained">
          Register
        </Button>
        <Button component={NavLink} to={'/login'}>
          Login
        </Button>
      </Stack>
    </Box>
  );
};
